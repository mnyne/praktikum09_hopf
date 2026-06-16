export default function Loading() {
  return (
    <div className="space-y-4 border bg-white/80 p-6 text-sm text-zinc-700 shadow-sm backdrop-blur">
      <div className="h-5 w-40 animate-pulse bg-zinc-300" />
      <div className="h-3 w-full max-w-xl animate-pulse bg-zinc-200" />
      <div className="h-3 w-2/3 animate-pulse bg-zinc-200" />
    </div>
  );
}
