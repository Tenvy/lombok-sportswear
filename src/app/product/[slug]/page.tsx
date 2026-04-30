"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Heart, Share2, ChevronRight, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { useCart } from "@/src/app/context/CartContext";
import { useProductStore } from "@/src/store/useProductStore";
import Link from "next/link";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  soldOut: boolean;
  sizes: string[];
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

const customServices = [
  { name: "PRINT DTF A3", price: 45000 },
  { name: "PRINT DTF A4", price: 25000 },
  { name: "SABLON POLYFLEX", price: 35000 },
  { name: "BORDIR LOGO", price: 15000 },
];

const colors = [
  { name: "HITAM", hex: "#000000" },
  { name: "NAVY", hex: "#1D293F" },
  { name: "GREY", hex: "#7E8691" },
  { name: "WHITE", hex: "#FFFFFF" },
];

export default function ProductPage() {
  const params = useParams();
  const productSlug = params.slug as string;
  const { product, loading, fetchProduct } = useProductStore();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [selectedService, setSelectedService] = useState<{ name: string; price: number } | null>(null);
  const [descExpanded, setDescExpanded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct(productSlug);
  }, [productSlug, fetchProduct]);

  const effectiveSize = selectedSize || product?.sizes?.[0] || "";

  const handleAddToCart = () => {
    if (!product || !effectiveSize) return;

    addToCart({
      id: `${product.slug}-${effectiveSize}-${selectedColor}-${selectedService?.name || "plain"}`,
      name: product.name,
      price: product.price,
      quantity: quantity,
      size: effectiveSize,
      image: product.image,
      customization: selectedService ? {
        serviceName: selectedService.name,
        servicePrice: selectedService.price
      } : undefined
    });
    alert(`${product.name} ${selectedService ? `(+ ${selectedService.name}) ` : ""}ditambahkan ke keranjang!`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <div className="animate-pulse text-gray-400">Loading product...</div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <div className="text-gray-400">Product not found</div>
        </div>
      </main>
    );
  }

  const totalPrice = product.price + (selectedService?.price || 0);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-[11px] font-medium text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link>
          <ChevronRight className="size-3" />
          <Link href="/products" className="hover:text-black">Produk</Link>
          {product.categories.length > 0 && (
            <>
              <ChevronRight className="size-3" />
              <Link href={`/category/${product.categories[0].slug}`} className="hover:text-black">{product.categories[0].name}</Link>
            </>
          )}
          <ChevronRight className="size-3" />
          <span className="text-black font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                <Image
                  src={product.images?.[selectedImageIndex] || product.image}
                  alt={`${product.name} - ${selectedImageIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
                {product.soldOut && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="bg-black px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative size-20 shrink-0 overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index ? "border-black" : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {product.categories.map((c) => c.name).join(" + ")}
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tighter text-black lg:text-5xl">
                  {product.name}
                </h1>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-black">Rp {totalPrice.toLocaleString("id-ID")}</span>
                  {selectedService && (
                    <span className="text-sm text-gray-400 line-through">Rp {product.price.toLocaleString("id-ID")}</span>
                  )}
                </div>
              </div>

              <div className="h-px bg-gray-100" />

              {/* Customization Options */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest">OPSI CUSTOMISASI</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedService(null)}
                    className={`flex flex-col items-center justify-center gap-2 border p-4 transition-all ${!selectedService ? "border-black bg-black text-white" : "border-gray-200 hover:border-black"}`}
                  >
                    <span className="text-[10px] font-bold uppercase">POLOS</span>
                    <span className="text-[9px] opacity-60">Tanpa Tambahan</span>
                  </button>
                  <div className="relative group">
                    <button className={`w-full flex flex-col items-center justify-center gap-2 border p-4 transition-all ${selectedService ? "border-black bg-black text-white" : "border-gray-200 hover:border-black"}`}>
                      <span className="text-[10px] font-bold uppercase">{selectedService ? selectedService.name : "CUSTOM PRINT"}</span>
                      <span className="text-[9px] opacity-60">{selectedService ? `+ Rp ${selectedService.price.toLocaleString("id-ID")}` : "Pilih Layanan"}</span>
                    </button>
                    {/* Dropdown for services */}
                    <div className="absolute left-0 top-full z-10 hidden w-full bg-white shadow-xl ring-1 ring-black/5 group-hover:block">
                      {customServices.map((service) => (
                        <button
                          key={service.name}
                          onClick={() => setSelectedService(service)}
                          className="w-full px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50"
                        >
                          {service.name} <span className="float-right text-gray-400">+ {service.price / 1000}k</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest">WARNA — <span className="font-normal text-gray-500">{selectedColor}</span></p>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`size-10 rounded-full border-2 p-0.5 transition-all ${
                        selectedColor === color.name ? "border-black" : "border-transparent"
                      }`}
                    >
                      <div
                        className="h-full w-full rounded-full border border-gray-100 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-widest">UKURAN</p>
                  <button className="text-[10px] font-bold text-gray-400 underline decoration-gray-300 underline-offset-4 hover:text-black hover:decoration-black">Panduan Ukuran</button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={product.soldOut}
                      className={`flex h-12 items-center justify-center border text-xs font-bold transition-all ${
                        effectiveSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 text-gray-900 hover:border-black"
                      } ${product.soldOut ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Action */}
              <div className="space-y-4 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest">JUMLAH</p>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-32 items-center border border-gray-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={product.soldOut}
                      className="flex h-full w-full items-center justify-center text-gray-400 hover:text-black disabled:opacity-50"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-full text-center text-xs font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={product.soldOut}
                      className="flex h-full w-full items-center justify-center text-gray-400 hover:text-black disabled:opacity-50"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                   <button
                    onClick={handleAddToCart}
                    disabled={product.soldOut || !effectiveSize}
                    className="flex flex-[4] items-center justify-center gap-3 bg-black h-14 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="size-4" />
                    {product.soldOut ? "SOLD OUT" : "TAMBAH KE KERANJANG"}
                  </button>
                  <button className="flex flex-1 items-center justify-center border border-gray-200 h-14 hover:border-black transition-colors">
                    <Heart className="size-5" />
                  </button>
                  <button className="flex flex-1 items-center justify-center border border-gray-200 h-14 hover:border-black transition-colors">
                    <Share2 className="size-5" />
                  </button>
                 </div>
               </div>

              <div className="h-px bg-gray-100" />

              {/* Description */}
              <div className="mt-4">
                <div className={`relative overflow-hidden transition-[max-height] duration-300 ${descExpanded ? "max-h-[9999px]" : "max-h-[344px]"}`}>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-gray-500">
                    {product.description}
                  </p>
                  {!descExpanded && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
                  )}
                </div>
                {!descExpanded && (
                  <button
                    onClick={() => setDescExpanded(true)}
                    className="mt-2 flex w-full items-center justify-center rounded border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-600 transition-colors hover:border-black hover:text-black"
                  >
                    Lihat Selengkapnya
                  </button>
                )}
              </div>
             </div>
           </div>
         </div>
       </div>

      <Footer />
    </main>
  );
}
