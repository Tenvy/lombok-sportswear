"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  MagnifyingGlass,
  Pencil,
  Trash,
  CaretLeft,
  CaretRight,
  List,
  SquaresFour,
  WarningCircle,
  CheckCircle,
  Eye,
  ArrowSquareOut,
  Package,
  Plus,
  X,
} from "@phosphor-icons/react";
import ProductEditModal from "./modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useProductStore } from "../../../../store/useProductStore";

interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  image: string;
  categories: Array<{ name: string; color: string }>;
  price: string;
  stock: number;
  stockColor: string;
  status: string;
  statusColor: string;
  statusIcon: React.ReactNode;
  outOfStock: boolean;
  variants: Array<{
    id: string;
    color: string | null;
    colorCode: string | null;
    size: string | null;
    stock: number;
  }>;
  images: string[];
}

function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:shadow-sm ${product.outOfStock ? "bg-red-50/30" : ""}`}
    >
      <div
        className={`relative mb-3 aspect-square overflow-hidden rounded-md bg-gray-100 ${product.outOfStock ? "opacity-50" : ""}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="200px"
          className="h-full w-full object-cover"
        />
        {product.outOfStock && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">
            Out of Stock
          </span>
        )}
      </div>
      <p
        className={`mb-0.5 truncate text-[13px] font-semibold ${product.outOfStock ? "text-gray-400" : ""}`}
      >
        {product.name}
      </p>
      <p className="mb-1 text-xs text-gray-400">SKU: {product.sku}</p>
      <div className="mb-2 flex flex-wrap items-center gap-1">
        {(product.categories ?? []).map((cat) => (
          <span
            key={cat.name}
            className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${cat.color}`}
          >
            {cat.name}
          </span>
        ))}
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold ${product.statusColor}`}
        >
          {product.statusIcon}
          {product.status}
        </span>
      </div>
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`text-[13px] font-bold ${product.outOfStock ? "text-gray-400" : ""}`}
        >
          {product.price}
        </span>
        <span className={`text-[13px] font-bold ${product.stockColor}`}>
          Stock: {product.stock}
        </span>
      </div>
      <div className="flex items-center gap-1 border-t border-gray-100 pt-2">
        <button
          onClick={() => onEdit(product)}
          className="flex flex-1 items-center justify-center gap-1 rounded-md py-1.5 text-[13px] font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-black"
        >
          <Pencil size={14} />
          Edit
        </button>
        <a
          href={`/product/${product.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1 rounded-md py-1.5 text-[13px] font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-black"
        >
          <ArrowSquareOut size={14} />
          Store
        </a>
        <button
          onClick={() => onDelete(product)}
          className="flex flex-1 items-center justify-center gap-1 rounded-md py-1.5 text-[13px] font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-red-500"
        >
          <Trash size={14} />
        </button>
      </div>
    </div>
  );
}

function getPageButtons(current: number, total: number): (number | string)[] {
  if (total <= 0) return [];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | string)[] = [1];
  if (current > 3) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export default function ProductsTable({
  products,
}: {
  products: Product[];
}) {
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [stockProduct, setStockProduct] = useState<Product | null>(null);
  const [variantRows, setVariantRows] = useState<Array<{ id?: string; color: string; colorCode: string; size: string; stock: number }>>([]);
  const [savingStock, setSavingStock] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<string>("");
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  const {
    page,
    limit,
    total,
    totalPages,
    search,
    fetchProducts,
    updateProduct,
    deleteProduct: removeProduct,
    bulkProducts,
  } = useProductStore();

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        fetchProducts({ page: 1, limit, search: searchInput });
      }
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, search, limit]);

  const allSelected = products.length > 0 && selectedIds.size === products.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const start = total > 0 ? (page - 1) * limit + 1 : 0;
  const end = Math.min(page * limit, total);

  const bulkConfig = {
    delete: { title: "Delete Products", desc: `Are you sure you want to delete ${selectedIds.size} selected products? This action cannot be undone.`, icon: Trash, iconBg: "bg-red-50", iconColor: "text-red-500", btnLabel: "Delete", btnVariant: "destructive" as const },
    publish: { title: "Publish Products", desc: `Are you sure you want to publish ${selectedIds.size} selected products?`, icon: CheckCircle, iconBg: "bg-emerald-50", iconColor: "text-emerald-500", btnLabel: "Publish", btnVariant: "default" as const },
    unpublish: { title: "Unpublish Products", desc: `Are you sure you want to unpublish ${selectedIds.size} selected products?`, icon: WarningCircle, iconBg: "bg-amber-50", iconColor: "text-amber-500", btnLabel: "Unpublish", btnVariant: "default" as const },
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(products.map((p) => p.id)));
    }
  };

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative max-w-xs flex-1">
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 h-9 pl-9 pr-3 text-sm transition-colors focus:border-gray-400 focus:bg-white focus:outline-none"
              />
            </div>
            {bulkAction === "" ? (
              <select
                onChange={(e) => { if (e.target.value) setBulkAction(e.target.value); }}
                className="rounded-lg border border-gray-200 bg-white px-3 h-9 text-[13px] text-gray-500 focus:border-gray-400 focus:outline-none"
              >
                <option value="">Bulk Actions{selectedIds.size > 0 ? ` (${selectedIds.size})` : ""}</option>
                <option value="delete">Delete Selected</option>
                <option value="publish">Publish Selected</option>
                <option value="unpublish">Unpublish Selected</option>
              </select>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBulkConfirm(true)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 h-9 text-[13px] font-semibold text-white transition-colors ${
                    bulkAction === "delete"
                      ? "bg-red-600 hover:bg-red-700"
                      : bulkAction === "publish"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-gray-600 hover:bg-gray-700"
                  }`}
                >
                  {bulkAction === "delete" && <Trash size={14} />}
                  {bulkAction === "publish" && <CheckCircle size={14} />}
                  {bulkAction === "unpublish" && <WarningCircle size={14} />}
                  {bulkAction === "delete" && `Delete ${selectedIds.size} items`}
                  {bulkAction === "publish" && `Publish ${selectedIds.size} items`}
                  {bulkAction === "unpublish" && `Unpublish ${selectedIds.size} items`}
                </button>
                <button
                  onClick={() => setBulkAction("")}
                  className="rounded-lg border border-gray-200 px-3 h-9 text-[13px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-[13px] text-gray-400">
              {start}–{end} of {total}
            </span>
            <div className="flex overflow-hidden rounded-lg border border-gray-200">
              <button
                onClick={() => setViewMode("list")}
                className={`${viewMode === "list" ? "bg-black text-white" : "text-gray-400 hover:text-black"} p-1.5 transition-colors`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`${viewMode === "card" ? "bg-black text-white" : "text-gray-400 hover:text-black"} p-1.5 transition-colors`}
              >
                <SquaresFour size={16} />
              </button>
            </div>
          </div>
        </div>

        {viewMode === "list" ? (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => { if (el) el.indeterminate = someSelected; }}
                    onChange={toggleAll}
                    className="h-3.5 w-3.5 rounded accent-black"
                  />
                </th>
                <th className="w-14 px-4 py-3 text-xs uppercase tracking-[0.05em] text-gray-400">
                  Image
                </th>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.05em] text-gray-400">
                  Product
                </th>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.05em] text-gray-400">
                  Categories
                </th>
                <th className="w-[100px] px-4 py-3 text-xs uppercase tracking-[0.05em] text-gray-400">
                  Price
                </th>
                <th className="w-[70px] px-4 py-3 text-xs uppercase tracking-[0.05em] text-gray-400">
                  Stock
                </th>
                <th className="w-[120px] px-4 py-3 text-xs uppercase tracking-[0.05em] text-gray-400 whitespace-nowrap">
                  Status
                </th>
                <th className="w-[80px] pr-4 px-4 py-3 text-right text-xs uppercase tracking-[0.05em] text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`border-b transition-colors ${product.outOfStock ? "border-red-100 bg-red-50/50 hover:bg-red-50/70" : "border-gray-50 hover:bg-gray-50"}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(product.id)}
                      onChange={() => toggleOne(product.id)}
                      className="h-3.5 w-3.5 rounded accent-black"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className={`h-10 w-10 overflow-hidden rounded-md bg-gray-100 ${product.outOfStock ? "opacity-50" : ""}`}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      id={product.id}
                      href="#"
                      className={`text-[13px] font-semibold hover:underline ${product.outOfStock ? "text-gray-400" : ""}`}
                    >
                      {product.name}
                    </a>
                    <p className="mt-0.5 text-xs text-gray-400">
                      SKU: {product.sku}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {(product.categories ?? []).map((cat) => (
                        <span
                          key={cat.name}
                          className={`rounded-md px-2 py-0.5 text-xs font-semibold ${cat.color}`}
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td
                    className={`px-4 py-3 text-[13px] font-semibold ${product.outOfStock ? "text-gray-400" : ""}`}
                  >
                    {product.price}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[13px] font-bold ${product.stockColor}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${product.statusColor}`}
                    >
                      {product.statusIcon}
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 pr-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-0.5">
                      <button
                        onClick={() => setPreviewProduct(product)}
                        title="Preview"
                        className="cursor-pointer rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setStockProduct(product);
                          setVariantRows(
                            product.variants.map((v) => ({
                              id: v.id,
                              color: v.color || "",
                              colorCode: v.colorCode || "",
                              size: v.size || "",
                              stock: v.stock,
                            }))
                          );
                        }}
                        title="Manage Variants"
                        className="cursor-pointer rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
                      >
                        <Package size={14} />
                      </button>
                      <a
                        href={`/product/${product.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View in Store"
                        className="cursor-pointer rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
                      >
                        <ArrowSquareOut size={14} />
                      </a>
                      <button
                        onClick={() => setEditProduct(product)}
                        title="Edit"
                        className="cursor-pointer rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteProduct(product)}
                        title="Delete"
                        className="cursor-pointer rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={setEditProduct}
                onDelete={setDeleteProduct}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-400">Rows per page:</span>
            <select
              value={limit}
              onChange={(e) => fetchProducts({ page: 1, limit: Number(e.target.value), search })}
              className="rounded border border-gray-200 bg-white px-2 py-1 text-[13px] font-medium focus:border-gray-400 focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => fetchProducts({ page: page - 1, limit, search })}
              disabled={page <= 1}
              className={`flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black ${page <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <CaretLeft size={14} />
            </button>
            {getPageButtons(page, totalPages).map((p, i) =>
              p === "..." ? (
                <span key={`dot-${i}`} className="px-0.5 text-[13px] text-gray-300">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => fetchProducts({ page: p as number, limit, search })}
                  className={`flex h-8 w-8 items-center justify-center rounded-md text-[13px] font-medium transition-colors ${
                    page === p
                      ? "bg-black text-white"
                      : "border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-black"
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => fetchProducts({ page: page + 1, limit, search })}
              disabled={page >= totalPages}
              className={`flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black ${page >= totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <CaretRight size={14} />
            </button>
            <div className="ml-3 flex items-center gap-1.5 border-l border-gray-200 pl-3">
              <span className="text-[13px] text-gray-400">Go to:</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = parseInt((e.target as HTMLInputElement).value, 10);
                    if (!isNaN(val) && val >= 1 && val <= totalPages) {
                      fetchProducts({ page: val, limit, search });
                    }
                  }
                }}
                className="w-12 rounded border border-gray-200 px-2 py-1 text-center text-[13px] font-medium focus:border-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <ProductEditModal
        key={editProduct?.id || "new"}
        open={!!editProduct}
        product={editProduct ?? undefined}
        onClose={() => setEditProduct(null)}
        onSubmit={updateProduct}
      />

      <Dialog open={!!deleteProduct} onOpenChange={(open) => { if (!open) { setDeleteProduct(null); setDeleting(false); } }}>
        <DialogContent showCloseButton={false} className="sm:max-w-lg">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <WarningCircle size={24} className="text-red-500" />
            </div>
            <DialogTitle className="text-center text-base font-bold tracking-tight">
              Delete Product
            </DialogTitle>
            <DialogDescription className="text-center text-[13px] text-gray-500">
              Are you sure you want to delete <span className="font-semibold text-gray-700">{deleteProduct?.name}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-2">
            <DialogClose render={<Button variant="outline" size="sm" disabled={deleting} />}>
              Cancel
            </DialogClose>
            <Button
              variant="destructive"
              size="sm"
              disabled={deleting}
              onClick={async () => {
                if (!deleteProduct) return;
                setDeleting(true);
                try {
                  await removeProduct(deleteProduct.id);
                  setDeleteProduct(null);
                } finally {
                  setDeleting(false);
                }
              }}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBulkConfirm && !!bulkAction} onOpenChange={(open) => { if (!open) setShowBulkConfirm(false); }}>
        <DialogContent showCloseButton={false} className="sm:max-w-lg">
          <DialogHeader>
            <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${bulkAction ? bulkConfig[bulkAction as keyof typeof bulkConfig].iconBg : ""}`}>
              {bulkAction && (() => {
                const Icon = bulkConfig[bulkAction as keyof typeof bulkConfig].icon;
                return <Icon size={24} className={bulkConfig[bulkAction as keyof typeof bulkConfig].iconColor} />;
              })()}
            </div>
            <DialogTitle className="text-center text-base font-bold tracking-tight">
              {bulkAction && bulkConfig[bulkAction as keyof typeof bulkConfig].title}
            </DialogTitle>
            <DialogDescription className="text-center text-[13px] text-gray-500">
              {bulkAction && bulkConfig[bulkAction as keyof typeof bulkConfig].desc}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-2">
            <DialogClose render={<Button variant="outline" size="sm" />}>
              Cancel
            </DialogClose>
            {bulkAction && (
              <Button
                variant={bulkConfig[bulkAction as keyof typeof bulkConfig].btnVariant}
                size="sm"
                onClick={async () => {
                  await bulkProducts(bulkAction, Array.from(selectedIds));
                  setSelectedIds(new Set());
                  setBulkAction("");
                  setShowBulkConfirm(false);
                }}
              >
                {bulkConfig[bulkAction as keyof typeof bulkConfig].btnLabel}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={!!previewProduct} onOpenChange={(open) => { if (!open) setPreviewProduct(null); }}>
        <DialogContent showCloseButton className="sm:max-w-lg p-0">
          {previewProduct && (
            <>
              <div className="border-b border-gray-200 px-6 py-4">
                <DialogTitle className="text-base font-bold tracking-tight">
                  {previewProduct.name}
                </DialogTitle>
                <p className="mt-0.5 text-xs text-gray-400">SKU: {previewProduct.sku}</p>
              </div>
              <div className="space-y-4 px-6 py-5">
                {/* Image + Info row */}
                <div className="flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image src={previewProduct.image} alt={previewProduct.name} width={80} height={80} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold">{previewProduct.price}</span>
                      <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${previewProduct.statusColor}`}>
                        {previewProduct.statusIcon}
                        {previewProduct.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(previewProduct.categories ?? []).map((cat) => (
                        <span key={cat.name} className={`rounded-md px-2 py-0.5 text-xs font-semibold ${cat.color}`}>
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stock overview */}
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Stock Overview</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[13px] text-gray-500">Total Stock</p>
                      <p className={`text-lg font-bold ${previewProduct.stockColor}`}>{previewProduct.stock}</p>
                    </div>
                    <div>
                      <p className="text-[13px] text-gray-500">Variants</p>
                      <p className="text-lg font-bold">{previewProduct.variants.length}</p>
                    </div>
                  </div>
                </div>

                {/* Variant list */}
                {previewProduct.variants.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Variants</p>
                    <div className="space-y-1">
                      {previewProduct.variants.map((v) => (
                        <div key={v.id} className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2">
                          <div className="flex items-center gap-2">
                            {v.colorCode && (
                              <span className="h-4 w-4 rounded-full border border-gray-200" style={{ backgroundColor: v.colorCode }} />
                            )}
                            <span className="text-[13px] font-medium">{v.color || "Default"}</span>
                            {v.size && (
                              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-500">{v.size}</span>
                            )}
                          </div>
                          <span className={`text-[13px] font-bold ${v.stock === 0 ? "text-red-500" : v.stock <= 10 ? "text-amber-600" : "text-gray-700"}`}>
                            {v.stock}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery images */}
                {previewProduct.images.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Gallery ({previewProduct.images.length})</p>
                    <div className="grid grid-cols-4 gap-2">
                      {previewProduct.images.map((img, i) => (
                        <div key={i} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                          <Image src={img} alt={`${previewProduct.name} ${i + 1}`} width={100} height={100} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Manage Variants Modal */}
      <Dialog open={!!stockProduct} onOpenChange={(open) => { if (!open) { setStockProduct(null); setVariantRows([]); } }}>
        <DialogContent showCloseButton={false} className="sm:max-w-2xl p-0 max-h-[90vh] overflow-y-auto">
          {stockProduct && (
            <>
              <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-base font-bold tracking-tight">
                      Manage Variants
                    </DialogTitle>
                    <p className="mt-0.5 text-[13px] text-gray-500">
                      {stockProduct.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setVariantRows((prev) => [...prev, { color: "", colorCode: "", size: "", stock: 0 }])}
                    className="flex items-center gap-1 rounded-lg bg-black px-3 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-gray-800"
                  >
                    <Plus size={14} />
                    Add Variant
                  </button>
                </div>
              </div>

              <div className="space-y-0">
                {/* Variant rows — full width table */}
                {variantRows.length > 0 ? (
                  <div className="overflow-hidden border-b border-gray-100">
                    <div className="grid grid-cols-[1fr_80px_48px_1fr_80px_32px] gap-2 border-b border-gray-200 bg-gray-50 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      <span>Color</span>
                      <span>Size</span>
                      <span>Pick</span>
                      <span>Hex Code</span>
                      <span>Stock</span>
                      <span />
                    </div>
                    <div className="divide-y divide-gray-50">
                      {variantRows.map((row, idx) => {
                        const hexVal = row.colorCode.startsWith("#") ? row.colorCode.slice(1) : row.colorCode;
                        return (
                          <div key={idx} className="grid grid-cols-[1fr_80px_48px_1fr_80px_32px] gap-2 items-center px-6 py-2.5">
                            <input
                              type="text"
                              value={row.color}
                              onChange={(e) => {
                                const next = [...variantRows];
                                next[idx] = { ...next[idx], color: e.target.value };
                                setVariantRows(next);
                              }}
                              placeholder="Black"
                              className="h-9 rounded-md border border-gray-200 px-2.5 text-[13px] focus:border-gray-400 focus:outline-none"
                            />
                            <input
                              type="text"
                              value={row.size}
                              onChange={(e) => {
                                const next = [...variantRows];
                                next[idx] = { ...next[idx], size: e.target.value };
                                setVariantRows(next);
                              }}
                              placeholder="L"
                              className="h-9 rounded-md border border-gray-200 px-2.5 text-[13px] focus:border-gray-400 focus:outline-none"
                            />
                            <input
                              type="color"
                              value={row.colorCode || "#000000"}
                              onChange={(e) => {
                                const next = [...variantRows];
                                next[idx] = { ...next[idx], colorCode: e.target.value };
                                setVariantRows(next);
                              }}
                              className="h-9 w-full cursor-pointer rounded-md border border-gray-200 p-1"
                            />
                            <div className="flex items-center gap-0">
                              <span className="flex h-9 items-center rounded-l-md border border-r-0 border-gray-200 bg-gray-50 px-2 text-[13px] font-medium text-gray-400">
                                #
                              </span>
                              <input
                                type="text"
                                value={hexVal}
                                maxLength={6}
                                onChange={(e) => {
                                  const raw = e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
                                  const next = [...variantRows];
                                  next[idx] = { ...next[idx], colorCode: raw ? `#${raw}` : "" };
                                  setVariantRows(next);
                                }}
                                placeholder="000000"
                                className="h-9 w-full rounded-r-md border border-gray-200 px-2.5 text-[13px] font-mono focus:border-gray-400 focus:outline-none"
                              />
                            </div>
                            <input
                              type="number"
                              min={0}
                              value={row.stock}
                              onChange={(e) => {
                                const next = [...variantRows];
                                next[idx] = { ...next[idx], stock: Math.max(0, parseInt(e.target.value) || 0) };
                                setVariantRows(next);
                              }}
                              className="h-9 rounded-md border border-gray-200 px-2 text-center text-[13px] font-semibold focus:border-gray-400 focus:outline-none"
                            />
                            <button
                              onClick={() => setVariantRows((prev) => prev.filter((_, i) => i !== idx))}
                              className="flex h-9 w-8 cursor-pointer items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="px-6 py-12 text-center">
                    <Package size={28} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-[13px] text-gray-400">No variants yet.</p>
                    <button
                      onClick={() => setVariantRows((prev) => [...prev, { color: "", colorCode: "", size: "", stock: 0 }])}
                      className="mt-2 text-[13px] font-semibold text-black hover:underline"
                    >
                      Add first variant
                    </button>
                  </div>
                )}

                {/* Summary — full width bottom bar */}
                {variantRows.length > 0 && (
                  <div className="flex items-center gap-6 border-b border-gray-200 bg-gray-50 px-6 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Variants</span>
                      <span className="text-sm font-bold">{variantRows.length}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Total Stock</span>
                      <span className="text-sm font-bold">{variantRows.reduce((a, v) => a + v.stock, 0)}</span>
                    </div>
                    {variantRows.some((v) => v.colorCode) && (
                      <>
                        <div className="h-4 w-px bg-gray-200" />
                        <div className="flex flex-wrap items-center gap-1.5">
                          {variantRows.map((v, i) =>
                            v.colorCode ? (
                              <div key={i} className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 pl-1">
                                <span className="h-3.5 w-3.5 flex-shrink-0 rounded-full border border-gray-200" style={{ backgroundColor: v.colorCode }} />
                                <span className="text-[13px] font-medium leading-none">{v.color || v.size || `Variant ${i + 1}`}</span>
                              </div>
                            ) : null
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
                {variantRows.some((v) => !v.color || !v.size) && (
                  <p className="text-xs text-amber-600">Fill all Color & Size fields to save.</p>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  <DialogClose render={<Button variant="outline" size="sm" disabled={savingStock} />}>
                    Cancel
                  </DialogClose>
                  <Button
                    size="sm"
                    disabled={savingStock || variantRows.length === 0 || variantRows.some((v) => !v.color || !v.size)}
                    onClick={async () => {
                      setSavingStock(true);
                      try {
                        await updateProduct({
                          id: stockProduct.id,
                          variants: variantRows.map((v) => ({
                            id: v.id,
                            color: v.color || null,
                            colorCode: v.colorCode || null,
                            size: v.size || null,
                            stock: v.stock,
                          })),
                        });
                        setStockProduct(null);
                        setVariantRows([]);
                      } catch {
                        // error handled by store
                      } finally {
                        setSavingStock(false);
                      }
                    }}
                  >
                    {savingStock ? "Saving..." : "Save Variants"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
