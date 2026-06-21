import type { ReactNode } from "react";

export function StatusMessage({ children }: { children: ReactNode }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className="border border-emerald-500/60 bg-emerald-950/85 px-4 py-3 text-sm font-medium text-emerald-50 shadow-sm"
    >
      {children}
    </p>
  );
}
