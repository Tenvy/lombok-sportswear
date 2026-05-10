import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import prisma from "@/src/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("x-callback-token") || "";
  const expected = process.env.XENDIT_CALLBACK_TOKEN || "";

  if (!expected) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  if (!safeCompare(token, expected)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let payload: Record<string, unknown>;
  try {
    const raw = await request.text();
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let externalId: string | undefined;
  let providerRef: string | undefined;
  let eventType: string;

  const hasVaPayment =
    typeof payload.payment_id === "string" &&
    typeof payload.callback_virtual_account_id === "string" &&
    typeof payload.external_id === "string";

  if (hasVaPayment) {
    externalId = payload.external_id as string;
    providerRef = payload.callback_virtual_account_id as string;
    eventType = "va.paid";
  } else if (
    payload.event === "qr.payment" &&
    (payload as Record<string, unknown>).status === "COMPLETED"
  ) {
    const qrCode = (payload as Record<string, unknown>).qr_code as
      | Record<string, unknown>
      | undefined;
    externalId =
      typeof qrCode?.external_id === "string" ? qrCode.external_id : undefined;
    providerRef =
      typeof qrCode?.id === "string" ? qrCode.id : undefined;
    eventType = "qris.paid";
  } else {
    return NextResponse.json({ message: "ignored" }, { status: 200 });
  }

  if (!externalId) {
    return NextResponse.json({ error: "Missing external_id" }, { status: 400 });
  }

  const payment = await prisma.orderPayment.findFirst({
    where: {
      OR: [{ id: externalId }, { providerRef: providerRef || externalId }],
    },
  });

  if (!payment) {
    return NextResponse.json(
      { error: "Payment not found" },
      { status: 404 }
    );
  }

  if (payment.status === "PAID") {
    return NextResponse.json({ message: "ok" }, { status: 200 });
  }

  await prisma.$transaction([
    prisma.orderPayment.update({
      where: { id: payment.id },
      data: { status: "PAID" },
    }),
    prisma.order.update({
      where: { id: payment.orderId },
      data: { status: "CONFIRMED" },
    }),
    prisma.xenditLog.create({
      data: {
        orderId: payment.orderId,
        event: eventType,
        response: payload as unknown as Prisma.InputJsonValue,
      },
    }),
  ]);

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
