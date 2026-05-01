import { NextResponse } from "next/server";
import xenditClient from "@/src/lib/xendit";

export async function POST(req: Request) {
  try {
    const { amount, customerName, orderId, items } = await req.json();

    const invoice = await xenditClient.Invoice.createInvoice({
      data: {
        externalId: orderId,
        amount: amount,
        description: `Order ${orderId} - Lombok Sportswear`,
        customer: {
          givenNames: customerName || "Customer",
        },
        items: items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price + (item.customization?.servicePrice || 0),
        })),
        successRedirectUrl: `${process.env.NEXTAUTH_URL}/pos?success=true&orderId=${orderId}`,
        failureRedirectUrl: `${process.env.NEXTAUTH_URL}/pos?success=false`,
        currency: "IDR",
      },
    });

    return NextResponse.json({ invoiceUrl: invoice.invoiceUrl });
  } catch (error: any) {
    console.error("Xendit Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create invoice" },
      { status: 500 }
    );
  }
}
