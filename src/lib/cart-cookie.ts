import { cookies } from "next/headers";
import { prisma } from "./prisma";

const CART_COOKIE = "cart_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function getCartIdFromCookie(): Promise<string | null> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value ?? null;
}

export async function getOrCreateCart(): Promise<{ id: string; created: boolean }> {
  const store = await cookies();
  const existing = store.get(CART_COOKIE)?.value;

  if (existing) {
    const cart = await prisma.cart.findUnique({ where: { id: existing }, select: { id: true } });
    if (cart) return { id: cart.id, created: false };
  }

  const cart = await prisma.cart.create({ data: {}, select: { id: true } });
  store.set(CART_COOKIE, cart.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return { id: cart.id, created: true };
}

export async function clearCartCookie(): Promise<void> {
  const store = await cookies();
  store.delete(CART_COOKIE);
}
