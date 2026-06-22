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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateThreadSchema,
  type CreateThreadInput,
} from "@/schemas/thread";
import { createThread, type FormState } from "./actions";

const initialState: FormState = {
  message: "",
};

export function NewThreadForm({
  currentUserName,
}: {
  currentUserName: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    createThread,
    initialState
  );
  const form = useForm<CreateThreadInput>({
    resolver: zodResolver(CreateThreadSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  if (!currentUserName) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Neuen Thread erstellen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">
            Zum Posten brauchst du einen Anzeigenamen mit Passwort.
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
        <CardTitle>Neuen Thread erstellen</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            aria-busy={pending}
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
            <p className="text-xs text-muted-foreground">
              Du postest als{" "}
              <span className="font-medium">{currentUserName}</span>.
            </p>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input
                      required
                      minLength={3}
                      maxLength={80}
                      placeholder="z.B. Projektideen fuer RedCanvas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {state.errors?.title ? (
                    <p className="text-xs text-destructive">
                      {state.errors.title[0]}
                    </p>
                  ) : null}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Startpost</FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      minLength={1}
                      maxLength={2000}
                      placeholder="Was willst du in die Runde werfen?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {state.errors?.content ? (
                    <p className="text-xs text-destructive">
                      {state.errors.content[0]}
                    </p>
                  ) : null}
                </FormItem>
              )}
            />

            {state.message ? (
              <p className="text-xs text-destructive" aria-live="polite">
                {state.message}
              </p>
            ) : null}

            <Button type="submit" disabled={pending}>
              {pending ? "Erstelle..." : "Thread erstellen"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
