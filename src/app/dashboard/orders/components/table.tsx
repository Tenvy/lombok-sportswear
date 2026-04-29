"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import OrderPreviewModal from "./previewModal";
import OrderEditModal from "./editModal";

interface Order {
  id: string;
  customer: string;
  email: string;
  items: string;
  total: string;
  payment: string;
  status: string;
  date: string;
}

const statusTabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusColors: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-600",
  Processing: "bg-sky-50 text-sky-600",
  Shipped: "bg-violet-50 text-violet-600",
  Delivered: "bg-emerald-50 text-emerald-600",
  Cancelled: "bg-red-50 text-red-500",
};

export default function OrdersTable({
  orders,
}: {
  orders: Order[];
}) {
  const [previewOrder, setPreviewOrder] = useState<Order | null>(null);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredOrders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredOrders.map((o) => o.id)));
    }
  };

  const hasSelection = selectedIds.size > 0;

  const filteredOrders = activeTab === "All"
    ? orders
    : orders.filter((order) => order.status === activeTab);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
        <div className="flex items-center gap-1">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-3 py-1.5 text-[11px] font-semibold transition-colors ${activeTab === tab ? "bg-black text-white" : "text-gray-500 hover:bg-gray-50"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-[12px] transition-colors focus:border-gray-400 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-2">
        {hasSelection ? (
          <>
            <button className="flex items-center gap-1.5 rounded-lg bg-black px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-gray-800">
              <Download className="text-xs" />
              Export ({selectedIds.size})
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-500 transition-colors hover:bg-gray-50"
            >
              Clear
            </button>
          </>
        ) : (
          <span className="text-[10px] text-gray-400">Select orders to export</span>
        )}
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/60">
            <th className="w-10 px-4 py-3">
              <input
                type="checkbox"
                checked={filteredOrders.length > 0 && selectedIds.size === filteredOrders.length}
                onChange={toggleSelectAll}
                className="h-3.5 w-3.5 rounded accent-black"
              />
            </th>
            <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Order ID</th>
            <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Customer</th>
            <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Items</th>
            <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Total</th>
            <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Payment</th>
            <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Status</th>
            <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Date</th>
            <th className="w-[80px] pr-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr
              key={order.id}
              className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${order.status === "Cancelled" ? "bg-red-50/20" : ""}`}
            >
              <td className="px-4 py-2.5">
                <input
                  type="checkbox"
                  checked={selectedIds.has(order.id)}
                  onChange={() => toggleSelect(order.id)}
                  className="h-3.5 w-3.5 rounded accent-black"
                />
              </td>
              <td className="py-2.5">
                <span className={`font-mono text-[12px] font-semibold ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                  {order.id}
                </span>
              </td>
              <td className="py-2.5">
                <p className={`text-[12.5px] font-semibold ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                  {order.customer}
                </p>
                <p className="mt-0.5 text-[10px] text-gray-400">{order.email}</p>
              </td>
              <td className={`py-2.5 text-[12px] ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                {order.items}
              </td>
              <td className={`py-2.5 text-[12px] font-semibold ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                {order.total}
              </td>
              <td className={`py-2.5 text-[12px] ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                {order.payment}
              </td>
              <td className="py-2.5">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </td>
              <td className={`py-2.5 text-[12px] ${order.status === "Cancelled" ? "text-gray-400" : "text-gray-500"}`}>
                {order.date}
              </td>
              <td className="py-2.5 pr-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => setPreviewOrder(order)}
                    className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
                  >
                    <Eye className="text-[13px]" />
                  </button>
                  <button
                    onClick={() => setEditOrder(order)}
                    className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
                  >
                    <Pencil className="text-[13px]" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400">Rows per page:</span>
          <select className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium focus:border-gray-400 focus:outline-none">
            <option>15</option>
            <option>10</option>
            <option>25</option>
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
          {[2, 3, 4].map((n) => (
            <button
              key={n}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black"
            >
              {n}
            </button>
          ))}
          <span className="px-0.5 text-[11px] text-gray-300">...</span>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black">
            6
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
              max={6}
              className="w-12 rounded border border-gray-200 px-2 py-1 text-center text-[11px] font-medium focus:border-gray-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
      </div>

      {previewOrder && (
        <OrderPreviewModal
          order={previewOrder}
          onClose={() => setPreviewOrder(null)}
        />
      )}

      {editOrder && (
        <OrderEditModal
          order={editOrder}
          onClose={() => setEditOrder(null)}
        />
      )}
    </>
  );
}
