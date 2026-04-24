import prisma from "../src/lib/prisma";

// Helper function to create slug from string
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  // Create Categories
  const menCategory = await prisma.category.upsert({
    where: { slug: "men" },
    update: {},
    create: {
      name: "Men",
      slug: "men",
    },
  });

  const womenCategory = await prisma.category.upsert({
    where: { slug: "women" },
    update: {},
    create: {
      name: "Women",
      slug: "women",
    },
  });

  const accessoriesCategory = await prisma.category.upsert({
    where: { slug: "accessories" },
    update: {},
    create: {
      name: "Accessories",
      slug: "accessories",
    },
  });

  const newInCategory = await prisma.category.upsert({
    where: { slug: "new-in" },
    update: {},
    create: {
      name: "New In",
      slug: "new-in",
    },
  });

  const saleCategory = await prisma.category.upsert({
    where: { slug: "sale" },
    update: {},
    create: {
      name: "Sale",
      slug: "sale",
    },
  });

  console.log(`Created categories: ${menCategory.name}, ${womenCategory.name}, ${accessoriesCategory.name}, ${newInCategory.name}, ${saleCategory.name}`);

  // Product data with slugs
  const productsData = [
    // Men Products
    {
      id: "p-m-1",
      name: "Classic Crew Tee",
      slug: "classic-crew-tee",
      description: "Classic crew neck tee made from premium cotton. Perfect for everyday wear.",
      price: 249000,
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=600&fit=crop",
      soldOut: false,
      sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
      categories: [menCategory.id, newInCategory.id],
    },
    {
      id: "p-m-2",
      name: "Training Polo",
      slug: "training-polo",
      description: "Performance polo shirt with moisture-wicking technology.",
      price: 199000,
      image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=500&h=600&fit=crop",
      soldOut: false,
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      categories: [menCategory.id],
    },
    {
      id: "p-m-3",
      name: "Essential Hoodie",
      slug: "essential-hoodie",
      description: "Comfortable hoodie with soft fleece lining.",
      price: 429000,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=600&fit=crop",
      soldOut: true,
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      categories: [menCategory.id, saleCategory.id],
    },
    {
      id: "p-m-4",
      name: "Sport Zip Jacket",
      slug: "sport-zip-jacket",
      description: "Lightweight zip jacket for active lifestyle.",
      price: 549000,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop",
      soldOut: false,
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      categories: [menCategory.id, newInCategory.id],
    },
    {
      id: "p-m-5",
      name: "Pullover Hoodie",
      slug: "pullover-hoodie",
      description: "Premium pullover hoodie with modern fit.",
      price: 389000,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
      soldOut: false,
      sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
      categories: [menCategory.id],
    },
    {
      id: "p-m-6",
      name: "Slim Jogger Pants",
      slug: "slim-jogger-pants",
      description: "Comfortable jogger pants with slim fit design.",
      price: 329000,
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=600&fit=crop",
      soldOut: false,
      sizes: JSON.stringify(["28", "30", "32", "34", "36"]),
      categories: [menCategory.id],
    },
    {
      id: "p-m-7",
      name: "Graphic Tee Bold",
      slug: "graphic-tee-bold",
      description: "Bold graphic tee for statement style.",
      price: 219000,
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=600&fit=crop",
      soldOut: false,
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      categories: [menCategory.id, newInCategory.id],
    },

    // Women Products
    {
      id: "p-w-1",
      name: "Sports Bra Pro",
      slug: "sports-bra-pro",
      description: "High-impact sports bra with superior support.",
      price: 179000,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=600&fit=crop",
      soldOut: false,
      sizes: JSON.stringify(["XS", "S", "M", "L", "XL"]),
      categories: [womenCategory.id, newInCategory.id],
    },
    {
      id: "p-w-2",
      name: "Yoga Leggings",
      slug: "yoga-leggings",
      description: "Stretchable leggings with moisture-wicking fabric.",
      price: 249000,
      image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=600&fit=crop",
      soldOut: false,
      sizes: JSON.stringify(["XS", "S", "M", "L"]),
      categories: [womenCategory.id],
    },
    {
      id: "p-w-3",
      name: "Crop Top Active",
      slug: "crop-top-active",
      description: "Breathable crop top for workouts and casual wear.",
      price: 159000,
      image: "https://images.unsplash.com/photo-1534531893917-0f9e14b4cbfb?w=500&h=600&fit=crop",
      soldOut: false,
      sizes: JSON.stringify(["XS", "S", "M", "L", "XL"]),
      categories: [womenCategory.id, newInCategory.id],
    },
    {
      id: "p-w-4",
      name: "Running Shorts",
      slug: "running-shorts",
      description: "Lightweight running shorts with inner lining.",
      price: 189000,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop",
      soldOut: false,
      sizes: JSON.stringify(["XS", "S", "M", "L"]),
      categories: [womenCategory.id],
    },
  ];

  // Create products and their category relations
  for (const productData of productsData) {
    const { categories, ...productFields } = productData;

    const product = await prisma.product.upsert({
      where: { id: productFields.id },
      update: {},
      create: productFields,
    });

    // Create category relationships
    for (const categoryId of categories) {
      await prisma.productCategory.upsert({
        where: {
          productId_categoryId: {
            productId: product.id,
            categoryId,
          },
        },
        update: {},
        create: {
          productId: product.id,
          categoryId,
        },
      });
    }
  }

  console.log(`Created ${productsData.length} products with category relationships`);

  // Create Promo Codes
  const promoCodes = await Promise.all([
    prisma.promoCode.upsert({
      where: { code: "WELCOME10" },
      update: {},
      create: {
        code: "WELCOME10",
        discount: 10,
        maxUsage: 100,
        usedCount: 0,
        active: true,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    }),
    prisma.promoCode.upsert({
      where: { code: "SUMMER20" },
      update: {},
      create: {
        code: "SUMMER20",
        discount: 20,
        maxUsage: 50,
        usedCount: 0,
        active: true,
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      },
    }),
  ]);

  console.log(`Created ${promoCodes.length} promo codes`);

  // Create Demo Users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "demo@lomboksportswear.com" },
      update: {},
      create: {
        email: "demo@lomboksportswear.com",
        name: "Demo User",
        phone: "+62 812 3456 7890",
      },
    }),
    prisma.user.upsert({
      where: { email: "admin@lomboksportswear.com" },
      update: {},
      create: {
        email: "admin@lomboksportswear.com",
        name: "Admin User",
        phone: "+62 812 3456 7891",
      },
    }),
  ]);

  console.log(`Created ${users.length} demo users`);

  console.log("✅ Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Error seeding database:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
