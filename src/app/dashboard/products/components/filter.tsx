"use client";

import { useState, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { useProductStore } from "@/src/store/useProductStore";
import { useCategoryStore } from "@/src/store/useCategoryStore";

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
        className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-[0.1em] text-gray-400"
      >
        {title}
        <CaretDown
          size={14}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-2.5">{children}</div>}
    </div>
  );
}

const STOCK_OPTIONS = [
  { label: "In Stock", value: "in_stock", color: "bg-emerald-500" },
  { label: "Low Stock", value: "low_stock", color: "bg-amber-500" },
  { label: "Out of Stock", value: "out_of_stock", color: "bg-red-500" },
];

const STATUS_OPTIONS = [
  { label: "Published", value: "PUBLISHED" },
  { label: "Draft", value: "DRAFT" },
];

export default function ProductFilter() {
  const {
    categoryFilters,
    stockFilters,
    maxPrice,
    statusFilters,
    fetchProducts,
  } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const [localCategories, setLocalCategories] = useState<string[]>(categoryFilters);
  const [localStock, setLocalStock] = useState<string[]>(stockFilters);
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(maxPrice ?? 500000);
  const [localStatus, setLocalStatus] = useState<string[]>(statusFilters);

  const toggleCategory = (label: string) => {
    setLocalCategories((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  const toggleStock = (value: string) => {
    setLocalStock((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const toggleStatus = (value: string) => {
    setLocalStatus((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const apply = () => {
    fetchProducts({
      page: 1,
      categoryFilters: localCategories,
      stockFilters: localStock,
      maxPrice: localMaxPrice >= 500000 ? null : localMaxPrice,
      statusFilters: localStatus,
    });
  };

  const clear = () => {
    setLocalCategories([]);
    setLocalStock([]);
    setLocalMaxPrice(500000);
    setLocalStatus([]);
    fetchProducts({
      page: 1,
      categoryFilters: [],
      stockFilters: [],
      minPrice: null,
      maxPrice: null,
      statusFilters: [],
    });
  };

  return (
    <aside className="hidden w-[240px] flex-shrink-0 xl:block">
      <div className="sticky top-[20px] rounded-lg border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.12em]">
            Filters
          </h3>
          <button
            onClick={clear}
            className="text-xs font-medium text-gray-400 transition-colors hover:text-black"
          >
            Clear All
          </button>
        </div>

        <FilterSection title="Category">
          <div className="space-y-2">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="group flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={localCategories.includes(cat.name)}
                  onChange={() => toggleCategory(cat.name)}
                  className="h-3.5 w-3.5 rounded accent-black"
                />
                <span className="text-[13px] text-gray-600 transition-colors group-hover:text-black">
                  {cat.name}
                </span>
                <span className="ml-auto text-xs text-gray-300">
                  {cat._count?.productCategories ?? 0}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Stock Status">
          <div className="space-y-2">
            {STOCK_OPTIONS.map((status) => (
              <label
                key={status.value}
                className="group flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={localStock.includes(status.value)}
                  onChange={() => toggleStock(status.value)}
                  className="h-3.5 w-3.5 rounded accent-black"
                />
                <span className="flex items-center gap-1.5 text-[13px] text-gray-600 transition-colors group-hover:text-black">
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
            step={10000}
            value={localMaxPrice}
            onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
            className="mb-2 w-full"
          />
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Rp 0</span>
            <span>Rp {(localMaxPrice / 1000).toFixed(0)}K</span>
          </div>
        </FilterSection>

        <FilterSection title="Status">
          <div className="space-y-2">
            {STATUS_OPTIONS.map((status) => (
              <label
                key={status.value}
                className="group flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={localStatus.includes(status.value)}
                  onChange={() => toggleStatus(status.value)}
                  className="h-3.5 w-3.5 rounded accent-black"
                />
                <span className="text-[13px] text-gray-600 transition-colors group-hover:text-black">
                  {status.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <button
          onClick={apply}
          className="mt-2 w-full rounded-lg bg-black h-9 text-[13px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gray-800"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
