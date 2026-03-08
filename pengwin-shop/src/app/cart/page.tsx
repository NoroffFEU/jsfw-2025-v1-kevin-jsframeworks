"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CartItem from "@/components/cart/cartItem";
import { useCartStore } from "@/stores/cartStore";

export default function CartPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = items.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0,
  );

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  function handleCheckout() {
    clearCart();
    router.push("/checkout/success");
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Your cart is empty
          </h1>
          <p className="mt-3 text-slate-600">
            You do not have anything added right now.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <section>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">
            Shopping Cart
          </h1>

          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Order Summary
          </h2>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
              <span>Total</span>
              <span>{totalPrice.toFixed(2)} kr</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            style={{ cursor: "pointer" }}
            className="mt-6 w-full rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}
