"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color?: string;
  image: string;
  customization?: {
    serviceName: string;
    servicePrice: number;
  };
}

export interface AddToCartInput {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color?: string;
  image: string;
  customization?: { serviceName: string; servicePrice: number };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: AddToCartInput) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
  ready: boolean;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartResponse {
  id: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const applyResponse = (data: CartResponse) => {
    setCart(data.items);
    setTotalItems(data.totalItems);
    setSubtotal(data.subtotal);
  };

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch("/api/cart", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load cart");
      const data: CartResponse = await res.json();
      applyResponse(data);
    } catch (err) {
      console.error("[CartContext] fetchCart", err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await fetchCart();
      setReady(true);
    })();
  }, [fetchCart]);

  const addToCart = useCallback(
    async (item: AddToCartInput) => {
      setLoading(true);
      try {
        const res = await fetch("/api/cart/items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(item),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? "Failed to add item");
        }
        await fetchCart();
      } finally {
        setLoading(false);
      }
    },
    [fetchCart]
  );

  const removeFromCart = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cart/items/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to remove item");
        await fetchCart();
      } finally {
        setLoading(false);
      }
    },
    [fetchCart]
  );

  const updateQuantity = useCallback(
    async (id: string, quantity: number) => {
      if (quantity < 1) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/cart/items/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ quantity }),
        });
        if (!res.ok) throw new Error("Failed to update item");
        await fetchCart();
      } finally {
        setLoading(false);
      }
    },
    [fetchCart]
  );

  const clearCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to clear cart");
      await fetchCart();
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        ready,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
