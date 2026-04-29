import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        productCategories: {
          where: {
            product: {
              soldOut: false,
            },
          },
          include: {
            product: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: category.id,
      name: category.name,
      slug: category.slug,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      products: category.productCategories
        .map((pc) => pc.product)
        .filter((p) => p !== null)
        .map((product) => ({
          ...product,
          sizes: product.sizes ? JSON.parse(product.sizes) : [],
        })),
      _count: {
        products: category.productCategories.length,
      },
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}
