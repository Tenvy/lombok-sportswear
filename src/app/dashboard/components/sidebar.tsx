"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  LogOut,
} from "lucide-react";

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
    icon: <LayoutDashboard className="text-base" />,
    label: "Dashboard",
  },
  {
    id: "sidebar-products",
    href: "/dashboard/products",
    icon: <Package className="text-base" />,
    label: "Products",
  },
  {
    id: "sidebar-category",
    href: "/dashboard/category",
    icon: <Tag className="text-base" />,
    label: "Category",
  },
  {
    id: "sidebar-orders",
    href: "/dashboard/orders",
    icon: <ShoppingCart className="text-base" />,
    label: "Orders",
    badge: 5,
  },
];

const managementLinks: SidebarLink[] = [
  {
    id: "sidebar-customers",
    href: "/dashboard/customers",
    icon: <Users className="text-base" />,
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
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${
              isActive
                ? "bg-gray-100 font-semibold text-black"
                : "text-gray-500 hover:bg-gray-50 hover:text-black"
            }`}
          >
            {link.icon}
            {link.label}
            {link.badge !== undefined && (
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
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
    <aside className="sticky top-0 flex h-screen w-[240px] flex-shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-100 px-6">
        <Image
          src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/brand-assets/heymale.id/logo-1776918650555.webp"
          alt="Lombok Sportswear"
          width={100}
          height={20}
          className="h-5 w-auto"
        />
        <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4 pt-2">
        <SidebarSection title="Main" links={mainLinks} pathname={pathname} />
        <SidebarSection title="Management" links={managementLinks} pathname={pathname} />
      </nav>
    </aside>
  );
}
