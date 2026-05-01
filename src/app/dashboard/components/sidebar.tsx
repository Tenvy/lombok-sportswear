"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SquaresFour,
  Package,
  ShoppingCart,
  Users,
  Tag,
  SignOut,
} from "@phosphor-icons/react";

interface SidebarLink {
  id: string;
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

const mainLinks: SidebarLink[] = [
  {
    id: "sidebar-dashboard",
    href: "/dashboard",
    icon: <SquaresFour size={16} />,
    label: "Dashboard",
  },
  {
    id: "sidebar-products",
    href: "/dashboard/products",
    icon: <Package size={16} />,
    label: "Products",
  },
  {
    id: "sidebar-category",
    href: "/dashboard/category",
    icon: <Tag size={16} />,
    label: "Category",
  },
  {
    id: "sidebar-orders",
    href: "/dashboard/orders",
    icon: <ShoppingCart size={16} />,
    label: "Orders",
    badge: 5,
  },
];

const managementLinks: SidebarLink[] = [
  {
    id: "sidebar-customers",
    href: "/dashboard/customers",
    icon: <Users size={16} />,
    label: "Customers",
  },
];

function SidebarSection({
  title,
  links,
  pathname,
}: {
  title: string;
  links: SidebarLink[];
  pathname: string;
}) {
  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.id}
            id={link.id}
            href={link.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors ${
              isActive
                ? "bg-gray-100 font-semibold text-black"
                : "text-gray-500 hover:bg-gray-50 hover:text-black"
            }`}
          >
            {link.icon}
            {link.label}
            {link.badge !== undefined && (
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-semibold text-white">
                {link.badge}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[256px] flex-shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-14 items-center border-b border-gray-100 px-5">
        <Image
          src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/brand-assets/heymale.id/logo-1776918650555.webp"
          alt="Lombok Sportswear"
          width={100}
          height={20}
          className="h-5 w-auto"
        />
        <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4 pt-3">
        <SidebarSection title="Main" links={mainLinks} pathname={pathname} />
        <SidebarSection title="Management" links={managementLinks} pathname={pathname} />
      </nav>
    </aside>
  );
}
