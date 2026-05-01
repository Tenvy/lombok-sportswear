"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Trash2, 
  Minus, 
  Plus, 
  CreditCard, 
  Banknote,
  Receipt,
  ShoppingCart,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CartItem {
  cartId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image?: string;
  customization?: {
    serviceName: string;
    servicePrice: number;
  };
}

export default function CartSidebar({
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
  total,
  tendered,
  setTendered,
  paymentMethod,
  setPaymentMethod,
  onCheckout
}: {
  cart: CartItem[];
  updateQuantity: (cartId: string, delta: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  total: number;
  tendered: string;
  setTendered: (val: string) => void;
  paymentMethod: 'cash' | 'card';
  setPaymentMethod: (val: 'cash' | 'card') => void;
  onCheckout: () => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (paymentMethod === 'card') {
      setIsProcessing(true);
      try {
        const orderId = "LS-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        const res = await fetch("/api/checkout/xendit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            customerName: "Walk-in Customer",
            orderId,
            items: cart
          }),
        });
        const data = await res.json();
        
        if (data.invoiceUrl) {
          // Redirect to Xendit Invoice page directly
          window.open(data.invoiceUrl, "_blank");
          onCheckout(); // Open the success modal locally as well
        } else {
          alert("Gagal membuat invoice Xendit: " + (data.error || "Terjadi kesalahan"));
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan koneksi ke Xendit");
      } finally {
        setIsProcessing(false);
      }
    } else {
      onCheckout();
    }
  };

  return (
    <aside className="flex w-full flex-col border-l bg-background lg:w-[350px] xl:w-[400px]">
      <div className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <ShoppingCart className="size-4" />
          <h2 className="text-sm font-bold uppercase tracking-wider">Active Cart</h2>
        </div>
        {cart.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-[10px] uppercase font-bold text-muted-foreground h-7">
            Clear
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center py-20">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-4">
              <ShoppingCart className="size-6 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-semibold">Your cart is empty</h3>
            <p className="text-xs text-muted-foreground">Add products to start an order</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.cartId} className="flex gap-3 group">
                <div className="relative size-14 overflow-hidden rounded-md border bg-muted flex-shrink-0">
                  {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold line-clamp-1">{item.name}</h4>
                    {item.customization && (
                      <p className="text-[10px] text-muted-foreground uppercase font-medium">
                        + {item.customization.serviceName}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs font-bold text-primary">
                      Rp {(item.price + (item.customization?.servicePrice || 0)).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-md border bg-background">
                      <button 
                        onClick={() => updateQuantity(item.cartId, -1)}
                        className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartId, 1)}
                        className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t bg-muted/30 p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>Subtotal</span>
            <span>Rp {(total / 1.11).toLocaleString("id-ID", { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>Tax (11%)</span>
            <span>Rp {(total - (total / 1.11)).toLocaleString("id-ID", { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between pt-2 border-t">
            <span className="text-sm font-bold">Total Amount</span>
            <span className="text-lg font-black tracking-tight">Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setPaymentMethod('cash')}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-all",
              paymentMethod === 'cash' ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-background text-muted-foreground hover:bg-accent"
            )}
          >
            <Banknote className="size-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Cash</span>
          </button>
          <button 
            onClick={() => setPaymentMethod('card')}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-all",
              paymentMethod === 'card' ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-background text-muted-foreground hover:bg-accent"
            )}
          >
            <CreditCard className="size-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Digital</span>
          </button>
        </div>

        {paymentMethod === 'cash' && (
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cash Received</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">Rp</span>
              <input 
                type="text"
                value={tendered}
                onChange={(e) => setTendered(e.target.value)}
                className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-4 gap-1">
              {["50000", "100000", "150000", "200000"].map((val) => (
                <button 
                  key={val}
                  onClick={() => setTendered(val)}
                  className="rounded-md border bg-background py-1.5 text-[9px] font-bold hover:bg-accent"
                >
                  +{parseInt(val)/1000}k
                </button>
              ))}
            </div>

            {parseInt(tendered) > total && (
              <div className="mt-2 rounded-lg bg-emerald-50 p-3 border border-emerald-100 flex justify-between items-center animate-in fade-in slide-in-from-top-1">
                <span className="text-[10px] font-bold uppercase text-emerald-600">Change (Kembalian)</span>
                <span className="text-sm font-black text-emerald-700">Rp {(parseInt(tendered) - total).toLocaleString("id-ID")}</span>
              </div>
            )}
          </div>
        )}

        <Button 
          onClick={handleCheckout}
          disabled={cart.length === 0 || isProcessing}
          className="w-full h-12 uppercase font-black tracking-widest"
        >
          {isProcessing ? <Loader2 className="size-4 animate-spin" /> : "Finish Transaction"}
        </Button>
      </div>
    </aside>
  );
}
