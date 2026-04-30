import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { extractR2KeyFromUrl, deleteFromR2 } from "@/src/lib/cloudflare/upload";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No ids provided" },
        { status: 400 }
      );
    }

    if (action === "delete") {
      const products = await prisma.product.findMany({
        where: { id: { in: ids } },
        select: { id: true, image: true, images: true },
      });

      await prisma.product.deleteMany({
        where: { id: { in: ids } },
      });

      const urlsToDelete: string[] = [];
      products.forEach((p) => {
        if (p.image) urlsToDelete.push(p.image);
        if (p.images) {
          try {
            const arr = JSON.parse(p.images);
            if (Array.isArray(arr)) urlsToDelete.push(...arr);
          } catch {}
        }
      });

      await Promise.all(
        urlsToDelete.map((url) => {
          const key = extractR2KeyFromUrl(url);
          return key ? deleteFromR2({ key }) : Promise.resolve();
        })
      );

      return NextResponse.json({ deleted: ids.length });
    }

    if (action === "publish") {
      await prisma.product.updateMany({
        where: { id: { in: ids } },
        data: { status: "PUBLISHED" },
      });
      return NextResponse.json({ updated: ids.length });
    }

    if (action === "unpublish") {
      await prisma.product.updateMany({
        where: { id: { in: ids } },
        data: { status: "DRAFT" },
      });
      return NextResponse.json({ updated: ids.length });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Bulk action error:", error);
    return NextResponse.json(
      { error: "Failed to process bulk action" },
      { status: 500 }
    );
  }
}
