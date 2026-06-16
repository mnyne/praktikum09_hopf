"use client";

import Link from "next/link";
import { startTransition, useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CreatePostSchema, type CreatePostInput } from "@/schemas/thread";
import { createPost, type FormState } from "../actions";

const initialState: FormState = {
  message: "",
};

export function PostForm({
  threadId,
  currentUserName,
}: {
  threadId: number;
  currentUserName: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    createPost,
    initialState
  );
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      content: "",
    },
  });

  if (!currentUserName) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Antwort schreiben</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-zinc-600">
            Zum Antworten brauchst du einen Anzeigenamen mit Passwort.
          </p>
          <Button asChild>
            <Link href="/auth">Einloggen</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Antwort schreiben</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const formElement = event.currentTarget;
              const isValid = await form.trigger();

              if (!isValid) {
                return;
              }

              const formData = new FormData(formElement);
              startTransition(() => {
                formAction(formData);
              });
            }}
            className="space-y-4"
          >
            <input type="hidden" name="threadId" value={threadId} />

            <p className="text-xs text-zinc-600">
              Du antwortest als{" "}
              <span className="font-medium">{currentUserName}</span>.
            </p>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kommentar</FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      minLength={1}
                      maxLength={1000}
                      placeholder="Anonym antworten..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {state.errors?.content ? (
                    <p className="text-xs text-red-700">
                      {state.errors.content[0]}
                    </p>
                  ) : null}
                </FormItem>
              )}
            />

            {state.message ? (
              <p className="text-xs text-zinc-600" aria-live="polite">
                {state.message}
              </p>
            ) : null}

            <Button type="submit" disabled={pending}>
              {pending ? "Sendet..." : "Antwort posten"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
