import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getOrCreateCart } from "@/src/lib/cart-cookie";

type AddItemBody = {
  productId?: string;
  name?: string;
  price?: number;
  quantity?: number;
  size?: string;
  color?: string;
  image?: string;
  customization?: { serviceName: string; servicePrice: number } | null;
};

export async function POST(request: NextRequest) {
  let body: AddItemBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { productId, name, price, quantity, size, color, image, customization } = body;
  const fields: Record<string, string> = {};
  if (!productId || typeof productId !== "string") fields.productId = "Required";
  if (!name || typeof name !== "string") fields.name = "Required";
  if (typeof price !== "number" || price < 0) fields.price = "Must be positive number";
  if (typeof quantity !== "number" || quantity < 1) fields.quantity = "Must be >= 1";
  if (!size || typeof size !== "string") fields.size = "Required";
  if (!image || typeof image !== "string") fields.image = "Required";
  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ error: "Validation failed", fields }, { status: 400 });
  }

  const customizationName = customization?.serviceName ?? null;
  const customizationPrice = customization?.servicePrice ?? null;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId! },
      select: { id: true },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const { id: cartId } = await getOrCreateCart();

    const existing = await prisma.cartItem.findFirst({
      where: {
        cartId,
        productId: productId!,
        size: size!,
        color: color ?? null,
        customizationName,
      },
      select: { id: true, quantity: true },
    });

    const item = existing
      ? await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + quantity! },
        })
      : await prisma.cartItem.create({
          data: {
            cartId,
            productId: productId!,
            name: name!,
            price: price!,
            quantity: quantity!,
            size: size!,
            color: color ?? null,
            image: image!,
            customizationName,
            customizationPrice,
          },
        });

    return NextResponse.json({ ok: true, itemId: item.id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/cart/items]", err);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
