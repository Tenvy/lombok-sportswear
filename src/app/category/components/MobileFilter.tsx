"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useCategoryStore } from "@/src/store/useCategoryStore";

const STOCK_OPTIONS = [
  { label: "In Stock", value: "in_stock", color: "bg-emerald-500" },
  { label: "Low Stock", value: "low_stock", color: "bg-amber-500" },
  { label: "Out of Stock", value: "out_of_stock", color: "bg-red-500" },
];

const PRICE_MAX = 600000;

export type MobileFilters = {
  stock: string[];
  maxPrice: number;
  sizes: string[];
  colors: string[];
};

const EMPTY_FILTERS: MobileFilters = {
  stock: [],
  maxPrice: PRICE_MAX,
  sizes: [],
  colors: [],
};

function formatPrice(price: number) {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export default function MobileFilter({
  isOpen,
  onClose,
  slug,
  filters = EMPTY_FILTERS,
  availableSizes = [],
  availableColors = [],
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  slug?: string;
  filters?: MobileFilters;
  availableSizes?: string[];
  availableColors?: { label: string; code: string | null }[];
  onApply?: (filters: MobileFilters) => void;
}) {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, [categories.length, fetchCategories]);

  const [localStock, setLocalStock] = useState<string[]>(filters.stock);
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(filters.maxPrice);
  const [localSizes, setLocalSizes] = useState<string[]>(filters.sizes);
  const [localColors, setLocalColors] = useState<string[]>(filters.colors);

  useEffect(() => {
    setLocalStock(filters.stock);
    setLocalMaxPrice(filters.maxPrice);
    setLocalSizes(filters.sizes);
    setLocalColors(filters.colors);
  }, [filters]);

  if (!isOpen) return null;

  const toggleStock = (value: string) => {
    setLocalStock((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const toggleSize = (size: string) => {
    setLocalSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setLocalColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const apply = () => {
    onApply?.({
      stock: localStock,
      maxPrice: localMaxPrice,
      sizes: localSizes,
      colors: localColors,
    });
    onClose();
  };

  const clear = () => {
    setLocalStock([]);
    setLocalMaxPrice(PRICE_MAX);
    setLocalSizes([]);
    setLocalColors([]);
    onApply?.(EMPTY_FILTERS);
  };

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <nav
        className="absolute bottom-0 left-0 h-full w-[85vw] max-w-[360px] bg-white shadow-xl transition-transform duration-300"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-dvh flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em]">
              Filter
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-black"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex-1 px-4 py-6">
            <div className="mb-8">
              <button
                onClick={clear}
                className="text-[11px] uppercase tracking-wider text-gray-400 transition-colors hover:text-black"
              >
                Reset
              </button>
            </div>

            <div className="mb-8 border-b border-gray-200 pb-8">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                Kategori
              </h4>
              <ul className="space-y-2.5">
                {categories.map((cat) => {
                  const active = cat.slug === slug;
                  return (
                    <li key={cat.id}>
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={onClose}
                        className={`flex items-center justify-between text-sm transition-colors ${
                          active
                            ? "font-semibold text-black"
                            : "text-gray-400 hover:text-black"
                        }`}
                      >
                        {cat.name}
                        <span
                          className={`text-[11px] ${active ? "font-normal text-gray-400" : ""}`}
                        >
                          ({cat._count?.productCategories ?? 0})
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mb-8 border-b border-gray-200 pb-8">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                Stok
              </h4>
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
                    <span className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors group-hover:text-black">
                      <span className={`h-1.5 w-1.5 rounded-full ${status.color}`} />
                      {status.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {availableSizes.length > 0 && (
              <div className="mb-8 border-b border-gray-200 pb-8">
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                  Ukuran
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {availableSizes.map((size) => {
                    const selected = localSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-2 text-center text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                          selected
                            ? "border border-black bg-black text-white"
                            : "border border-gray-200 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {availableColors.length > 0 && (
              <div className="mb-8 border-b border-gray-200 pb-8">
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                  Warna
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {availableColors.map((color) => {
                    const selected = localColors.includes(color.label);
                    return (
                      <button
                        key={color.label}
                        onClick={() => toggleColor(color.label)}
                        title={color.label}
                        style={
                          color.code ? { backgroundColor: color.code } : undefined
                        }
                        className={`h-7 w-7 rounded-full border border-gray-200 ${
                          selected ? "ring-2 ring-black ring-offset-2" : ""
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                Harga
              </h4>
              <div className="space-y-3">
                <input
                  type="range"
                  min={0}
                  max={PRICE_MAX}
                  step={10000}
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Rp 0</span>
                  <span>{formatPrice(localMaxPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-4">
            <button
              onClick={apply}
              className="w-full bg-black py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
