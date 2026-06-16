"use server";

import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { PLACE_COLORS, type PixelDTO } from "@/src/place_types";

const USER_COOKIE = "place_user_id";
const GRID_SIZE = 100;

function isValidCoordinate(value: number) {
  return Number.isInteger(value) && value >= 0 && value < GRID_SIZE;
}

function isValidColor(color: string) {
  return (PLACE_COLORS as readonly string[]).includes(color);
}

async function getOrCreateUserId() {
  const cookieStore = await cookies();
  const existing = cookieStore.get(USER_COOKIE)?.value;

  if (existing) {
    return existing;
  }

  const userId = randomUUID();

  cookieStore.set(USER_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return userId;
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
  const { x, y, color } = input;

  if (!isValidCoordinate(x) || !isValidCoordinate(y)) {
    throw new Error("Ungültige Pixel-Koordinate.");
  }

  if (!isValidColor(color)) {
    throw new Error("Ungültige Farbe.");
  }

  const userId = await getOrCreateUserId();

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
        userId,
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