"use client";

import {
  Download,
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
  CircleCheck,
  CircleX,
  CircleDashed,
  Plus,
} from "lucide-react";
import ProductsTable from "./table";
import ProductFilter from "./filter";
import ProductEditModal from "./modal";
import ExportModal from "./exportModal";
import { useState } from "react";

const products = [
  { id: "prod-1", name: "Lombok Classic Polo", sku: "LMB-PLO-001", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=80&h=80&fit=crop", categories: [{ name: "Men", color: "bg-gray-100 text-gray-600" }, { name: "T-Shirt", color: "bg-blue-50 text-blue-600" }], price: "Rp 289.000", stock: 54, stockColor: "text-emerald-600", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-2", name: "Sport Zip Jacket", sku: "LMB-JKT-002", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&h=80&fit=crop", categories: [{ name: "Men", color: "bg-gray-100 text-gray-600" }, { name: "Outerwear", color: "bg-gray-100 text-gray-600" }], price: "Rp 459.000", stock: 32, stockColor: "text-emerald-600", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-3", name: "Essential Hoodie Black", sku: "LMB-HOD-003", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=80&h=80&fit=crop", categories: [{ name: "Men", color: "bg-gray-100 text-gray-600" }, { name: "Hoodie", color: "bg-purple-50 text-purple-600" }], price: "Rp 389.000", stock: 7, stockColor: "text-amber-500", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-4", name: "Wide Leg Trousers", sku: "LMB-PNT-004", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=80&h=80&fit=crop", categories: [{ name: "Bottoms", color: "bg-gray-100 text-gray-600" }, { name: "Pants", color: "bg-teal-50 text-teal-600" }], price: "Rp 349.000", stock: 28, stockColor: "text-emerald-600", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-5", name: "Sport Bra Impact", sku: "LMB-WBR-005", image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=80&h=80&fit=crop", categories: [{ name: "Women", color: "bg-pink-50 text-pink-600" }, { name: "Tops", color: "bg-blue-50 text-blue-600" }], price: "Rp 249.000", stock: 5, stockColor: "text-amber-500", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-6", name: "Pullover Hoodie Gray", sku: "LMB-HOD-006", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=80&h=80&fit=crop", categories: [{ name: "Men", color: "bg-gray-100 text-gray-600" }, { name: "Hoodie", color: "bg-purple-50 text-purple-600" }], price: "Rp 369.000", stock: 0, stockColor: "text-red-500", status: "Out of Stock", statusColor: "text-red-600 bg-red-50", statusIcon: <CircleX className="text-[10px]" />, outOfStock: true },
  { id: "prod-7", name: "Track Jacket Pro", sku: "LMB-JKT-007", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=80&h=80&fit=crop", categories: [{ name: "Outerwear", color: "bg-gray-100 text-gray-600" }, { name: "Jacket", color: "bg-indigo-50 text-indigo-600" }], price: "Rp 489.000", stock: 19, stockColor: "text-emerald-600", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-8", name: "High-Rise Leggings", sku: "LMB-WLG-008", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=80&h=80&fit=crop", categories: [{ name: "Women", color: "bg-pink-50 text-pink-600" }, { name: "Bottoms", color: "bg-gray-100 text-gray-600" }], price: "Rp 319.000", stock: 45, stockColor: "text-emerald-600", status: "Draft", statusColor: "text-gray-500 bg-gray-100", statusIcon: <CircleDashed className="text-[10px]" />, outOfStock: false },
  { id: "prod-9", name: "Slim Jogger Pants", sku: "LMB-PNT-009", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=80&h=80&fit=crop", categories: [{ name: "Bottoms", color: "bg-gray-100 text-gray-600" }, { name: "Pants", color: "bg-teal-50 text-teal-600" }], price: "Rp 329.000", stock: 8, stockColor: "text-amber-500", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-10", name: "Leather Woven Belt", sku: "LMB-ACC-010", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=80&h=80&fit=crop", categories: [{ name: "Accessories", color: "bg-amber-50 text-amber-600" }], price: "Rp 179.000", stock: 0, stockColor: "text-red-500", status: "Out of Stock", statusColor: "text-red-600 bg-red-50", statusIcon: <CircleX className="text-[10px]" />, outOfStock: true },
  { id: "prod-11", name: "Zip Hoodie Essential", sku: "LMB-HOD-011", image: "https://placehold.co/80x80/1a1a1a/888?text=Image", categories: [{ name: "Men", color: "bg-gray-100 text-gray-600" }, { name: "Hoodie", color: "bg-purple-50 text-purple-600" }], price: "Rp 419.000", stock: 22, stockColor: "text-emerald-600", status: "Published", statusColor: "text-emerald-700 bg-emerald-50", statusIcon: <CircleCheck className="text-[10px]" />, outOfStock: false },
  { id: "prod-12", name: "Performance Tank", sku: "LMB-WTK-012", image: "https://placehold.co/80x80/1a1a1a/888?text=Image", categories: [{ name: "Women", color: "bg-pink-50 text-pink-600" }, { name: "Tops", color: "bg-blue-50 text-blue-600" }], price: "Rp 179.000", stock: 61, stockColor: "text-emerald-600", status: "Draft", statusColor: "text-gray-500 bg-gray-100", statusIcon: <CircleDashed className="text-[10px]" />, outOfStock: false },
];

export default function ProductsContent() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="flex-1 p-6">
      {showCreateModal && <ProductEditModal onClose={() => setShowCreateModal(false)} />}
      {showExportModal && <ExportModal onClose={() => setShowExportModal(false)} />}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Products</h1>
          <p className="mt-0.5 text-[12px] text-gray-400">
            Manage your product catalog, inventory, and pricing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-[12px] font-semibold transition-colors hover:border-gray-400"
          >
            <Download className="text-sm" />
            Export
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-black px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-gray-800"
          >
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
          <ProductsTable products={products} />
        </div>

        <ProductFilter />
      </div>
    </div>
  );
}
