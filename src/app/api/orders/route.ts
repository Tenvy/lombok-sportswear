import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      items,
      fullName,
      phone,
      address,
      city,
      province,
      postalCode,
      promoCode,
    } = body;

    if (!items || !items.length || !fullName || !phone || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: any) =>
        sum + (item.price + (item.customization?.servicePrice || 0)) * item.quantity,
      0
    );

    // Validate promo code
    let promo = null;
    let discount = 0;
    if (promoCode) {
      promo = await prisma.promoCode.findUnique({
        where: { code: promoCode },
      });

      if (!promo || !promo.active) {
        return NextResponse.json(
          { error: "Invalid promo code" },
          { status: 400 }
        );
      }

      if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
        return NextResponse.json(
          { error: "Promo code has expired" },
          { status: 400 }
        );
      }

      if (promo.maxUsage && promo.usedCount >= promo.maxUsage) {
        return NextResponse.json(
          { error: "Promo code usage limit reached" },
          { status: 400 }
        );
      }

      discount = Math.round(subtotal * (promo.discount / 100));
    }

    const shipping = 0; // Implement shipping calculation later
    const total = subtotal - discount + shipping;

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        fullName,
        phone,
        address,
        city,
        province,
        postalCode,
        promoCodeId: promo?.id,
        subtotal,
        shipping,
        total,
        status: "PENDING",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            image: item.image,
          })),
        },
      },
      include: {
        items: true,
        promoCode: true,
      },
    });

    // Update promo code usage
    if (promo) {
      await prisma.promoCode.update({
        where: { id: promo.id },
        data: { usedCount: promo.usedCount + 1 },
      });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
        promoCode: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
