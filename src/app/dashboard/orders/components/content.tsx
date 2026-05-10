"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  CaretDown,
  DownloadSimple,
} from "@phosphor-icons/react";
import { Loader2 } from "lucide-react";
import DashboardHeader from "../../components/header";
import OrdersTable from "./table";
import OrdersKpiCards from "./card";
import ExportModal from "./exportModal";

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

interface Meta {
  total: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

export default function OrdersContent() {
  const [showExportModal, setShowExportModal] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (activeTab !== "All") params.set("status", activeTab);

        const res = await fetch(`/api/orders/dashboard?${params.toString()}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to fetch orders");
        }
        const data = await res.json();
        setOrders(data.orders);
        setMeta(data.meta);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [page, limit, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <>
      <ExportModal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
      <DashboardHeader />
      <main className="flex-1 overflow-y-auto px-6 py-5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">Orders Management</h1>
            <p className="mt-0.5 text-[13px] text-gray-400">
              Track and manage all customer orders.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2 text-[13px] font-semibold transition-colors hover:bg-gray-50">
              <Calendar size={16} />
              Last 30 Days
              <CaretDown size={14} />
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-gray-800"
            >
              <DownloadSimple size={16} />
              Export
            </button>
          </div>
        </div>

        <OrdersKpiCards meta={meta} />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-gray-400" />
            <p className="mt-4 text-sm text-gray-500">Memuat pesanan...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-red-500">
            <p className="text-sm font-medium">{error}</p>
          </div>
        ) : (
          <OrdersTable
            orders={orders}
            total={meta.total}
            page={page}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={handleLimitChange}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}
      </main>
    </>
  );
}
