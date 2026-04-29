"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  ShoppingBag,
  CreditCard,
  Calendar,
  Package,
  User,
  Mail,
} from "lucide-react";

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

const statusColors: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-600",
  Processing: "bg-sky-50 text-sky-600",
  Shipped: "bg-violet-50 text-violet-600",
  Delivered: "bg-emerald-50 text-emerald-600",
  Cancelled: "bg-red-50 text-red-500",
};

export default function OrderPreviewModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-lg overflow-y-auto max-h-[85vh] rounded-lg p-0"
      >
        <DialogHeader className="border-b border-gray-200 px-6 py-4">
          <DialogTitle className="flex items-center gap-2 text-[14px] font-bold tracking-tight">
            <ShoppingBag className="size-4" />
            Order {order.id}
          </DialogTitle>
          <DialogDescription className="mt-0.5 text-[11px] text-gray-400">
            Order details and summary.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Status
              </p>
              <span className={`mt-1 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Date
              </p>
              <p className="mt-1 flex items-center justify-end gap-1.5 text-[13px] font-semibold text-gray-700">
                <Calendar className="size-3.5 text-gray-400" />
                {order.date}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
              Customer
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-[11px] font-bold text-gray-600">
                  {order.customer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold">
                    <User className="size-3 text-gray-400" />
                    {order.customer}
                  </p>
                  <p className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Mail className="size-3" />
                    {order.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Items
              </p>
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-700">
                <Package className="size-3.5 text-gray-400" />
                {order.items}
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Payment
              </p>
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-700">
                <CreditCard className="size-3.5 text-gray-400" />
                {order.payment}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
              Total Amount
            </p>
            <p className="text-xl font-bold tracking-tight">{order.total}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-6 py-4">
          <DialogClose render={<Button variant="outline" size="sm" />}>
            Close
          </DialogClose>
          <Button size="sm">
            Edit Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
