import { create } from "zustand";

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface Order {
  id: string;
  userId: string | null;
  status: string;
  subtotal: number;
  shipping: number;
  total: number;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  promoCodeId: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

interface PromoValidation {
  valid: boolean;
  code?: string;
  discount?: number;
  error?: string;
}

interface UseOrderStore {
  orders: Order[];
  currentOrder: Order | null;
  promoValidation: PromoValidation | null;
  loading: boolean;
  error: string | null;
  fetchOrders: (userId: string) => Promise<void>;
  createOrder: (orderData: Record<string, unknown>) => Promise<Order | null>;
  validatePromo: (code: string) => Promise<PromoValidation | null>;
  resetPromo: () => void;
}

export const useOrderStore = create<UseOrderStore>()((set) => ({
  orders: [],
  currentOrder: null,
  promoValidation: null,
  loading: false,
  error: null,

  fetchOrders: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/orders?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      set({ orders: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createOrder: async (orderData: Record<string, unknown>) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create order");
      }

      const order = await response.json();
      set({ currentOrder: order, loading: false });
      return order;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return null;
    }
  },

  validatePromo: async (code: string) => {
    try {
      const response = await fetch(`/api/promo/${encodeURIComponent(code)}`);
      const data = await response.json();
      set({ promoValidation: data });
      return data;
    } catch (error) {
      const validation: PromoValidation = { valid: false, error: (error as Error).message };
      set({ promoValidation: validation });
      return validation;
    }
  },

  resetPromo: () => set({ promoValidation: null }),
}));
