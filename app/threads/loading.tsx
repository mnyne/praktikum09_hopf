export default function ThreadsLoading() {
  return (
    <div
      role="status"
      aria-label="Threads werden geladen"
      className="grid gap-6 lg:grid-cols-[1fr_320px]"
    >
      <span className="sr-only">Threads werden geladen...</span>
      <section className="space-y-4" aria-hidden="true">
        <div className="h-9 w-40 animate-pulse bg-zinc-300" />
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-4 border bg-white/80 p-6">
            <div className="h-5 w-2/3 animate-pulse bg-zinc-300" />
            <div className="h-3 w-full animate-pulse bg-zinc-200" />
            <div className="h-3 w-4/5 animate-pulse bg-zinc-200" />
          </div>
        ))}
      </section>
      <aside className="h-72 animate-pulse border bg-white/80" aria-hidden="true" />
    </div>
  );
}
