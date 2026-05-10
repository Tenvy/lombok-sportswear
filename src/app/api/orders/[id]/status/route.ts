import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        payments: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            status: true,
            expirationDate: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const latestPayment = order.payments[0];

    return NextResponse.json({
      status: order.status,
      paymentStatus: latestPayment?.status,
      expirationDate: latestPayment?.expirationDate?.toISOString(),
    });
  } catch (error) {
    console.error("Error fetching order status:", error);
    return NextResponse.json(
      { error: "Failed to fetch order status" },
      { status: 500 }
    );
  }
}
