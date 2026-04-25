"use client";

import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCategoryStore } from "@/src/store/useCategoryStore";


const defaultImage = "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=660&fit=crop";

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section id="categories" className="py-8 md:py-12">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] md:text-sm">
            Our Categories
          </h2>
          <div className="flex items-center gap-1 text-gray-300">
            <button onClick={() => scroll("left")} aria-label="Scroll left">
              <ChevronLeft className="size-4" />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="pl-4 lg:pl-[calc((100%-1400px)/2+2rem)]">
        <div
          ref={scrollRef}
          className="scroll-container flex gap-3 pr-8"
        >
          {categories.map((cat) => (
            <a
              key={cat.id}
              id={`coll-${cat.slug}`}
              href={`/category/${cat.slug}`}
              className="group relative block aspect-[3/4] w-[42vw] flex-shrink-0 overflow-hidden bg-gray-100 md:w-[28vw] lg:w-[18vw]"
            >
              <Image
                src={cat.productCategories[0]?.product?.image || defaultImage}
                alt={cat.name}
                fill
                sizes="(max-width: 767px) 42vw, (max-width: 1023px) 28vw, 18vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
