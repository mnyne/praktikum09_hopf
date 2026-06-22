export default function PlaceLoading() {
  return (
    <div role="status" aria-label="Pixel-Place wird geladen" className="space-y-4">
      <span className="sr-only">Pixel-Place wird geladen...</span>
      <div className="h-9 w-36 animate-pulse bg-zinc-300" aria-hidden="true" />
      <div className="h-16 animate-pulse border bg-white/80" aria-hidden="true" />
      <div
        className="aspect-square w-full max-w-[900px] animate-pulse border bg-zinc-300/70"
        aria-hidden="true"
      />
    </div>
  );
}
