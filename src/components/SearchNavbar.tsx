"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  href?: string;
  src: string;
  name: string;
  price: string;
  soldOut?: boolean;
}

const allProducts: Product[] = [
  {
    id: "p-m-1",
    href: "#",
    src: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=600&fit=crop",
    name: "Classic Crew Tee",
    price: "Rp 249.000",
  },
  {
    id: "p-m-2",
    href: "#",
    src: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=500&h=600&fit=crop",
    name: "Training Polo",
    price: "Rp 199.000",
  },
  {
    id: "p-m-3",
    src: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=600&fit=crop",
    name: "Essential Hoodie",
    price: "Rp 429.000",
    soldOut: true,
  },
  {
    id: "p-m-4",
    href: "#",
    src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop",
    name: "Sport Zip Jacket",
    price: "Rp 549.000",
  },
  {
    id: "p-m-5",
    href: "#",
    src: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
    name: "Pullover Hoodie",
    price: "Rp 389.000",
  },
  {
    id: "p-m-6",
    href: "#",
    src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=600&fit=crop",
    name: "Slim Jogger Pants",
    price: "Rp 329.000",
  },
  {
    id: "p-m-7",
    href: "#",
    src: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=600&fit=crop",
    name: "Graphic Tee Bold",
    price: "Rp 219.000",
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.href ?? "#"}
      className="group block w-[38vw] flex-shrink-0 md:w-[22vw] lg:w-[15vw]"
    >
      <div className="group relative aspect-[5/6] overflow-hidden bg-gray-100">
        <Image
          src={product.src}
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
          {product.price}
        </p>
      </div>
    </a>
  );
}

interface SearchNavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchNavbar({ isOpen, onClose }: SearchNavbarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim()
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="sticky top-0 z-[60]">
      <div className="bg-white">
        <div className="border-b border-gray-100">
          <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-6 lg:px-10">
            <Search className="size-[18px] shrink-0 text-gray-400" />
            <input
              ref={inputRef}
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

        {results.length > 0 && (
          <div className="border-b border-gray-100">
            <div className="mx-auto max-w-[1400px] px-6 py-6 lg:px-10">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-[0.25em]">
                  {results.length} Result{results.length !== 1 ? "s" : ""}
                </h3>
                <button
                  onClick={onClose}
                  className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 transition-colors hover:text-black"
                >
                  Close <ArrowRight className="size-3" />
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="border-b border-gray-100">
            <div className="mx-auto max-w-[1400px] px-6 py-12 text-center lg:px-10">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                No products found for &ldquo;{query}&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>

      <div
        className="fixed inset-0 top-16 bg-black/40 -z-10"
        onClick={onClose}
      />
    </div>
  );
}
