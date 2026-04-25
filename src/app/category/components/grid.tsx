"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCategoryStore } from "@/src/store/useCategoryStore";

interface CollectionCardProps {
  id: string;
  href: string;
  src: string;
  alt: string;
  count: string;
  label: string;
  aspect: "aspect-[4/5]" | "aspect-[16/10]";
  labelSize: "text-2xl lg:text-3xl" | "text-xl lg:text-2xl";
}

function CollectionCard({
  id,
  href,
  src,
  alt,
  count,
  label,
  aspect,
  labelSize,
}: CollectionCardProps) {
  return (
    <Link
      id={id}
      href={href}
      className="collection-card group relative block overflow-hidden bg-gray-100"
    >
      <div className={`${aspect} relative`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="collection-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 lg:p-10">
          <p className="collection-count mb-2 text-[10px] uppercase tracking-[0.25em] text-white/50 opacity-70 transition-opacity duration-300">
            {count}
          </p>
          <h3
            className={`collection-label ${labelSize} font-black uppercase tracking-wider text-white transition-all duration-500`}
          >
            {label}
          </h3>
          <div className="collection-arrow mt-4 inline-flex -translate-x-2 items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Explore <ArrowRight className="size-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CollectionsGrid() {
  const { categories, loading, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);


  const collections = categories.map((cat, index) => ({
    id: `category-${cat.slug}-link`,
    href: `/category/${cat.slug}`,
    src: cat.productCategories[0]?.product?.image || "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&h=560&fit=crop",
    alt: `${cat.name} Category`,
    count: `${cat._count?.productCategories || 0} Produk`,
    label: cat.name,
    aspect: index < 3 ? "aspect-[4/5]" as const : "aspect-[16/10]" as const,
    labelSize: index < 3 ? "text-2xl lg:text-3xl" as const : "text-xl lg:text-2xl" as const,
  }));

  if (loading) {
    return (
      <section className="bg-white pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-gray-400">Loading categories...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {collections.map((c) => (
            <CollectionCard key={c.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
