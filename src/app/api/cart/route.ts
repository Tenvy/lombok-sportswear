import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getCartIdFromCookie, getOrCreateCart, clearCartCookie } from "@/src/lib/cart-cookie";

type SerializedCartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color?: string;
  image: string;
  customization?: { serviceName: string; servicePrice: number };
};

type SerializedCart = {
  id: string;
  items: SerializedCartItem[];
  totalItems: number;
  subtotal: number;
};

function serializeCart(
  cart: { id: string; items: Array<{
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string | null;
    image: string;
    customizationName: string | null;
    customizationPrice: number | null;
  }> }
): SerializedCart {
  const items: SerializedCartItem[] = cart.items.map((item) => ({
    id: item.id,
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    size: item.size,
    color: item.color ?? undefined,
    image: item.image,
    customization:
      item.customizationName && item.customizationPrice !== null
        ? { serviceName: item.customizationName, servicePrice: item.customizationPrice }
        : undefined,
  }));
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce(
    (acc, i) => acc + (i.price + (i.customization?.servicePrice ?? 0)) * i.quantity,
    0
  );
  return { id: cart.id, items, totalItems, subtotal };
}

export async function GET() {
  try {
    const { id } = await getOrCreateCart();
    const cart = await prisma.cart.findUnique({
      where: { id },
      include: { items: { orderBy: { createdAt: "asc" } } },
    });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    return NextResponse.json(serializeCart(cart));
  } catch (err) {
    console.error("[GET /api/cart]", err);
    return NextResponse.json({ error: "Failed to load cart" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cartId = await getCartIdFromCookie();
    if (!cartId) {
      return NextResponse.json({ ok: true });
    }
    await prisma.cartItem.deleteMany({ where: { cartId } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/cart]", err);
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }
}
