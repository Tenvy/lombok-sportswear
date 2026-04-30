"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  slug: string;
  image: string;
  name: string;
  price: number;
  soldOut?: boolean;
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      onClick={onClick}
      className="group block w-[38vw] flex-shrink-0 md:w-[22vw] lg:w-[15vw]"
    >
      <div className="group relative aspect-[5/6] overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 767px) 38vw, (max-width: 1023px) 22vw, 15vw"
          className={`object-cover transition-transform duration-300 ${
            product.soldOut ? "opacity-60" : "group-hover:scale-105"
          }`}
        />
        {product.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-black px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <div className="mt-2.5">
        <p
          className={`truncate text-[11px] font-medium tracking-tight ${
            product.soldOut ? "text-gray-300" : ""
          }`}
        >
          {product.name}
        </p>
        <p
          className={`mt-0.5 text-[11px] ${
            product.soldOut ? "text-gray-300 line-through" : "text-gray-400"
          }`}
        >
          Rp {product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </Link>
  );
}

interface SearchNavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchNavbar({ isOpen, onClose }: SearchNavbarProps) {
  const [query, setQuery] = useState("");
  const [fetchedResults, setFetchedResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?query=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setFetchedResults(data);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const results = query.trim() ? fetchedResults : [];

  if (!isOpen) return null;

  return (
    <div className="sticky top-0 z-[60]">
      <div className="bg-white shadow-xl">
        <div className="border-b border-gray-100">
          <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-6 lg:px-10">
            <Search className="size-[18px] shrink-0 text-gray-400" />
            <input
              ref={inputRef}
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-300"
            />
            <button
              onClick={onClose}
              className="transition-colors hover:text-gray-400"
            >
              <X className="size-[18px]" />
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-h-[70vh] overflow-y-auto">
          {loading && (
            <div className="h-0.5 w-full bg-gray-50 overflow-hidden">
              <div className="h-full bg-black animate-pulse w-full" />
            </div>
          )}

          {results.length > 0 && (
            <div className="border-b border-gray-100">
              <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                    {results.length} Result{results.length !== 1 ? "s" : ""}
                  </h3>
                  <button
                    onClick={onClose}
                    className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 transition-colors hover:text-black"
                  >
                    Close <ArrowRight className="size-3" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {results.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={onClose} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {query.trim() && !loading && results.length === 0 && (
            <div className="border-b border-gray-100">
              <div className="mx-auto max-w-[1400px] px-6 py-12 text-center lg:px-10">
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">
                  No products found for &ldquo;{query}&rdquo;
                </p>
              </div>
            </div>
          )}

          {!query.trim() && (
            <div className="mx-auto max-w-[1400px] px-6 py-20 text-center lg:px-10">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">
                Type to start searching...
              </p>
            </div>
          )}
        </div>
      </div>

      <div
        className="fixed inset-0 top-16 bg-black/40 -z-10"
        onClick={onClose}
      />
    </div>
  );
}
