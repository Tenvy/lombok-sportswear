import { create } from "zustand";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: {
    productCategories: number;
  };
  productCategories: {
    product: {
      image: string;
    };
  }[];
}

interface UseCategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<UseCategoryStore>()((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      set({ categories: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
