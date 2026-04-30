"use client";

import { useState } from "react";
import {
  RefreshCw,
  UploadCloud,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  slug: string;
  desc: string;
  status: string;
  sub: string;
}

export default function CategoryModal({
  open,
  category,
  onClose,
}: {
  open: boolean;
  category?: Category;
  onClose: () => void;
}) {
  const isEdit = !!category;

  const [formData, setFormData] = useState(() => ({
    name: category?.name ?? "",
    slug: category?.slug ?? "",
    parent: category?.sub?.includes("Child of") ? "Men's Collection" : "No Parent (Top Level)",
    status: category?.status ?? "Active",
    description: category?.desc ?? "",
    metaDescription: "",
    metaKeywords: "",
  }));

  const update = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent showCloseButton={false} className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[14px] font-bold tracking-tight">
            {isEdit ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription className="mt-0.5 text-[11px] text-gray-400">
            {isEdit ? "Update category details and settings." : "Fill in the details for a new product category"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">
              Category Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g., Sport Jackets"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-[12px] transition-colors focus:border-gray-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">URL Slug</label>
            <div className="relative">
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => update("slug", e.target.value)}
                placeholder="auto-generated"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 pr-9 font-mono text-[12px] text-gray-500 transition-colors focus:border-gray-400 focus:outline-none"
              />
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-black">
                <RefreshCw className="text-xs" />
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">Parent Category</label>
            <select
              value={formData.parent}
              onChange={(e) => update("parent", e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-[12px] text-gray-500 transition-colors focus:border-gray-400 focus:outline-none"
            >
              <option>No Parent (Top Level)</option>
              <option>Men&apos;s Collection</option>
              <option>Women&apos;s Collection</option>
              <option>Accessories</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">Status</label>
            <div className="flex items-center gap-3 py-2">
              {["Active", "Inactive", "Draft"].map((s) => (
                <label key={s} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    checked={formData.status === s}
                    onChange={() => update("status", s)}
                    className="h-3.5 w-3.5 accent-black"
                  />
                  <span className={`text-[11px] font-medium ${s === "Active" ? "" : "text-gray-500"}`}>{s}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Brief description of this category..."
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-[12px] transition-colors focus:border-gray-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">Meta Description</label>
            <input
              type="text"
              value={formData.metaDescription}
              onChange={(e) => update("metaDescription", e.target.value)}
              placeholder="SEO meta description"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-[12px] transition-colors focus:border-gray-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">Meta Keywords</label>
            <input
              type="text"
              value={formData.metaKeywords}
              onChange={(e) => update("metaKeywords", e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-[12px] transition-colors focus:border-gray-400 focus:outline-none"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">Featured Image</label>
            <div className="cursor-pointer rounded-lg border-2 border-dashed border-gray-200 p-4 text-center transition-colors hover:border-gray-400">
              <UploadCloud className="mx-auto text-2xl text-gray-300" />
              <p className="mt-1.5 text-[11px] text-gray-400">Click to upload or drag and drop</p>
              <p className="mt-0.5 text-[9px] text-gray-300">PNG, JPG or WebP (max 2MB)</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
          <DialogClose render={<Button variant="outline" size="sm" />}>
            Cancel
          </DialogClose>
          <Button size="sm" onClick={onClose}>
            {isEdit ? "Save Changes" : "Save Category"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
