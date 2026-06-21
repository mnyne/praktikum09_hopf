export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Seite wird geladen"
      className="space-y-4 border bg-white/80 p-6 text-sm text-zinc-700 shadow-sm backdrop-blur"
    >
      <span className="sr-only">Seite wird geladen...</span>
      <div className="h-5 w-40 animate-pulse bg-zinc-300" aria-hidden="true" />
      <div
        className="h-3 w-full max-w-xl animate-pulse bg-zinc-200"
        aria-hidden="true"
      />
      <div className="h-3 w-2/3 animate-pulse bg-zinc-200" aria-hidden="true" />
    </div>
  );
}
