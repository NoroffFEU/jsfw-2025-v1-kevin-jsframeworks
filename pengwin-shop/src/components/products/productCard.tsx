import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

function calculateDiscountPercentage(price: number, discountedPrice: number) {
  if (discountedPrice >= price) return 0;
  return Math.round(((price - discountedPrice) / price) * 100);
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountedPrice < product.price;
  const discountPercentage = calculateDiscountPercentage(
    product.price,
    product.discountedPrice
  );

  return (
    <Link
      href={`/product/${product.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {hasDiscount && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            -{discountPercentage}%
          </span>
        )}

        <Image
          src={product.image.url}
          alt={product.image.alt}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-4">
        <h2 className="line-clamp-1 text-lg font-bold">
          {product.title}
        </h2>

        <p className="text-md text-slate-500">Rating: {product.rating}/5</p>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">
            {product.discountedPrice.toFixed(2)} kr
          </span>

          {hasDiscount && (
            <span className="text-md text-slate-500 line-through">
              {product.price.toFixed(2)} kr
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}