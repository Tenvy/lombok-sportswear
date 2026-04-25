"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, ChevronRight, ChevronDown } from "lucide-react";

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
    <header className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-200 bg-white px-8">
      <div className="flex items-center gap-2 text-[12px]">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="text-[10px] text-gray-300" />}
            <span className={crumb.isLast ? "font-semibold" : "text-gray-400"}>
              {crumb.label}
            </span>
          </span>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
          <input
            type="text"
            placeholder="Search products, orders..."
            className="w-[260px] rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-[12px] transition-colors focus:border-gray-400 focus:outline-none"
          />
        </div>

        <button className="relative rounded-lg p-2 transition-colors hover:bg-gray-50">
          <Bell className="text-lg text-gray-500" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2.5 border-l border-gray-200 pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-[11px] font-bold text-white">
            AD
          </div>
          <div>
            <p className="text-[12px] font-semibold leading-tight">Admin Utama</p>
            <p className="text-[10px] text-gray-400">Super Admin</p>
          </div>
          <ChevronDown className="ml-1 text-xs text-gray-400" />
        </div>
      </div>
    </header>
  );
}
