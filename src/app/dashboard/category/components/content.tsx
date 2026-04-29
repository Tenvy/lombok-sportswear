"use client";

import { useState } from "react";
import {
  Plus,
  FolderTree,
  CheckCircle,
  Package,
  Clock,
  ChevronDown,
  Maximize2,
  Shirt,
  Tag,
  Briefcase,
  Sparkles,
  Gem,
  Sun,
  Snowflake,
  Percent,
  Crown,
  Zap,
  Folder,
  File,
  Minus,
} from "lucide-react";
import CategoryModal from "./modal";
import CategoriesTable from "./table";

const categories = [
  { id: "cat-mens", icon: Shirt, iconBg: "bg-gray-100", iconColor: "text-gray-500", name: "Men's Collection", sub: "Parent · 3 subcategories", slug: "mens-collection", desc: "Premium sportswear for men. All styles.", products: 156, status: "Active", created: "2 months ago", isParent: true, nameClass: "font-semibold" },
  { id: "cat-polo", icon: Tag, iconBg: "bg-gray-50", iconColor: "text-gray-400", name: "Polo Shirts", sub: "Child of Men's Collection", slug: "polo-shirts", desc: "Classic polo shirts for everyday wear", products: 42, status: "Active", created: "2 months ago", isParent: false, nameClass: "font-medium", isChild: true },
  { id: "cat-tshirts", icon: Tag, iconBg: "bg-gray-50", iconColor: "text-gray-400", name: "T-Shirts", sub: "Child of Men's Collection", slug: "t-shirts", desc: "Comfortable crew neck and v-neck tees", products: 38, status: "Active", created: "6 weeks ago", isParent: false, nameClass: "font-medium", isChild: true },
  { id: "cat-casual-men", icon: Tag, iconBg: "bg-gray-50", iconColor: "text-gray-400", name: "Casual Wear", sub: "Child of Men's Collection", slug: "casual-wear-men", desc: "Relaxed everyday clothing for men", products: 35, status: "Active", created: "5 weeks ago", isParent: false, nameClass: "font-medium", isChild: true },
  { id: "cat-formal", icon: Briefcase, iconBg: "bg-gray-100", iconColor: "text-gray-500", name: "Formal Wear", sub: "Parent · No subcategories", slug: "formal-wear", desc: "Blazers, dress shirts, and formal pants", products: 29, status: "Active", created: "1 month ago", isParent: true, nameClass: "font-semibold" },
  { id: "cat-womens", icon: Sparkles, iconBg: "bg-gray-100", iconColor: "text-gray-500", name: "Women's Collection", sub: "Parent · 3 subcategories", slug: "womens-collection", desc: "Stylish sportswear for women", products: 148, status: "Active", created: "2 months ago", isParent: true, nameClass: "font-semibold" },
  { id: "cat-dresses", icon: Tag, iconBg: "bg-gray-50", iconColor: "text-gray-400", name: "Dresses", sub: "Child of Women's Collection", slug: "dresses", desc: "Sport dresses and active dresses", products: 54, status: "Active", created: "6 weeks ago", isParent: false, nameClass: "font-medium", isChild: true },
  { id: "cat-blouses", icon: Tag, iconBg: "bg-gray-50", iconColor: "text-gray-400", name: "Blouses", sub: "Child of Women's Collection", slug: "blouses", desc: "Elegant blouses and sport tops", products: 45, status: "Active", created: "5 weeks ago", isParent: false, nameClass: "font-medium", isChild: true },
  { id: "cat-casual-women", icon: Tag, iconBg: "bg-gray-50", iconColor: "text-gray-400", name: "Casual Wear", sub: "Child of Women's Collection", slug: "casual-wear-women", desc: "Comfortable everyday wear for women", products: 49, status: "Active", created: "4 weeks ago", isParent: false, nameClass: "font-medium", isChild: true },
  { id: "cat-accessories", icon: Gem, iconBg: "bg-gray-100", iconColor: "text-gray-500", name: "Accessories", sub: "Parent · Belts, bags, fragrance", slug: "accessories", desc: "Belts, bags, perfumes, and more", products: 48, status: "Active", created: "3 weeks ago", isParent: true, nameClass: "font-semibold" },
  { id: "cat-summer", icon: Sun, iconBg: "bg-amber-50", iconColor: "text-amber-500", name: "Summer Collection", sub: "Seasonal · Featured", slug: "summer-collection", desc: "Hot weather essentials and light fabrics", products: 32, status: "Active", created: "1 week ago", isParent: true, nameClass: "font-semibold" },
  { id: "cat-winter", icon: Snowflake, iconBg: "bg-gray-100", iconColor: "text-gray-400", name: "Winter Collection", sub: "Seasonal · Archived", slug: "winter-collection", desc: "Cold weather styles, currently archived", products: 0, status: "Inactive", created: "4 months ago", isParent: true, nameClass: "font-semibold", faded: true },
  { id: "cat-sale", icon: Percent, iconBg: "bg-sky-50", iconColor: "text-sky-500", name: "Sale Items", sub: "Dynamic · Pending setup", slug: "sale-items", desc: "Discounted items, setup in progress", products: 0, status: "Draft", created: "3 days ago", isParent: true, nameClass: "font-semibold", nameColor: "text-sky-700", subColor: "text-sky-400" },
  { id: "cat-limited", icon: Crown, iconBg: "bg-gray-100", iconColor: "text-amber-500", name: "Limited Edition", sub: "Exclusive drops · Time-limited", slug: "limited-edition", desc: "Exclusive limited run products", products: 18, status: "Active", created: "1 week ago", isParent: true, nameClass: "font-semibold" },
  { id: "cat-new-arrivals", icon: Zap, iconBg: "bg-emerald-50", iconColor: "text-emerald-500", name: "New Arrivals", sub: "Dynamic · Auto-populated", slug: "new-arrivals", desc: "Latest products added in the last 30 days", products: 25, status: "Active", created: "2 hours ago", isParent: true, nameClass: "font-semibold" },
];

