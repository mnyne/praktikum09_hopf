"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CreatePostSchema, CreateThreadSchema } from "@/schemas/thread";

export type FormState = {
  message: string;
  success?: boolean;
  errors?: Record<string, string[] | undefined>;
};

export async function createThread(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      message: "Bitte logge dich ein, bevor du postest.",
    };
  }

  const result = CreateThreadSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      message: "Thread konnte nicht erstellt werden.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const thread = await prisma.thread.create({
    data: {
      authorName: user.username,
      title: result.data.title.trim(),
      content: result.data.content.trim(),
      userId: user.id,
    },
  });

  revalidatePath("/threads");
  redirect(`/threads/${thread.id}?notice=thread-created`);
}

export async function createPost(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      message: "Bitte logge dich ein, bevor du antwortest.",
    };
  }

  const threadId = Number(formData.get("threadId"));

  if (!Number.isInteger(threadId) || threadId < 1) {
    return {
      message: "Thread-ID ist ungueltig.",
      errors: { threadId: ["Thread-ID ist ungueltig."] },
    };
  }

  const result = CreatePostSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      message: "Kommentar konnte nicht erstellt werden.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  await prisma.post.create({
    data: {
      authorName: user.username,
      content: result.data.content.trim(),
      threadId,
      userId: user.id,
    },
  });

  revalidatePath("/threads");
  revalidatePath(`/threads/${threadId}`);

  return { message: "Antwort erfolgreich erstellt!", success: true };
}
