import type { ReactNode } from "react";

export function StatusMessage({ children }: { children: ReactNode }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className="status-message status-message-success"
    >
      {children}
    </p>
  );
}
