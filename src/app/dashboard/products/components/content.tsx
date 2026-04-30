"use client";

import {
  Download,
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
  CircleCheck,
  CircleX,
  Plus,
} from "lucide-react";
import ProductsTable from "./table";
import ProductFilter from "./filter";
import ProductEditModal from "./modal";
import ExportModal from "./exportModal";
import { useState } from "react";
import { useProductStore } from "../../../../store/useProductStore";

interface StoreProduct {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  image: string;
  images: string[];
  soldOut: boolean;
  stock: number;
  status: string;
  sizes: string[];
  variants: Array<{
    id: string;
    color: string | null;
    colorCode: string | null;
    size: string | null;
    stock: number;
  }>;
  categories: Array<{ id: string; name: string; slug: string }>;
}

const categoryColorMap: Record<string, string> = {
  Men: "bg-gray-100 text-gray-600",
  Women: "bg-pink-50 text-pink-600",
  Tops: "bg-blue-50 text-blue-600",
  Bottoms: "bg-gray-100 text-gray-600",
  Outerwear: "bg-gray-100 text-gray-600",
  Hoodie: "bg-purple-50 text-purple-600",
  Jacket: "bg-indigo-50 text-indigo-600",
  Pants: "bg-teal-50 text-teal-600",
  "T-Shirt": "bg-blue-50 text-blue-600",
  Polo: "bg-gray-100 text-gray-600",
  Accessories: "bg-amber-50 text-amber-600",
};

function mapToDisplayProduct(p: StoreProduct) {
  const stock = p.stock;
  let status: string;
  let statusColor: string;
  let statusIcon: React.ReactNode;

  if (stock === 0) {
    status = "Out of Stock";
    statusColor = "text-red-600 bg-red-50";
    statusIcon = <CircleX className="text-[10px]" />;
  } else if (p.status === "DRAFT") {
    status = "Draft";
    statusColor = "text-gray-600 bg-gray-100";
    statusIcon = <CircleCheck className="text-[10px]" />;
  } else {
    status = "Published";
    statusColor = "text-emerald-700 bg-emerald-50";
    statusIcon = <CircleCheck className="text-[10px]" />;
  }

  const stockColor =
    stock === 0 ? "text-red-500" : stock <= 10 ? "text-amber-500" : "text-emerald-600";

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    sku: p.slug.toUpperCase(),
    image: p.image,
    categories: p.categories.map((c) => ({
      name: c.name,
      color: categoryColorMap[c.name] || "bg-gray-100 text-gray-600",
    })),
    price: `Rp ${p.price.toLocaleString("id-ID")}`,
    stock,
    stockColor,
    status,
    statusColor,
    statusIcon,
    outOfStock: stock === 0,
    variants: p.variants,
    images: p.images,
  };
}

export default function ProductsContent({
  products,
  loading,
  error,
}: {
  products: StoreProduct[];
  loading: boolean;
  error: string | null;
}) {
  const { total, createProduct } = useProductStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const displayProducts = products.map(mapToDisplayProduct);

  return (
    <div className="flex-1 p-6">
      <ProductEditModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={createProduct}
      />
      <ExportModal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Products</h1>
          <p className="mt-0.5 text-[12px] text-gray-400">
            Manage your product catalog, inventory, and pricing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-[12px] font-semibold transition-colors hover:border-gray-400"
          >
            <Download className="text-sm" />
            Export
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-black px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-gray-800"
          >
            <Plus className="text-sm" />
            Add Product
          </button>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-4 gap-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
              Total Products
            </span>
            <Package className="text-lg text-gray-300" />
          </div>
          <p className="text-2xl font-bold tracking-tight">{total}</p>
          <p className="mt-1 text-[11px] font-medium text-emerald-600">
            +8 this month
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
              Published
            </span>
            <CheckCircle className="text-lg text-gray-300" />
          </div>
          <p className="text-2xl font-bold tracking-tight">
            {displayProducts.filter((p) => p.status === "Published").length}
          </p>
          <p className="mt-1 text-[11px] font-medium text-gray-400">
            {products.length
              ? `${((displayProducts.filter((p) => p.status === "Published").length / products.length) * 100).toFixed(1)}% of total`
              : "0% of total"}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
              Low Stock
            </span>
            <AlertTriangle className="text-lg text-gray-300" />
          </div>
          <p className="text-2xl font-bold tracking-tight text-amber-600">
            {displayProducts.filter((p) => p.stock > 0 && p.stock <= 10).length}
          </p>
          <p className="mt-1 text-[11px] font-medium text-amber-600">
            Needs restock
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
              Out of Stock
            </span>
            <XCircle className="text-lg text-gray-300" />
          </div>
          <p className="text-2xl font-bold tracking-tight text-red-500">
            {displayProducts.filter((p) => p.outOfStock).length}
          </p>
          <p className="mt-1 text-[11px] font-medium text-red-500">
            Action required
          </p>
        </div>
      </div>

      {loading && (
        <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 text-center text-[12px] text-gray-400">
          Loading products...
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-center text-[12px] text-red-500">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <div className="min-w-0 flex-1">
          <ProductsTable products={displayProducts} />
        </div>

        <ProductFilter />
      </div>
    </div>
  );
}
