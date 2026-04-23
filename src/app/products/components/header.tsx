import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProductsHeader() {
  return (
    <section className="bg-white pt-10 pb-10 lg:pt-12 lg:pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
          <Link
            id="breadcrumb-home-link"
            href="/"
            className="transition-colors hover:text-black"
          >
            Home
          </Link>
          <ChevronRight className="size-[10px]" />
          <span className="text-black">Produk</span>
        </div>
        <div className="max-w-2xl">
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight lg:text-7xl">
            SEMUA PRODUK
          </h1>
        </div>
      </div>
    </section>
  );
}
