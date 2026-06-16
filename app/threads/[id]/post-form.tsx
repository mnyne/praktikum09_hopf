"use client";

import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="threadId" value={threadId} />

          <p className="text-xs text-zinc-600">
            Du antwortest als{" "}
            <span className="font-medium">{currentUserName}</span>.
          </p>

          <div className="space-y-2">
            <label htmlFor="content" className="text-xs font-medium">
              Kommentar
            </label>
            <Textarea
              id="content"
              name="content"
              required
              minLength={1}
              maxLength={1000}
              placeholder="Anonym antworten..."
            />
            {state.errors?.content ? (
              <p className="text-xs text-red-700">{state.errors.content[0]}</p>
            ) : null}
          </div>

          {state.message ? (
            <p className="text-xs text-zinc-600" aria-live="polite">
              {state.message}
            </p>
          ) : null}

          <Button type="submit" disabled={pending}>
            {pending ? "Sendet..." : "Antwort posten"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
