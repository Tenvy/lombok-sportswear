import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@lombok.com",
      name: "Super Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const cashier = await prisma.user.upsert({
    where: { username: "kasir1" },
    update: {},
    create: {
      username: "kasir1",
      name: "Kasir Toko 1",
      pin: "123456",
      role: "KASIR",
    },
  });

  const customizationServices = [
    { name: "PRINT DTF A3", price: 45000, sortOrder: 1 },
    { name: "PRINT DTF A4", price: 25000, sortOrder: 2 },
    { name: "SABLON POLYFLEX", price: 35000, sortOrder: 3 },
    { name: "BORDIR LOGO", price: 15000, sortOrder: 4 },
  ];

  for (const service of customizationServices) {
    await prisma.customizationService.upsert({
      where: { name: service.name },
      update: { price: service.price, sortOrder: service.sortOrder },
      create: service,
    });
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
