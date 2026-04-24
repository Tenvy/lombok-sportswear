"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  href?: string;
  src: string;
  name: string;
  price: string;
  soldOut?: boolean;
}

const products: Product[] = [
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
  if (product.soldOut) {
    return (
      <div className="block w-[38vw] flex-shrink-0 cursor-default md:w-[22vw] lg:w-[15vw]">
        <div className="group relative aspect-[5/6] overflow-hidden bg-gray-100">
          <Image
            src={product.src}
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
            {product.price}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link
      id={product.id}
      href={`/product/${product.id}`}
      className="group block w-[38vw] flex-shrink-0 md:w-[22vw] lg:w-[15vw]"
    >
      <div className="group relative aspect-[5/6] overflow-hidden bg-gray-100">
        <Image
          src={product.src}
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
          {product.price}
        </p>
      </div>
    </Link>
  );
}

export default function ProductDisplay() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
              href="#"
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
