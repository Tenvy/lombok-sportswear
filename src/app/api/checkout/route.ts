import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/src/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";
import {
  createVirtualAccount,
  createQris,
  PaymentProviderError,
} from "@/src/lib/xendit";

const checkoutSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  method: z.enum([
    "BCA_VA",
    "BNI_VA",
    "BRI_VA",
    "MANDIRI_VA",
    "PERMATA_VA",
    "QRIS",
  ]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        if (key) fields[key] = issue.message;
      }
      return NextResponse.json(
        { error: "Validation failed", fields },
        { status: 400 }
      );
    }

    const { orderId, method } = parsed.data;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "PENDING") {
      return NextResponse.json(
        { error: "Order is not pending", code: "ALREADY_PAID" },
        { status: 409 }
      );
    }

    const amount = order.total;
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const callbackUrl = `${process.env.NEXTAUTH_URL}/api/webhooks/xendit`;

    const payment = await prisma.orderPayment.create({
      data: {
        orderId,
        method,
        amount,
        status: "PENDING",
        expirationDate,
      },
    });

    if (method === "QRIS") {
      const qrisResponse = await createQris({
        external_id: payment.id,
        type: "DYNAMIC",
        callback_url: callbackUrl,
        amount,
      });

      await prisma.orderPayment.update({
        where: { id: payment.id },
        data: {
          providerRef: qrisResponse.id,
          providerResponse: qrisResponse as unknown as Prisma.InputJsonValue,
        },
      });

      return NextResponse.json({
        paymentId: payment.id,
        method,
        qrString: qrisResponse.qr_string,
        qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrisResponse.qr_string)}`,
        expirationDate: expirationDate.toISOString(),
        amount,
      });
    }

    const bankCode = method.replace("_VA", "");
    const vaResponse = await createVirtualAccount({
      external_id: payment.id,
      bank_code: bankCode,
      name: order.fullName.substring(0, 255) || "Customer",
      is_closed: true,
      expected_amount: amount,
      is_single_use: true,
      expiration_date: expirationDate.toISOString(),
    });

    await prisma.orderPayment.update({
      where: { id: payment.id },
      data: {
        providerRef: vaResponse.id,
        providerResponse: vaResponse as unknown as Prisma.InputJsonValue,
        expirationDate: new Date(vaResponse.expiration_date),
      },
    });

    return NextResponse.json({
      paymentId: payment.id,
      method,
      vaNumber: vaResponse.account_number,
      bankCode: vaResponse.bank_code,
      name: vaResponse.name,
      expirationDate: expirationDate.toISOString(),
      amount,
    });
  } catch (err) {
    if (err instanceof PaymentProviderError) {
      return NextResponse.json(
        { error: err.message, code: "PROVIDER_ERROR" },
        { status: 500 }
      );
    }

    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
