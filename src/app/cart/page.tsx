"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Minus, Plus, ArrowRight, Tag, ChevronRight, ShoppingBag } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import { useCart } from "@/src/app/context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = subtotal > 1000000 ? 0 : 25000;
  const total = subtotal + shipping - discount;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "WELCOME10") {
      setDiscount(subtotal * 0.1);
      alert("Promo applied: 10% discount!");
    } else {
      alert("Invalid promo code");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-10 flex items-center gap-2 text-[11px] font-medium text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link>
          <ChevronRight className="size-3" />
          <span className="text-black font-semibold">Keranjang</span>
        </nav>

        <h1 className="mb-10 text-2xl font-bold uppercase tracking-widest">Shopping Bag</h1>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                <ShoppingBag className="size-16 opacity-10" />
                <p className="mt-4 text-xs font-bold uppercase tracking-widest">Keranjang Anda kosong</p>
                <Link href="/" className="mt-8 text-[10px] font-bold uppercase tracking-widest text-black underline underline-offset-4">Mulai Belanja</Link>
              </div>
            ) : (
              <div className="space-y-10">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-6 border-b border-gray-50 pb-10">
                    <div className="relative aspect-[4/5] w-32 flex-shrink-0 bg-gray-50 overflow-hidden rounded-sm">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-tight">{item.name}</h3>
                          {item.customization && (
                            <p className="mt-1 flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 uppercase tracking-widest">
                              <Tag className="size-2.5" /> {item.customization.serviceName} (+ Rp {item.customization.servicePrice.toLocaleString("id-ID")})
                            </p>
                          )}
                          <p className="mt-1 text-[11px] text-gray-500">{item.size}</p>
                        </div>
                        <p className="text-xs font-bold">Rp {(item.price + (item.customization?.servicePrice || 0)).toLocaleString("id-ID")}</p>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex h-10 items-center border border-gray-200">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="flex h-full w-10 items-center justify-center text-gray-400 hover:text-black"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-8 text-center text-[11px] font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-full w-10 items-center justify-center text-gray-400 hover:text-black"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8 bg-gray-50 p-8">
              <h2 className="text-xs font-bold uppercase tracking-widest">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-500">Subtotal</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `Rp ${shipping.toLocaleString("id-ID")}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs font-medium text-green-600">
                    <span>Discount</span>
                    <span>- Rp {discount.toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between text-sm font-bold uppercase tracking-widest">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="space-y-3 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Promo Code</p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="w-full border border-gray-200 bg-white px-9 py-2.5 text-xs focus:border-black focus:outline-none"
                    />
                  </div>
                  <button 
                    onClick={applyPromo}
                    className="bg-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-gray-800"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-[9px] text-gray-400">Try "WELCOME10" for 10% off</p>
              </div>

              <Link href="/checkout" className="flex w-full items-center justify-center gap-2 bg-black py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-gray-800">
                Checkout <ArrowRight className="size-4" />
              </Link>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <div className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>Secure payment via Nicepay</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <div className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>Free shipping on orders over Rp 1.000.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
