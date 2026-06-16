"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SetPixelSchema } from "@/schemas/thread";
import { PLACE_COLORS, type PixelDTO } from "@/src/place_types";

const GRID_SIZE = 100;

function isValidCoordinate(value: number) {
  return Number.isInteger(value) && value >= 0 && value < GRID_SIZE;
}

function isValidColor(color: string) {
  return (PLACE_COLORS as readonly string[]).includes(color);
}

export async function getVisiblePixels(): Promise<PixelDTO[]> {
  const pixels = await prisma.pixel.findMany({
    where: {
      visible: true,
    },
    select: {
      id: true,
      x: true,
      y: true,
      color: true,
    },
  });

  return pixels;
}

export async function setPixelColor(input: {
  x: number;
  y: number;
  color: string;
}): Promise<PixelDTO> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Bitte logge dich ein, bevor du Pixel setzt.");
  }

  const result = SetPixelSchema.safeParse(input);

  if (!result.success) {
    throw new Error("Ungueltige Pixeldaten.");
  }

  const { x, y, color } = result.data;

  if (!isValidCoordinate(x) || !isValidCoordinate(y)) {
    throw new Error("Ungueltige Pixel-Koordinate.");
  }

  if (!isValidColor(color)) {
    throw new Error("Ungueltige Farbe.");
  }

  const pixel = await prisma.$transaction(async (tx) => {
    await tx.pixel.updateMany({
      where: {
        x,
        y,
        visible: true,
      },
      data: {
        visible: false,
      },
    });

    return tx.pixel.create({
      data: {
        x,
        y,
        color,
        userId: user.id,
        visible: true,
      },
      select: {
        id: true,
        x: true,
        y: true,
        color: true,
      },
    });
  });

  revalidatePath("/place");

  return pixel;
}
