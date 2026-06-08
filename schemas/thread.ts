import { z } from "zod";

export const CreateThreadSchema = z.object({
  title: z.string().min(3).max(80),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export const CreatePostSchema = z.object({
  content: z.string().min(1).max(1000),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export const SetPixelSchema = z.object({
  x: z.number().int().min(0).max(31),
  y: z.number().int().min(0).max(31),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});