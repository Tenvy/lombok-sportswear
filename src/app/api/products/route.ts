import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category"); // Single category slug
    const categories = searchParams.get("categories"); // Comma-separated category slugs
    const soldOut = searchParams.get("soldOut");
    const query = searchParams.get("query");

    const where: any = {};

    if (query) {
      where.OR = [
        { name: { contains: query } },
        { description: { contains: query } },
      ];
    }

    // Handle category filtering (single or multiple)
    if (categories) {
      // Multiple categories filter
      const categorySlugs = categories.split(",").map((c) => c.trim());
      where.productCategories = {
        some: {
          category: {
            slug: { in: categorySlugs },
          },
        },
      };
    } else if (category) {
      // Single category filter
      where.productCategories = {
        some: {
          category: {
            slug: category,
          },
        },
      };
    }

    if (soldOut === "false") {
      where.soldOut = false;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      products.map((product) => ({
        ...product,
        sizes: product.sizes ? JSON.parse(product.sizes) : [],
        categories: product.productCategories.map((pc) => pc.category),
      }))
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
