"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { setPixelColor } from "@/app/place/actions";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/place/ColorPicker";
import PixelComponent from "@/components/place/PixelComponent";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { PixelDTO } from "@/src/place_types";

type SelectedPixel = {
  x: number;
  y: number;
};

const GRID_SIZE = 100;
const DEFAULT_COLOR = "#ffffff";

export default function PixelGrid({
  pixels,
  currentUserName,
}: {
  pixels: PixelDTO[];
  currentUserName: string | null;
}) {
  const [pixelMap, setPixelMap] = useState(() => createPixelMap(pixels));
  const [selectedPixel, setSelectedPixel] = useState<SelectedPixel | null>(null);
  const [isPending, startTransition] = useTransition();
  const canPaint = Boolean(currentUserName);

  const coordinates = useMemo(() => {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => ({
      x: index % GRID_SIZE,
      y: Math.floor(index / GRID_SIZE),
    }));
  }, []);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    const channel = supabase
      .channel("place-pixels")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Pixel",
          filter: "visible=eq.true",
        },
        (payload) => {
          const pixel = parseRealtimePixel(payload.new);

          if (!pixel) {
            return;
          }

          setPixelMap((current) => {
            const next = new Map(current);
            next.set(`${pixel.x}-${pixel.y}`, pixel);
            return next;
          });
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          return;
        }

        if (
          status === "CHANNEL_ERROR" ||
          status === "TIMED_OUT" ||
          status === "CLOSED"
        ) {
          console.warn("Place realtime channel disconnected:", status);
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  function handleConfirm(color: string) {
    if (!selectedPixel) return;

    const { x, y } = selectedPixel;

    startTransition(async () => {
      const previousMap = pixelMap;

      setPixelMap((current) => {
        const next = new Map(current);
        next.set(`${x}-${y}`, {
          id: -1,
          x,
          y,
          color,
        });
        return next;
      });

      try {
        const savedPixel = await setPixelColor({ x, y, color });

        setPixelMap((current) => {
          const next = new Map(current);
          next.set(`${x}-${y}`, savedPixel);
          return next;
        });

        setSelectedPixel(null);
      } catch (error) {
        setPixelMap(previousMap);
        console.error(error);
      }
    });
  }

  return (
    <>
      <div className="flex flex-col gap-3 border bg-white/80 p-4 text-sm shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          {canPaint ? (
            <p className="text-zinc-700">
              Du pixelst als{" "}
              <span className="font-medium text-zinc-950">
                {currentUserName}
              </span>.
            </p>
          ) : (
            <p className="text-zinc-700">
              Zum Setzen von Pixeln brauchst du einen gesicherten Anzeigenamen.
            </p>
          )}
        </div>

        {!canPaint ? (
          <>
            <Button asChild>
              <Link href="/auth">Einloggen</Link>
            </Button>
          </>
        ) : null}
      </div>

      <div className="w-full overflow-auto rounded-lg border bg-muted/30 p-4">
        <div
          className="grid origin-top-left"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            width: "min(900px, 90vw)",
            aspectRatio: "1 / 1",
          }}
        >
          {coordinates.map(({ x, y }) => {
            const pixel = pixelMap.get(`${x}-${y}`);

            return (
              <PixelComponent
                key={`${x}-${y}`}
                x={x}
                y={y}
                color={pixel?.color ?? DEFAULT_COLOR}
                selected={selectedPixel?.x === x && selectedPixel?.y === y}
                disabled={!canPaint}
                onClick={() => {
                  if (canPaint) {
                    setSelectedPixel({ x, y });
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      <ColorPicker
        open={canPaint && selectedPixel !== null}
        pending={isPending}
        onConfirm={handleConfirm}
        onCancel={() => setSelectedPixel(null)}
      />
    </>
  );
}

function createPixelMap(pixels: PixelDTO[]) {
  const map = new Map<string, PixelDTO>();

  for (const pixel of pixels) {
    map.set(`${pixel.x}-${pixel.y}`, pixel);
  }

  return map;
}

function parseRealtimePixel(row: unknown): PixelDTO | null {
  if (!row || typeof row !== "object") {
    return null;
  }

  const data = row as Record<string, unknown>;

  if (data.visible === false) {
    return null;
  }

  const id = Number(data.id);
  const x = Number(data.x);
  const y = Number(data.y);
  const color = data.color;

  if (
    !Number.isInteger(id) ||
    !Number.isInteger(x) ||
    !Number.isInteger(y) ||
    typeof color !== "string"
  ) {
    return null;
  }

  return {
    id,
    x,
    y,
    color,
  };
}
