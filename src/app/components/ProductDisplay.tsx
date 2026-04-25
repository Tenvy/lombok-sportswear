"use client";

import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProductStore } from "@/src/store/useProductStore";

interface Product {
  id: string;
  slug: string;
  image: string;
  name: string;
  price: number;
  soldOut?: boolean;
}

function ProductCard({ product }: { product: Product }) {
  if (product.soldOut) {
    return (
      <div className="block w-[38vw] flex-shrink-0 cursor-default md:w-[22vw] lg:w-[15vw]">
        <div className="group relative aspect-[5/6] overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 767px) 38vw, (max-width: 1023px) 22vw, 15vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-black px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
              Sold Out
            </span>
          </div>
        </div>
        <div className="mt-2.5">
          <p className="truncate text-[11px] font-medium tracking-tight text-gray-300">
            {product.name}
          </p>
          <p className="mt-0.5 text-[11px] text-gray-300 line-through">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link
      id={product.id}
      href={`/product/${product.slug}`}
      className="group block w-[38vw] flex-shrink-0 md:w-[22vw] lg:w-[15vw]"
    >
      <div className="group relative aspect-[5/6] overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 767px) 38vw, (max-width: 1023px) 22vw, 15vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-2.5">
        <p className="truncate text-[11px] font-medium tracking-tight">
          {product.name}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-400">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </Link>
  );
}

export default function ProductDisplay() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts("category=men");
  }, [fetchProducts]);

  if (loading) {
    return (
      <section id="men" className="mt-6">
        <div className="">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&h=1000&fit=crop&q=80"
            alt="images"
            width={1800}
            height={1000}
          />
        </div>
        <div className="py-8 md:py-12">
          <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] md:text-sm">
                For Men
              </h2>
            </div>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="men" className="mt-6">
      <div className="">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&h=1000&fit=crop&q=80"
          alt="images"
          width={1800}
          height={1000}
        />
      </div>

      <div className="py-8 md:py-12">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] md:text-sm">
              For Men
            </h2>
            <a
              id="men-see-all"
              href="/products?category=men"
              className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 transition-colors hover:text-black"
            >
              See All <ArrowRight className="size-3" />
            </a>
          </div>
        </div>

        <div className="pl-4 lg:pl-[calc((100%-1400px)/2+2rem)]">
          <div
            ref={scrollRef}
            className="scroll-container flex gap-3 pr-8"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
