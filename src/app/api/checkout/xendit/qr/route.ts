import { NextResponse } from "next/server";
import xenditClient from "@/src/lib/xendit";

export async function POST(req: Request) {
  try {
    const { amount, orderId } = await req.json();

    // Ensure referenceId is unique
    const uniqueReferenceId = `${orderId}-${Date.now()}`;

    // In xendit-node v7, QRIS is created via PaymentRequest
    const response = await (xenditClient as any).PaymentRequest.createPaymentRequest({
      data: {
        amount: Math.round(amount),
        currency: 'IDR',
        referenceId: uniqueReferenceId,
        paymentMethod: {
          type: 'QR_CODE',
          qrCode: {
            channelCode: 'QRIS',
          },
          reusability: 'ONE_TIME_USE',
        },
      },
    });

    // Correct path in v7 for the QR string
    const qrString = response.paymentMethod?.qrCode?.channelProperties?.qrString;

    if (!qrString) {
      console.error("Xendit Response structure unexpected:", JSON.stringify(response, null, 2));
      throw new Error("QR String not found in Xendit response structure.");
    }

    return NextResponse.json({ qrString });
  } catch (error: any) {
    console.error("Xendit PaymentRequest Error:", error);
    
    const errorMessage = error.response?.data?.message || error.message || "Failed to generate QRIS";
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
