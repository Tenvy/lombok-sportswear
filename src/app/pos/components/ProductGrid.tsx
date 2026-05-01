"use client";

import Image from "next/image";
import { Edit3, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  category: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  customizable: boolean;
}

const categories = ["ALL", "TOPS", "BOTTOMS", "JACKETS", "SERVICES"];

export default function ProductGrid({ 
  products, 
  activeCategory, 
  setActiveCategory,
  onProductClick
}: { 
  products: Product[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onProductClick: (p: Product) => void;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="border-b bg-background px-8 py-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap rounded-md px-4 py-2 text-xs font-medium transition-all border",
                activeCategory === cat 
                  ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                  : "bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className={cn(
                "group relative flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:ring-2 hover:ring-primary cursor-pointer overflow-hidden",
                product.stock === 0 && "opacity-60"
              )}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover" 
                />
                
                {product.customizable && (
                  <div className="absolute right-2 top-2 rounded-full bg-background/80 p-1 border shadow-sm">
                    <Edit3 className="size-3 text-foreground" />
                  </div>
                )}

                {product.stock <= 5 && product.stock > 0 && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-bold uppercase text-white shadow-sm">
                    Low Stock: {product.stock}
                  </span>
                )}
                
                {product.stock === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                    <span className="rounded-md border bg-background px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{product.category}</p>
                <h4 className="mt-1 line-clamp-1 text-sm font-semibold tracking-tight">
                  {product.name}
                </h4>
                <div className="mt-2 flex items-center justify-between border-t pt-2">
                  <p className="text-sm font-bold">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  <Package className="size-3 text-muted-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center py-20">
            <Package className="size-12 text-muted mb-4" />
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="text-sm text-muted-foreground">Adjust your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
