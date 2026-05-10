"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ChevronRight,
  Check,
  Copy,
  CheckCircle2,
  Loader2,
  Clock,
  AlertCircle,
  RefreshCw,
  QrCode,
  Landmark,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color?: string;
  image: string;
}

interface Order {
  id: string;
  total: number;
  fullName: string;
  items: OrderItem[];
}

interface PaymentResult {
  paymentId: string;
  method: string;
  vaNumber?: string;
  bankCode?: string;
  name?: string;
  qrString?: string;
  qrUrl?: string;
  expirationDate: string;
  amount: number;
}

const METHODS = [
  { id: "BCA_VA", label: "BCA Virtual Account", icon: Landmark },
  { id: "BNI_VA", label: "BNI Virtual Account", icon: Landmark },
  { id: "BRI_VA", label: "BRI Virtual Account", icon: Landmark },
  { id: "MANDIRI_VA", label: "Mandiri Virtual Account", icon: Landmark },
  { id: "PERMATA_VA", label: "Permata Virtual Account", icon: Landmark },
  { id: "QRIS", label: "QRIS", icon: QrCode },
];

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function CheckoutPayContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [initiating, setInitiating] = useState(false);
  const [payment, setPayment] = useState<PaymentResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [expired, setExpired] = useState(false);
  const [success, setSuccess] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [mode, setMode] = useState("production");
  const [simulating, setSimulating] = useState(false);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchOrder = useCallback(async () => {
    if (!orderId) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error("Failed to fetch order");
      const data = await res.json();
      setOrder(data);
    } catch {
      toast.error("Gagal memuat data pesanan");
    } finally {
      setLoadingOrder(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const startPolling = useCallback(() => {
    if (!orderId) return;
    if (pollRef.current) clearInterval(pollRef.current);

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}/status`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.status === "CONFIRMED" || data.paymentStatus === "PAID") {
          setSuccess(true);
          if (pollRef.current) clearInterval(pollRef.current);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      } catch {
        // ignore polling errors
      }
    }, 3000);
  }, [orderId]);

  const startTimer = useCallback((expirationDate: string) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const end = new Date(expirationDate).getTime();

    const tick = () => {
      const remaining = end - Date.now();
      if (remaining <= 0) {
        setTimeLeft(0);
        setExpired(true);
        if (timerRef.current) clearInterval(timerRef.current);
        if (pollRef.current) clearInterval(pollRef.current);
      } else {
        setTimeLeft(remaining);
      }
    };

    tick();
    timerRef.current = setInterval(tick, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    fetch("/api/checkout/config")
      .then((r) => r.json())
      .then((d) => setMode(d.mode || "production"))
      .catch(() => {});
  }, []);

  const handleSimulate = async () => {
    if (!payment?.paymentId || simulating) return;
    setSimulating(true);
    try {
      const res = await fetch("/api/checkout/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: payment.paymentId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Simulasi gagal");
        return;
      }
      toast.success("Simulasi pembayaran berhasil");
      setSuccess(true);
      if (pollRef.current) clearInterval(pollRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    } catch {
      toast.error("Terjadi kesalahan saat simulasi");
    } finally {
      setSimulating(false);
    }
  };

  const handleSelectMethod = async (method: string) => {
    if (!orderId || initiating) return;
    setSelectedMethod(method);
    setInitiating(true);
    setExpired(false);
    setSuccess(false);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, method }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal memulai pembayaran");
        setSelectedMethod(null);
        return;
      }

      setPayment(data);
      startTimer(data.expirationDate);
      startPolling();
    } catch {
      toast.error("Terjadi kesalahan saat memulai pembayaran");
      setSelectedMethod(null);
    } finally {
      setInitiating(false);
    }
  };

  const handleCopy = async (text: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      toast.error("Clipboard tidak didukung");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Nomor VA disalin");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin");
    }
  };

  const handleDownloadQr = () => {
    if (typeof document === "undefined") return;
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `qris-${orderId}.png`;
    link.click();
  };

  const handleRedirectSuccess = () => {
    if (orderId) {
      window.location.href = `/order/${orderId}/success`;
    }
  };

  if (loadingOrder) {
    return (
      <main className="min-h-screen bg-white font-sans text-black">
        <Navbar />
        <div className="mx-auto max-w-[1400px] px-4 py-20 lg:px-8 text-center">
          <Loader2 className="mx-auto size-8 animate-spin text-gray-400" />
          <p className="mt-4 text-sm text-gray-500">Memuat pembayaran...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!orderId || !order) {
    return (
      <main className="min-h-screen bg-white font-sans text-black">
        <Navbar />
        <div className="mx-auto max-w-[1400px] px-4 py-20 lg:px-8 text-center">
          <AlertCircle className="mx-auto size-12 text-red-500 opacity-50" />
          <h1 className="mt-4 text-2xl font-bold">Pesanan tidak ditemukan</h1>
          <p className="mt-2 text-gray-500">Order ID tidak valid atau sudah kadaluarsa.</p>
          <Link
            href="/products"
            className="mt-8 inline-block bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-gray-800 transition-all"
          >
            Lihat Produk
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans text-black">
      <Navbar />

      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-10 flex items-center gap-2 text-[11px] font-medium text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link>
          <ChevronRight className="size-3" />
          <Link href="/cart" className="hover:text-black">Keranjang</Link>
          <ChevronRight className="size-3" />
          <Link href="/checkout" className="hover:text-black">Checkout</Link>
          <ChevronRight className="size-3" />
          <span className="text-black font-semibold">Pembayaran</span>
        </nav>

        {/* Stepper */}
        <div className="mb-16 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-black text-white">
                <Check className="size-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">KERANJANG</span>
            </div>
            <div className="h-px w-16 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-black text-white">
                <Check className="size-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black">CHECKOUT</span>
            </div>
            <div className="h-px w-16 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-black text-white text-[10px] font-bold">
                3
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black">KONFIRMASI</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter">PEMBAYARAN</h1>
          <p className="mt-2 text-sm text-gray-500">
            Pilih metode pembayaran untuk menyelesaikan pesanan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {!payment ? (
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-8 items-center justify-center bg-black text-[11px] font-bold text-white">
                    1
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-widest">
                    METODE PEMBAYARAN
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {METHODS.map((method) => {
                    const Icon = method.icon;
                    const active = selectedMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        onClick={() => handleSelectMethod(method.id)}
                        disabled={initiating}
                        className={`flex items-center justify-between rounded-none border p-5 transition-all ${
                          active
                            ? "border-black bg-black text-white shadow-xl"
                            : "border-gray-100 bg-white text-black hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <Icon
                            className={`size-5 ${
                              active ? "text-white" : "text-gray-400"
                            }`}
                          />
                          <span className="text-xs font-bold uppercase tracking-wider">
                            {method.label}
                          </span>
                        </div>
                        {initiating && active ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <ChevronRight className="size-4" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>
            ) : expired ? (
              <div className="border border-red-200 bg-red-50 p-10 text-center">
                <Clock className="mx-auto size-12 text-red-500 opacity-50" />
                <h2 className="mt-4 text-xl font-black uppercase tracking-tight">
                  Pembayaran Kadaluarsa
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Waktu pembayaran telah habis. Silakan pilih metode lain.
                </p>
                <button
                  onClick={() => {
                    setPayment(null);
                    setSelectedMethod(null);
                    setExpired(false);
                    if (pollRef.current) clearInterval(pollRef.current);
                    if (timerRef.current) clearInterval(timerRef.current);
                  }}
                  className="mt-6 inline-flex items-center gap-2 bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-gray-800 transition-all"
                >
                  <RefreshCw className="size-4" />
                  Pilih Metode Lain
                </button>
              </div>
            ) : payment.method === "QRIS" ? (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="flex size-8 items-center justify-center bg-black text-[11px] font-bold text-white">
                    2
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-widest">
                    SCAN QRIS
                  </h2>
                </div>

                <div className="border border-gray-100 p-10 text-center">
                  {payment.qrString ? (
                    <>
                      <div className="mx-auto inline-block border-8 border-white shadow-2xl">
                        <QRCodeCanvas
                          value={payment.qrString}
                          size={256}
                          level="M"
                        />
                      </div>
                      <div className="mt-6 space-y-1">
                        <p className="text-[11px] font-black uppercase tracking-[0.2em]">
                          Scan dengan aplikasi e-wallet
                        </p>
                        <p className="text-[10px] text-gray-400">
                          OVO, GoPay, DANA, LinkAja, atau aplikasi bank
                        </p>
                      </div>
                      <button
                        onClick={handleDownloadQr}
                        className="mt-6 inline-flex items-center gap-2 border border-gray-200 px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:border-black hover:bg-black hover:text-white transition-all"
                      >
                        <Download className="size-4" />
                        Unduh QR
                      </button>
                      {mode === "development" && (
                        <button
                          onClick={handleSimulate}
                          disabled={simulating}
                          className="mt-4 inline-flex items-center gap-2 border border-dashed border-gray-300 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:border-gray-500 hover:text-black transition-all disabled:opacity-50"
                        >
                          {simulating ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="size-4" />
                          )}
                          {simulating ? "Memproses..." : "Simulate Payment (Test)"}
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">QR tidak tersedia.</p>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <Clock className="size-4" />
                  <span>{formatCountdown(timeLeft)}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="flex size-8 items-center justify-center bg-black text-[11px] font-bold text-white">
                    2
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-widest">
                    TRANSFER VIRTUAL ACCOUNT
                  </h2>
                </div>

                <div className="border border-gray-100 p-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Bank
                      </p>
                      <p className="mt-1 text-lg font-black uppercase">
                        {payment.bankCode}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Nomor Virtual Account
                      </p>
                      <div className="mt-1 flex items-center gap-4">
                        <p className="text-2xl font-black tracking-tight">
                          {payment.vaNumber}
                        </p>
                        <button
                          onClick={() =>
                            payment.vaNumber && handleCopy(payment.vaNumber)
                          }
                          className="inline-flex items-center gap-1 border border-gray-200 px-3 py-2 text-[10px] font-bold uppercase tracking-widest hover:border-black hover:bg-black hover:text-white transition-all"
                        >
                          {copied ? (
                            <>
                              <CheckCircle2 className="size-3" />
                              Tersalin
                            </>
                          ) : (
                            <>
                              <Copy className="size-3" />
                              Salin
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Nama Penerima
                      </p>
                      <p className="mt-1 text-sm font-bold">{payment.name}</p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Total Transfer
                      </p>
                      <p className="mt-1 text-2xl font-black">
                        Rp {payment.amount.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <Clock className="size-4" />
                  <span>{formatCountdown(timeLeft)}</span>
                </div>

                {mode === "development" && (
                  <button
                    onClick={handleSimulate}
                    disabled={simulating}
                    className="inline-flex items-center gap-2 border border-dashed border-gray-300 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:border-gray-500 hover:text-black transition-all disabled:opacity-50"
                  >
                    {simulating ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="size-4" />
                    )}
                    {simulating ? "Memproses..." : "Simulate Payment (Test)"}
                  </button>
                )}

                <div className="border border-gray-100">
                  <button
                    onClick={() => setAccordionOpen(!accordionOpen)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Cara Bayar via mBanking / ATM
                    </span>
                    <ChevronRight
                      className={`size-4 transition-transform ${
                        accordionOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {accordionOpen && (
                    <div className="border-t border-gray-100 px-5 pb-5 pt-0">
                      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-600">
                        <li>
                          Buka aplikasi mBanking atau datang ke ATM terdekat.
                        </li>
                        <li>Pilih menu Transfer &gt; Virtual Account.</li>
                        <li>Masukkan nomor VA di atas.</li>
                        <li>
                          Pastikan nama dan total sesuai, lalu konfirmasi.
                        </li>
                        <li>Selesaikan transaksi dan simpan bukti.</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 border border-gray-100 p-8">
              <h2 className="mb-8 text-sm font-bold uppercase tracking-widest">
                RINGKASAN PESANAN
              </h2>

              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative size-20 flex-shrink-0 bg-gray-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                        PRODUCT
                      </p>
                      <h4 className="mt-1 text-[11px] font-bold uppercase leading-tight">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-[10px] text-gray-400">
                        Size: {item.size}
                        {item.color ? ` / ${item.color}` : ""} · Qty:{" "}
                        {item.quantity}
                      </p>
                      <p className="mt-1 text-[11px] font-bold">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-8 h-px bg-gray-100" />

              <div className="space-y-4">
                <div className="flex justify-between text-xs font-medium text-gray-500">
                  <span>Subtotal</span>
                  <span>
                    Rp{" "}
                    {order.items
                      .reduce((s, i) => s + i.price * i.quantity, 0)
                      .toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold uppercase tracking-widest pt-2">
                  <span>Total</span>
                  <span>Rp {order.total.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Success Modal */}
      <Dialog open={success} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[400px] text-center py-16 border-none shadow-2xl">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-black text-white animate-in zoom-in duration-300">
            <CheckCircle2 className="size-10" />
          </div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">
            Pembayaran Berhasil!
          </h2>
          <p className="text-muted-foreground mt-2 font-medium">
            Transaksi telah diverifikasi. Mengalihkan...
          </p>
          <button
            onClick={handleRedirectSuccess}
            className="mt-8 inline-block bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-gray-800 transition-all"
          >
            Lihat Pesanan
          </button>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default function CheckoutPayPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white font-sans text-black">
          <Navbar />
          <div className="mx-auto max-w-[1400px] px-4 py-20 lg:px-8 text-center">
            <Loader2 className="mx-auto size-8 animate-spin text-gray-400" />
            <p className="mt-4 text-sm text-gray-500">Memuat pembayaran...</p>
          </div>
          <Footer />
        </main>
      }
    >
      <CheckoutPayContent />
    </Suspense>
  );
}
