"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

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

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusColors: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-600",
  Processing: "bg-sky-50 text-sky-600",
  Shipped: "bg-violet-50 text-violet-600",
  Delivered: "bg-emerald-50 text-emerald-600",
  Cancelled: "bg-red-50 text-red-500",
};

export default function OrderEditModal({
  open,
  order,
  onClose,
}: {
  open: boolean;
  order: Order | null;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    status: "",
    payment: "",
    notes: "",
  });

  useEffect(() => {
    if (open && order) {
      setFormData({
        status: order.status,
        payment: order.payment,
        notes: "",
      });
    }
  }, [open, order]);

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent
        showCloseButton={false}
        className="top-[5%] max-h-[90vh] -translate-y-0 sm:max-w-lg overflow-y-auto rounded-lg p-0"
      >
        <DialogHeader className="border-b border-gray-200 px-6 py-4">
          <DialogTitle className="flex items-center gap-2 text-[14px] font-bold tracking-tight">
            <Pencil className="size-4" />
            Edit Order {order.id}
          </DialogTitle>
          <DialogDescription className="mt-0.5 text-[11px] text-gray-400">
            Update order status, payment, and customer details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
              >
                {statusOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
                Payment
              </label>
              <select
                value={formData.payment}
                onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
              >
                <option>Credit Card</option>
                <option>Bank Transfer</option>
                <option>E-Wallet</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
              Customer
            </label>
            <p className="text-[13px] font-semibold">{order.customer}</p>
            <p className="mt-0.5 text-[11px] text-gray-400">{order.email}</p>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-500">
              Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add internal notes..."
              className="w-full resize-none rounded-md border border-gray-200 px-3 py-2.5 text-[13px] transition-colors focus:border-gray-400 focus:outline-none"
            />
          </div>

          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
              Order Summary
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Order ID</span>
                <span className="font-mono text-[10px] font-semibold">{order.id}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Items</span>
                <span className="font-semibold">{order.items}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Total</span>
                <span className="font-semibold">{order.total}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Date</span>
                <span className="font-semibold">{order.date}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Status</span>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[formData.status]}`}>
                  {formData.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-6 py-4">
          <DialogClose render={<Button variant="outline" size="sm" />}>
            Cancel
          </DialogClose>
          <Button size="sm" onClick={onClose}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
