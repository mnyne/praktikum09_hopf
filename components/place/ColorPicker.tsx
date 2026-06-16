"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PLACE_COLORS } from "@/src/place_types";
import { cn } from "@/lib/utils";

type ColorPickerProps = {
  open: boolean;
  pending: boolean;
  onConfirm: (color: string) => void;
  onCancel: () => void;
};

export default function ColorPicker({
  open,
  pending,
  onConfirm,
  onCancel,
}: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string>(PLACE_COLORS[0]);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !pending) {
          onCancel();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Farbe auswählen</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div className="grid grid-cols-8 gap-2">
            {PLACE_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Farbe ${color}`}
                className={cn(
                  "h-8 w-8 rounded-sm border border-border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selectedColor === color && "ring-2 ring-ring ring-offset-2"
                )}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          <div className="flex min-w-28 flex-col gap-2">
            <Button
              type="button"
              disabled={pending}
              onClick={() => onConfirm(selectedColor)}
            >
              Bestätigen
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={onCancel}
            >
              Abbrechen
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}