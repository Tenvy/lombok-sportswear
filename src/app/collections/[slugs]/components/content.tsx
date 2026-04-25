"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ShoppingBag, SlidersHorizontal, ChevronDown } from "lucide-react";
import MobileFilter from "../../components/MobileFilter";

interface Product {
  id: string;
  href: string;
  image: string;
  name: string;
  category: string;
  price: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: "p1",
    href: "#",
    image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=500&h=660&fit=crop",
    name: "Training Crew Tee",
    category: "T-Shirt",
    price: "Rp 199.000",
    badge: "New",
  },
  {
    id: "p2",
    href: "#",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=660&fit=crop",
    name: "Lombok Classic Polo",
    category: "Polo",
    price: "Rp 289.000",
    badge: "Best Seller",
  },
  {
    id: "p3",
    href: "#",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=660&fit=crop",
    name: "Essential Hoodie Black",
    category: "Hoodie",
    price: "Rp 389.000",
  },
  {
    id: "p4",
    href: "#",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=660&fit=crop",
    name: "Sport Zip Jacket",
    category: "Jacket",
    price: "Rp 459.000",
    badge: "New",
  },
  {
    id: "p5",
    href: "#",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=660&fit=crop",
    name: "Wide Leg Trousers",
    category: "Pants",
    price: "Rp 349.000",
  },
  {
    id: "p6",
    href: "#",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a0a?w=500&h=660&fit=crop",
    name: "Zip Hoodie Essential",
    category: "Hoodie",
    price: "Rp 419.000",
    badge: "Popular",
  },
  {
    id: "p7",
    href: "#",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=660&fit=crop",
    name: "Slim Jogger Pants",
    category: "Pants",
    price: "Rp 329.000",
  },
  {
    id: "p8",
    href: "#",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=660&fit=crop",
    name: "Track Jacket Pro",
    category: "Jacket",
    price: "Rp 489.000",
    badge: "Best Seller",
  },
  {
    id: "p9",
    href: "#",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=660&fit=crop",
    name: "Everyday Crewneck",
    category: "T-Shirt",
    price: "Rp 179.000",
    badge: "New",
  },
  {
    id: "p10",
    href: "#",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=660&fit=crop",
    name: "Stripe Polo Relaxed",
    category: "Polo",
    price: "Rp 299.000",
  },
  {
    id: "p11",
    href: "#",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=660&fit=crop",
    name: "Pullover Hoodie",
    category: "Hoodie",
    price: "Rp 369.000",
  },
  {
    id: "p12",
    href: "#",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&h=660&fit=crop",
    name: "Bomber Jacket Urban",
    category: "Jacket",
    price: "Rp 529.000",
    badge: "Limited",
  },
  {
    id: "p13",
    href: "#",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=660&fit=crop",
    name: "Graphic Tee Bold",
    category: "T-Shirt",
    price: "Rp 219.000",
  },
  {
    id: "p14",
    href: "#",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=660&fit=crop",
    name: "Oxford Polo Smart",
    category: "Polo",
    price: "Rp 309.000",
  },
  {
    id: "p15",
    href: "#",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500&h=660&fit=crop",
    name: "Oversized Tee Minimal",
    category: "T-Shirt",
    price: "Rp 189.000",
    badge: "New",
  },
  {
    id: "p16",
    href: "#",
    image: "https://images.unsplash.com/photo-1609873814058-a8928924184a?w=500&h=660&fit=crop",
    name: "Heavy Cotton Tee",
    category: "T-Shirt",
    price: "Rp 229.000",
  },
];

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

function ProductCard({
  product,
  onQuickAdd,
}: {
  product: Product;
  onQuickAdd: (product: Product) => void;
}) {
  return (
    <div className="group">
      <a
        href={product.href}
        className="group relative mb-4 block aspect-[3/4] overflow-hidden bg-gray-50"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
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
        {product.badge && (
          <span className="absolute left-3 top-3 bg-black px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-white">
            {product.badge}
          </span>
        )}
      </a>
      <a href={product.href}>
        <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">
          {product.category}
        </p>
        <h3 className="mb-1.5 text-sm font-semibold tracking-tight">
          {product.name}
        </h3>
        <p className="text-sm font-bold">{product.price}</p>
      </a>
    </div>
  );
}

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

const quickAddColors = [
  { bg: "bg-black", label: "Black" },
  { bg: "bg-white border border-gray-300", label: "White" },
  { bg: "bg-gray-500", label: "Gray" },
  { bg: "bg-stone-800", label: "Dark Brown" },
  { bg: "bg-slate-700", label: "Navy" },
];

const quickAddSizes = ["S", "M", "L", "XL", "2XL"];

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
              {product.category}
            </p>
            <h3 className="truncate text-sm font-semibold tracking-tight">
              {product.name}
            </h3>
            <p className="mt-1 text-sm font-bold">{product.price}</p>
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
            {quickAddSizes.map((size) => (
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

export default function CollectionContent() {
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleQuickAdd = useCallback((product: Product) => {
    setQuickAddProduct(product);
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
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

            <div className="mt-14 border-t border-gray-200 pt-8">
              <div className="flex items-center justify-center gap-2">
                <button className="flex h-10 w-10 items-center justify-center border border-gray-200 text-gray-400 transition-colors hover:border-black hover:text-black">
                  <ChevronLeft className="text-sm" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center bg-black text-xs font-semibold text-white">
                  1
                </button>
                <button className="flex h-10 w-10 items-center justify-center border border-gray-200 text-xs font-medium text-gray-400 transition-colors hover:border-black hover:text-black">
                  2
                </button>
                <button className="flex h-10 w-10 items-center justify-center border border-gray-200 text-xs font-medium text-gray-400 transition-colors hover:border-black hover:text-black">
                  3
                </button>
                <span className="px-1 text-xs text-gray-400">...</span>
                <button className="flex h-10 w-10 items-center justify-center border border-gray-200 text-xs font-medium text-gray-400 transition-colors hover:border-black hover:text-black">
                  8
                </button>
                <button className="flex h-10 w-10 items-center justify-center border border-gray-200 text-gray-400 transition-colors hover:border-black hover:text-black">
                  <ChevronRight className="text-sm" />
                </button>
              </div>
              <p className="mt-4 text-center text-[11px] uppercase tracking-widest text-gray-400">
                Halaman 1 dari 8
              </p>
            </div>
          </div>
        </div>

        {quickAddProduct && (
          <QuickAddModal
            product={quickAddProduct}
            onClose={() => setQuickAddProduct(null)}
          />
        )}
      </div>

      <MobileFilter
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
      />
    </>
  );
}
