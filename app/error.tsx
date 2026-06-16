"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-4 border bg-white/85 p-6 shadow-sm backdrop-blur">
      <div>
        <h1 className="text-2xl font-bold">Etwas ist schiefgelaufen</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Die Seite konnte gerade nicht geladen werden.
        </p>
      </div>

      {error.digest ? (
        <p className="text-xs text-zinc-500">Fehler-ID: {error.digest}</p>
      ) : null}

      <Button type="button" onClick={reset}>
        Erneut versuchen
      </Button>
    </div>
  );
}
