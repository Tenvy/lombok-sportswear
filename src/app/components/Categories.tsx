"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const collections = [
  {
    id: "coll-men",
    href: "#men",
    src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=660&fit=crop",
    label: "Men",
  },
  {
    id: "coll-women",
    href: "#women",
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=660&fit=crop",
    label: "Women",
  },
  {
    id: "coll-tops",
    href: "#",
    src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=660&fit=crop",
    label: "Tops",
  },
  {
    id: "coll-bottoms",
    href: "#",
    src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=660&fit=crop",
    label: "Bottoms",
  },
  {
    id: "coll-accessories",
    href: "#",
    src: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=660&fit=crop",
    label: "Accessories",
  },
  {
    id: "coll-outerwear",
    href: "#",
    src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=660&fit=crop",
    label: "Outerwear",
  },
  {
    id: "coll-new",
    href: "#",
    src: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=660&fit=crop",
    label: "New Arrivals",
  },
  {
    id: "coll-sale",
    href: "#",
    src: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=660&fit=crop",
    label: "Sale",
  },
];

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
          {collections.map((item) => (
            <a
              key={item.id}
              id={item.id}
              href={item.href}
              className="group relative block aspect-[3/4] w-[42vw] flex-shrink-0 overflow-hidden bg-gray-100 md:w-[28vw] lg:w-[18vw]"
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(max-width: 767px) 42vw, (max-width: 1023px) 28vw, 18vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
