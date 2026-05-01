"use client";

import { Check, Printer, Share2, ShoppingBag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Receipt from "./Receipt";

export default function CheckoutModal({
  open,
  onClose,
  orderId = "LS-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
  cart = [],
  total = 0,
  paymentMethod = 'cash',
  tendered = 0
}: {
  open: boolean;
  onClose: () => void;
  orderId?: string;
  cart?: any[];
  total?: number;
  paymentMethod?: 'cash' | 'card';
  tendered?: number;
}) {
  const date = new Date().toLocaleString("id-ID", { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }) + " WIB";

  const subtotal = total / 1.11;
  const tax = total - subtotal;

  const receiptItems = cart.map(item => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    service: item.customization?.serviceName,
    servicePrice: item.customization?.servicePrice
  }));

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-[425px]">
        {/* Visual Modal (Screen Only) */}
        <div className="print:hidden">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="size-6" />
            </div>
            <DialogTitle className="text-xl font-bold">Order Successful</DialogTitle>
            <DialogDescription>
              Transaction has been completed successfully.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 border-y my-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Transaction ID</span>
              <span className="text-sm font-mono font-bold">{orderId}</span>
            </div>
            <p className="text-center text-xs text-muted-foreground px-6">
              Inventory has been updated and the receipt is ready for printing.
            </p>
          </div>

          <div className="grid gap-2">
            <Button onClick={handlePrint} className="w-full gap-2">
              <Printer className="size-4" />
              Print Receipt
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="gap-2">
                <Share2 className="size-4" />
                Share
              </Button>
              <Button variant="outline" onClick={onClose} className="gap-2">
                <ShoppingBag className="size-4" />
                Next Order
              </Button>
            </div>
          </div>
        </div>

        {/* Print-only Receipt (Hidden on Screen) */}
        <div className="hidden print:block print-only bg-white">
          <Receipt 
            orderId={orderId}
            date={date}
            items={receiptItems}
            subtotal={subtotal}
            tax={tax}
            total={total}
            paymentMethod={paymentMethod}
            cashReceived={tendered}
            change={paymentMethod === 'cash' ? (tendered - total) : 0}
            operator="Admin Kasir"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
