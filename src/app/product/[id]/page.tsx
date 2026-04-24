"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Heart, Share2, ChevronRight, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

// Mock data for products
const productsData = {
  "p-m-4": {
    category: "JACKET • MEN",
    name: "SPORT ZIP JACKET",
    price: "Rp 459.000",
    originalPrice: "Rp 599.000",
    discount: "-23%",
    rating: 4.7,
    reviews: 128,
    description: "Jacket zip premium dengan bahan DryTech™ yang ringan dan breathable. Sempurna untuk latihan di luar ruangan maupun daily casual wear. Dilengkapi kantong sisi berjahit dan detail reflektif.",
    features: ["Bahan DryTech™ Premium", "Water-resistant", "Breathable fabric", "Side zipper pockets"],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1000&h=1200&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "HITAM", hex: "#000000" },
      { name: "NAVY", hex: "#1D293F" },
      { name: "GREY", hex: "#7E8691" },
      { name: "WHITE", hex: "#FFFFFF" },
    ],
  },
  "p-m-1": {
    category: "TEE • MEN",
    name: "CLASSIC CREW TEE",
    price: "Rp 249.000",
    rating: 4.8,
    reviews: 85,
    description: "T-shirt klasik dengan bahan katun organik yang lembut dan nyaman.",
    features: ["100% Organic Cotton", "Preshrunk fabric", "Reinforced neck"],
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1000&h=1200&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "WHITE", hex: "#FFFFFF" },
      { name: "BLACK", hex: "#000000" },
    ],
  },
};

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = productsData[productId as keyof typeof productsData] || productsData["p-m-1"];

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-[11px] font-medium text-gray-400">
          <a href="/" className="hover:text-black">Home</a>
          <ChevronRight className="size-3" />
          <a href="/#produk" className="hover:text-black">Produk</a>
          <ChevronRight className="size-3" />
          <a href="/#jacket" className="hover:text-black">Jacket</a>
          <ChevronRight className="size-3" />
          <span className="text-black font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 space-y-4">
              {product.images.map((img, idx) => (
                <div key={idx} className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                  <Image
                    src={img}
                    alt={`${product.name} - ${idx + 1}`}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                  {idx === 0 && (
                    <div className="absolute left-6 top-6 bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                      NEW ARRIVAL
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {product.category}
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tighter text-black lg:text-5xl">
                  {product.name}
                </h1>
                
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`size-3.5 ${i < Math.floor(product.rating) ? "fill-black text-black" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-500">{product.rating} ({product.reviews} ulasan)</span>
                </div>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-black">{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                      <span className="bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-500">{product.discount}</span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-gray-500">
                {product.description}
              </p>

              <div className="h-px bg-gray-100" />

              {/* Color Selection */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest">WARNA — <span className="font-normal text-gray-500">{selectedColor}</span></p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
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
                      className={`flex h-12 items-center justify-center border text-xs font-bold transition-all ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 text-gray-900 hover:border-black"
                      }`}
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
                      className="flex h-full w-full items-center justify-center text-gray-400 hover:text-black"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-full text-center text-xs font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-full w-full items-center justify-center text-gray-400 hover:text-black"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex flex-[4] items-center justify-center gap-3 bg-black h-14 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-gray-900">
                    <ShoppingBag className="size-4" />
                    TAMBAH KE KERANJANG
                  </button>
                  <button className="flex flex-1 items-center justify-center border border-gray-200 h-14 hover:border-black transition-colors">
                    <Heart className="size-5" />
                  </button>
                  <button className="flex flex-1 items-center justify-center border border-gray-200 h-14 hover:border-black transition-colors">
                    <Share2 className="size-5" />
                  </button>
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
