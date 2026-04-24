"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ShoppingBag,
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

      {quickAddProduct && (
        <QuickAddModal
          product={quickAddProduct}
          onClose={() => setQuickAddProduct(null)}
        />
      )}
    </section>
  );
}
