import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getServerAuthSession } from "@/src/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerAuthSession();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
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

    const subtotal = items.reduce(
      (sum: number, item: { price: number; customization?: { servicePrice?: number }; quantity: number }) =>
        sum + (item.price + (item.customization?.servicePrice || 0)) * item.quantity,
      0
    );

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

    const shipping = 0;
    const total = subtotal - discount + shipping;

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
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
          create: items.map((item: { id: string; name: string; price: number; quantity: number; size: string; color?: string; image: string }) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.image,
          })),
        },
      },
      include: {
        items: true,
        promoCode: true,
      },
    });

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

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerAuthSession();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
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
