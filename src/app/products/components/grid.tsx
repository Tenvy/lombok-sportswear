"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  soldOut: boolean;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  sizes: string[];
}

const quickAddColors = [
  { bg: "bg-black", label: "Black" },
  { bg: "bg-white border border-gray-300", label: "White" },
  { bg: "bg-gray-500", label: "Gray" },
  { bg: "bg-stone-800", label: "Dark Brown" },
  { bg: "bg-slate-700", label: "Navy" },
];

function QuickAddModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [selectedColor, setSelectedColor] = useState(quickAddColors[0].label);
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="fixed inset-0 z-[70]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="absolute bottom-4 right-4 w-[340px] max-w-[calc(100vw-2rem)] rounded-sm border border-gray-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gray-400">
              {product.categories[0]?.name || "Product"}
            </p>
            <h3 className="truncate text-sm font-semibold tracking-tight">
              {product.name}
            </h3>
            <p className="mt-1 text-sm font-bold">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-gray-400 transition-colors hover:text-black"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mb-4">
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.15em]">
            Warna
          </p>
          <div className="flex gap-2">
            {quickAddColors.map((color) => (
              <button
                key={color.label}
                onClick={() => setSelectedColor(color.label)}
                title={color.label}
                className={`h-7 w-7 rounded-full ${color.bg} ${
                  selectedColor === color.label
                    ? "ring-2 ring-black ring-offset-2"
                    : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.15em]">
            Ukuran
          </p>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex h-9 w-11 items-center justify-center text-[11px] font-semibold uppercase tracking-wider transition-colors ${
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

        <button
          disabled={!selectedSize}
          className="flex w-full items-center justify-center gap-2 bg-black py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <ShoppingBag className="size-3.5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

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
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-[0.2em]"
      >
        {title}
        <ChevronDown
          className={`size-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function SidebarFilters() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");

  return (
    <aside className="hidden w-[220px] flex-shrink-0 lg:block">
      <div className="sticky top-[80px] max-h-[80vh] overflow-y-auto scrollbar-hide">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em]">
            Filter
          </h3>
          <a
            id="filter-clear"
            href="#"
            className="text-[11px] uppercase tracking-wider text-gray-400 transition-colors hover:text-black"
          >
            Reset
          </a>
        </div>

        <FilterSection title="Kategori">
          <ul className="space-y-2">
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
        </FilterSection>

        <FilterSection title="Ukuran">
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
        </FilterSection>

        <FilterSection title="Warna">
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
        </FilterSection>

        <FilterSection title="Harga" defaultOpen={false}>
          <div className="space-y-3">
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
        </FilterSection>

        <button className="w-full bg-black py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800">
          Terapkan Filter
        </button>
      </div>
    </aside>
  );
}

function MobileFilter({
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

function ProductCard({
  product,
  onQuickAdd,
}: {
  product: Product;
  onQuickAdd: (product: Product) => void;
}) {
  return (
    <div className="group">
      <Link
        href={`/product/${product.slug}`}
        className="group relative mb-4 block aspect-[3/4] overflow-hidden bg-gray-50"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!product.soldOut && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="absolute inset-0 flex items-end justify-center bg-black/10 pb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <span className="bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-black">
              Quick Add
            </span>
          </button>
        )}
        {product.soldOut && (
          <span className="absolute left-3 top-3 bg-black px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-white">
            Sold Out
          </span>
        )}
      </Link>
      <Link href={`/product/${product.slug}`}>
        <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">
          {product.categories[0]?.name || "Product"}
        </p>
        <h3 className="mb-1.5 text-sm font-semibold tracking-tight">
          {product.name}
        </h3>
        <p className="text-sm font-bold">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
      </Link>
    </div>
  );
}

export default function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products?soldOut=false");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleQuickAdd = useCallback((product: Product) => {
    setQuickAddProduct(product);
  }, []);

  if (loading) {
    return (
      <section className="bg-white pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-gray-400">Loading products...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="mb-6 flex items-center gap-2 border border-gray-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors hover:border-black lg:hidden"
        >
          <SlidersHorizontal className="size-3.5" />
          Filter
        </button>

        <div className="flex gap-10 lg:gap-14">
          <SidebarFilters />

          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {quickAddProduct && (
        <QuickAddModal
          product={quickAddProduct}
          onClose={() => setQuickAddProduct(null)}
        />
      )}

      <MobileFilter
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
      />
    </section>
  );
}
