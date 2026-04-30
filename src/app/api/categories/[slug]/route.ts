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
          include: {
            product: {
              include: {
                variants: true,
              },
            },
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

    const products = category.productCategories
      .map((pc) => pc.product)
      .filter((p) => p !== null)
      .filter((product) => {
        const variants = product.variants || [];
        return variants.some((v) => v.stock > 0);
      })
      .map((product) => {
        const variants = product.variants || [];
        const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];
        return {
          ...product,
          sizes,
        };
      });

    return NextResponse.json({
      id: category.id,
      name: category.name,
      slug: category.slug,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      products,
      _count: {
        products: products.length,
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
