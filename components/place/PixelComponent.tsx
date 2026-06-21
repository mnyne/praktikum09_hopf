"use client";

import type { KeyboardEventHandler } from "react";

import { cn } from "@/lib/utils";

type PixelComponentProps = {
  id: string;
  x: number;
  y: number;
  color: string;
  selected?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  onFocus?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onClick: () => void;
};

export default function PixelComponent({
  id,
  x,
  y,
  color,
  selected = false,
  disabled = false,
  tabIndex,
  onFocus,
  onKeyDown,
  onClick,
}: PixelComponentProps) {
  return (
    <button
      id={id}
      type="button"
      aria-label={`Pixel ${x}, ${y}`}
      title={`Pixel ${x}, ${y}`}
      disabled={disabled}
      tabIndex={tabIndex}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onClick={onClick}
      className={cn(
        "aspect-square border outline-none transition-transform hover:scale-125 hover:z-10 focus-visible:ring-2 focus-visible:ring-ring",
        disabled && "cursor-not-allowed hover:scale-100",
        selected && "z-10 ring-2 ring-ring"
      )}
      style={{
        backgroundColor: color,
        borderColor: "var(--place-pixel-border, rgb(115 115 115 / 0.75))",
        boxShadow: "inset 1px 1px 0 var(--place-pixel-highlight, rgb(255 255 255 / 0.35))",
      }}
    />
  );
}
