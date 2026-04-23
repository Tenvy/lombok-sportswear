"use client";

import { useState } from "react";
import { Search, ShoppingBag, Menu, User } from "lucide-react";
import Image from "next/image";
import MobileNavbar from "./MobileNavbar";
import SearchNavbar from "./SearchNavbar";

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center px-6 lg:px-10">
          <div className="hidden items-center gap-7 md:flex">
            <a
              id="nav-men-link"
              href="#men"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-gray-400"
            >
              Men
            </a>
            <a
              id="nav-women-link"
              href="#women"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-gray-400"
            >
              Women
            </a>
            <a
              id="nav-collections-link"
              href="#collections"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-gray-400"
            >
              Collections
            </a>
          </div>

          <a id="nav-logo-link" href="#" className="absolute left-1/2 -translate-x-1/2 font-semibold">
            {/* <Image
              src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/brand-assets/heymale.id/logo-1776918650555.webp"
              alt="Lombok Sportswear"
              width={200}
              height={200}
              className="h-6 w-auto"
            /> */}
            4miliseconds
          </a>

          <div className="ml-auto flex items-center gap-5">
            <button
              id="nav-search-link"
              className="transition-colors hover:text-gray-400"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="size-[18px]" />
            </button>
            <a
              id="nav-cart-link"
              href="#"
              className="relative transition-colors hover:text-gray-400"
            >
              <ShoppingBag className="size-[18px]" />
              <span className="absolute -right-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-black text-[8px] font-bold text-white">
                0
              </span>
            </a>
            <a
              id="nav-user-link"
              href="#"
              className="transition-colors hover:text-gray-400"
            >
              <User className="size-[18px]" />
            </a>
            <button
              className="md:hidden"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      <SearchNavbar
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <MobileNavbar
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onSearchClick={() => {
          setMobileNavOpen(false);
          setSearchOpen(true);
        }}
      />
    </>
  );
}
