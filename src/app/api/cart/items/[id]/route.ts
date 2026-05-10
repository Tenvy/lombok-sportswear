import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getCartIdFromCookie } from "@/src/lib/cart-cookie";

async function ensureItemBelongsToCart(itemId: string): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const cartId = await getCartIdFromCookie();
  if (!cartId) return { ok: false, status: 401, error: "No cart" };
  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    select: { cartId: true },
  });
  if (!item) return { ok: false, status: 404, error: "Item not found" };
  if (item.cartId !== cartId) return { ok: false, status: 403, error: "Forbidden" };
  return { ok: true };
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: { quantity?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { quantity } = body;
  if (typeof quantity !== "number" || quantity < 1) {
    return NextResponse.json(
      { error: "Validation failed", fields: { quantity: "Must be >= 1" } },
      { status: 400 }
    );
  }

  const guard = await ensureItemBelongsToCart(id);
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });

  try {
    await prisma.cartItem.update({ where: { id }, data: { quantity } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PATCH /api/cart/items/:id]", err);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const guard = await ensureItemBelongsToCart(id);
  if (!guard.ok) return NextResponse.json({ error: guard.error }, { status: guard.status });

  try {
    await prisma.cartItem.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/cart/items/:id]", err);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
