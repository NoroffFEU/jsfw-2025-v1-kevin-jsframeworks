"use client";

import Image from "next/image";
import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const showToast = useToastStore((state) => state.showToast);

  function handleRemove() {
    removeItem(item.productId);
    showToast(`${item.title} removed from cart`, "error");
  }

  return (
    <article className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[100px_1fr]">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
        <Image src={item.image} alt={item.alt} fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
          <p className="mt-1 text-sm text-slate-600">
            {item.discountedPrice.toFixed(2)} kr per item
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              style={{ cursor: "pointer" }}
              className="rounded-lg border border-slate-300 px-3 py-1 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              aria-label={`Decrease quantity of ${item.title}`}
            >
              -
            </button>

            <span className="min-w-8 text-center text-sm font-medium text-slate-900">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              style={{ cursor: "pointer" }}
              className="rounded-lg border border-slate-300 px-3 py-1 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              aria-label={`Increase quantity of ${item.title}`}
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold text-slate-900">
              {(item.discountedPrice * item.quantity).toFixed(2)} kr
            </p>

            <button
              type="button"
              onClick={handleRemove}
              style={{ cursor: "pointer" }}
              className="text-sm font-medium text-red-600 transition hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}