const kpis = [
  { icon: FolderTree, iconBg: "bg-gray-100", iconColor: "text-gray-600", badge: "+3 new", badgeColor: "text-emerald-600 bg-emerald-50", label: "Total Categories", value: "24" },
  { icon: CheckCircle, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", badge: "91.7%", badgeColor: "text-emerald-600 bg-emerald-50", label: "Active", value: "22", valueColor: "text-emerald-600" },
  { icon: Package, iconBg: "bg-sky-50", iconColor: "text-sky-600", badge: "+24", badgeColor: "text-emerald-600 bg-emerald-50", label: "Total Products", value: "412" },
  { icon: Clock, iconBg: "bg-amber-50", iconColor: "text-amber-600", badge: null, badgeColor: "", label: "Last Updated", value: "2h ago" },
];

export default function CategoryContent() {
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState<typeof categories[number] | null>(null);

  return (
    <main className="flex-1 overflow-y-auto px-8 py-6">
      {showModal && (
        <CategoryModal
          category={editCategory ?? undefined}
          onClose={() => {
            setShowModal(false);
            setEditCategory(null);
          }}
        />
      )}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Category Management</h1>
          <p className="mt-0.5 text-[12px] text-gray-400">
            Organize and manage product categories. <span className="font-medium text-gray-600">24 categories total</span>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[11px] font-medium text-gray-500 focus:border-gray-400 focus:outline-none">
            <option>Name (A-Z)</option>
            <option>Created Date (Newest)</option>
            <option>Products Count (High)</option>
          </select>
          <button
            onClick={() => {
              setEditCategory(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-gray-800"
          >
            <Plus className="text-sm" />
            Add Category
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${kpi.iconBg}`}>
                <kpi.icon className={`text-base ${kpi.iconColor}`} />
              </div>
              {kpi.badge && <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${kpi.badgeColor}`}>{kpi.badge}</span>}
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-gray-400">{kpi.label}</p>
            <p className={`mt-0.5 text-lg font-bold tracking-tight ${kpi.valueColor || ""}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <CategoriesTable
        categories={categories}
        onEdit={(cat) => {
          setEditCategory(cat);
          setShowModal(true);
        }}
      />

      <div className="mb-8 mt-6">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-bold">Category Hierarchy</h3>
              <p className="mt-0.5 text-[11px] text-gray-400">Visual overview of parent-child structure</p>
            </div>
            <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100">
              <Maximize2 className="text-sm" />
            </button>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
              <ChevronDown className="text-xs text-gray-400" />
              <Folder className="text-sm text-gray-600" />
              <span className="text-[12px] font-semibold">Men&apos;s Collection</span>
              <span className="ml-auto text-[10px] font-medium text-gray-400">156</span>
            </div>
            <div className="ml-6 space-y-0.5">
              {[
                { name: "Polo Shirts", count: 42 },
                { name: "T-Shirts", count: 38 },
                { name: "Casual Wear", count: 35 },
              ].map((child) => (
                <div key={child.name} className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors hover:bg-gray-50">
                  <File className="text-xs text-gray-400" />
                  <span className="text-[11px] text-gray-600">{child.name}</span>
                  <span className="ml-auto text-[10px] text-gray-400">{child.count}</span>
                </div>
              ))}
            </div>

            <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
              <ChevronDown className="text-xs text-gray-400" />
              <Folder className="text-sm text-gray-600" />
              <span className="text-[12px] font-semibold">Women&apos;s Collection</span>
              <span className="ml-auto text-[10px] font-medium text-gray-400">148</span>
            </div>
            <div className="ml-6 space-y-0.5">
              {[
                { name: "Dresses", count: 54 },
                { name: "Blouses", count: 45 },
                { name: "Casual Wear", count: 49 },
              ].map((child) => (
                <div key={child.name} className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors hover:bg-gray-50">
                  <File className="text-xs text-gray-400" />
                  <span className="text-[11px] text-gray-600">{child.name}</span>
                  <span className="ml-auto text-[10px] text-gray-400">{child.count}</span>
                </div>
              ))}
            </div>

            {[
              { name: "Formal Wear", count: 29, iconColor: "text-gray-600" },
              { name: "Accessories", count: 48, iconColor: "text-gray-600" },
              { name: "Limited Edition", count: 18, iconColor: "text-amber-500" },
              { name: "New Arrivals", count: 25, iconColor: "text-emerald-500" },
            ].map((cat) => (
              <div key={cat.name} className="mt-1.5 flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50">
                <Minus className="text-xs text-gray-300" />
                <Folder className={`text-sm ${cat.iconColor}`} />
                <span className="text-[12px] font-semibold">{cat.name}</span>
                <span className="ml-auto text-[10px] font-medium text-gray-400">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
