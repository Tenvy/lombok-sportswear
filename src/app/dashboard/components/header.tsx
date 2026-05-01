"use client";

import { usePathname } from "next/navigation";
import { CaretRight, SignOut } from "@phosphor-icons/react";

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  products: "Products",
  content: "Content",
  orders: "Orders",
  customers: "Customers",
  category: "Category",
  analytics: "Analytics",
  pos: "Point of Sale",
  settings: "Settings",
};

export default function DashboardHeader() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => ({
    label: routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
    isLast: index === segments.length - 1,
  }));

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-2 text-[13px]">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <CaretRight size={14} className="text-gray-300" />}
            <span className={crumb.isLast ? "font-semibold" : "text-gray-400"}>
              {crumb.label}
            </span>
          </span>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2.5 border-l border-gray-200 pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
            AD
          </div>
          <div className="pr-4">
            <p className="text-[13px] font-semibold leading-tight">Admin Utama</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
          <SignOut size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}
