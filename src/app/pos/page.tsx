"use client";

import { useState, useMemo } from "react";
import POSSidebar from "./components/POSSidebar";
import POSHeader from "./components/POSHeader";
import ProductGrid from "./components/ProductGrid";
import CartSidebar from "./components/CartSidebar";
import CustomizationModal from "./components/CustomizationModal";
import CheckoutModal from "./components/CheckoutModal";

// Mock Data
const INITIAL_PRODUCTS = [
  { id: "p-1", category: "POLO", name: "Classic Polo Black", price: 289000, stock: 24, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop", customizable: true },
  { id: "p-2", category: "HOODIE", name: "Essential Hoodie", price: 389000, stock: 18, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop", customizable: true },
  { id: "p-3", category: "JACKET", name: "Sport Zip Jacket", price: 459000, stock: 5, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop", customizable: true },
  { id: "p-4", category: "PANTS", name: "Wide Leg Trousers", price: 349000, stock: 31, image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=400&fit=crop", customizable: false },
  { id: "p-5", category: "T-SHIRT", name: "Everyday Crewneck", price: 179000, stock: 42, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", customizable: true },
  { id: "p-6", category: "JACKET", name: "Rainproof Windbreaker", price: 529000, stock: 12, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop", customizable: true },
  { id: "p-7", category: "TOPS", name: "Long Sleeve Knit", price: 259000, stock: 0, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop", customizable: false },
  { id: "p-8", category: "BOTTOMS", name: "Cargo Shorts Khaki", price: 199000, stock: 15, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop", customizable: false },
];

const CUSTOM_SERVICES = [
  { id: "s-1", name: "Print DTF A3", price: 45000 },
  { id: "s-2", name: "Print DTF A4", price: 25000 },
  { id: "s-3", name: "Print DTF Logo", price: 10000 },
  { id: "s-4", name: "Polyflex Sablon", price: 35000 },
  { id: "s-5", name: "Bordir Logo", price: 15000 },
];

interface CartItem {
  cartId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image?: string;
  customization?: {
    serviceName: string;
    servicePrice: number;
  };
}

export default function POSPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tendered, setTendered] = useState("0");
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');

  // Modals State
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<typeof INITIAL_PRODUCTS[0] | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Derived State
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "ALL" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  const totalAmount = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => {
      const itemPrice = item.price + (item.customization?.servicePrice || 0);
      return acc + (itemPrice * item.quantity);
    }, 0);
    return Math.round(subtotal * 1.11); // Total including 11% tax
  }, [cart]);

  // Handlers
  const handleProductClick = (product: typeof INITIAL_PRODUCTS[0]) => {
    if (product.stock === 0) return;
    if (product.customizable) {
      setPendingProduct(product);
      setCustomModalOpen(true);
    } else {
      addToCart(product);
    }
  };

  const addToCart = (product: typeof INITIAL_PRODUCTS[0], service?: typeof CUSTOM_SERVICES[0]) => {
    const cartId = `${product.id}-${service?.id || "plain"}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      const newItem: CartItem = {
        cartId,
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size: "L", // Default size
        image: product.image,
        customization: service ? {
          serviceName: service.name,
          servicePrice: service.price
        } : undefined
      };
      return [...prev, newItem];
    });

    setCustomModalOpen(false);
    setPendingProduct(null);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item =>
      item.cartId === cartId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Simulate stock update
    setProducts(prev => prev.map(p => {
      const cartItemsForProduct = cart.filter(item => item.id === p.id);
      const totalQty = cartItemsForProduct.reduce((sum, item) => sum + item.quantity, 0);
      return { ...p, stock: Math.max(0, p.stock - totalQty) };
    }));

    setCheckoutModalOpen(true);
  };

  const resetOrder = () => {
    setCart([]);
    setTendered("0");
    setPaymentMethod("cash");
    setCheckoutModalOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8F9FA] text-gray-900 font-sans">
      <div className="flex flex-1 flex-col overflow-hidden">
        <POSHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <ProductGrid
          products={filteredProducts}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onProductClick={handleProductClick}
        />
      </div>

      <CartSidebar
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={() => setCart([])}
        total={totalAmount}
        tendered={tendered}
        setTendered={setTendered}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onCheckout={handleCheckout}
      />

      <CustomizationModal
        open={customModalOpen}
        product={pendingProduct}
        services={CUSTOM_SERVICES}
        onClose={() => setCustomModalOpen(false)}
        onAdd={addToCart}
      />

      <CheckoutModal
        open={checkoutModalOpen}
        cart={cart}
        total={totalAmount}
        paymentMethod={paymentMethod}
        tendered={parseInt(tendered) || 0}
        onClose={resetOrder}
      />
    </div>
  );
}
