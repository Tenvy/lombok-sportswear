"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { 
  Search, 
  ShoppingCart, 
  CreditCard, 
  LogOut, 
  Plus, 
  Minus, 
  Trash2,
  Package,
  Settings,
  X,
  Bell,
  LayoutDashboard,
  Users,
  FileText,
  ChevronLeft,
  Printer,
  Wallet,
  Clock,
  Edit3,
  Check
} from "lucide-react";

// Mock Data
const products = [
  { id: "p-1", category: "POLO", name: "Classic Polo Black", price: 289000, stock: 24, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop", customizable: true },
  { id: "p-2", category: "HOODIE", name: "Essential Hoodie", price: 389000, stock: 18, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop", customizable: true },
  { id: "p-3", category: "JACKET", name: "Sport Zip Jacket", price: 459000, stock: 5, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop", customizable: true },
  { id: "p-4", category: "PANTS", name: "Wide Leg Trousers", price: 349000, stock: 31, image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=400&fit=crop", customizable: false },
  { id: "p-5", category: "T-SHIRT", name: "Everyday Crewneck", price: 179000, stock: 42, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", customizable: true },
];

const customServices = [
  { id: "s-1", name: "Print DTF A3", price: 45000 },
  { id: "s-2", name: "Print DTF A4", price: 25000 },
  { id: "s-3", name: "Print DTF Logo", price: 10000 },
  { id: "s-4", name: "Polyflex Sablon", price: 35000 },
  { id: "s-5", name: "Bordir Logo", price: 15000 },
];

const categories = ["ALL", "TOPS", "BOTTOMS", "JACKETS", "SERVICES"];

interface CartItem {
  cartId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  customization?: {
    serviceName: string;
    servicePrice: number;
  };
}

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [localProducts, setLocalProducts] = useState(products);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tendered, setTendered] = useState("0");
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Customization Modal State
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<typeof products[0] | null>(null);
  const [selectedService, setSelectedService] = useState<typeof customServices[0] | null>(null);

  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.price + (item.customization?.servicePrice || 0);
    return acc + itemPrice * item.quantity;
  }, 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;
  const change = Math.max(0, parseInt(tendered || "0") - total);

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(cart.map(item => 
      item.cartId === cartId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const handleProductClick = (product: typeof products[0]) => {
    if (product.stock === 0) return;
    if (product.customizable) {
      setPendingProduct(product);
      setShowCustomModal(true);
    } else {
      addToCart(product);
    }
  };

  const cartIdRef = useRef(0);

  const addToCart = (product: typeof products[0], service?: typeof customServices[0]) => {
    cartIdRef.current += 1;
    const cartId = `${product.id}-${service?.id || "plain"}-${cartIdRef.current}`;
    const newItem: CartItem = {
      cartId,
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: "L",
      customization: service ? {
        serviceName: service.name,
        servicePrice: service.price
      } : undefined
    };
    setCart([...cart, newItem]);
    setShowCustomModal(false);
    setPendingProduct(null);
    setSelectedService(null);
  };

  const removeFromCart = (cartId: string) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const handleCompleteOrder = () => {
    if (cart.length === 0) return;
    if (parseInt(tendered) < total) {
      alert("Nominal pembayaran kurang!");
      return;
    }

    const updatedProducts = localProducts.map(p => {
      const totalInCart = cart.filter(item => item.id === p.id).reduce((sum, item) => sum + item.quantity, 0);
      return { ...p, stock: Math.max(0, p.stock - totalInCart) };
    });

    setLocalProducts(updatedProducts);
    setIsSuccess(true);
    setTimeout(() => {
      setCart([]);
      setTendered("0");
      setIsSuccess(false);
    }, 3000);
  };

  const filteredProducts = localProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || p.category + "S" === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-gray-900 font-sans overflow-hidden">
      {/* Success Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="text-center text-white">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-500">
              <Check className="size-10" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Transaksi Berhasil!</h2>
            <p className="mt-2 text-gray-400">Order #LS-20250624-047 telah diproses.</p>
          </div>
        </div>
      )}

      {/* Customization Modal */}
      {showCustomModal && pendingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[500px] rounded-2xl bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <h2 className="text-xl font-black uppercase tracking-tighter">Customization Flow</h2>
              <X className="size-6 cursor-pointer text-gray-400 hover:text-black" onClick={() => setShowCustomModal(false)} />
            </div>
            
            <div className="mt-6 flex gap-4 rounded-xl bg-gray-50 p-4">
              <div className="relative size-16 overflow-hidden rounded-lg">
                <Image src={pendingProduct.image} alt={pendingProduct.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{pendingProduct.category}</p>
                <h3 className="font-bold">{pendingProduct.name}</h3>
                <p className="text-sm font-bold">Rp {pendingProduct.price.toLocaleString("id-ID")}</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">PILIH LAYANAN CUSTOM</p>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSelectedService(null)}
                  className={`flex items-center justify-between rounded-xl border-2 p-4 transition-all ${!selectedService ? "border-black bg-black text-white" : "border-gray-100 hover:border-gray-300"}`}
                >
                  <span className="text-xs font-bold uppercase tracking-widest">Polos (Tanpa Custom)</span>
                  <span className="text-xs font-bold">+ Rp 0</span>
                </button>
                {customServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`flex items-center justify-between rounded-xl border-2 p-4 transition-all ${selectedService?.id === service.id ? "border-black bg-black text-white" : "border-gray-100 hover:border-gray-300"}`}
                  >
                    <span className="text-xs font-bold uppercase tracking-widest">{service.name}</span>
                    <span className="text-xs font-bold">+ Rp {service.price.toLocaleString("id-ID")}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => addToCart(pendingProduct, selectedService || undefined)}
              className="mt-8 w-full rounded-xl bg-black py-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-gray-900 transition-all"
            >
              TAMBAHKAN KE PESANAN
            </button>
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
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-20 items-center justify-between bg-white px-8 border-b border-gray-100">
          <div className="text-xs font-bold uppercase tracking-widest text-gray-400">POS • Cititex Model</div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
              <Clock className="size-3.5" /> 14:32 WIB
              <div className="ml-2 flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-emerald-500" />
                <span className="text-emerald-500">ONLINE</span>
              </div>
            </div>
            <div className="flex items-center gap-3 border-l border-gray-100 pl-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-[11px] font-bold text-white">AR</div>
              <p className="text-[11px] font-bold">Ahmad R.</p>
            </div>
          </div>
        </header>

        <div className="bg-white px-8 py-4 border-b border-gray-50">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-300" />
              <input 
                type="text" 
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-100 bg-[#F8F9FA] py-3 pl-12 pr-6 text-sm focus:border-black transition-all"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-lg border px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat ? "border-black bg-black text-white" : "border-gray-100 bg-white text-gray-400 hover:border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="group relative flex flex-col rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md cursor-pointer"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                  {product.customizable && (
                    <div className="absolute right-2 top-2 rounded-full bg-black p-1.5 text-white shadow-lg">
                      <Edit3 className="size-3" />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{product.category}</p>
                  <h4 className="mt-1 text-xs font-bold">{product.name}</h4>
                  <p className="mt-1 text-xs font-bold">Rp {product.price.toLocaleString("id-ID")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <aside className="flex w-[450px] flex-col bg-white border-l border-gray-100 shadow-xl">
        <div className="flex h-20 items-center justify-between px-8 border-b border-gray-50">
          <h3 className="text-sm font-black uppercase tracking-widest">Pesanan Saat Ini</h3>
          <button onClick={() => setCart([])} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:underline">Clear</button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {cart.map((item) => (
            <div key={item.cartId} className="flex gap-4">
              <div className="relative size-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                <Image src={products.find(p => p.id === item.id)?.image || ""} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <div className="flex justify-between">
                  <h4 className="text-[11px] font-bold leading-tight">{item.name}</h4>
                  <X onClick={() => removeFromCart(item.cartId)} className="size-3 text-gray-300 cursor-pointer hover:text-red-500" />
                </div>
                {item.customization && (
                  <p className="mt-1 flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 uppercase">
                    <Edit3 className="size-2.5" /> {item.customization.serviceName}
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex h-8 items-center border border-gray-100 rounded-lg">
                    <button onClick={() => updateQuantity(item.cartId, -1)} className="px-2 text-gray-400 hover:text-black"><Minus className="size-3" /></button>
                    <span className="w-6 text-center text-[11px] font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartId, 1)} className="px-2 text-gray-400 hover:text-black"><Plus className="size-3" /></button>
                  </div>
                  <p className="text-[11px] font-bold">Rp {((item.price + (item.customization?.servicePrice || 0)) * item.quantity).toLocaleString("id-ID")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 border-t border-gray-50 bg-[#F8F9FA]/50">
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-black uppercase tracking-widest">Total Tagihan</span>
              <span className="text-xl font-black">Rp {total.toLocaleString("id-ID")}</span>
            </div>
            
            <div className="space-y-3">
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Pembayaran</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 rounded-xl bg-black p-4 text-[10px] font-bold text-white uppercase tracking-widest"><Wallet className="size-4" /> Tunai</button>
                <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest"><CreditCard className="size-4" /> QRIS / Debit</button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Uang Diterima</p>
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

            <button 
              disabled={cart.length === 0}
              onClick={handleCompleteOrder}
              className="w-full rounded-xl bg-emerald-500 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-emerald-600 transition-all disabled:opacity-30"
            >
              SELESAIKAN TRANSAKSI
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
      active ? "bg-black text-white shadow-lg" : "text-gray-400 hover:bg-gray-50 hover:text-black"
    }`}>
      {icon}
      <span className="uppercase tracking-widest text-[10px]">{label}</span>
    </button>
  );
}
