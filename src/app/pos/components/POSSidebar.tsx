"use client";

import { 
  ShoppingCart, 
  Package, 
  Settings, 
  Users, 
  FileText, 
  LayoutDashboard,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingCart, label: "Cashier", href: "/pos" },
  { icon: Package, label: "Inventory", href: "/dashboard/products" },
  { icon: FileText, label: "Reports", href: "/dashboard/orders" },
  { icon: Users, label: "Customers", href: "/dashboard/customers" },
  { icon: Settings, label: "Settings", href: "#" },
];

export default function POSSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-24 flex-col border-r border-gray-100 bg-white lg:w-64">
      <div className="flex h-20 items-center justify-center border-b border-gray-50 px-6 lg:justify-start">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-lg shadow-black/20">
          <span className="text-xl font-black italic">G</span>
        </div>
        <span className="ml-3 hidden text-xl font-black tracking-tighter lg:block">ANTIGRAVITY</span>
      </div>
      
      <nav className="flex-1 space-y-1.5 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group flex items-center justify-center rounded-xl px-4 py-3.5 transition-all lg:justify-start ${
                isActive 
                  ? "bg-black text-white shadow-xl shadow-black/10" 
                  : "text-gray-400 hover:bg-gray-50 hover:text-black"
              }`}
            >
              <item.icon className={`size-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-black"}`} />
              <span className={`ml-4 hidden text-[11px] font-bold uppercase tracking-widest lg:block`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-50 p-4">
        <button className="flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500 lg:justify-start">
          <LogOut className="size-5" />
          <span className="ml-4 hidden text-[11px] font-bold uppercase tracking-widest lg:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}
