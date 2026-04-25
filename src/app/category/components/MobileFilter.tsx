"use client";

import { useState } from "react";
import { X } from "lucide-react";

const categories = [
  { label: "Semua", count: 16, active: true },
  { label: "T-Shirt", count: 5 },
  { label: "Polo", count: 3 },
  { label: "Hoodie", count: 3 },
  { label: "Jacket", count: 3 },
  { label: "Pants", count: 2 },
];

const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

const colors = [
  { bg: "bg-black", title: "Black" },
  { bg: "bg-white border border-gray-300", title: "White" },
  { bg: "bg-gray-500", title: "Gray" },
  { bg: "bg-stone-800", title: "Dark Brown" },
  { bg: "bg-slate-700", title: "Navy" },
  { bg: "bg-emerald-800", title: "Dark Green" },
];

export default function MobileFilter({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");

  if (!isOpen) return null;

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
              <a
                href="#"
                className="text-[11px] uppercase tracking-wider text-gray-400 transition-colors hover:text-black"
              >
                Reset
              </a>
            </div>

            <div className="mb-8 border-b border-gray-200 pb-8">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                Kategori
              </h4>
              <ul className="space-y-2.5">
                {categories.map((cat) => (
                  <li key={cat.label}>
                    <a
                      href="#"
                      className={`flex items-center justify-between text-sm transition-colors ${
                        cat.active
                          ? "font-semibold text-black"
                          : "text-gray-400 hover:text-black"
                      }`}
                    >
                      {cat.label}{" "}
                      <span
                        className={`text-[11px] ${cat.active ? "font-normal text-gray-400" : ""}`}
                      >
                        ({cat.count})
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 border-b border-gray-200 pb-8">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                Ukuran
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-center text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                      selectedSize === size
                        ? "border border-black bg-black text-white"
                        : "border border-gray-200 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8 border-b border-gray-200 pb-8">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                Warna
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((color) => (
                  <button
                    key={color.title}
                    onClick={() => setSelectedColor(color.title)}
                    title={color.title}
                    className={`h-7 w-7 rounded-full ${color.bg} ${
                      selectedColor === color.title
                        ? "ring-2 ring-black ring-offset-2"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
                Harga
              </h4>
              <div className="space-y-4">
                <div>
                  <input
                    type="range"
                    min={100000}
                    max={600000}
                    defaultValue={100000}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min={100000}
                    max={600000}
                    defaultValue={500000}
                    className="mt-2 w-full"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Rp 100.000</span>
                  <span>Rp 500.000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-4">
            <button
              onClick={onClose}
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
