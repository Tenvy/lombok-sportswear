"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Plus, Trash2 } from "lucide-react";
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

export default function ProductEditModal({
  product,
  onClose,
}: {
  product?: Product;
  onClose: () => void;
}) {
  const allCategories = [
    "Men", "Women", "Tops", "Bottoms", "Outerwear", "Hoodie", "Jacket",
    "Pants", "T-Shirt", "Polo", "Accessories",
  ];

  const isEdit = !!product;

  const [formData, setFormData] = useState({
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    price: product?.price.replace("Rp ", "").replace(/\./g, "") ?? "",
    categories: (product?.categories ?? []).map((c) => c.name),
    stock: product?.stock.toString() ?? "0",
    status: product?.status ?? "Draft",
    description: "",
  });

  const toggleCategory = (cat: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const [sizeVariants, setSizeVariants] = useState([
    { size: "S", stock: "12", enabled: true },
    { size: "M", stock: "18", enabled: true },
    { size: "L", stock: "14", enabled: true },
    { size: "XL", stock: "8", enabled: true },
    { size: "2XL", stock: "4", enabled: false },
  ]);

  const [colorVariants, setColorVariants] = useState([
    { name: "Black", hex: "#000000", enabled: true },
    { name: "White", hex: "#FFFFFF", enabled: true },
    { name: "Gray", hex: "#6B7280", enabled: false },
  ]);

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        showCloseButton={false}
        className="top-[5%] max-h-[90vh] -translate-y-0 sm:max-w-3xl overflow-y-auto rounded-lg p-0"
      >
        <DialogHeader className="border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-[14px] font-bold tracking-tight">
            {isEdit ? "Edit Product" : "Create Product"}
          </DialogTitle>
          <DialogDescription className="mt-0.5 text-[11px] text-gray-400">
            {isEdit ? "Update product information, variants, and pricing." : "Add a new product to your catalog."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                SKU
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
              />
            </div>

            <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((cat) => (
                    <label
                      key={cat}
                      className="group flex cursor-pointer items-center gap-1.5"
                    >
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="h-3.5 w-3.5 rounded accent-black"
                      />
                      <span className="text-[12px] text-gray-600 transition-colors group-hover:text-black">
                        {cat}
                      </span>
                    </label>
                  ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                  Price (Rp)
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                  Total Stock
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
                >
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Out of Stock</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description..."
                className="w-full resize-none rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
              />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                  Size Variants
                </label>
                <button className="flex items-center gap-1 text-[11px] font-medium text-gray-400 transition-colors hover:text-black">
                  <Plus className="size-3" />
                  Add Size
                </button>
              </div>
              <div className="space-y-2">
                {sizeVariants.map((variant, index) => (
                  <div
                    key={variant.size}
                    className="flex items-center gap-3 rounded-md border border-gray-100 px-3 py-2"
                  >
                    <input
                      type="checkbox"
                      checked={variant.enabled}
                      onChange={() => {
                        const updated = [...sizeVariants];
                        updated[index] = { ...updated[index], enabled: !updated[index].enabled };
                        setSizeVariants(updated);
                      }}
                      className="h-3.5 w-3.5 rounded accent-black"
                    />
                    <span className="w-10 text-[12px] font-semibold">{variant.size}</span>
                    <span className="text-[11px] text-gray-400">Stock:</span>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => {
                        const updated = [...sizeVariants];
                        updated[index] = { ...updated[index], stock: e.target.value };
                        setSizeVariants(updated);
                      }}
                      className="w-16 rounded border border-gray-200 px-2 py-1 text-center text-[12px] focus:border-gray-400 focus:outline-none"
                    />
                    <button
                      onClick={() => setSizeVariants(sizeVariants.filter((_, i) => i !== index))}
                      className="ml-auto text-gray-300 transition-colors hover:text-red-500"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                  Color Variants
                </label>
                <button className="flex items-center gap-1 text-[11px] font-medium text-gray-400 transition-colors hover:text-black">
                  <Plus className="size-3" />
                  Add Color
                </button>
              </div>
              <div className="space-y-2">
                {colorVariants.map((color, index) => (
                  <div
                    key={color.name}
                    className="flex items-center gap-3 rounded-md border border-gray-100 px-3 py-2"
                  >
                    <input
                      type="checkbox"
                      checked={color.enabled}
                      onChange={() => {
                        const updated = [...colorVariants];
                        updated[index] = { ...updated[index], enabled: !updated[index].enabled };
                        setColorVariants(updated);
                      }}
                      className="h-3.5 w-3.5 rounded accent-black"
                    />
                    <span
                      className="h-5 w-5 rounded-full border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => {
                        const updated = [...colorVariants];
                        updated[index] = { ...updated[index], name: e.target.value };
                        setColorVariants(updated);
                      }}
                      className="w-24 rounded border border-gray-200 px-2 py-1 text-[12px] focus:border-gray-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={color.hex}
                      onChange={(e) => {
                        const updated = [...colorVariants];
                        updated[index] = { ...updated[index], hex: e.target.value };
                        setColorVariants(updated);
                      }}
                      className="w-20 rounded border border-gray-200 px-2 py-1 text-[12px] focus:border-gray-400 focus:outline-none"
                    />
                    <button
                      onClick={() => setColorVariants(colorVariants.filter((_, i) => i !== index))}
                      className="ml-auto text-gray-300 transition-colors hover:text-red-500"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                Product Image
              </label>
              <div className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                {product ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="300px"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-300">
                    <Upload className="size-8" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-[11px] font-semibold">
                    <Upload className="size-3" />
                    {product ? "Change" : "Upload"}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                Gallery Images
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex aspect-square items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-gray-300 transition-colors hover:border-gray-400 hover:text-gray-400">
                  <Plus className="size-5" />
                </div>
              </div>
              <p className="mt-2 text-[10px] text-gray-400">
                Upload additional product images.
              </p>
            </div>

            <div className="rounded-md border border-gray-100 bg-gray-50/50 p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">
                Summary
              </p>
              <div className="space-y-1.5">
                {isEdit && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Product ID</span>
                    <span className="font-mono text-[10px] text-gray-500">{product.id}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Status</span>
                  <span className={`font-semibold ${formData.status === "Out of Stock" ? "text-red-500" : formData.status === "Published" ? "text-emerald-600" : "text-gray-500"}`}>
                    {formData.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Total Stock</span>
                  <span className="font-semibold">{formData.stock}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Price</span>
                  <span className="font-semibold">Rp {formData.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-6 py-4">
          <DialogClose render={<Button variant="outline" size="sm" />}>
            Cancel
          </DialogClose>
          <Button size="sm" onClick={onClose}>
            {isEdit ? "Save Changes" : "Create Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
