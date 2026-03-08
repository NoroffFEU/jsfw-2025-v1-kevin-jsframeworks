"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProductCard from "@/components/products/productCard";
import type { Product } from "@/types/product";

interface ProductsViewProps {
  products: Product[];
}

type SortOption = "default" | "title-asc" | "price-asc" | "price-desc" | "rating-desc";

export default function ProductsView({ products }: ProductsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return products;

    return products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }, [products, searchTerm]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortOption) {
      case "title-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));

      case "price-asc":
        return sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);

      case "price-desc":
        return sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);

      case "rating-desc":
        return sorted.sort((a, b) => b.rating - a.rating);

      default:
        return sorted;
    }
  }, [filteredProducts, sortOption]);

  const searchMatches = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return [];

    return products
      .filter((product) => product.title.toLowerCase().includes(query))
      .slice(0, 6);
  }, [products, searchTerm]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Browse our collection
        </h1>
        <p className="mt-2 text-slate-600">
          Checkout the latest products and find great discounts.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_220px]">
          <div className="relative">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>

            <input
              id="product-search"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-slate-900"
            />

            {searchMatches.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                <ul className="divide-y divide-slate-200">
                  {searchMatches.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.id}`}
                        className="block px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        {product.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="sort-products" className="sr-only">
              Sort products
            </label>

            <select
              id="sort-products"
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value as SortOption)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
            >
              <option value="default">Sort by</option>
              <option value="title-asc">Title A–Z</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating-desc">Rating: high to low</option>
            </select>
          </div>
        </div>
      </section>

      {searchTerm.trim() && (
        <p className="mb-6 text-sm text-slate-600">
          Found {sortedProducts.length} matching product
          {sortedProducts.length === 1 ? "" : "s"}.
        </p>
      )}

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}