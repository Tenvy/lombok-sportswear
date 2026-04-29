"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  List,
  LayoutGrid,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
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

interface Product {
  id: string;
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
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-semibold text-white">
            Out of Stock
          </span>
        )}
      </div>
      <p
        className={`mb-0.5 truncate text-[12px] font-semibold ${product.outOfStock ? "text-gray-400" : ""}`}
      >
        {product.name}
      </p>
      <p className="mb-1 text-[10px] text-gray-400">SKU: {product.sku}</p>
      <div className="mb-2 flex flex-wrap items-center gap-1">
        {(product.categories ?? []).map((cat) => (
          <span
            key={cat.name}
            className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${cat.color}`}
          >
            {cat.name}
          </span>
        ))}
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold ${product.statusColor}`}
        >
          {product.statusIcon}
          {product.status}
        </span>
      </div>
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`text-[12px] font-bold ${product.outOfStock ? "text-gray-400" : ""}`}
        >
          {product.price}
        </span>
        <span className={`text-[11px] font-bold ${product.stockColor}`}>
          Stock: {product.stock}
        </span>
      </div>
      <div className="flex items-center gap-1 border-t border-gray-100 pt-2">
        <button
          onClick={() => onEdit(product)}
          className="flex flex-1 items-center justify-center gap-1 rounded-md py-1.5 text-[11px] font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-black"
        >
          <Pencil className="text-[11px]" />
          Edit
        </button>
        <button
          onClick={() => onDelete(product)}
          className="flex flex-1 items-center justify-center gap-1 rounded-md py-1.5 text-[11px] font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-red-500"
        >
          <Trash2 className="text-[11px]" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default function ProductsTable({
  products,
}: {
  products: Product[];
}) {
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<string>("");
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  const allSelected = products.length > 0 && selectedIds.size === products.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const bulkConfig = {
    delete: { title: "Delete Products", desc: `Are you sure you want to delete ${selectedIds.size} selected products? This action cannot be undone.`, icon: Trash2, iconBg: "bg-red-50", iconColor: "text-red-500", btnLabel: "Delete", btnVariant: "destructive" as const },
    publish: { title: "Publish Products", desc: `Are you sure you want to publish ${selectedIds.size} selected products?`, icon: CheckCircle, iconBg: "bg-emerald-50", iconColor: "text-emerald-500", btnLabel: "Publish", btnVariant: "default" as const },
    unpublish: { title: "Unpublish Products", desc: `Are you sure you want to unpublish ${selectedIds.size} selected products?`, icon: AlertTriangle, iconBg: "bg-amber-50", iconColor: "text-amber-500", btnLabel: "Unpublish", btnVariant: "default" as const },
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-[12px] transition-colors focus:border-gray-400 focus:bg-white focus:outline-none"
              />
            </div>
            {bulkAction === "" ? (
              <select
                onChange={(e) => { if (e.target.value) setBulkAction(e.target.value); }}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-500 focus:border-gray-400 focus:outline-none"
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
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold text-white transition-colors ${
                    bulkAction === "delete"
                      ? "bg-red-600 hover:bg-red-700"
                      : bulkAction === "publish"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-gray-600 hover:bg-gray-700"
                  }`}
                >
                  {bulkAction === "delete" && <Trash2 className="text-[12px]" />}
                  {bulkAction === "publish" && <CheckCircle className="text-[12px]" />}
                  {bulkAction === "unpublish" && <AlertTriangle className="text-[12px]" />}
                  {bulkAction === "delete" && `Delete ${selectedIds.size} items`}
                  {bulkAction === "publish" && `Publish ${selectedIds.size} items`}
                  {bulkAction === "unpublish" && `Unpublish ${selectedIds.size} items`}
                </button>
                <button
                  onClick={() => setBulkAction("")}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-[12px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-[11px] text-gray-400">
              1–20 of 156
            </span>
            <div className="flex overflow-hidden rounded-lg border border-gray-200">
              <button
                onClick={() => setViewMode("list")}
                className={`${viewMode === "list" ? "bg-black text-white" : "text-gray-400 hover:text-black"} p-1.5 transition-colors`}
              >
                <List className="text-sm" />
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`${viewMode === "card" ? "bg-black text-white" : "text-gray-400 hover:text-black"} p-1.5 transition-colors`}
              >
                <LayoutGrid className="text-sm" />
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
                <th className="w-14 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                  Image
                </th>
                <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                  Product
                </th>
                <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                  Categories
                </th>
                <th className="w-[100px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                  Price
                </th>
                <th className="w-[70px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                  Stock
                </th>
                <th className="w-[90px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                  Status
                </th>
                <th className="w-[80px] pr-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${product.outOfStock ? "bg-red-50/30" : ""}`}
                >
                  <td className="px-4 py-2.5">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(product.id)}
                      onChange={() => toggleOne(product.id)}
                      className="h-3.5 w-3.5 rounded accent-black"
                    />
                  </td>
                  <td className="py-2.5">
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
                  <td className="py-2.5">
                    <a
                      id={product.id}
                      href="#"
                      className={`text-[12.5px] font-semibold hover:underline ${product.outOfStock ? "text-gray-400" : ""}`}
                    >
                      {product.name}
                    </a>
                    <p className="mt-0.5 text-[10px] text-gray-400">
                      SKU: {product.sku}
                    </p>
                  </td>
                  <td className="py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {(product.categories ?? []).map((cat) => (
                        <span
                          key={cat.name}
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cat.color}`}
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td
                    className={`py-2.5 text-[12px] font-semibold ${product.outOfStock ? "text-gray-400" : ""}`}
                  >
                    {product.price}
                  </td>
                  <td className="py-2.5">
                    <span className={`text-[12px] font-bold ${product.stockColor}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${product.statusColor}`}
                    >
                      {product.statusIcon}
                      {product.status}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditProduct(product)}
                        className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
                      >
                        <Pencil className="text-[11px]" />
                      </button>
                      <button
                        onClick={() => setDeleteProduct(product)}
                        className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500"
                      >
                        <Trash2 className="text-[11px]" />
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
            <span className="text-[11px] text-gray-400">Rows per page:</span>
            <select className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium focus:border-gray-400 focus:outline-none">
              <option>20</option>
              <option>10</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black">
              <ChevronLeft className="text-sm" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-[11px] font-bold text-white">
              1
            </button>
            {[2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black"
              >
                {n}
              </button>
            ))}
            <span className="px-0.5 text-[11px] text-gray-300">...</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black">
              8
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black">
              <ChevronRight className="text-sm" />
            </button>
            <div className="ml-3 flex items-center gap-1.5 border-l border-gray-200 pl-3">
              <span className="text-[11px] text-gray-400">Go to:</span>
              <input
                type="number"
                defaultValue={1}
                min={1}
                max={8}
                className="w-12 rounded border border-gray-200 px-2 py-1 text-center text-[11px] font-medium focus:border-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {editProduct && (
        <ProductEditModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}

      {deleteProduct && (
        <Dialog open onOpenChange={(open) => { if (!open) setDeleteProduct(null); }}>
          <DialogContent showCloseButton={false} className="sm:max-w-md">
            <DialogHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <AlertTriangle className="size-6 text-red-500" />
              </div>
              <DialogTitle className="text-center text-[15px] font-bold tracking-tight">
                Delete Product
              </DialogTitle>
              <DialogDescription className="text-center text-[12px] text-gray-500">
                Are you sure you want to delete <span className="font-semibold text-gray-700">{deleteProduct.name}</span>? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center gap-2">
              <DialogClose render={<Button variant="outline" size="sm" />}>
                Cancel
              </DialogClose>
              <Button variant="destructive" size="sm" onClick={() => setDeleteProduct(null)}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showBulkConfirm && bulkAction && (
        <Dialog open onOpenChange={(open) => { if (!open) setShowBulkConfirm(false); }}>
          <DialogContent showCloseButton={false} className="sm:max-w-md">
            <DialogHeader>
              <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${bulkConfig[bulkAction as keyof typeof bulkConfig].iconBg}`}>
                {(() => {
                  const Icon = bulkConfig[bulkAction as keyof typeof bulkConfig].icon;
                  return <Icon className={`size-6 ${bulkConfig[bulkAction as keyof typeof bulkConfig].iconColor}`} />;
                })()}
              </div>
              <DialogTitle className="text-center text-[15px] font-bold tracking-tight">
                {bulkConfig[bulkAction as keyof typeof bulkConfig].title}
              </DialogTitle>
              <DialogDescription className="text-center text-[12px] text-gray-500">
                {bulkConfig[bulkAction as keyof typeof bulkConfig].desc}
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center gap-2">
              <DialogClose render={<Button variant="outline" size="sm" />}>
                Cancel
              </DialogClose>
              <Button
                variant={bulkConfig[bulkAction as keyof typeof bulkConfig].btnVariant}
                size="sm"
                onClick={() => {
                  setSelectedIds(new Set());
                  setBulkAction("");
                  setShowBulkConfirm(false);
                }}
              >
                {bulkConfig[bulkAction as keyof typeof bulkConfig].btnLabel}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
