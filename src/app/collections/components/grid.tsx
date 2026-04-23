import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
    <a
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
    </a>
  );
}

const collections: CollectionCardProps[] = [
  {
    id: "collection-men-link",
    href: "/collections/men",
    src: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1000&fit=crop",
    alt: "Men Collection",
    count: "42 Produk",
    label: "Men",
    aspect: "aspect-[4/5]",
    labelSize: "text-2xl lg:text-3xl",
  },
  {
    id: "collection-women-link",
    href: "/collections/women",
    src: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=800&h=1000&fit=crop",
    alt: "Women Collection",
    count: "38 Produk",
    label: "Women",
    aspect: "aspect-[4/5]",
    labelSize: "text-2xl lg:text-3xl",
  },
  {
    id: "collection-men-tops-link",
    href: "/collections/men-tops",
    src: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=900&h=560&fit=crop",
    alt: "Men Tops",
    count: "24 Produk",
    label: "Men Tops",
    aspect: "aspect-[4/5]",
    labelSize: "text-xl lg:text-2xl",
  },
  {
    id: "collection-women-tops-link",
    href: "/collections/women-tops",
    src: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=900&h=560&fit=crop",
    alt: "Women Tops",
    count: "18 Produk",
    label: "Women Tops",
    aspect: "aspect-[16/10]",
    labelSize: "text-xl lg:text-2xl",
  },
  {
    id: "collection-accessories-link",
    href: "/collections/accessories",
    src: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&h=560&fit=crop",
    alt: "Accessories",
    count: "12 Produk",
    label: "Accessories",
    aspect: "aspect-[16/10]",
    labelSize: "text-xl lg:text-2xl",
  },
  {
    id: "collection-outerwear-link",
    href: "/collections/outerwear",
    src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&h=560&fit=crop",
    alt: "Outerwear",
    count: "16 Produk",
    label: "Outerwear",
    aspect: "aspect-[16/10]",
    labelSize: "text-xl lg:text-2xl",
  },
];

export default function CollectionsGrid() {
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
