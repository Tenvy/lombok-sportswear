import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: {
          select: { productCategories: true },
        },
        productCategories: {
          take: 1,
          include: {
            product: {
              select: {
                image: true,
              },
            },
          },  
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
