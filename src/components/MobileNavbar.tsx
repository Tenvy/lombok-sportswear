"use client";

import { Search, X, ShoppingBag, User } from "lucide-react";
import Image from "next/image";

interface MobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchClick: () => void;
}

const navLinks = [
  { label: "Men", href: "#men" },
  { label: "Women", href: "#women" },
  { label: "Collections", href: "#collections" },
];

export default function MobileNavbar({ isOpen, onClose, onSearchClick }: MobileNavbarProps) {
  return (
    <nav
      className={`bg-white z-50 fixed bottom-0 left-0 h-full max-w-full shadow-xl transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ width: "90vw", maxWidth: "398px" }}
    >
      <div className="bg-white relative flex h-dvh flex-col flex-nowrap overflow-hidden">
        <div className="border-gray-100 flex flex-none items-center justify-between p-2">
          <a href="#" className="shrink-0">
            <Image
              src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/brand-assets/heymale.id/logo-1776918650555.webp"
              alt="Lombok Sportswear"
              width={200}
              height={200}
              className="h-6 w-auto"
            />
          </a>
          <button
            type="button"
            className="text-neutral hover:bg-neutral/20 inline-flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-lg transition-colors"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-x-hidden px-2">
          <ul className="px-3" style={{ paddingBottom: "32px" }}>
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-gray-100">
                <a
                  href={link.href}
                  className="cursor-pointer flex items-center gap-2 py-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral transition-colors hover:text-gray-400"
                  onClick={onClose}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 left-2 right-2 flex items-center gap-5 border-t border-gray-100 bg-white p-4">
            <button
              className="transition-colors hover:text-gray-400"
              onClick={() => {
                onClose();
                onSearchClick();
              }}
            >
              <Search className="size-[18px]" />
            </button>
            <a
              href="#"
              className="relative transition-colors hover:text-gray-400"
              onClick={onClose}
            >
              <ShoppingBag className="size-[18px]" />
              <span className="absolute -right-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-black text-[8px] font-bold text-white">
                0
              </span>
            </a>
            <a
              href="#"
              className="transition-colors hover:text-gray-400"
              onClick={onClose}
            >
              <User className="size-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
