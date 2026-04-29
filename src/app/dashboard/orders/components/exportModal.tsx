"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ExportModal({ onClose }: { onClose: () => void }) {
  const [format, setFormat] = useState<"csv" | "excel">("csv");

  const [fields, setFields] = useState({
    id: true,
    customer: true,
    email: true,
    items: true,
    total: true,
    payment: true,
    status: true,
    date: true,
  });

  const [filters, setFilters] = useState({
    pending: true,
    processing: true,
    shipped: true,
    delivered: true,
    cancelled: true,
    creditCard: true,
    bankTransfer: true,
    eWallet: true,
  });

  const toggleField = (key: keyof typeof fields) => {
    setFields((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExport = () => {
    onClose();
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[14px] font-bold tracking-tight">
            Export Orders
          </DialogTitle>
          <DialogDescription className="mt-0.5 text-[11px] text-gray-400">
            Choose fields, format, and filters for your export.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
              Export Format
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setFormat("csv")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors ${
                  format === "csv"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-black"
                }`}
              >
                <FileText className="size-3.5" />
                CSV
              </button>
              <button
                onClick={() => setFormat("excel")}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors ${
                  format === "excel"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-black"
                }`}
              >
                <FileSpreadsheet className="size-3.5" />
                Excel
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
              Fields to Export
            </label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { key: "id", label: "Order ID" },
                { key: "customer", label: "Customer" },
                { key: "email", label: "Email" },
                { key: "items", label: "Items" },
                { key: "total", label: "Total" },
                { key: "payment", label: "Payment" },
                { key: "status", label: "Status" },
                { key: "date", label: "Date" },
              ] as const).map(({ key, label }) => (
                <label
                  key={key}
                  className="group flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={fields[key]}
                    onChange={() => toggleField(key)}
                    className="h-3.5 w-3.5 rounded accent-black"
                  />
                  <span className="text-[12px] text-gray-600 transition-colors group-hover:text-black">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
              Filter by Status
            </label>
            <div className="flex flex-wrap gap-2">
              {([
                { key: "pending", label: "Pending" },
                { key: "processing", label: "Processing" },
                { key: "shipped", label: "Shipped" },
                { key: "delivered", label: "Delivered" },
                { key: "cancelled", label: "Cancelled" },
              ] as const).map(({ key, label }) => (
                <label
                  key={key}
                  className="group flex cursor-pointer items-center gap-1.5"
                >
                  <input
                    type="checkbox"
                    checked={filters[key]}
                    onChange={() => toggleFilter(key)}
                    className="h-3.5 w-3.5 rounded accent-black"
                  />
                  <span className="text-[12px] text-gray-600 transition-colors group-hover:text-black">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
              Filter by Payment
            </label>
            <div className="flex flex-wrap gap-2">
              {([
                { key: "creditCard", label: "Credit Card" },
                { key: "bankTransfer", label: "Bank Transfer" },
                { key: "eWallet", label: "E-Wallet" },
              ] as const).map(({ key, label }) => (
                <label
                  key={key}
                  className="group flex cursor-pointer items-center gap-1.5"
                >
                  <input
                    type="checkbox"
                    checked={filters[key]}
                    onChange={() => toggleFilter(key)}
                    className="h-3.5 w-3.5 rounded accent-black"
                  />
                  <span className="text-[12px] text-gray-600 transition-colors group-hover:text-black">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <DialogClose render={<Button variant="outline" size="sm" />}>
            Cancel
          </DialogClose>
          <Button size="sm" onClick={handleExport}>
            <Download className="mr-1 size-3.5" />
            Export
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
