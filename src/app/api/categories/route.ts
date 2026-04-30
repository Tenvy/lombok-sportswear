import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : null;
    const limit = limitParam ? Math.max(1, parseInt(limitParam, 10)) : null;

    const include = {
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
    };

    if (page && limit) {
      const skip = (page - 1) * limit;

      const [categories, total] = await Promise.all([
        prisma.category.findMany({
          orderBy: { name: "asc" },
          include,
          skip,
          take: limit,
        }),
        prisma.category.count(),
      ]);

      const totalPages = Math.ceil(total / limit);
      const pagesLeft = Math.max(0, totalPages - page);

      return NextResponse.json({
        categories,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          pagesLeft,
        },
      });
    }

    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include,
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
