"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ShoppingBag, Loader2 } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/src/app/context/CartContext";
import { useOrderStore } from "@/src/store/useOrderStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STATUS_OPTIONS = [
  { value: "all", label: "Semua status" },
  { value: "PENDING", label: "Menunggu Pembayaran" },
  { value: "CONFIRMED", label: "Dikemas" },
  { value: "PROCESSING", label: "Dikemas" },
  { value: "SHIPPED", label: "Dikirim" },
  { value: "DELIVERED", label: "Selesai" },
  { value: "CANCELLED", label: "Dibatalkan" },
];

function statusLabel(status: string): string {
  const found = STATUS_OPTIONS.find((s) => s.value === status);
  return found?.label || status;
}

function statusColor(status: string): string {
  switch (status) {
    case "PENDING":
      return "text-amber-600 bg-amber-50";
    case "CONFIRMED":
    case "PROCESSING":
      return "text-blue-600 bg-blue-50";
    case "SHIPPED":
      return "text-indigo-600 bg-indigo-50";
    case "DELIVERED":
      return "text-green-600 bg-green-50";
    case "CANCELLED":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
}

export default function ProfilePage() {
  const [status, setStatus] = useState("all");
  const current =
    STATUS_OPTIONS.find((o) => o.value === status) ?? STATUS_OPTIONS[0];
  const [activeTab, setActiveTab] = useState<"orders" | "cart">("orders");
  const { data: session } = useSession();
  const { cart, subtotal, ready } = useCart();
  const router = useRouter();
  const { orders, loading, fetchOrders } = useOrderStore();

  useEffect(() => {
    if (session?.user) {
      fetchOrders();
    }
  }, [session, fetchOrders]);

  const filteredOrders =
    status === "all"
      ? orders
      : orders.filter((o) => o.status === status);

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <div className="mx-auto grid max-w-screen-md grid-cols-1 gap-6 p-4">
          {session?.user ? (
            <div className="flex flex-wrap items-center justify-end gap-2">
              <div className="flex-1 whitespace-nowrap text-lg font-semibold sm:text-2xl">
                Hai {session.user.name || "Pengguna"}
              </div>
              {/* <Link href="/profile">
                <Button variant="outline" size="default" className="flex-none">
                  Pengaturan
                </Button>
              </Link> */}
            </div>
          ) : (
            <div className="bg-base-100 box-border flex flex-col rounded border border-[--p-border-color] rounded-lg gap-2 p-4">
              <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
                <div className="w-full md:flex-1">
                  <div className="mb-1 text-sm font-medium">
                    Nikmati Diskon Spesial dan Pantau Pesanan Kamu
                  </div>
                  <div className="text-xs opacity-60">
                    Dapatkan diskon eksklusif sambil melacak pesanan dan percakapan kamu dengan mudah. Tetap terhubung dengan kami dan selalu tahu perkembangan pembelian kamu, semua dalam satu platform.
                  </div>
                </div>
                <Link href="/login">
                  <Button variant="outline" size="default" className="flex-none">
                    Login
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary" size="default" className="flex-none">
                    Daftar
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="bg-base-100 box-border flex flex-col rounded border border-[--p-border-color] rounded-lg gap-2 p-4">
            <div
              role="tablist"
              className="bg-base-100 z-10 flex"
              style={{ top: "86px" }}
            >
              <div className="w-1/2 text-center">
                <div
                  role="tab"
                  onClick={() => setActiveTab("orders")}
                  className={`h-8 w-full cursor-pointer content-center border-b-2 px-4 text-xs font-medium sm:text-sm ${activeTab === "orders" ? "border-neutral" : "border-b-slate-300"}`}
                >
                  <div className="relative inline-flex px-3">Pesanan</div>
                </div>
              </div>
              <div className="w-1/2 text-center">
                <div
                  role="tab"
                  onClick={() => setActiveTab("cart")}
                  className={`h-8 w-full cursor-pointer content-center border-b-2 px-4 text-xs font-medium sm:text-sm ${activeTab === "cart" ? "border-neutral" : "border-b-slate-300"}`}
                >
                  <div className="relative inline-flex px-3">Cart</div>
                </div>
              </div>
            </div>

            {activeTab === "orders" ? (
              <div>
                <div className="mb-2 flex flex-wrap items-center justify-end gap-2">
                  <div className="shrink-0 grow text-base font-medium">
                    Order Saya ({filteredOrders.length})
                  </div>
                  <div
                    id="orders-status-select"
                    className="w-[180px] flex-none text-sm"
                    style={{ maxWidth: "180px" }}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex h-[52px] w-full items-center justify-between rounded-xl bg-base-100 px-4 text-left text-sm outline-none"
                        style={{
                          border: "1px solid var(--p-border-color)",
                          transition: "border-color 0.15s ease-in-out",
                        }}
                      >
                        <span className="truncate">{current.label}</span>
                        <ChevronDown className="size-6 flex-none text-current" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-[180px]"
                      >
                        <DropdownMenuRadioGroup
                          value={status}
                          onValueChange={setStatus}
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <DropdownMenuRadioItem
                              key={opt.value}
                              value={opt.value}
                            >
                              {opt.label}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center py-16">
                    <Loader2 className="size-8 animate-spin text-gray-400" />
                    <p className="mt-4 text-sm text-gray-500">Memuat pesanan...</p>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="flex flex-col items-center py-16">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://d2nvjoftj891ay.cloudfront.net/hotfix-relea.8d186ae/empty_box_2.CGVrn_pw.svg"
                      loading="lazy"
                      alt="Tidak ada pesanan"
                      className="max-w-52"
                    />
                    <div className="mb-1 mt-3 text-base font-medium">
                      Tidak ada pesanan
                    </div>
                    <div className="text-sm">
                      Silakan buat pesanan untuk melihatnya disini.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-100 p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </div>
                          <span
                            className={`rounded-none px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${statusColor(order.status)}`}
                          >
                            {statusLabel(order.status)}
                          </span>
                        </div>

                        <div className="mt-3 space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-3">
                              <div className="relative size-16 flex-shrink-0 bg-gray-50">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-1 flex-col justify-center">
                                <h4 className="text-[11px] font-bold uppercase leading-tight">
                                  {item.name}
                                </h4>
                                <p className="mt-0.5 text-[10px] text-gray-400">
                                  {item.size}
                                  {item.color ? ` / ${item.color}` : ""} · Qty:{" "}
                                  {item.quantity}
                                </p>
                                <p className="mt-1 text-[11px] font-bold">
                                  Rp{" "}
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString("id-ID")}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            Total
                          </span>
                          <span className="text-sm font-black">
                            Rp {order.total.toLocaleString("id-ID")}
                          </span>
                        </div>
                        {order.status === "PENDING" && (
                          <button
                            onClick={() =>
                              router.push(`/checkout/pay?orderId=${order.id}`)
                            }
                            className="mt-3 w-full bg-black py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-gray-800 transition-all"
                          >
                            Bayar Sekarang
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                {!ready ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="animate-pulse text-sm text-gray-400">Loading cart...</div>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-neutral-500">
                    <ShoppingBag className="size-16 opacity-10" />
                    <p className="mt-4 text-xs font-bold uppercase tracking-widest">Keranjang Anda kosong</p>
                    <Button variant="outline" className="mt-6 text-[10px] font-bold uppercase tracking-widest" onClick={() => router.push("/products")}>
                      Mulai Belanja
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative aspect-[4/5] w-20 flex-shrink-0 overflow-hidden rounded-sm bg-gray-50">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex flex-1 flex-col justify-center">
                            <h4 className="text-[11px] font-bold uppercase leading-tight">{item.name}</h4>
                            <p className="mt-0.5 text-[10px] text-gray-400">{item.size}{item.color ? ` / ${item.color}` : ""} · Qty: {item.quantity}</p>
                            <p className="mt-1 text-[11px] font-bold">Rp {((item.price + (item.customization?.servicePrice || 0)) * item.quantity).toLocaleString("id-ID")}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    <Button
                      className="w-full bg-black py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-gray-800"
                      onClick={() => router.push("/checkout")}
                    >
                      Checkout
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
