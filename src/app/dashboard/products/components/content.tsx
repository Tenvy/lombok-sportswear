"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Download,
  Upload,
  Plus,
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Pencil,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CircleCheck,
  CircleX,
  CircleDashed,
  List,
  LayoutGrid,
} from "lucide-react";

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-gray-100 pt-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400"
      >
        {title}
        <ChevronDown
          className={`size-3 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-2.5">{children}</div>}
    </div>
  );
}

const products = [
  { id: "prod-1", name: "Lombok Classic Polo", sku: "LMB-PLO-001", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=80&h=80&fit=crop", category: "Men", categoryColor: "bg-gray-100 text-gray-600", price: "Rp 289.000", stock: 54, stockColor: "text-emerald-600", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-2", name: "Sport Zip Jacket", sku: "LMB-JKT-002", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&h=80&fit=crop", category: "Men", categoryColor: "bg-gray-100 text-gray-600", price: "Rp 459.000", stock: 32, stockColor: "text-emerald-600", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-3", name: "Essential Hoodie Black", sku: "LMB-HOD-003", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=80&h=80&fit=crop", category: "Men", categoryColor: "bg-gray-100 text-gray-600", price: "Rp 389.000", stock: 7, stockColor: "text-amber-500", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-4", name: "Wide Leg Trousers", sku: "LMB-PNT-004", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=80&h=80&fit=crop", category: "Bottoms", categoryColor: "bg-gray-100 text-gray-600", price: "Rp 349.000", stock: 28, stockColor: "text-emerald-600", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-5", name: "Sport Bra Impact", sku: "LMB-WBR-005", image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=80&h=80&fit=crop", category: "Women", categoryColor: "bg-pink-50 text-pink-600", price: "Rp 249.000", stock: 5, stockColor: "text-amber-500", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-6", name: "Pullover Hoodie Gray", sku: "LMB-HOD-006", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=80&h=80&fit=crop", category: "Men", categoryColor: "bg-gray-100 text-gray-600", price: "Rp 369.000", stock: 0, stockColor: "text-red-500", status: "Out of Stock", statusColor: "text-red-600 bg-red-50", statusIcon: <CircleX className="text-[10px]" />, outOfStock: true },
  { id: "prod-7", name: "Track Jacket Pro", sku: "LMB-JKT-007", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=80&h=80&fit=crop", category: "Outerwear", categoryColor: "bg-gray-100 text-gray-600", price: "Rp 489.000", stock: 19, stockColor: "text-emerald-600", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-8", name: "High-Rise Leggings", sku: "LMB-WLG-008", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=80&h=80&fit=crop", category: "Women", categoryColor: "bg-pink-50 text-pink-600", price: "Rp 319.000", stock: 45, stockColor: "text-emerald-600", status: "Draft", statusColor: "text-gray-500 bg-gray-100", statusIcon: <CircleDashed className="text-[10px]" />, outOfStock: false },
  { id: "prod-9", name: "Slim Jogger Pants", sku: "LMB-PNT-009", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=80&h=80&fit=crop", category: "Bottoms", categoryColor: "bg-gray-100 text-gray-600", price: "Rp 329.000", stock: 8, stockColor: "text-amber-500", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-10", name: "Leather Woven Belt", sku: "LMB-ACC-010", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=80&h=80&fit=crop", category: "Accessories", categoryColor: "bg-amber-50 text-amber-600", price: "Rp 179.000", stock: 0, stockColor: "text-red-500", status: "Out of Stock", statusColor: "text-red-600 bg-red-50", statusIcon: <CircleX className="text-[10px]" />, outOfStock: true },
  { id: "prod-11", name: "Zip Hoodie Essential", sku: "LMB-HOD-011", image: "https://placehold.co/80x80/1a1a1a/888?text=Image", category: "Men", categoryColor: "bg-gray-100 text-gray-600", price: "Rp 419.000", stock: 22, stockColor: "text-emerald-600", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-12", name: "Performance Tank", sku: "LMB-WTK-012", image: "https://placehold.co/80x80/1a1a1a/888?text=Image", category: "Women", categoryColor: "bg-pink-50 text-pink-600", price: "Rp 179.000", stock: 61, stockColor: "text-emerald-600", status: "Draft", statusColor: "text-gray-500 bg-gray-100", statusIcon: <CircleDashed className="text-[10px]" />, outOfStock: false },
];

export default function ProductsContent() {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Products</h1>
          <p className="mt-0.5 text-[12px] text-gray-400">
            Manage your product catalog, inventory, and pricing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-[12px] font-medium transition-colors hover:border-gray-400">
            <Download className="text-sm" />
            Export
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-[12px] font-medium transition-colors hover:border-gray-400">
            <Upload className="text-sm" />
            Import
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-black px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-gray-800">
            <Plus className="text-sm" />
            Add Product
          </button>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-4 gap-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
              Total Products
            </span>
            <Package className="text-lg text-gray-300" />
          </div>
          <p className="text-2xl font-bold tracking-tight">156</p>
          <p className="mt-1 text-[11px] font-medium text-emerald-600">
            +8 this month
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
              Published
            </span>
            <CheckCircle className="text-lg text-gray-300" />
          </div>
          <p className="text-2xl font-bold tracking-tight">138</p>
          <p className="mt-1 text-[11px] font-medium text-gray-400">
            88.5% of total
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
              Low Stock
            </span>
            <AlertTriangle className="text-lg text-gray-300" />
          </div>
          <p className="text-2xl font-bold tracking-tight text-amber-600">
            12
          </p>
          <p className="mt-1 text-[11px] font-medium text-amber-600">
            Needs restock
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
              Out of Stock
            </span>
            <XCircle className="text-lg text-gray-300" />
          </div>
          <p className="text-2xl font-bold tracking-tight text-red-500">3</p>
          <p className="mt-1 text-[11px] font-medium text-red-500">
            Action required
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="min-w-0 flex-1">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative max-w-xs flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-[12px] transition-colors focus:border-gray-400 focus:bg-white focus:outline-none"
                  />
                </div>
                <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-500 focus:border-gray-400 focus:outline-none">
                  <option>Bulk Actions</option>
                  <option>Delete Selected</option>
                  <option>Publish Selected</option>
                  <option>Unpublish Selected</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-[11px] text-gray-400">
                  1–20 of 156
                </span>
                <div className="flex overflow-hidden rounded-lg border border-gray-200">
                  <button className="bg-black p-1.5 text-white">
                    <List className="text-sm" />
                  </button>
                  <button className="p-1.5 text-gray-400 transition-colors hover:text-black">
                    <LayoutGrid className="text-sm" />
                  </button>
                </div>
              </div>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded accent-black"
                    />
                  </th>
                  <th className="w-14 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                    Image
                  </th>
                  <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                    Product
                  </th>
                  <th className="w-[90px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                    Category
                  </th>
                  <th className="w-[100px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                    Price
                  </th>
                  <th className="w-[70px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                    Stock
                  </th>
                  <th className="w-[90px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                    Status
                  </th>
                  <th className="w-[80px] pr-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${product.outOfStock ? "bg-red-50/30" : ""}`}
                  >
                    <td className="px-4 py-2.5">
                      <input
                        type="checkbox"
                        className="h-3.5 w-3.5 rounded accent-black"
                      />
                    </td>
                    <td className="py-2.5">
                      <div
                        className={`h-10 w-10 overflow-hidden rounded-md bg-gray-100 ${product.outOfStock ? "opacity-50" : ""}`}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-2.5">
                      <a
                        id={product.id}
                        href="#"
                        className={`text-[12.5px] font-semibold hover:underline ${product.outOfStock ? "text-gray-400" : ""}`}
                      >
                        {product.name}
                      </a>
                      <p className="mt-0.5 text-[10px] text-gray-400">
                        SKU: {product.sku}
                      </p>
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${product.categoryColor}`}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td
                      className={`py-2.5 text-[12px] font-semibold ${product.outOfStock ? "text-gray-400" : ""}`}
                    >
                      {product.price}
                    </td>
                    <td className="py-2.5">
                      <span className={`text-[12px] font-bold ${product.stockColor}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${product.statusColor}`}
                      >
                        {product.statusIcon}
                        {product.status}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black">
                          <Pencil className="text-[13px]" />
                        </button>
                        <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500">
                          <Trash2 className="text-[13px]" />
                        </button>
                        <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black">
                          <MoreHorizontal className="text-[13px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-400">Rows per page:</span>
                <select className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium focus:border-gray-400 focus:outline-none">
                  <option>20</option>
                  <option>10</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black">
                  <ChevronLeft className="text-sm" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-[11px] font-bold text-white">
                  1
                </button>
                {[2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black"
                  >
                    {n}
                  </button>
                ))}
                <span className="px-0.5 text-[11px] text-gray-300">...</span>
                <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black">
                  8
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black">
                  <ChevronRight className="text-sm" />
                </button>
                <div className="ml-3 flex items-center gap-1.5 border-l border-gray-200 pl-3">
                  <span className="text-[11px] text-gray-400">Go to:</span>
                  <input
                    type="number"
                    defaultValue={1}
                    min={1}
                    max={8}
                    className="w-12 rounded border border-gray-200 px-2 py-1 text-center text-[11px] font-medium focus:border-gray-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="hidden w-[210px] flex-shrink-0 xl:block">
          <div className="sticky top-[20px] rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.12em]">
                Filters
              </h3>
              <button className="text-[10px] font-medium text-gray-400 transition-colors hover:text-black">
                Clear All
              </button>
            </div>

            <FilterSection title="Category">
              <div className="space-y-2">
                {[
                  { label: "Men", count: 62, checked: true },
                  { label: "Women", count: 48, checked: true },
                  { label: "Tops", count: 34 },
                  { label: "Bottoms", count: 22 },
                  { label: "Accessories", count: 12 },
                  { label: "Outerwear", count: 16 },
                ].map((cat) => (
                  <label
                    key={cat.label}
                    className="group flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={cat.checked}
                      className="h-3.5 w-3.5 rounded accent-black"
                    />
                    <span className="text-[12px] text-gray-600 transition-colors group-hover:text-black">
                      {cat.label}
                    </span>
                    <span className="ml-auto text-[10px] text-gray-300">
                      {cat.count}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Stock Status">
              <div className="space-y-2">
                {[
                  { label: "In Stock", color: "bg-emerald-500", checked: true },
                  { label: "Low Stock", color: "bg-amber-500", checked: true },
                  { label: "Out of Stock", color: "bg-red-500" },
                ].map((status) => (
                  <label
                    key={status.label}
                    className="group flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={status.checked}
                      className="h-3.5 w-3.5 rounded accent-black"
                    />
                    <span className="flex items-center gap-1.5 text-[12px] text-gray-600 transition-colors group-hover:text-black">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${status.color}`}
                      />
                      {status.label}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Price Range" defaultOpen={false}>
              <input
                type="range"
                min={0}
                max={500000}
                defaultValue={500000}
                className="mb-2 w-full"
              />
              <div className="flex items-center justify-between text-[10px] text-gray-400">
                <span>Rp 0</span>
                <span>Rp 500K</span>
              </div>
            </FilterSection>

            <FilterSection title="Status">
              <div className="space-y-2">
                {["Published", "Draft"].map((status) => (
                  <label
                    key={status}
                    className="group flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-3.5 w-3.5 rounded accent-black"
                    />
                    <span className="text-[12px] text-gray-600 transition-colors group-hover:text-black">
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <button className="mt-2 w-full rounded-lg bg-black py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gray-800">
              Apply Filters
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
