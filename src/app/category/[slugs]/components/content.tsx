"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, X, ShoppingBag, SlidersHorizontal, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import MobileFilter from "../../components/MobileFilter";
import { useProductStore } from "@/src/store/useProductStore";
import { useCategoryStore } from "@/src/store/useCategoryStore";
import { useCart } from "@/src/app/context/CartContext";

type StoreProduct = ReturnType<typeof useProductStore.getState>["products"][number];

const STOCK_OPTIONS = [
  { label: "In Stock", value: "in_stock", color: "bg-emerald-500" },
  { label: "Low Stock", value: "low_stock", color: "bg-amber-500" },
  { label: "Out of Stock", value: "out_of_stock", color: "bg-red-500" },
];

const PRICE_MAX = 600000;
const PAGE_LIMIT = 20;

type Filters = {
  stock: string[];
  maxPrice: number;
  sizes: string[];
  colors: string[];
};

const EMPTY_FILTERS: Filters = {
  stock: [],
  maxPrice: PRICE_MAX,
  sizes: [],
  colors: [],
};

function buildCategoryQuery(
  slug: string,
  filters: Filters,
  page: number,
  limit: number
): string {
  const params = new URLSearchParams();
  params.set("category", slug);
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (filters.stock.length > 0) params.set("stockStatuses", filters.stock.join(","));
  if (filters.maxPrice < PRICE_MAX) params.set("maxPrice", String(filters.maxPrice));
  return params.toString();
}

function getPageButtons(current: number, total: number): (number | string)[] {
  if (total <= 0) return [];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | string)[] = [1];
  if (current > 3) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

function formatPrice(price: number) {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

function ProductCard({
  product,
  onQuickAdd,
}: {
  product: StoreProduct;
  onQuickAdd: (product: StoreProduct) => void;
}) {
  const categoryName = product.categories[0]?.name ?? "";
  const badge = product.soldOut ? "Sold Out" : undefined;

  return (
    <div className="group">
      <Link
        href={`/product/${product.slug}`}
        className="group relative mb-4 block aspect-[3/4] overflow-hidden bg-gray-50"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-black/10 pb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="pointer-events-auto bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-black"
          >
            Quick Add
          </button>
        </div>
        {badge && (
          <span className="absolute left-3 top-3 bg-black px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-white">
            {badge}
          </span>
        )}
      </Link>
      <Link href={`/product/${product.slug}`}>
        <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">
          {categoryName}
        </p>
        <h3 className="mb-1.5 text-sm font-semibold tracking-tight">
          {product.name}
        </h3>
        <p className="text-sm font-bold">{formatPrice(product.price)}</p>
      </Link>
    </div>
  );
}

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-[0.2em]"
      >
        {title}
        <ChevronDown
          className={`size-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function SidebarFilters({
  slug,
  filters,
  availableSizes,
  availableColors,
  onApply,
}: {
  slug: string;
  filters: Filters;
  availableSizes: string[];
  availableColors: { label: string; code: string | null }[];
  onApply: (filters: Filters) => void;
}) {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, [categories.length, fetchCategories]);

  const [localStock, setLocalStock] = useState<string[]>(filters.stock);
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(filters.maxPrice);
  const [localSizes, setLocalSizes] = useState<string[]>(filters.sizes);
  const [localColors, setLocalColors] = useState<string[]>(filters.colors);

  useEffect(() => {
    setLocalStock(filters.stock);
    setLocalMaxPrice(filters.maxPrice);
    setLocalSizes(filters.sizes);
    setLocalColors(filters.colors);
  }, [filters]);

  const toggleStock = (value: string) => {
    setLocalStock((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const toggleSize = (size: string) => {
    setLocalSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setLocalColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const apply = () => {
    onApply({
      stock: localStock,
      maxPrice: localMaxPrice,
      sizes: localSizes,
      colors: localColors,
    });
  };

  const clear = () => {
    setLocalStock([]);
    setLocalMaxPrice(PRICE_MAX);
    setLocalSizes([]);
    setLocalColors([]);
    onApply(EMPTY_FILTERS);
  };

  return (
    <aside className="hidden w-[220px] flex-shrink-0 lg:block">
      <div className="sticky top-[80px] max-h-[80vh] overflow-y-auto scrollbar-hide">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em]">
            Filter
          </h3>
          <button
            onClick={clear}
            className="text-[11px] uppercase tracking-wider text-gray-400 transition-colors hover:text-black"
          >
            Reset
          </button>
        </div>

        <FilterSection title="Kategori">
          <ul className="space-y-2">
            {categories.map((cat) => {
              const active = cat.slug === slug;
              return (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`flex items-center justify-between text-sm transition-colors ${
                      active
                        ? "font-semibold text-black"
                        : "text-gray-400 hover:text-black"
                    }`}
                  >
                    {cat.name}
                    <span
                      className={`text-[11px] ${active ? "font-normal text-gray-400" : ""}`}
                    >
                      ({cat._count?.productCategories ?? 0})
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </FilterSection>

        <FilterSection title="Stok">
          <div className="space-y-2">
            {STOCK_OPTIONS.map((status) => (
              <label
                key={status.value}
                className="group flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={localStock.includes(status.value)}
                  onChange={() => toggleStock(status.value)}
                  className="h-3.5 w-3.5 rounded accent-black"
                />
                <span className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors group-hover:text-black">
                  <span className={`h-1.5 w-1.5 rounded-full ${status.color}`} />
                  {status.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {availableSizes.length > 0 && (
          <FilterSection title="Ukuran">
            <div className="grid grid-cols-4 gap-2">
              {availableSizes.map((size) => {
                const selected = localSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`py-2 text-center text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                      selected
                        ? "border border-black bg-black text-white"
                        : "border border-gray-200 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </FilterSection>
        )}

        {availableColors.length > 0 && (
          <FilterSection title="Warna">
            <div className="flex flex-wrap gap-2.5">
              {availableColors.map((color) => {
                const selected = localColors.includes(color.label);
                return (
                  <button
                    key={color.label}
                    onClick={() => toggleColor(color.label)}
                    title={color.label}
                    style={
                      color.code ? { backgroundColor: color.code } : undefined
                    }
                    className={`h-7 w-7 rounded-full border border-gray-200 ${
                      selected ? "ring-2 ring-black ring-offset-2" : ""
                    }`}
                  />
                );
              })}
            </div>
          </FilterSection>
        )}

        <FilterSection title="Harga" defaultOpen={false}>
          <div className="space-y-3">
            <input
              type="range"
              min={0}
              max={PRICE_MAX}
              step={10000}
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Rp 0</span>
              <span>{formatPrice(localMaxPrice)}</span>
            </div>
          </div>
        </FilterSection>

        <button
          onClick={apply}
          className="w-full bg-black py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
        >
          Terapkan Filter
        </button>
      </div>
    </aside>
  );
}

