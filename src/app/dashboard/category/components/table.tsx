"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
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
import PreviewModal from "./previewModal";

export interface Category {
  id: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  name: string;
  sub: string;
  slug: string;
  desc: string;
  products: number;
  status: string;
  created: string;
  isParent?: boolean;
  nameClass: string;
  isChild?: boolean;
  faded?: boolean;
  nameColor?: string;
  subColor?: string;
}

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-600",
    Inactive: "bg-gray-100 text-gray-400",
    Draft: "bg-sky-50 text-sky-600",
  };
  return styles[status] || styles.Active;
};

export default function CategoriesTable({
  categories,
  onEdit,
}: {
  categories: Category[];
  onEdit?: (category: Category) => void;
}) {
  const [previewCategory, setPreviewCategory] = useState<Category | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);

  return (
    <>
      <PreviewModal
        open={!!previewCategory}
        category={previewCategory}
        onClose={() => setPreviewCategory(null)}
      />

      <Dialog open={!!deleteCategory} onOpenChange={(open) => { if (!open) setDeleteCategory(null); }}>
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="size-6 text-red-500" />
            </div>
            <DialogTitle className="text-center text-[15px] font-bold tracking-tight">
              Delete Category
            </DialogTitle>
            <DialogDescription className="text-center text-[12px] text-gray-500">
              Are you sure you want to delete <span className="font-semibold text-gray-700">{deleteCategory?.name}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-2">
            <DialogClose render={<Button variant="outline" size="sm" />}>
              Cancel
            </DialogClose>
            <Button variant="destructive" size="sm" onClick={() => setDeleteCategory(null)}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative max-w-[240px] flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
            <input type="text" placeholder="Search categories..." className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-[12px] transition-colors focus:border-gray-400 focus:bg-white focus:outline-none" />
          </div>
          <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-500 focus:border-gray-400 focus:outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Draft</option>
          </select>
          <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-500 focus:border-gray-400 focus:outline-none">
            <option>All Levels</option>
            <option>Parent Only</option>
            <option>Child Only</option>
          </select>
        </div>
        <span className="whitespace-nowrap text-[11px] text-gray-400">Showing 1–15 of 24</span>
      </div>

      <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 px-5 py-2.5">
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" className="h-3.5 w-3.5 rounded accent-black" />
            <span className="text-[11px] font-medium text-gray-500">Select All</span>
          </label>
          <div className="h-4 w-px bg-gray-200" />
          <select className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] text-gray-500 focus:border-gray-400 focus:outline-none">
            <option>Bulk Actions</option>
            <option>Set Active</option>
            <option>Set Inactive</option>
            <option>Delete Selected</option>
            <option>Export</option>
          </select>
          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-[11px] font-semibold transition-colors hover:bg-gray-100">Apply</button>
        </div>
        <span className="text-[11px] text-gray-400">0 selected</span>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/60">
            <th className="w-10 px-5 py-3"><input type="checkbox" className="h-3.5 w-3.5 rounded accent-black" /></th>
            <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Category Name</th>
            <th className="w-[160px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Slug</th>
            <th className="w-[200px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Description</th>
            <th className="w-[90px] py-3 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Products</th>
            <th className="w-[90px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Status</th>
            <th className="w-[100px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Created</th>
            <th className="w-[70px] pr-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <tr key={cat.id} className="border-b border-gray-50 transition-colors">
                <td className="px-5 py-2.5"><input type="checkbox" className="h-3.5 w-3.5 rounded accent-black" /></td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md ${cat.iconBg}`}>
                      <IconComp className={`text-[13px] ${cat.iconColor}`} />
                    </div>
                    <div>
                      <a id={cat.id} href="#" className={`text-[12px] hover:underline ${cat.nameClass} ${cat.nameColor || (cat.faded ? "text-gray-400" : "")}`}>
                        {cat.name}
                      </a>
                      <p className={`mt-0.5 text-[9px] ${cat.subColor || (cat.faded ? "text-gray-300" : "text-gray-400")}`}>{cat.sub}</p>
                    </div>
                  </div>
                </td>
                <td className="py-2.5">
                  <span className={`font-mono text-[11px] ${cat.faded ? "text-gray-300" : "text-gray-400"}`}>{cat.slug}</span>
                </td>
                <td className="py-2.5">
                  <span className={`block max-w-[180px] truncate text-[11px] ${cat.faded ? "text-gray-300" : "text-gray-500"}`}>{cat.desc}</span>
                </td>
                <td className="py-2.5 text-center">
                  <span className={`text-[12px] font-bold ${cat.faded ? "text-gray-400" : ""}`}>{cat.products}</span>
                </td>
                <td className="py-2.5">
                  <span className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${statusBadge(cat.status)}`}>{cat.status}</span>
                </td>
                <td className={`py-2.5 text-[11px] ${cat.faded ? "text-gray-300" : "text-gray-400"}`}>{cat.created}</td>
                <td className="py-2.5 pr-5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setPreviewCategory(cat)}
                      className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
                    >
                      <Eye className="text-[13px]" />
                    </button>
                    <button
                      onClick={() => onEdit?.(cat)}
                      className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
                    >
                      <Pencil className="text-[13px]" />
                    </button>
                    <button
                      onClick={() => setDeleteCategory(cat)}
                      className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500"
                    >
                      <Trash2 className="text-[13px]" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400">Rows per page:</span>
          <select className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium focus:border-gray-400 focus:outline-none">
            <option>15</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black">
            <ChevronLeft className="text-sm" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-[11px] font-bold text-white">1</button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black">2</button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black">
            <ChevronRight className="text-sm" />
          </button>
          <div className="ml-3 flex items-center gap-1.5 border-l border-gray-200 pl-3">
            <span className="text-[11px] text-gray-400">Go to:</span>
            <input type="number" defaultValue={1} min={1} max={2} className="w-12 rounded border border-gray-200 px-2 py-1 text-center text-[11px] font-medium focus:border-gray-400 focus:outline-none" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
