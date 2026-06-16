import { z } from "zod";

export const CreateThreadSchema = z.object({
  title: z.string().min(3).max(80),
  content: z.string().min(1).max(2000),
});

export const CreatePostSchema = z.object({
  content: z.string().min(1).max(1000),
});

export const AuthSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9_-]+$/),
  password: z.string().min(6).max(128),
});

export const SetPixelSchema = z.object({
  x: z.number().int().min(0).max(31),
  y: z.number().int().min(0).max(31),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});
