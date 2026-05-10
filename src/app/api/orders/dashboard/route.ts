import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import prisma from "@/src/lib/prisma";
import { Prisma } from "@/src/generated/prisma/client";

function capitalizeStatus(status: string): string {
  const map: Record<string, string> = {
    PENDING: "Pending",
    CONFIRMED: "Processing",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };
  return map[status] || status.charAt(0) + status.slice(1).toLowerCase();
}

function parseStatusFilter(statusParam: string | null): string[] | undefined {
  if (!statusParam || statusParam === "All") return undefined;
  const map: Record<string, string[]> = {
    Pending: ["PENDING"],
    Processing: ["CONFIRMED", "PROCESSING"],
    Shipped: ["SHIPPED"],
    Delivered: ["DELIVERED"],
    Cancelled: ["CANCELLED"],
  };
  return map[statusParam];
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "15", 10));
    const statusParam = searchParams.get("status");

    const statusFilter = parseStatusFilter(statusParam);
    const where: Prisma.OrderWhereInput = statusFilter
      ? { status: { in: statusFilter as Prisma.EnumOrderStatusFilter<"Order">["in"] } }
      : {};

    const [orders, total, statusCounts] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: true,
          payments: true,
          user: { select: { email: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where }),
      prisma.order.groupBy({
        by: ["status"],
        _count: { status: true },
      }),
    ]);

    const counts = Object.fromEntries(
      statusCounts.map((s) => [s.status, s._count.status])
    );

    const meta = {
      total,
      pending: counts["PENDING"] || 0,
      processing: (counts["CONFIRMED"] || 0) + (counts["PROCESSING"] || 0),
      shipped: counts["SHIPPED"] || 0,
      delivered: counts["DELIVERED"] || 0,
      cancelled: counts["CANCELLED"] || 0,
    };

    const mapped = orders.map((order) => ({
      id: order.id,
      customer: order.fullName,
      email: order.user?.email || "",
      items: `${order.items.length} ${order.items.length === 1 ? "item" : "items"}`,
      total: `Rp ${order.total.toLocaleString("id-ID")}`,
      payment: order.payments[0]?.method || "-",
      status: capitalizeStatus(order.status),
      date: new Date(order.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      }),
    }));

    return NextResponse.json({ orders: mapped, meta });
  } catch (err) {
    console.error("[GET /api/orders/dashboard]", err);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
