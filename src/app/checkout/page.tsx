"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Check, Tag } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const checkoutItems = [
  {
    id: "p-m-2",
    name: "Lombok Classic Polo",
    category: "POLO",
    price: 289000,
    size: "L",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=200&h=200&fit=crop",
  },
  {
    id: "p-m-4",
    name: "Sport Zip Jacket",
    category: "JACKET",
    price: 459000,
    size: "M",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
  },
];

export default function CheckoutPage() {
  const [promoCode, setPromoCode] = useState("");

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
          <span className="text-black font-semibold">Checkout</span>
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
              <div className="flex size-7 items-center justify-center rounded-full bg-black text-white text-[10px] font-bold">2</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black">CHECKOUT</span>
            </div>
            <div className="h-px w-16 bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full border border-gray-200 text-gray-300 text-[10px] font-bold">3</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">KONFIRMASI</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter">CHECKOUT</h1>
          <p className="mt-2 text-sm text-gray-500">Lengkapi informasi di bawah untuk menyelesaikan pesanan Anda.</p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Form Section */}
          <div className="lg:col-span-8">
            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="flex size-8 items-center justify-center bg-black text-[11px] font-bold text-white">1</div>
                <h2 className="text-sm font-bold uppercase tracking-widest">ALAMAT PENGIRIMAN</h2>
              </div>

              <form className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">NAMA LENGKAP</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan nama lengkap"
                    className="w-full border border-gray-100 bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">EMAIL</label>
                  <input 
                    type="email" 
                    placeholder="email@contoh.com"
                    className="w-full border border-gray-100 bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">NOMOR TELEPON</label>
                  <input 
                    type="tel" 
                    placeholder="+62 812 3456 7890"
                    className="w-full border border-gray-100 bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">ALAMAT LENGKAP</label>
                  <textarea 
                    rows={3}
                    placeholder="Jalan, nomor rumah, RT/RW, kelurahan"
                    className="w-full border border-gray-100 bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">KOTA</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-100 bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">PROVINSI</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-100 bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">KODE POS</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-100 bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </form>
            </section>
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 border border-gray-100 p-8">
              <h2 className="mb-8 text-sm font-bold uppercase tracking-widest">RINGKASAN PESANAN</h2>
              
              <div className="space-y-6">
                {checkoutItems.map((item) => (
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
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{item.category}</p>
                      <h4 className="mt-1 text-[11px] font-bold uppercase leading-tight">{item.name}</h4>
                      <p className="mt-1 text-[10px] text-gray-400">Size: {item.size} · Qty: {item.quantity}</p>
                      <p className="mt-1 text-[11px] font-bold">Rp {item.price.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-8 h-px bg-gray-100" />

              <div className="space-y-4">
                <div className="flex justify-between text-xs font-medium text-gray-500">
                  <span>Subtotal</span>
                  <span>Rp 748.000</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-gray-500">
                  <span>Shipping</span>
                  <span className="text-[10px] uppercase tracking-widest">Dihitung di langkah berikutnya</span>
                </div>
                <div className="flex justify-between text-sm font-bold uppercase tracking-widest pt-2">
                  <span>Total</span>
                  <span>Rp 748.000</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Kode promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border border-gray-100 bg-gray-50/50 px-4 py-3 text-xs focus:border-black focus:outline-none"
                  />
                  <button className="bg-gray-100 px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                    TERAPKAN
                  </button>
                </div>
              </div>

              <button className="mt-8 w-full bg-black py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-gray-800 transition-all">
                LANJUT KE PEMBAYARAN
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
