"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProductCard from "@/components/products/productCard";
import type { Product } from "@/types/product";

interface ProductsViewProps {
  products: Product[];
}

type SortOption =
  | "default"
  | "title-asc"
  | "price-asc"
  | "price-desc"
  | "rating-desc";

export default function ProductsView({ products }: ProductsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return products;

    return products.filter((product) =>
      product.title.toLowerCase().includes(query),
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
      .slice(0, 5);
  }, [products, searchTerm]);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pb-10 sm:pt-16 lg:px-8">
        <div className="max-w-3xl">

          <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.07em] text-slate-950 sm:text-6xl lg:text-7xl">
            Simple shopping for cool products.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Browse products, compare prices, and add your favourites to the
            cart in a clean and responsive e-commerce experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#products"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Browse products
            </a>

            <Link
              href="/contact"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="mb-8 rounded-[1.5rem] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.05em] text-slate-950 sm:text-4xl">
                Products
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Search or sort the collection to find what you are looking for.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-[minmax(220px,1fr)_190px] lg:w-[520px]">
              <div className="relative">
                <label htmlFor="search" className="sr-only">
                  Search products
                </label>

                <input
                  id="search"
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />

                {searchMatches.length > 0 && (
                  <ul className="absolute left-0 right-0 top-14 z-20 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                    {searchMatches.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/product/${product.id}`}
                          className="block px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                        >
                          {product.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label htmlFor="sort" className="sr-only">
                  Sort products
                </label>

                <select
                  id="sort"
                  value={sortOption}
                  onChange={(event) =>
                    setSortOption(event.target.value as SortOption)
                  }
                  className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="default">Sort by</option>
                  <option value="title-asc">Title A–Z</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="rating-desc">Rating: high to low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {searchTerm.trim() && (
          <p className="mb-5 text-sm font-semibold text-slate-500">
            Found {sortedProducts.length} matching product
            {sortedProducts.length === 1 ? "" : "s"}.
          </p>
        )}

        {sortedProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-10 text-center">
            <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950">
              No products found
            </h3>

            <p className="mt-2 text-slate-500">
              Try a different search term or clear the search field.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}