import { create } from "zustand";

export interface CustomizationService {
  id: string;
  name: string;
  description: string | null;
  price: number;
}

interface UseCustomizationServiceStore {
  services: CustomizationService[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
  fetchServices: () => Promise<void>;
}

export const useCustomizationServiceStore = create<UseCustomizationServiceStore>()((set, get) => ({
  services: [],
  loading: false,
  error: null,
  fetched: false,

  fetchServices: async () => {
    if (get().fetched || get().loading) return;
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/customization-services");
      if (!response.ok) throw new Error("Failed to fetch customization services");
      const data = await response.json();
      set({ services: data, loading: false, fetched: true });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
