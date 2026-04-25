import Image from "next/image";
import { MdiInstagram } from "@/src/icons/instagram";
import { IcBaselineTiktok } from "@/src/icons/tiktok";
import { RiTwitterXFill } from "@/src/icons/x";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 px-4 pb-10 pt-14 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/brand-assets/heymale.id/logo-1776918650555.webp"
              alt="Lombok Sportswear"
              width={100}
              height={100}
              className="mb-7 h-5 w-auto"
            />
            <div className="flex gap-5">
              <a
                id="f-ig"
                href="#"
                className="transition-colors hover:text-gray-400"
              >
                <MdiInstagram className="size-[18px]" />
              </a>
              <a
                id="f-tk"
                href="#"
                className="transition-colors hover:text-gray-400"
              >
                <IcBaselineTiktok className="size-[18px]" />
              </a>
              <a
                id="f-tw"
                href="#"
                className="transition-colors hover:text-gray-400"
              >
                <RiTwitterXFill className="size-[18px]" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em]">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  id="f-men-link"
                  href="#men"
                  className="text-[10px] uppercase tracking-[0.1em] text-gray-400 transition-colors hover:text-black"
                >
                  Men
                </a>
              </li>
              <li>
                <a
                  id="f-women-link"
                  href="#women"
                  className="text-[10px] uppercase tracking-[0.1em] text-gray-400 transition-colors hover:text-black"
                >
                  Women
                </a>
              </li>
              <li>
                <a
                  id="f-categories-link"
                  href="/category"
                  className="text-[10px] uppercase tracking-[0.1em] text-gray-400 transition-colors hover:text-black"
                >
                  Categories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em]">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  id="f-faq-link"
                  href="#"
                  className="text-[10px] uppercase tracking-[0.1em] text-gray-400 transition-colors hover:text-black"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  id="f-ship-link"
                  href="#"
                  className="text-[10px] uppercase tracking-[0.1em] text-gray-400 transition-colors hover:text-black"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  id="f-ret-link"
                  href="#"
                  className="text-[10px] uppercase tracking-[0.1em] text-gray-400 transition-colors hover:text-black"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em]">
              Story
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  id="f-about-link"
                  href="#"
                  className="text-[10px] uppercase tracking-[0.1em] text-gray-400 transition-colors hover:text-black"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  id="f-contact-link"
                  href="#"
                  className="text-[10px] uppercase tracking-[0.1em] text-gray-400 transition-colors hover:text-black"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-300">
            © 2025 Lombok Sportswear. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
