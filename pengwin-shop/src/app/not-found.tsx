import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Page not found
        </h1>

        <p className="mt-3 text-slate-600">
          The page you were looking for does not exist or is no longer available.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to shop
        </Link>
      </div>
    </div>
  );
}