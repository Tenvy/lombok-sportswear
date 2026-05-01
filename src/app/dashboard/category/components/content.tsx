"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Package,
  CheckCircle,
  Clock,
  Tag,
} from "@phosphor-icons/react";
import { useCategoryStore } from "@/src/store/useCategoryStore";
import CategoryModal from "./modal";
import CategoriesTable, { Category } from "./table";
import { TableSkeleton, PageHeaderSkeleton, KpiCardSkeleton } from "../../components/loading-skeleton";

export default function CategoryContent() {
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const { categories, loading, pagination, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories({ page, limit });
  }, [fetchCategories, page, limit]);

  const tableCategories: Category[] = categories.map((cat) => ({
    id: cat.id,
    icon: Tag,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-500",
    name: cat.name,
    sub: "Category",
    slug: cat.slug,
    desc: "",
    products: cat._count?.productCategories ?? 0,
    status: "Active",
    created: cat.createdAt
      ? new Date(cat.createdAt).toLocaleDateString()
      : "",
    nameClass: "font-semibold",
  }));

  const totalCategories = categories.length;
  const totalProducts = categories.reduce(
    (sum, cat) => sum + (cat._count?.productCategories ?? 0),
    0
  );

  const kpis = [
    { icon: Tag, iconBg: "bg-gray-100", iconColor: "text-gray-600", badge: null, badgeColor: "", label: "Total Categories", value: String(totalCategories) },
    { icon: CheckCircle, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", badge: "100%", badgeColor: "text-emerald-600 bg-emerald-50", label: "Active", value: String(totalCategories), valueColor: "text-emerald-600" },
    { icon: Package, iconBg: "bg-sky-50", iconColor: "text-sky-600", badge: null, badgeColor: "", label: "Total Products", value: String(totalProducts) },
    { icon: Clock, iconBg: "bg-amber-50", iconColor: "text-amber-600", badge: null, badgeColor: "", label: "Last Updated", value: "2h ago" },
  ];

  return (
    <main className="flex-1 overflow-y-auto px-6 py-5">
      <CategoryModal
        key={editCategory?.id || "new"}
        open={showModal}
        category={editCategory ?? undefined}
        onClose={() => {
          setShowModal(false);
          setEditCategory(null);
        }}
      />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight">Category Management</h1>
          <p className="mt-0.5 text-[13px] text-gray-400">
            Organize and manage product categories. <span className="font-medium text-gray-600">{totalCategories} categories total</span>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditCategory(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-gray-800"
          >
            <Plus size={16} />
            Add Category
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${kpi.iconBg}`}>
                <kpi.icon size={20} className={kpi.iconColor} />
              </div>
              {kpi.badge && <span className={`rounded-md px-1.5 py-0.5 text-xs font-semibold ${kpi.badgeColor}`}>{kpi.badge}</span>}
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-gray-400">{kpi.label}</p>
            <p className={`mt-0.5 text-lg font-bold tracking-tight ${kpi.valueColor || ""}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <>
          <PageHeaderSkeleton />
          <div className="mb-6 grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <KpiCardSkeleton key={i} />
            ))}
          </div>
          <TableSkeleton />
        </>
      ) : (
        <CategoriesTable
          categories={tableCategories}
          page={pagination?.page ?? page}
          limit={pagination?.limit ?? limit}
          total={pagination?.total ?? categories.length}
          totalPages={pagination?.totalPages ?? 1}
          onPageChange={(p) => setPage(p)}
          onLimitChange={(l) => {
            setLimit(l);
            setPage(1);
          }}
          onEdit={(cat) => {
            setEditCategory(cat);
            setShowModal(true);
          }}
        />
      )}

    </main>
  );
}
