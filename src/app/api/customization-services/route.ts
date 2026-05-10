import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.customizationService.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching customization services:", error);
    return NextResponse.json(
      { error: "Failed to fetch customization services" },
      { status: 500 }
    );
  }
}
