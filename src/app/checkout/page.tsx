"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, Check, Tag } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import { useCart } from "@/src/app/context/CartContext";

interface CheckoutItem {
  id: string;
  name: string;
  category: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoValid, setPromoValid] = useState<boolean | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = "Nama lengkap harus diisi";
    if (!formData.email.trim()) errors.email = "Email harus diisi";
    if (!formData.phone.trim()) errors.phone = "Nomor telepon harus diisi";
    if (!formData.address.trim()) errors.address = "Alamat harus diisi";
    if (!formData.city.trim()) errors.city = "Kota harus diisi";
    if (!formData.province.trim()) errors.province = "Provinsi harus diisi";
    if (!formData.postalCode.trim()) errors.postalCode = "Kode pos harus diisi";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkPromoCode = async () => {
    if (!promoCode.trim()) return;

    try {
      const response = await fetch(`/api/promo/${encodeURIComponent(promoCode)}`);
      const data = await response.json();

      if (data.valid) {
        setPromoValid(true);
        setPromoDiscount(data.discount);
      } else {
        setPromoValid(false);
        setPromoDiscount(0);
      }
    } catch (error) {
      setPromoValid(false);
      setPromoDiscount(0);
    }
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          image: item.image,
          customization: item.customization,
        })),
        ...formData,
        promoCode: promoValid ? promoCode : undefined,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create order");
      }

      const order = await response.json();

      clearCart();

      alert(`Order berhasil dibuat! Order ID: ${order.id}`);
      window.location.href = "/";
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan saat membuat order");
    } finally {
      setLoading(false);
    }
  };

  const shipping = 0; // Implement shipping calculation later
  const discount = Math.round(subtotal * (promoDiscount / 100));
  const total = subtotal - discount + shipping;

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-white font-sans text-black">
        <Navbar />
        <div className="mx-auto max-w-[1400px] px-4 py-20 lg:px-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Keranjang Kosong</h1>
          <p className="text-gray-500 mb-8">Silakan tambahkan produk ke keranjang terlebih dahulu</p>
          <Link
            href="/products"
            className="inline-block bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-gray-800 transition-all"
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
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full border ${formErrors.fullName ? "border-red-500" : "border-gray-100"} bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors`}
                  />
                  {formErrors.fullName && <p className="text-[10px] text-red-500">{formErrors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">EMAIL</label>
                  <input
                    type="email"
                    placeholder="email@contoh.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full border ${formErrors.email ? "border-red-500" : "border-gray-100"} bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors`}
                  />
                  {formErrors.email && <p className="text-[10px] text-red-500">{formErrors.email}</p>}
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">NOMOR TELEPON</label>
                  <input
                    type="tel"
                    placeholder="+62 812 3456 7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full border ${formErrors.phone ? "border-red-500" : "border-gray-100"} bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors`}
                  />
                  {formErrors.phone && <p className="text-[10px] text-red-500">{formErrors.phone}</p>}
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">ALAMAT LENGKAP</label>
                  <textarea
                    rows={3}
                    placeholder="Jalan, nomor rumah, RT/RW, kelurahan"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full border ${formErrors.address ? "border-red-500" : "border-gray-100"} bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors resize-none`}
                  />
                  {formErrors.address && <p className="text-[10px] text-red-500">{formErrors.address}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">KOTA</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full border ${formErrors.city ? "border-red-500" : "border-gray-100"} bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors`}
                  />
                  {formErrors.city && <p className="text-[10px] text-red-500">{formErrors.city}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">PROVINSI</label>
                    <input
                      type="text"
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className={`w-full border ${formErrors.province ? "border-red-500" : "border-gray-100"} bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors`}
                    />
                    {formErrors.province && <p className="text-[10px] text-red-500">{formErrors.province}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">KODE POS</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className={`w-full border ${formErrors.postalCode ? "border-red-500" : "border-gray-100"} bg-gray-50/50 px-4 py-4 text-sm focus:border-black focus:outline-none transition-colors`}
                    />
                    {formErrors.postalCode && <p className="text-[10px] text-red-500">{formErrors.postalCode}</p>}
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
                {cart.map((item) => (
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
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">PRODUCT</p>
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
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                {promoValid && (
                  <div className="flex justify-between text-xs font-medium text-green-600">
                    <span>Diskon ({promoCode})</span>
                    <span>-Rp {discount.toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs font-medium text-gray-500">
                  <span>Shipping</span>
                  <span className="text-[10px] uppercase tracking-widest">Dihitung di langkah berikutnya</span>
                </div>
                <div className="flex justify-between text-sm font-bold uppercase tracking-widest pt-2">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Kode promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 border border-gray-100 bg-gray-50/50 px-4 py-3 text-xs focus:border-black focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={checkPromoCode}
                    disabled={!promoCode.trim()}
                    className="bg-gray-100 px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    TERAPKAN
                  </button>
                </div>
                {promoValid === false && (
                  <p className="text-[10px] text-red-500">Kode promo tidak valid</p>
                )}
                {promoValid === true && (
                  <p className="text-[10px] text-green-600 flex items-center gap-1">
                    <Tag className="size-3" />
                    Kode promo {promoCode} berhasil diterapkan!
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={loading}
                className="mt-8 w-full bg-black py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? "MEMPROSES..." : "LANJUT KE PEMBAYARAN"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