function QuickAddModal({
  product,
  onClose,
}: {
  product: StoreProduct;
  onClose: () => void;
}) {
  const productColors = useMemo(() => {
    const map = new Map<string, { label: string; code: string | null }>();
    for (const v of product.variants) {
      if (v.color && !map.has(v.color)) {
        map.set(v.color, { label: v.color, code: v.colorCode });
      }
    }
    return Array.from(map.values());
  }, [product.variants]);

  const productSizes = useMemo(() => {
    return Array.from(
      new Set(
        product.variants
          .map((v) => v.size)
          .filter((s): s is string => Boolean(s))
      )
    );
  }, [product.variants]);

  const [selectedColor, setSelectedColor] = useState(
    productColors[0]?.label ?? ""
  );
  const [selectedSize, setSelectedSize] = useState("");
  const categoryName = product.categories[0]?.name ?? "";
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (productSizes.length > 0 && !selectedSize) return;
    try {
      await addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size: selectedSize || "OS",
        color: selectedColor || undefined,
        image: product.image,
      });
      toast.success(`${product.name} ditambahkan ke keranjang!`);
      onClose();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 z-[70]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="absolute bottom-4 right-4 w-[340px] max-w-[calc(100vw-2rem)] rounded-sm border border-gray-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gray-400">
              {categoryName}
            </p>
            <h3 className="truncate text-sm font-semibold tracking-tight">
              {product.name}
            </h3>
            <p className="mt-1 text-sm font-bold">{formatPrice(product.price)}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-gray-400 transition-colors hover:text-black"
          >
            <X className="size-4" />
          </button>
        </div>

        {productColors.length > 0 && (
          <div className="mb-4">
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.15em]">
              Warna
            </p>
            <div className="flex flex-wrap gap-2">
              {productColors.map((color) => (
                <button
                  key={color.label}
                  onClick={() => setSelectedColor(color.label)}
                  title={color.label}
                  style={color.code ? { backgroundColor: color.code } : undefined}
                  className={`h-7 w-7 rounded-full border border-gray-200 ${
                    selectedColor === color.label
                      ? "ring-2 ring-black ring-offset-2"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {productSizes.length > 0 && (
          <div className="mb-5">
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.15em]">
              Ukuran
            </p>
            <div className="flex flex-wrap gap-2">
              {productSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-9 w-11 items-center justify-center text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                    selectedSize === size
                      ? "border border-black bg-black text-white"
                      : "border border-gray-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={productSizes.length > 0 && !selectedSize}
          className="flex w-full items-center justify-center gap-2 bg-black py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <ShoppingBag className="size-3.5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function CollectionContent() {
  const params = useParams();
  const slug = params.slugs as string;
  const { products, page, totalPages, loading, error, fetchProducts } = useProductStore();
  const [quickAddProduct, setQuickAddProduct] = useState<StoreProduct | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  useEffect(() => {
    if (!slug) return;
    setFilters(EMPTY_FILTERS);
    fetchProducts(buildCategoryQuery(slug, EMPTY_FILTERS, 1, PAGE_LIMIT));
  }, [slug, fetchProducts]);

  const handleQuickAdd = useCallback((product: StoreProduct) => {
    setQuickAddProduct(product);
  }, []);

  const handleApply = useCallback(
    (next: Filters) => {
      setFilters(next);
      fetchProducts(buildCategoryQuery(slug, next, 1, PAGE_LIMIT));
    },
    [slug, fetchProducts]
  );

  const goToPage = useCallback(
    (next: number) => {
      if (next < 1 || next > totalPages || next === page) return;
      fetchProducts(buildCategoryQuery(slug, filters, next, PAGE_LIMIT));
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [slug, filters, page, totalPages, fetchProducts]
  );

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      for (const v of p.variants) {
        if (v.size) set.add(v.size);
      }
    }
    return Array.from(set);
  }, [products]);

  const availableColors = useMemo(() => {
    const map = new Map<string, string | null>();
    for (const p of products) {
      for (const v of p.variants) {
        if (v.color && !map.has(v.color)) map.set(v.color, v.colorCode);
      }
    }
    return Array.from(map.entries()).map(([label, code]) => ({ label, code }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (filters.sizes.length === 0 && filters.colors.length === 0) return products;
    return products.filter((p) => {
      const sizeMatch =
        filters.sizes.length === 0 ||
        p.variants.some((v) => v.size && filters.sizes.includes(v.size));
      const colorMatch =
        filters.colors.length === 0 ||
        p.variants.some((v) => v.color && filters.colors.includes(v.color));
      return sizeMatch && colorMatch;
    });
  }, [products, filters.sizes, filters.colors]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="mb-6 flex items-center gap-2 border border-gray-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors hover:border-black lg:hidden"
        >
          <SlidersHorizontal className="size-3.5" />
          Filter
        </button>

        <div className="flex gap-10 lg:gap-14">
          <SidebarFilters
            slug={slug}
            filters={filters}
            availableSizes={availableSizes}
            availableColors={availableColors}
            onApply={handleApply}
          />

          <div className="min-w-0 flex-1">
            {loading ? (
              <div className="py-20 text-center text-xs uppercase tracking-widest text-gray-400">
                Memuat produk...
              </div>
            ) : error ? (
              <div className="py-20 text-center text-xs uppercase tracking-widest text-red-500">
                {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 text-center text-xs uppercase tracking-widest text-gray-400">
                Tidak ada produk
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickAdd={handleQuickAdd}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-14 border-t border-gray-200 pt-8">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => goToPage(page - 1)}
                        disabled={page <= 1}
                        className={`flex h-10 w-10 items-center justify-center border border-gray-200 text-gray-400 transition-colors hover:border-black hover:text-black ${
                          page <= 1 ? "cursor-not-allowed opacity-50" : ""
                        }`}
                      >
                        <ChevronLeft className="size-4" />
                      </button>
                      {getPageButtons(page, totalPages).map((p, i) =>
                        p === "..." ? (
                          <span
                            key={`dot-${i}`}
                            className="px-1 text-xs text-gray-400"
                          >
                            ...
                          </span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => goToPage(p as number)}
                            className={`flex h-10 w-10 items-center justify-center text-xs transition-colors ${
                              page === p
                                ? "bg-black font-semibold text-white"
                                : "border border-gray-200 font-medium text-gray-400 hover:border-black hover:text-black"
                            }`}
                          >
                            {p}
                          </button>
                        )
                      )}
                      <button
                        onClick={() => goToPage(page + 1)}
                        disabled={page >= totalPages}
                        className={`flex h-10 w-10 items-center justify-center border border-gray-200 text-gray-400 transition-colors hover:border-black hover:text-black ${
                          page >= totalPages ? "cursor-not-allowed opacity-50" : ""
                        }`}
                      >
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                    <p className="mt-4 text-center text-[11px] uppercase tracking-widest text-gray-400">
                      Halaman {page} dari {totalPages}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {quickAddProduct && (
          <QuickAddModal
            product={quickAddProduct}
            onClose={() => setQuickAddProduct(null)}
          />
        )}
      </div>

      <MobileFilter
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        slug={slug}
        filters={filters}
        availableSizes={availableSizes}
        availableColors={availableColors}
        onApply={handleApply}
      />
    </>
  );
}
