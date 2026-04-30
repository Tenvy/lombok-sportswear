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
  stock: number;
  status: string;
  sizes: string[];
  variants: Array<{
    id: string;
    color: string | null;
    colorCode: string | null;
    size: string | null;
    stock: number;
  }>;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

interface FetchOpts {
  page?: number;
  limit?: number;
  search?: string;
  categoryFilters?: string[];
  stockFilters?: string[];
  minPrice?: number | null;
  maxPrice?: number | null;
  statusFilters?: string[];
}

interface UseProductStore {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  pagesLeft: number;
  search: string;
  categoryFilters: string[];
  stockFilters: string[];
  minPrice: number | null;
  maxPrice: number | null;
  statusFilters: string[];
  fetchProducts: (opts?: string | FetchOpts) => Promise<void>;
  fetchProduct: (slug: string) => Promise<void>;
  createProduct: (payload: any) => Promise<void>;
  updateProduct: (payload: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  bulkProducts: (action: string, ids: string[]) => Promise<void>;
}

export const useProductStore = create<UseProductStore>()((set, get) => ({
  products: [],
  product: null,
  loading: false,
  error: null,
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
  pagesLeft: 0,
  search: "",
  categoryFilters: [],
  stockFilters: [],
  minPrice: null,
  maxPrice: null,
  statusFilters: [],

  fetchProducts: async (opts) => {
    set({ loading: true, error: null });
    try {
      const state = get();
      let page = state.page;
      let limit = state.limit;
      let search = state.search;
      let categoryFilters = state.categoryFilters;
      let stockFilters = state.stockFilters;
      let minPrice = state.minPrice;
      let maxPrice = state.maxPrice;
      let statusFilters = state.statusFilters;
      let url = "/api/products";

      if (typeof opts === "string") {
        url += `?${opts}`;
      } else {
        page = opts?.page ?? page;
        limit = opts?.limit ?? limit;
        search = opts?.search ?? search;
        categoryFilters = opts?.categoryFilters ?? categoryFilters;
        stockFilters = opts?.stockFilters ?? stockFilters;
        minPrice = opts?.minPrice ?? minPrice;
        maxPrice = opts?.maxPrice ?? maxPrice;
        statusFilters = opts?.statusFilters ?? statusFilters;

        const query = new URLSearchParams();
        query.set("page", String(page));
        query.set("limit", String(limit));
        if (search) query.set("search", search);
        if (categoryFilters.length > 0) query.set("categoryNames", categoryFilters.join(","));
        if (stockFilters.length > 0) query.set("stockStatuses", stockFilters.join(","));
        if (minPrice != null) query.set("minPrice", String(minPrice));
        if (maxPrice != null) query.set("maxPrice", String(maxPrice));
        if (statusFilters.length > 0) query.set("statuses", statusFilters.join(","));
        url += `?${query.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();

      if (Array.isArray(data)) {
        set({
          products: data,
          page,
          limit,
          total: data.length,
          totalPages: 1,
          pagesLeft: 0,
          search,
          categoryFilters,
          stockFilters,
          minPrice,
          maxPrice,
          statusFilters,
          loading: false,
        });
      } else {
        set({
          products: data.products,
          page: data.pagination.page,
          limit: data.pagination.limit,
          total: data.pagination.total,
          totalPages: data.pagination.totalPages,
          pagesLeft: data.pagination.pagesLeft,
          search,
          categoryFilters,
          stockFilters,
          minPrice,
          maxPrice,
          statusFilters,
          loading: false,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchProduct: async (slug: string) => {
    set({ loading: true, error: null, product: null });
    try {
      const response = await fetch(`/api/products?id=${slug}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      const data = await response.json();
      set({ product: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createProduct: async (payload: any) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create product");
      await get().fetchProducts();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateProduct: async (payload: any) => {
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update product");
      await get().fetchProducts();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteProduct: async (id: string) => {
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      await get().fetchProducts();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  bulkProducts: async (action: string, ids: string[]) => {
    try {
      const res = await fetch("/api/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ids }),
      });
      if (!res.ok) throw new Error("Bulk action failed");
      await get().fetchProducts();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));
