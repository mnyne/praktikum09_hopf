"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, hashPassword, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AuthSchema } from "@/schemas/thread";

export type AuthState = {
  message: string;
  errors?: Record<string, string[] | undefined>;
};

export async function register(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const result = AuthSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      message: "Registrierung fehlgeschlagen.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const username = result.data.username.trim();
  const existingUser = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (existingUser) {
    return {
      message: "Dieser Name ist schon vergeben.",
      errors: { username: ["Dieser Name ist schon vergeben."] },
    };
  }

  const user = await prisma.user.create({
    data: {
      username,
      passwordHash: hashPassword(result.data.password),
    },
  });

  await createSession(user.id);
  redirect("/threads?notice=registered");
}

export async function login(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const result = AuthSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      message: "Login fehlgeschlagen.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const user = await prisma.user.findUnique({
    where: { username: result.data.username.trim() },
  });

  if (!user || !verifyPassword(result.data.password, user.passwordHash)) {
    return {
      message: "Name oder Passwort stimmt nicht.",
    };
  }

  await createSession(user.id);
  redirect("/threads?notice=logged-in");
}

export async function logout() {
  await destroySession();
  redirect("/");
}
