import { create } from "zustand";

interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  _count: {
    productCategories: number;
  };
  productCategories: {
    product: {
      image: string;
    };
  }[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  pagesLeft: number;
}

interface UseCategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;
  pagination: Pagination | null;
  fetchCategories: (params?: { page?: number; limit?: number }) => Promise<void>;
}

export const useCategoryStore = create<UseCategoryStore>()((set) => ({
  categories: [],
  loading: false,
  error: null,
  pagination: null,

  fetchCategories: async (params) => {
    set({ loading: true, error: null });
    try {
      const query = new URLSearchParams();
      if (params?.page) query.set("page", String(params.page));
      if (params?.limit) query.set("limit", String(params.limit));

      const response = await fetch(`/api/categories?${query}`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();

      if (data.categories && data.pagination) {
        set({
          categories: data.categories,
          pagination: data.pagination,
          loading: false,
        });
      } else {
        set({ categories: data, pagination: null, loading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
