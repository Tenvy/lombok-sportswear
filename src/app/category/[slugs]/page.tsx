"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import CollectionSlugHeader from "./components/header";
import CollectionContent from "./components/content";
import { useCategoryStore } from "@/src/store/useCategoryStore";

export default function CollectionSlugPage() {
  const params = useParams();
  const slug = params.slugs as string;
  const { categories, loading, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, [categories.length, fetchCategories]);

  const category = categories.find((c) => c.slug === slug);
  const showHeader = !loading && category;

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />
      <CollectionSlugHeader
        name={showHeader ? category.name : ""}
        productCount={showHeader ? category._count.productCategories : undefined}
        showBreadcrumb={showHeader}
      />
      <CollectionContent />
      <Footer />
    </div>
  );
}
