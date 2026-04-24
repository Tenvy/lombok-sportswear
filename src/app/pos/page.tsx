"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Search, 
  User, 
  ShoppingCart, 
  CreditCard, 
  LogOut, 
  Plus, 
  Minus, 
  Trash2,
  Package,
  History,
  Settings,
  X,
  Bell,
  LayoutDashboard,
  Users,
  FileText,
  ChevronLeft,
  Printer,
  Wallet,
  Clock
} from "lucide-react";

// Mock Data
const products = [
  { id: "p-1", category: "POLO", name: "Classic Polo Black", price: 289000, stock: 24, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop" },
  { id: "p-2", category: "HOODIE", name: "Essential Hoodie", price: 389000, stock: 18, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop" },
  { id: "p-3", category: "JACKET", name: "Sport Zip Jacket", price: 459000, stock: 5, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop" },
  { id: "p-4", category: "PANTS", name: "Wide Leg Trousers", price: 349000, stock: 31, image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=400&fit=crop" },
  { id: "p-5", category: "T-SHIRT", name: "Everyday Crewneck", price: 179000, stock: 42, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
  { id: "p-6", category: "HOODIE", name: "Pullover Hoodie", price: 369000, stock: 0, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop" },
  { id: "p-7", category: "JACKET", name: "Track Jacket Pro", price: 489000, stock: 12, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop" },
  { id: "p-8", category: "PANTS", name: "Slim Jogger Pants", price: 329000, stock: 7, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop" },
  { id: "p-9", category: "ACCESSORY", name: "Sport Watch", price: 899000, stock: 9, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop" },
  { id: "p-10", category: "POLO", name: "Oxford Polo Smart", price: 309000, stock: 16, image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=400&fit=crop" },
];

const categories = ["ALL", "TOPS", "BOTTOMS", "JACKETS", "ACCESSORIES"];

export default function POSPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to true for demo
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [localProducts, setLocalProducts] = useState(products);
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number; size: string }[]>([]);
  const [tendered, setTendered] = useState("0");
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;
  const change = Math.max(0, parseInt(tendered || "0") - total);

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const addToCart = (product: typeof products[0]) => {
    if (product.stock === 0) return;
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      updateQuantity(product.id, 1);
    } else {
      setCart([...cart, { ...product, quantity: 1, size: "L" }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCompleteOrder = () => {
    if (cart.length === 0) return;
    if (parseInt(tendered) < total) {
      alert("Amount tendered is less than total price!");
      return;
    }

    // Update local stock
    const updatedProducts = localProducts.map(p => {
      const cartItem = cart.find(item => item.id === p.id);
      return cartItem ? { ...p, stock: Math.max(0, p.stock - cartItem.quantity) } : p;
    });

    setLocalProducts(updatedProducts);
    setIsSuccess(true);
    
    // Auto reset after 3 seconds
    setTimeout(() => {
      setCart([]);
      setTendered("0");
      setIsSuccess(false);
    }, 3000);
  };

  const filteredProducts = localProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || p.category + "S" === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-gray-900 font-sans overflow-hidden">
      {/* Success Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="text-center text-white">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-500">
              <Check className="size-10" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Transaction Success!</h2>
            <p className="mt-2 text-gray-400">Order #LS-20250624-047 has been processed.</p>
            <p className="mt-8 text-xs font-bold uppercase tracking-widest text-emerald-500">Resetting interface...</p>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-gray-100 bg-white">
        <div className="flex h-20 items-center px-8 border-b border-gray-50">
          <div className="text-xl font-black tracking-tighter">HEYMALE</div>
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          <SidebarLink icon={<LayoutDashboard className="size-4" />} label="Dashboard" />
          <SidebarLink icon={<ShoppingCart className="size-4" />} label="Cashier" active />
          <SidebarLink icon={<Package className="size-4" />} label="Inventory" />
          <SidebarLink icon={<FileText className="size-4" />} label="Reports" />
          <SidebarLink icon={<Users className="size-4" />} label="Customers" />
          <SidebarLink icon={<Settings className="size-4" />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black">
            <ChevronLeft className="size-4" /> Collapse
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-20 items-center justify-between bg-white px-8 border-b border-gray-100">
          <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Point of Sales</div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
              <Clock className="size-3.5" /> 14:32 WIB
              <div className="ml-2 flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-500">ONLINE</span>
              </div>
            </div>
            
            <div className="flex items-center gap-5">
              <div className="relative cursor-pointer text-gray-400 hover:text-black">
                <Bell className="size-5" />
                <span className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">3</span>
              </div>
              <div className="flex items-center gap-3 border-l border-gray-100 pl-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-[11px] font-bold text-white">AR</div>
                <div className="text-right">
                  <p className="text-[11px] font-bold">Ahmad R.</p>
                  <p className="text-[9px] text-gray-400">Kasir</p>
                </div>
                <LogOut className="ml-2 size-4 cursor-pointer text-gray-400 hover:text-red-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div className="bg-white px-8 py-4 border-b border-gray-50">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-300" />
              <input 
                type="text" 
                placeholder="Search product or scan barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-100 bg-[#F8F9FA] py-3 pl-12 pr-6 text-sm focus:border-black focus:outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-lg border px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? "border-black bg-black text-white" 
                    : "border-gray-100 bg-white text-gray-400 hover:border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className="group relative flex flex-col rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md cursor-pointer"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className={`object-cover transition-transform group-hover:scale-105 ${product.stock === 0 ? "opacity-50 grayscale" : ""}`}
                  />
                  {product.stock === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="w-full bg-black/60 py-2 text-center text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                        OUT OF STOCK
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{product.category}</p>
                  <h4 className="mt-1 text-xs font-bold leading-tight">{product.name}</h4>
                  <p className="mt-1.5 text-xs font-bold">Rp {product.price.toLocaleString("id-ID")}</p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className={`size-1.5 rounded-full ${product.stock > 10 ? "bg-emerald-500" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"}`} />
                    <span className="text-[10px] font-medium text-gray-400">{product.stock} in stock</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <aside className="flex w-[420px] flex-col bg-white border-l border-gray-100 shadow-xl">
        <div className="flex h-20 items-center justify-between px-8 border-b border-gray-50">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest">Current Order</h3>
            <p className="mt-1 text-[10px] text-gray-400">Order #LS-20250624-047</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">{cart.length}</span>
            <button 
              onClick={() => setCart([])}
              className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-gray-300">
              <ShoppingCart className="size-12 opacity-10" />
              <p className="mt-4 text-[10px] font-bold uppercase tracking-widest">Cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative size-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                  <Image src={products.find(p => p.id === item.id)?.image || ""} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex justify-between">
                    <h4 className="text-[11px] font-bold leading-tight">{item.name}</h4>
                    <X 
                      onClick={() => removeFromCart(item.id)}
                      className="size-3 text-gray-300 cursor-pointer hover:text-red-500" 
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-gray-400">Size: {item.size}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex h-8 items-center border border-gray-100 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-2 text-gray-400 hover:text-black"><Minus className="size-3" /></button>
                      <span className="w-6 text-center text-[11px] font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-2 text-gray-400 hover:text-black"><Plus className="size-3" /></button>
                    </div>
                    <p className="text-[11px] font-bold">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="p-8 border-t border-gray-50 bg-[#F8F9FA]/50">
          <div className="space-y-2.5">
            <div className="flex justify-between text-[11px] font-medium text-gray-400">
              <span>Subtotal ({cart.reduce((a,b) => a + b.quantity, 0)} items)</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-[11px] font-medium text-gray-400">
              <span>Tax (11%)</span>
              <span>Rp {tax.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-[11px] font-medium text-emerald-500">
              <span>Discount</span>
              <span>- Rp 0</span>
            </div>
            <div className="flex justify-between items-baseline pt-4">
              <span className="text-xs font-black uppercase tracking-widest">Total</span>
              <span className="text-xl font-black">Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-8 space-y-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Payment Method</p>
            <div className="grid grid-cols-3 gap-2">
              <PaymentBtn icon={<Wallet className="size-4" />} label="CASH" active />
              <PaymentBtn icon={<CreditCard className="size-4" />} label="CARD" />
              <PaymentBtn icon={<ShoppingCart className="size-4" />} label="E-WALLET" />
            </div>
          </div>

          {/* Tendered Input */}
          <div className="mt-6 space-y-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Amount Tendered</p>
            <div className="flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-gray-100 shadow-sm">
              <span className="text-xs font-bold text-gray-400">Rp</span>
              <input 
                type="text" 
                value={parseInt(tendered || "0").toLocaleString("id-ID")}
                onChange={(e) => setTendered(e.target.value.replace(/\D/g, ""))}
                className="flex-1 text-right text-base font-black focus:outline-none"
              />
            </div>
          </div>

          {/* Change */}
          <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-50 p-4 text-emerald-600">
            <span className="text-[10px] font-bold uppercase tracking-widest">Change</span>
            <span className="text-sm font-black">Rp {change.toLocaleString("id-ID")}</span>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <button 
              disabled={cart.length === 0}
              onClick={handleCompleteOrder}
              className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-black py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-gray-900 transition-all disabled:opacity-30"
            >
              <Check className="size-4" />
              Complete Order
            </button>
            <button className="flex size-14 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400 hover:border-black hover:text-black transition-all">
              <Printer className="size-5" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-xs font-bold transition-all ${
      active 
      ? "bg-black text-white shadow-lg shadow-black/10" 
      : "text-gray-400 hover:bg-gray-50 hover:text-black"
    }`}>
      {icon}
      <span className="uppercase tracking-widest text-[10px]">{label}</span>
    </button>
  );
}

function PaymentBtn({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-2 rounded-xl border-2 py-3 transition-all ${
      active 
      ? "border-black bg-black text-white" 
      : "border-gray-100 bg-white text-gray-400 hover:border-gray-200 hover:text-black"
    }`}>
      {icon}
      <span className="text-[8px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}

function Check(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
