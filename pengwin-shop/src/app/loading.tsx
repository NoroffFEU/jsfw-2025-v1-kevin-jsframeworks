export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="animate-pulse space-y-8">
        <div className="space-y-3">
          <div className="h-10 w-64 rounded bg-slate-200" />
          <div className="h-5 w-96 max-w-full rounded bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="aspect-square bg-slate-200" />
              <div className="space-y-3 p-4">
                <div className="h-6 rounded bg-slate-200" />
                <div className="h-4 w-20 rounded bg-slate-200" />
                <div className="h-5 w-28 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}