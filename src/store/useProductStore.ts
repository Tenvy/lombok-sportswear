import { create } from "zustand";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
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

interface UseProductStore {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  fetchProducts: (params?: string) => Promise<void>;
  fetchProduct: (slug: string) => Promise<void>;
}

export const useProductStore = create<UseProductStore>()((set) => ({
  products: [],
  product: null,
  loading: false,
  error: null,

  fetchProducts: async (params?: string) => {
    set({ loading: true, error: null });
    try {
      const query = params ? `?${params}` : "";
      const response = await fetch(`/api/products${query}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchProduct: async (slug: string) => {
    set({ loading: true, error: null, product: null });
    try {
      const response = await fetch(`/api/products/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      const data = await response.json();
      set({ product: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
