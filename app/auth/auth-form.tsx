"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login, register, type AuthState } from "./actions";

const initialState: AuthState = {
  message: "",
};

export function AuthForm() {
  const [loginState, loginAction, loginPending] = useActionState(
    login,
    initialState
  );
  const [registerState, registerAction, registerPending] = useActionState(
    register,
    initialState
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Einloggen</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-4">
            <AuthFields state={loginState} />
            <Button type="submit" disabled={loginPending}>
              {loginPending ? "Prueft..." : "Einloggen"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Namen sichern</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={registerAction} className="space-y-4">
            <AuthFields state={registerState} />
            <Button type="submit" disabled={registerPending}>
              {registerPending ? "Speichert..." : "Registrieren"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function AuthFields({ state }: { state: AuthState }) {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor="username" className="text-xs font-medium">
          Anzeigename
        </label>
        <Input
          id="username"
          name="username"
          required
          minLength={3}
          maxLength={32}
          placeholder="red_user"
        />
        {state.errors?.username ? (
          <p className="text-xs text-red-700">{state.errors.username[0]}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-xs font-medium">
          Passwort
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          maxLength={128}
        />
        {state.errors?.password ? (
          <p className="text-xs text-red-700">{state.errors.password[0]}</p>
        ) : null}
      </div>

      {state.message ? (
        <p className="text-xs text-red-700" aria-live="polite">
          {state.message}
        </p>
      ) : null}
    </>
  );
}
