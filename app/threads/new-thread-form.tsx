"use client";

import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createThread, type FormState } from "./actions";
import { Textarea } from "@/components/ui/textarea";

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

  if (!currentUserName) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Neuen Thread erstellen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-zinc-600">
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
        <form action={formAction} className="space-y-4">
          <p className="text-xs text-zinc-600">
            Du postest als <span className="font-medium">{currentUserName}</span>.
          </p>

          <div className="space-y-2">
            <label htmlFor="title" className="text-xs font-medium">
              Titel
            </label>
            <Input
              id="title"
              name="title"
              required
              minLength={3}
              maxLength={80}
              placeholder="z.B. Projektideen fuer RedCanvas"
            />
            {state.errors?.title ? (
              <p className="text-xs text-red-700">{state.errors.title[0]}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-xs font-medium">
              Startpost
            </label>
            <Textarea
              id="content"
              name="content"
              required
              minLength={1}
              maxLength={2000}
              placeholder="Was willst du in die Runde werfen?"
            />
            {state.errors?.content ? (
              <p className="text-xs text-red-700">{state.errors.content[0]}</p>
            ) : null}
          </div>

          {state.message ? (
            <p className="text-xs text-red-700" aria-live="polite">
              {state.message}
            </p>
          ) : null}

          <Button type="submit" disabled={pending}>
            {pending ? "Erstelle..." : "Thread erstellen"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
