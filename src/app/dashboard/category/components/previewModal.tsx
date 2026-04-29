"use client";

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
  sub: string;
  slug: string;
  desc: string;
  products: number;
  status: string;
  created: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-600",
    Inactive: "bg-gray-100 text-gray-400",
    Draft: "bg-sky-50 text-sky-600",
  };
  return styles[status] || styles.Active;
};

export default function PreviewModal({
  category,
  onClose,
}: {
  category: Category;
  onClose: () => void;
}) {
  const IconComp = category.icon;

  const fields = [
    { label: "Category Name", value: category.name },
    { label: "URL Slug", value: category.slug },
    { label: "Type", value: category.sub },
    { label: "Description", value: category.desc },
    { label: "Products Count", value: String(category.products) },
    { label: "Status", value: category.status },
    { label: "Created", value: category.created },
    { label: "Category ID", value: category.id },
  ];

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[14px] font-bold tracking-tight">
            Category Preview
          </DialogTitle>
          <DialogDescription className="mt-0.5 text-[11px] text-gray-400">
            Read-only view of category details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.iconBg}`}>
            <IconComp className={`text-base ${category.iconColor}`} />
          </div>
          <div>
            <p className="text-[13px] font-semibold">{category.name}</p>
            <p className="text-[11px] text-gray-400">{category.sub}</p>
          </div>
          <span className={`ml-auto rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${statusBadge(category.status)}`}>
            {category.status}
          </span>
        </div>

        <div className="space-y-3">
          {fields.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">
                {label}
              </p>
              <p className="mt-0.5 text-[12px] text-gray-700">
                {label === "URL Slug" ? (
                  <span className="font-mono text-[11px] text-gray-500">{value}</span>
                ) : (
                  value
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <DialogClose render={<Button variant="outline" size="sm" />}>
            Close
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
