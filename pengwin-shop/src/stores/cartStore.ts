"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AddToCartPayload, CartItem } from "@/types/cart";

interface CartStore {
  items: CartItem[];
  addItem: (product: AddToCartPayload) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === product.productId
          );

          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.productId === product.productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );

            return { items: updatedItems };
          }

          const newItem: CartItem = {
            productId: product.productId,
            title: product.title,
            price: product.price,
            discountedPrice: product.discountedPrice,
            image: product.image.url,
            alt: product.image.alt,
            quantity: 1,
          };

          return {
            items: [...state.items, newItem],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.productId !== productId),
            };
          }

          return {
            items: state.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "pengwin-cart",
    }
  )
);