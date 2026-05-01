"use client";

import { useCallback, useEffect, useState, memo } from "react";
import Image from "next/image";
import { UploadSimple, Plus, Trash } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/src/store/useCategoryStore";

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

const CategorySection = memo(({ allCategories, selectedCategories, onToggle }: {
  allCategories: string[];
  selectedCategories: string[];
  onToggle: (cat: string) => void;
}) => (
  <div>
    <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.1em] text-gray-500">
      Categories
    </label>
    <div className="flex flex-wrap gap-2">
      {allCategories.map((cat) => (
        <label key={cat} className="group flex cursor-pointer items-center gap-1.5">
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat)}
            onChange={() => onToggle(cat)}
            className="h-3.5 w-3.5 rounded accent-black"
          />
          <span className="text-[13px] text-gray-600 transition-colors group-hover:text-black">
            {cat}
          </span>
        </label>
      ))}
    </div>
  </div>
));
CategorySection.displayName = "CategorySection";

export default function ProductEditModal({
  open,
  product,
  onClose,
  onSubmit,
}: {
  open: boolean;
  product?: Product;
  onClose: () => void;
  onSubmit?: (payload: any) => Promise<void>;
}) {
  const { categories, fetchCategories } = useCategoryStore();
  const allCategories = categories.map((c) => c.name);

  useEffect(() => {
    if (open) fetchCategories();
  }, [open, fetchCategories]);

  const isEdit = !!product;

  const [formData, setFormData] = useState({
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    price: product?.price.replace("Rp ", "").replace(/\./g, "") ?? "",
    categories: (product?.categories ?? []).map((c) => c.name),
    status: product?.status ?? "Draft",
    description: "",
  });
  const [variants, setVariants] = useState<Array<{ id?: string; color: string; colorCode: string; size: string; stock: string }>>(
    product?.id
      ? (product.variants?.map((v) => ({
          id: v.id,
          color: v.color ?? "",
          colorCode: v.colorCode ?? "#000000",
          size: v.size ?? "",
          stock: String(v.stock ?? 0),
        })) ?? [])
      : [
          { color: "Black", colorCode: "#000000", size: "S", stock: "12" },
          { color: "Black", colorCode: "#000000", size: "M", stock: "18" },
          { color: "White", colorCode: "#FFFFFF", size: "S", stock: "8" },
          { color: "White", colorCode: "#FFFFFF", size: "L", stock: "4" },
        ]
  );
  const [imageUrl, setImageUrl] = useState(product?.image ?? "");
  const [galleryImages, setGalleryImages] = useState(product?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const totalStock = variants.reduce((sum, v) => sum + (parseInt(v.stock, 10) || 0), 0);

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (cat: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const updateVariant = (index: number, field: string, value: any) => {
    setVariants((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addVariant = () => {
    setVariants((prev) => [...prev, { color: "", colorCode: "#000000", size: "", stock: "0" }]);
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setImageUrl(data.url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("/api/upload", { method: "POST", body: formData });
          const data = await res.json();
          return data.url as string;
        })
      );
      setGalleryImages((prev) => [...prev, ...urls.filter(Boolean)]);
    } catch (err) {
      console.error("Gallery upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = useCallback(async () => {
    if (!onSubmit) return;
    setSubmitting(true);
    try {
      const payload = {
        ...(isEdit && product ? { id: product.id } : {}),
        name: formData.name,
        slug: formData.sku || formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        description: formData.description,
        price: formData.price,
        image: imageUrl || "https://placehold.co/400x400?text=No+Image",
        images: galleryImages,
        status: formData.status,
        categoryNames: formData.categories,
        variants: variants.map((v) => ({
          ...(v.id ? { id: v.id } : {}),
          color: v.color,
          colorCode: v.colorCode,
          size: v.size,
          stock: v.stock,
        })),
      };
      await onSubmit(payload);
      onClose();
    } finally {
      setSubmitting(false);
    }
  }, [onSubmit, formData, imageUrl, galleryImages, variants, onClose, isEdit, product]);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent
        showCloseButton={false}
        className="top-[5%] max-h-[90vh] -translate-y-0 sm:max-w-3xl overflow-y-auto rounded-lg p-0"
      >
        <DialogHeader className="border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-base font-bold tracking-tight">
            {isEdit ? "Edit Product" : "Create Product"}
          </DialogTitle>
          <DialogDescription className="mt-0.5 text-[13px] text-gray-400">
            {isEdit ? "Update product information, variants, and pricing." : "Add a new product to your catalog."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="h-9 w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                SKU
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => updateField("sku", e.target.value)}
                placeholder="product-slug"
                className="h-9 w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
              />
            </div>

            <CategorySection
              allCategories={allCategories}
              selectedCategories={formData.categories}
              onToggle={toggleCategory}
            />

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                  Price (Rp)
                </label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  className="h-9 w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                  Total Stock
                </label>
                <input
                  type="number"
                  value={totalStock}
                  readOnly
                  className="h-9 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-[13px] text-gray-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className="h-9 w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
                >
                  <option>Published</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Product description..."
                className="min-h-[72px] w-full resize-none rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                Product Image
              </label>
              <div className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={formData.name || "Product"}
                    fill
                    sizes="300px"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-300">
                    <UploadSimple size={32} />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <label className="flex cursor-pointer items-center gap-1.5 rounded-md bg-white px-3 py-2 text-[13px] font-semibold">
                    <UploadSimple size={14} />
                    {imageUrl ? "Change" : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
              {uploading && (
                <p className="mt-1 text-xs text-gray-400">Uploading...</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                Gallery Images
              </label>
              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((url, index) => (
                  <div key={url + index} className="group relative aspect-square overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                    <Image
                      src={url}
                      alt={`Gallery ${index + 1}`}
                      fill
                      sizes="100px"
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => removeGalleryImage(index)}
                      className="absolute right-1 top-1 rounded bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Trash size={12} />
                    </button>
                  </div>
                ))}
                <label className="flex aspect-square cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-gray-300 transition-colors hover:border-gray-400 hover:text-gray-400">
                  <Plus size={20} />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleGalleryUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
              {uploading && (
                <p className="mt-1 text-xs text-gray-400">Uploading...</p>
              )}
              <p className="mt-2 text-xs text-gray-400">
                Upload additional product images.
              </p>
            </div>
          </div>
        </div>

        {/* Variants — full width section */}
        <div className="border-t border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="text-[13px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                Variants
              </label>
              <p className="mt-0.5 text-xs text-gray-400">{variants.length} variant{variants.length !== 1 ? "s" : ""} &middot; Total stock: {totalStock}</p>
            </div>
            <button onClick={addVariant} className="flex items-center gap-1 cursor-pointer rounded-lg bg-black px-3 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-gray-800">
              <Plus size={14} weight="bold" />
              Add Variant
            </button>
          </div>

          {variants.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="grid grid-cols-[1fr_80px_48px_1fr_80px_32px] gap-2 border-b border-gray-100 bg-gray-50 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                <span>Color</span>
                <span>Size</span>
                <span>Pick</span>
                <span>Hex Code</span>
                <span>Stock</span>
                <span />
              </div>
              <div className="divide-y divide-gray-50">
                {variants.map((variant: any, index: number) => {
                  const hexVal = variant.colorCode?.startsWith("#") ? variant.colorCode.slice(1) : variant.colorCode || "";
                  return (
                    <div key={index} className="grid grid-cols-[1fr_80px_48px_1fr_80px_32px] gap-2 items-center px-3 py-2.5">
                      <input
                        type="text"
                        value={variant.color}
                        onChange={(e) => {
                          const next = [...variants];
                          next[index] = { ...next[index], color: e.target.value };
                          setVariants(next);
                        }}
                        placeholder="Black"
                        className="h-9 rounded-md border border-gray-200 px-2.5 text-[13px] focus:border-gray-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={variant.size}
                        onChange={(e) => {
                          const next = [...variants];
                          next[index] = { ...next[index], size: e.target.value };
                          setVariants(next);
                        }}
                        placeholder="L"
                        className="h-9 rounded-md border border-gray-200 px-2.5 text-[13px] focus:border-gray-400 focus:outline-none"
                      />
                      <input
                        type="color"
                        value={variant.colorCode || "#000000"}
                        onChange={(e) => {
                          const next = [...variants];
                          next[index] = { ...next[index], colorCode: e.target.value };
                          setVariants(next);
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
                            const next = [...variants];
                            next[index] = { ...next[index], colorCode: raw ? `#${raw}` : "" };
                            setVariants(next);
                          }}
                          placeholder="000000"
                          className="h-9 w-full rounded-r-md border border-gray-200 px-2.5 text-[13px] font-mono focus:border-gray-400 focus:outline-none"
                        />
                      </div>
                      <input
                        type="number"
                        min={0}
                        value={variant.stock}
                        onChange={(e) => {
                          const next = [...variants];
                          next[index] = { ...next[index], stock: e.target.value };
                          setVariants(next);
                        }}
                        className="h-9 rounded-md border border-gray-200 px-2 text-center text-[13px] font-semibold focus:border-gray-400 focus:outline-none"
                      />
                      <button
                        onClick={() => removeVariant(index)}
                        className="flex h-9 w-8 cursor-pointer items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 py-8 text-center">
              <p className="text-[13px] text-gray-400">No variants yet.</p>
              <button
                onClick={addVariant}
                className="mt-2 text-[13px] font-semibold text-black hover:underline"
              >
                Add first variant
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-6 py-4">
          <DialogClose render={<Button variant="outline" size="sm" />}>
            Cancel
          </DialogClose>
          <Button size="sm" onClick={handleSubmit} disabled={uploading || submitting || !formData.name || !formData.price}>
            {submitting ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Create Product")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
