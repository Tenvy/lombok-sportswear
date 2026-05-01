"use client";

import { useState, useEffect } from "react";
import { 
  X, 
  QrCode, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  Loader2,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  CreditCard as CardIcon
} from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  cart: any[];
}

export default function PaymentModal({
  open,
  onClose,
  onSuccess,
  amount,
  cart
}: PaymentModalProps) {
  const [method, setMethod] = useState<"QRIS" | "CARD" | "VA" | "EWALLET">("QRIS");
  const [loading, setLoading] = useState(false);
  const [qrString, setQrString] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);

  const generateQR = async () => {
    setLoading(true);
    setQrString(null);
    setError(null);
    try {
      const orderId = "LS-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      const res = await fetch("/api/checkout/xendit/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(amount), orderId }),
      });
      const data = await res.json();
      if (data.qrString) {
        setQrString(data.qrString);
      } else {
        setError(data.error || "Failed to generate QR Code");
      }
    } catch (err) {
      setError("Network error or server timeout");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && method === "QRIS") {
      generateQR();
    }
  }, [open, method]);

  const handleManualSuccess = () => {
    setPaid(true);
    setTimeout(() => {
      onSuccess();
      onClose();
      setPaid(false);
    }, 1500);
  };

  if (paid) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[400px] text-center py-16 border-none shadow-2xl">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-black text-white animate-in zoom-in duration-300">
            <CheckCircle2 className="size-10" />
          </div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Payment Success!</h2>
          <p className="text-muted-foreground mt-2 font-medium">Transaction verified. Printing receipt...</p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden bg-white border-none shadow-2xl">
        <div className="flex h-[620px]">
          {/* Left: Methods Selector */}
          <div className="w-[300px] border-r bg-[#F9FAFB] p-8 flex flex-col">
            <div className="mb-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Checkout</h3>
              <h2 className="text-xl font-black tracking-tight mt-1">Payment Method</h2>
            </div>
            
            <div className="space-y-3 flex-1 overflow-y-auto pr-2 scrollbar-hide">
              {[
                { id: "QRIS", label: "QRIS / E-Wallet", desc: "OVO, GoPay, Dana, QRIS", icon: QrCode },
                { id: "CARD", label: "Credit Card", desc: "Visa, Mastercard, JCB", icon: CardIcon },
                { id: "VA", label: "Virtual Account", desc: "BCA, Mandiri, BNI, BRI", icon: CreditCard },
                { id: "EWALLET", label: "Direct Pay", desc: "LinkAja, ShopeePay", icon: Smartphone },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMethod(item.id as any);
                    setError(null);
                  }}
                  className={cn(
                    "group flex w-full flex-col gap-1 rounded-2xl p-4 text-left transition-all duration-200 border",
                    method === item.id 
                      ? "bg-black border-black text-white shadow-xl translate-x-1" 
                      : "bg-white border-gray-100 text-gray-500 hover:border-gray-300 hover:text-black"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("size-5", method === item.id ? "text-white" : "text-gray-400 group-hover:text-black")} />
                    <span className="text-xs font-black uppercase tracking-wider">{item.label}</span>
                  </div>
                  <span className={cn("text-[9px] font-medium ml-8", method === item.id ? "text-gray-400" : "text-gray-400")}>{item.desc}</span>
                </button>
              ))}
            </div>

            <div className="pt-8 border-t border-gray-200 mt-auto">
               <div className="flex items-center gap-3 opacity-40">
                  <ShieldCheck className="size-8" />
                  <div className="text-[8px] font-bold uppercase leading-tight tracking-widest">
                    Secured by<br/><span className="text-[10px]">Xendit</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: Payment Details */}
          <div className="flex-1 flex flex-col bg-white p-10 relative">
            <button 
              onClick={onClose}
              className="absolute right-6 top-6 size-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="size-5" />
            </button>

            <div className="mb-10 text-center sm:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Total to pay</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-400">Rp</span>
                <h2 className="text-5xl font-black tracking-tighter text-black">
                  {amount.toLocaleString("id-ID")}
                </h2>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center rounded-[32px] bg-[#F9FAFB] border border-gray-50 p-8">
              {method === "QRIS" && (
                <div className="w-full text-center space-y-6">
                  {loading ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="size-16 rounded-full border-4 border-gray-100 border-t-black animate-spin" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Authenticating with Xendit...</p>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center gap-4 text-red-500 max-w-[250px] mx-auto text-center">
                      <AlertCircle className="size-12 opacity-50" />
                      <p className="text-[11px] font-bold uppercase leading-relaxed">{error}</p>
                      <Button onClick={generateQR} variant="outline" className="h-10 rounded-full text-[10px] uppercase font-bold border-red-200">Try Again</Button>
                    </div>
                  ) : qrString ? (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                      <div className="relative mx-auto p-4 bg-white shadow-2xl rounded-3xl border-8 border-white">
                         <img 
                           src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrString}`} 
                           alt="QRIS" 
                           className="size-48 object-contain"
                         />
                         <div className="absolute inset-0 border-2 border-black/5 rounded-2xl pointer-events-none" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[11px] font-black uppercase tracking-[0.2em]">Scan QRIS Code</p>
                        <p className="text-[9px] text-gray-400 font-medium">Valid for 15 minutes. Automatically verified.</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {method === "CARD" && (
                <div className="w-full max-w-[320px] space-y-6 animate-in slide-in-from-right-4 duration-300">
                   <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Card Number</label>
                        <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full h-14 bg-white rounded-2xl border border-gray-100 px-6 text-sm font-bold shadow-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Expiry</label>
                          <input type="text" placeholder="MM / YY" className="w-full h-14 bg-white rounded-2xl border border-gray-100 px-6 text-sm font-bold shadow-sm" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">CVV</label>
                          <input type="text" placeholder="123" className="w-full h-14 bg-white rounded-2xl border border-gray-100 px-6 text-sm font-bold shadow-sm" />
                        </div>
                      </div>
                   </div>
                   <Button className="w-full h-14 rounded-2xl bg-black text-white font-black uppercase tracking-widest hover:bg-gray-900 shadow-xl shadow-black/10">
                     Process Card
                   </Button>
                </div>
              )}

              {method === "VA" && (
                <div className="w-full space-y-3 animate-in slide-in-from-bottom-4 duration-300">
                   {["Bank BCA", "Bank Mandiri", "Bank BRI"].map((bank) => (
                     <button key={bank} className="w-full p-5 bg-white border border-gray-100 rounded-2xl flex justify-between items-center hover:border-black hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-4">
                          <div className="size-10 bg-gray-100 rounded-xl group-hover:bg-black transition-colors" />
                          <span className="text-xs font-black uppercase tracking-wider">{bank}</span>
                        </div>
                        <ChevronRight className="size-4 text-gray-300" />
                     </button>
                   ))}
                </div>
              )}

              {method === "EWALLET" && (
                <div className="w-full max-w-[280px] space-y-6 animate-in zoom-in-95 duration-300">
                   <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                     <input 
                       type="text" 
                       placeholder="0812 XXXX XXXX" 
                       className="w-full h-14 bg-white rounded-2xl border border-gray-100 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-black/5"
                     />
                   </div>
                   <Button className="w-full h-14 rounded-2xl bg-black text-white font-black uppercase tracking-widest hover:bg-gray-900 shadow-xl shadow-black/10">
                     Send Payment Link
                   </Button>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex gap-4">
              <Button 
                onClick={handleManualSuccess} 
                variant="outline"
                className="flex-1 h-14 rounded-2xl border-gray-200 font-black uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all"
              >
                Simulate Success
              </Button>
              <Button 
                onClick={onClose}
                className="px-8 h-14 bg-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white transition-all border-none"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
