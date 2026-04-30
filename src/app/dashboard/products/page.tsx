"use client";

import { useEffect } from "react";
import DashboardSidebar from "../components/sidebar";
import DashboardHeader from "../components/header";
import ProductsContent from "./components/content";
import { useProductStore } from "../../../store/useProductStore";

export default function ProductsPage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts({ page: 1, limit: 20 });
  }, [fetchProducts]);

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          <ProductsContent products={products} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
