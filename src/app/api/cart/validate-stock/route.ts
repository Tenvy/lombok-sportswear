import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body as {
      items: Array<{
        productId: string;
        name: string;
        size: string;
        color?: string;
        quantity: number;
      }>;
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Items array is required" },
        { status: 400 }
      );
    }

    const issues: Array<{
      name: string;
      size: string;
      color?: string;
      requested: number;
      available: number;
    }> = [];

    for (const item of items) {
      const variant = await prisma.variant.findFirst({
        where: {
          productId: item.productId,
          size: item.size,
          color: item.color ?? null,
        },
        select: { stock: true },
      });

      const availableStock = variant?.stock ?? 0;

      if (availableStock < item.quantity) {
        issues.push({
          name: item.name,
          size: item.size,
          color: item.color,
          requested: item.quantity,
          available: availableStock,
        });
      }
    }

    if (issues.length > 0) {
      return NextResponse.json({ ok: false, issues }, { status: 409 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/cart/validate-stock]", err);
    return NextResponse.json(
      { error: "Failed to validate stock" },
      { status: 500 }
    );
  }
}
