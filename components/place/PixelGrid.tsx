"use client";

import { useMemo, useState, useTransition } from "react";
import PixelComponent from "@/components/place/PixelComponent";
import ColorPicker from "@/components/place/ColorPicker";
import { setPixelColor } from "@/app/place/actions";
import type { PixelDTO } from "@/src/place_types";

type SelectedPixel = {
  x: number;
  y: number;
};

const GRID_SIZE = 100;
const DEFAULT_COLOR = "#ffffff";

export default function PixelGrid({ pixels }: { pixels: PixelDTO[] }) {
  const [pixelMap, setPixelMap] = useState(() => createPixelMap(pixels));
  const [selectedPixel, setSelectedPixel] = useState<SelectedPixel | null>(null);
  const [isPending, startTransition] = useTransition();

  const coordinates = useMemo(() => {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => ({
      x: index % GRID_SIZE,
      y: Math.floor(index / GRID_SIZE),
    }));
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
                onClick={() => setSelectedPixel({ x, y })}
              />
            );
          })}
        </div>
      </div>

      <ColorPicker
        open={selectedPixel !== null}
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