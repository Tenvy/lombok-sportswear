import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import {
  simulateVirtualAccountPayment,
  simulateQrisPayment,
  PaymentProviderError,
} from "@/src/lib/xendit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId } = body as { paymentId?: string };

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    const payment = await prisma.orderPayment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    if (payment.status !== "PENDING") {
      return NextResponse.json(
        { error: "Payment is not pending" },
        { status: 409 }
      );
    }

    const isDev = (process.env.XENDIT_SECRET_KEY || "").startsWith(
      "xnd_development_"
    );
    if (!isDev) {
      return NextResponse.json(
        { error: "Simulation only available in test mode" },
        { status: 403 }
      );
    }

    if (payment.method === "QRIS") {
      await simulateQrisPayment(payment.id, payment.amount);
    } else {
      await simulateVirtualAccountPayment(payment.id, payment.amount);
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
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof PaymentProviderError) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    console.error("[POST /api/checkout/simulate]", err);
    return NextResponse.json(
      { error: "Simulation failed" },
      { status: 500 }
    );
  }
}
