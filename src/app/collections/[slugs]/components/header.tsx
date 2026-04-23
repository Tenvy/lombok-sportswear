import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface CollectionHeaderProps {
  name?: string;
  productCount?: number;
}

export default function CollectionSlugHeader({
  name = "Collection",
  productCount,
}: CollectionHeaderProps) {
  return (
    <section className=" bg-white pt-10 lg:pt-12 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
          <Link href="/" className="transition-colors hover:text-black">
            Home
          </Link>
          <ChevronRight className="size-[10px]" />
          <Link href="/collections" className="transition-colors hover:text-black">
            Koleksi
          </Link>
          <ChevronRight className="size-[10px]" />
          <span className="text-black">{name}</span>
        </div>
        <h1 className="text-3xl font-black uppercase tracking-wider md:text-5xl lg:text-6xl">
          {name}
        </h1>
        {productCount !== undefined && (
          <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-gray-400">
            {productCount} Produk
          </p>
        )}
      </div>
    </section>
  );
}
