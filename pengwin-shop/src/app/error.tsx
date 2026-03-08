"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Something went wrong
        </h1>

        <p className="mt-3 text-slate-700">
          We could not load this page right now. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Try again
        </button>
      </div>
    </div>
  );
}