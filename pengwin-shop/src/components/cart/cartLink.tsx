"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";

export default function CartLink() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <Link href="/cart" className="relative transition hover:text-slate-900">
      Cart
      <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
        {itemCount}
      </span>
    </Link>
  );
}
