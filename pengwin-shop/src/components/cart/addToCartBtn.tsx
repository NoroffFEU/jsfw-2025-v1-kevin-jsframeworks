"use client";

import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";
import type { AddToCartPayload } from "@/types/cart";

interface AddToCartButtonProps {
  product: AddToCartPayload;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  function handleAddToCart() {
    addItem(product);
    showToast(`${product.title} added to cart`, "success");
  }

return (
  <button
    type="button"
    onClick={handleAddToCart}
    style={{ cursor: "pointer" }}
    className="mt-8 w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-fit"
  >
    Add to Cart
  </button>
);
}
