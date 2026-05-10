"use client";

import { useState } from "react";
import {
  MagnifyingGlass,
  Eye,
  PencilSimple,
  CaretLeft,
  CaretRight,
  DownloadSimple,
} from "@phosphor-icons/react";
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
  total,
  page,
  limit,
  onPageChange,
  onLimitChange,
  activeTab,
  onTabChange,
}: {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const [previewOrder, setPreviewOrder] = useState<Order | null>(null);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === orders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(orders.map((o) => o.id)));
    }
  };

  const hasSelection = selectedIds.size > 0;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
          <div className="flex items-center gap-1">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors ${activeTab === tab ? "bg-black text-white" : "text-gray-500 hover:bg-gray-50"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative max-w-xs">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm transition-colors focus:border-gray-400 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-2">
          {hasSelection ? (
            <>
              <button className="flex items-center gap-1.5 rounded-lg bg-black px-3 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-gray-800">
                <DownloadSimple size={14} />
                Export ({selectedIds.size})
              </button>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-[13px] font-medium text-gray-500 transition-colors hover:bg-gray-50"
              >
                Clear
              </button>
            </>
          ) : (
            <span className="text-xs text-gray-400">Select orders to export</span>
          )}
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={orders.length > 0 && selectedIds.size === orders.length}
                  onChange={toggleSelectAll}
                  className="h-3.5 w-3.5 rounded accent-black"
                />
              </th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-gray-400">Order ID</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-gray-400">Customer</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-gray-400">Items</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-gray-400">Total</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-gray-400">Payment</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-gray-400">Status</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-gray-400">Date</th>
              <th className="w-[80px] pr-4 px-4 py-3 text-right text-xs font-bold uppercase tracking-[0.1em] text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${order.status === "Cancelled" ? "bg-red-50/20" : ""}`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(order.id)}
                    onChange={() => toggleSelect(order.id)}
                    className="h-3.5 w-3.5 rounded accent-black"
                  />
                </td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[13px] font-semibold ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                    {order.id}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className={`text-[13px] font-semibold ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                    {order.customer}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">{order.email}</p>
                </td>
                <td className={`px-4 py-3 text-[13px] ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                  {order.items}
                </td>
                <td className={`px-4 py-3 text-[13px] font-semibold ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                  {order.total}
                </td>
                <td className={`px-4 py-3 text-[13px] ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                  {order.payment}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className={`px-4 py-3 text-[13px] ${order.status === "Cancelled" ? "text-gray-400" : "text-gray-500"}`}>
                  {order.date}
                </td>
                <td className="py-3 pr-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setPreviewOrder(order)}
                      className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => setEditOrder(order)}
                      className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
                    >
                      <PencilSimple size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-400">Rows per page:</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="rounded border border-gray-200 bg-white px-2 py-1 text-[13px] font-medium focus:border-gray-400 focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black disabled:opacity-40"
            >
              <CaretLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => onPageChange(n)}
                className={`flex h-9 w-9 items-center justify-center rounded-md text-[13px] font-medium transition-colors ${
                  page === n
                    ? "bg-black text-white"
                    : "border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-black"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black disabled:opacity-40"
            >
              <CaretRight size={14} />
            </button>
            <div className="ml-3 flex items-center gap-1.5 border-l border-gray-200 pl-3">
              <span className="text-[13px] text-gray-400">Go to:</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                defaultValue={page}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = parseInt((e.target as HTMLInputElement).value, 10);
                    if (!isNaN(val)) onPageChange(Math.max(1, Math.min(totalPages, val)));
                  }
                }}
                className="w-12 rounded border border-gray-200 px-2 py-1 text-center text-[13px] font-medium focus:border-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <OrderPreviewModal
        open={!!previewOrder}
        order={previewOrder}
        onClose={() => setPreviewOrder(null)}
      />

      <OrderEditModal
        key={editOrder?.id || "new"}
        open={!!editOrder}
        order={editOrder}
        onClose={() => setEditOrder(null)}
      />
    </>
  );
}
