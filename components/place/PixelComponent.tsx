"use client";

import { cn } from "@/lib/utils";

type PixelComponentProps = {
  x: number;
  y: number;
  color: string;
  selected?: boolean;
  onClick: () => void;
};

export default function PixelComponent({
  x,
  y,
  color,
  selected = false,
  onClick,
}: PixelComponentProps) {
  return (
    <button
      type="button"
      aria-label={`Pixel ${x}, ${y}`}
      title={`Pixel ${x}, ${y}`}
      onClick={onClick}
      className={cn(
        "aspect-square border border-border/20 outline-none transition-transform hover:scale-125 hover:z-10 focus-visible:ring-2 focus-visible:ring-ring",
        selected && "z-10 ring-2 ring-ring"
      )}
      style={{
        backgroundColor: color,
      }}
    />
  );
}