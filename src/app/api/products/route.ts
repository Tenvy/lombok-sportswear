import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { moveInR2, extractR2KeyFromUrl, deleteFromR2 } from "@/src/lib/cloudflare/upload";

async function moveTempImage(url: string | undefined, prefix: string): Promise<string | undefined> {
  if (!url) return undefined;
  const key = extractR2KeyFromUrl(url);
  if (!key || !key.startsWith("temp/")) return url;
  const fileName = key.split("/").pop();
  const permanentKey = `${prefix}/${fileName}`;
  return moveInR2(key, permanentKey);
}

function enrichProduct(product: any) {
  const variants = product.variants || [];
  const sizes = [...new Set(variants.map((v: any) => v.size).filter(Boolean))];
  const stock = variants.reduce((sum: number, v: any) => sum + v.stock, 0);
  const soldOut = variants.length === 0 || variants.every((v: any) => v.stock === 0);
  let images: string[] = [];
  if (product.images) {
    try { images = JSON.parse(product.images); } catch { images = []; }
  }
  return {
    ...product,
    sizes,
    stock,
    soldOut,
    images,
    categories: product.productCategories.map((pc: any) => pc.category),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      name,
      description,
      price,
      image,
      images,
      status,
      categoryIds,
      categoryNames,
      variants,
    } = body;

    if (!name || price == null || !image) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, image" },
        { status: 400 }
      );
    }

    const finalSlug = slug || name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const imagePrefix = `products/${finalSlug}`;

    const statusMap: Record<string, string> = {
      Published: "PUBLISHED",
      Draft: "DRAFT",
      "Out of Stock": "DRAFT",
    };
    const prismaStatus = (statusMap[status] || status || "PUBLISHED") as "PUBLISHED" | "DRAFT";

    let connectCategories: { category: { connect: { id: string } } }[] | undefined;
    if (categoryIds?.length) {
      connectCategories = categoryIds.map((categoryId: string) => ({
        category: { connect: { id: categoryId } },
      }));
    } else if (categoryNames?.length) {
      const cats = await prisma.category.findMany({
        where: { name: { in: categoryNames } },
        select: { id: true },
      });
      connectCategories = cats.map((c) => ({
        category: { connect: { id: c.id } },
      }));
    }

    const product = await prisma.product.create({
      data: {
        slug: finalSlug,
        name,
        description,
        price: parseInt(price, 10),
        image,
        images: Array.isArray(images) ? JSON.stringify(images) : null,
        status: prismaStatus,
        productCategories: connectCategories?.length
          ? { create: connectCategories }
          : undefined,
        variants: {
          create: variants?.map((v: any) => ({
            color: v.color,
            colorCode: v.colorCode,
            size: v.size,
            stock: parseInt(v.stock, 10) ?? 0,
          })) || [],
        },
      },
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        variants: true,
      },
    });

    const movedImage = await moveTempImage(product.image, imagePrefix);
    const movedImages = product.images
      ? await Promise.all(
          JSON.parse(product.images).map((url: string) => moveTempImage(url, imagePrefix))
        )
      : undefined;

    let finalProduct = product;
    if (
      (movedImage && movedImage !== product.image) ||
      movedImages !== undefined
    ) {
      finalProduct = await prisma.product.update({
        where: { id: product.id },
        data: {
          ...(movedImage && movedImage !== product.image ? { image: movedImage } : {}),
          ...(movedImages !== undefined
            ? { images: movedImages ? JSON.stringify(movedImages) : null }
            : {}),
        },
        include: {
          productCategories: {
            include: {
              category: true,
            },
          },
          variants: true,
        },
      });
    }

    return NextResponse.json(enrichProduct(finalProduct), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, id: productId } = body;

    if (!slug && !productId) {
      return NextResponse.json(
        { error: "Missing identifier: slug or id" },
        { status: 400 }
      );
    }

    const existing = await prisma.product.findFirst({
      where: {
        OR: [
          ...(slug ? [{ slug }] : []),
          ...(productId ? [{ id: productId }] : []),
        ],
      },
      include: { productCategories: true, variants: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const {
      name,
      description,
      price,
      image,
      images,
      status,
      categoryIds,
      categoryNames,
      variants: newVariants,
    } = body;

    const imagePrefix = `products/${existing.slug}`;

    const statusMap: Record<string, string> = {
      Published: "PUBLISHED",
      Draft: "DRAFT",
      "Out of Stock": "DRAFT",
    };

    const updateData: any = {
      name: name ?? existing.name,
      description: description !== undefined ? description : existing.description,
      price: price !== undefined ? parseInt(price, 10) : existing.price,
      status: status !== undefined
        ? (statusMap[status] || status || "PUBLISHED")
        : existing.status,
    };

    if (categoryIds !== undefined) {
      updateData.productCategories = {
        deleteMany: {},
        create: categoryIds.map((id: string) => ({
          category: { connect: { id } },
        })),
      };
    } else if (categoryNames !== undefined) {
      const cats = await prisma.category.findMany({
        where: { name: { in: categoryNames } },
        select: { id: true },
      });
      updateData.productCategories = {
        deleteMany: {},
        create: cats.map((c) => ({
          category: { connect: { id: c.id } },
        })),
      };
    }

    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: existing.id },
        data: updateData,
      });

      if (newVariants !== undefined) {
        const incomingIds = newVariants.map((v: any) => v.id).filter(Boolean);
        if (incomingIds.length > 0) {
          await tx.variant.deleteMany({
            where: { productId: existing.id, id: { notIn: incomingIds } },
          });
        } else {
          await tx.variant.deleteMany({ where: { productId: existing.id } });
        }

        for (const v of newVariants) {
          const stock =
            typeof v.stock === "string" ? parseInt(v.stock, 10) : (v.stock ?? 0);
          if (v.id) {
            await tx.variant.update({
              where: { id: v.id },
              data: {
                color: v.color,
                colorCode: v.colorCode,
                size: v.size,
                stock,
              },
            });
          } else {
            await tx.variant.create({
              data: {
                productId: existing.id,
                color: v.color,
                colorCode: v.colorCode,
                size: v.size,
                stock,
              },
            });
          }
        }
      }
    });

    // Move new images to permanent after DB succeeds
    let finalImage = existing.image;
    let finalImages = existing.images;

    if (image !== undefined) {
      const movedImage = await moveTempImage(image, imagePrefix);
      if (movedImage && movedImage !== existing.image) {
        finalImage = movedImage;
      }
    }

    if (images !== undefined) {
      const movedImages = Array.isArray(images)
        ? await Promise.all(images.map((url: string) => moveTempImage(url, imagePrefix)))
        : images;
      finalImages = movedImages !== undefined
        ? (movedImages ? JSON.stringify(movedImages) : null)
        : existing.images;
    }

    if (finalImage !== existing.image || finalImages !== existing.images) {
      await prisma.product.update({
        where: { id: existing.id },
        data: { image: finalImage, images: finalImages },
      });
    }

    // Delete old images from R2 only after DB is updated
    if (image !== undefined && finalImage !== existing.image && existing.image) {
      const oldKey = extractR2KeyFromUrl(existing.image);
      if (oldKey) await deleteFromR2({ key: oldKey });
    }

    if (images !== undefined) {
      const oldImages = existing.images ? JSON.parse(existing.images) : [];
      const newImages = finalImages ? JSON.parse(finalImages) : [];
      const removed = oldImages.filter((url: string) => !newImages.includes(url));
      await Promise.all(
        removed.map((url: string) => {
          const key = extractR2KeyFromUrl(url);
          return key ? deleteFromR2({ key }) : Promise.resolve();
        })
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: existing.id },
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        variants: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found after update" },
        { status: 404 }
      );
    }

    return NextResponse.json(enrichProduct(product));
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json(
        { error: "Missing identifier: id or slug" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findFirst({
      where: {
        OR: [
          ...(id ? [{ id }] : []),
          ...(slug ? [{ slug }] : []),
        ],
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const imageUrls: string[] = [];
    if (product.image) imageUrls.push(product.image);
    if (product.images) {
      try {
        const gallery = JSON.parse(product.images);
        if (Array.isArray(gallery)) imageUrls.push(...gallery);
      } catch {
        // ignore
      }
    }

    await prisma.product.delete({ where: { id: product.id } });

    await Promise.all(
      imageUrls.map((url) => {
        const key = extractR2KeyFromUrl(url);
        return key ? deleteFromR2({ key }) : Promise.resolve();
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const product = await prisma.product.findFirst({
        where: {
          OR: [{ slug: id }, { id }],
        },
        include: {
          productCategories: {
            include: {
              category: true,
            },
          },
          variants: true,
        },
      });

      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(enrichProduct(product));
    }

    const category = searchParams.get("category");
    const categories = searchParams.get("categories");
    const categoryNames = searchParams.get("categoryNames");
    const stockStatuses = searchParams.get("stockStatuses");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const statuses = searchParams.get("statuses");
    const soldOut = searchParams.get("soldOut");
    const query = searchParams.get("query");
    const search = searchParams.get("search");
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const andConditions: any[] = [];

    if (query) {
      andConditions.push({
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      });
    }

    if (search) {
      andConditions.push({ name: { contains: search } });
    }

    if (categories) {
      const categorySlugs = categories.split(",").map((c) => c.trim());
      andConditions.push({
        productCategories: {
          some: {
            category: {
              slug: { in: categorySlugs },
            },
          },
        },
      });
    } else if (category) {
      andConditions.push({
        productCategories: {
          some: {
            category: {
              slug: category,
            },
          },
        },
      });
    }

    if (categoryNames) {
      const names = categoryNames.split(",").map((c) => c.trim());
      andConditions.push({
        productCategories: {
          some: {
            category: {
              name: { in: names },
            },
          },
        },
      });
    }

    if (minPrice != null || maxPrice != null) {
      const priceCond: any = {};
      if (minPrice != null) priceCond.gte = parseInt(minPrice, 10);
      if (maxPrice != null) priceCond.lte = parseInt(maxPrice, 10);
      andConditions.push({ price: priceCond });
    }

    if (stockStatuses) {
      const statusesList = stockStatuses.split(",");
      const stockOr: any[] = [];
      if (statusesList.includes("out_of_stock")) {
        stockOr.push({ variants: { none: { stock: { gt: 0 } } } });
      }
      if (statusesList.includes("low_stock")) {
        stockOr.push({ variants: { some: { stock: { gt: 0, lte: 10 } } } });
      }
      if (statusesList.includes("in_stock")) {
        stockOr.push({ variants: { some: { stock: { gt: 10 } } } });
      }
      if (stockOr.length > 0) {
        andConditions.push({ OR: stockOr });
      }
    }

    if (statuses) {
      andConditions.push({ status: { in: statuses.split(",") } });
    }

    if (soldOut === "false") {
      andConditions.push({ variants: { some: { stock: { gt: 0 } } } });
    } else if (soldOut === "true") {
      andConditions.push({ variants: { none: { stock: { gt: 0 } } } });
    }

    const where = andConditions.length > 0 ? { AND: andConditions } : {};

    const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : null;
    const limit = limitParam ? Math.max(1, parseInt(limitParam, 10)) : null;

    if (page && limit) {
      const skip = (page - 1) * limit;

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            productCategories: {
              include: {
                category: true,
              },
            },
            variants: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip,
          take: limit,
        }),
        prisma.product.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);
      const pagesLeft = Math.max(0, totalPages - page);

      return NextResponse.json({
        products: products.map(enrichProduct),
        pagination: {
          page,
          limit,
          total,
          totalPages,
          pagesLeft,
        },
      });
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        productCategories: {
          include: {
            category: true,
          },
        },
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products.map(enrichProduct));
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
