import { NextResponse } from "next/server";
import xenditClient from "@/src/lib/xendit";

export async function GET() {
  try {
    const testAmount = 10000;
    const testId = `test-${Date.now()}`;
    
    const response = await (xenditClient as any).PaymentRequest.createPaymentRequest({
      data: {
        amount: testAmount,
        currency: 'IDR',
        referenceId: testId,
        paymentMethod: {
          type: 'QR_CODE',
          qrCode: {
            channelCode: 'QRIS',
          },
          reusability: 'ONE_TIME_USE',
        },
      },
    });

    return NextResponse.json({ success: true, response });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      detail: error.response?.data || "No response data",
      status: error.response?.status
    }, { status: 500 });
  }
}
