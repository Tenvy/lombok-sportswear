"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-gray-100 pt-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400"
      >
        {title}
        <ChevronDown
          className={`size-3 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-2.5">{children}</div>}
    </div>
  );
}

export default function ProductFilter() {
  return (
    <aside className="hidden w-[210px] flex-shrink-0 xl:block">
      <div className="sticky top-[20px] rounded-lg border border-gray-200 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.12em]">
            Filters
          </h3>
          <button className="text-[10px] font-medium text-gray-400 transition-colors hover:text-black">
            Clear All
          </button>
        </div>

        <FilterSection title="Category">
          <div className="space-y-2">
            {[
              { label: "Men", count: 62, checked: true },
              { label: "Women", count: 48, checked: true },
              { label: "Tops", count: 34 },
              { label: "Bottoms", count: 22 },
              { label: "Accessories", count: 12 },
              { label: "Outerwear", count: 16 },
            ].map((cat) => (
              <label
                key={cat.label}
                className="group flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  defaultChecked={cat.checked}
                  className="h-3.5 w-3.5 rounded accent-black"
                />
                <span className="text-[12px] text-gray-600 transition-colors group-hover:text-black">
                  {cat.label}
                </span>
                <span className="ml-auto text-[10px] text-gray-300">
                  {cat.count}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Stock Status">
          <div className="space-y-2">
            {[
              { label: "In Stock", color: "bg-emerald-500", checked: true },
              { label: "Low Stock", color: "bg-amber-500", checked: true },
              { label: "Out of Stock", color: "bg-red-500" },
            ].map((status) => (
              <label
                key={status.label}
                className="group flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  defaultChecked={status.checked}
                  className="h-3.5 w-3.5 rounded accent-black"
                />
                <span className="flex items-center gap-1.5 text-[12px] text-gray-600 transition-colors group-hover:text-black">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${status.color}`}
                  />
                  {status.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price Range" defaultOpen={false}>
          <input
            type="range"
            min={0}
            max={500000}
            defaultValue={500000}
            className="mb-2 w-full"
          />
          <div className="flex items-center justify-between text-[10px] text-gray-400">
            <span>Rp 0</span>
            <span>Rp 500K</span>
          </div>
        </FilterSection>

        <FilterSection title="Status">
          <div className="space-y-2">
            {["Published", "Draft"].map((status) => (
              <label
                key={status}
                className="group flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-3.5 w-3.5 rounded accent-black"
                />
                <span className="text-[12px] text-gray-600 transition-colors group-hover:text-black">
                  {status}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <button className="mt-2 w-full rounded-lg bg-black py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gray-800">
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
