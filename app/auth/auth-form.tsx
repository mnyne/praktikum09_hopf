"use client";

import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";

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
import { AuthSchema, type AuthInput } from "@/schemas/thread";
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
  const loginForm = useForm<AuthInput>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const registerForm = useForm<AuthInput>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Einloggen</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form
              action={async (formData) => {
                const isValid = await loginForm.trigger();

                if (!isValid) {
                  return;
                }

                loginAction(formData);
              }}
              className="space-y-4"
            >
              <AuthFields form={loginForm} state={loginState} />
              <Button type="submit" disabled={loginPending}>
                {loginPending ? "Prueft..." : "Einloggen"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Namen sichern</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...registerForm}>
            <form
              action={async (formData) => {
                const isValid = await registerForm.trigger();

                if (!isValid) {
                  return;
                }

                registerAction(formData);
              }}
              className="space-y-4"
            >
              <AuthFields form={registerForm} state={registerState} />
              <Button type="submit" disabled={registerPending}>
                {registerPending ? "Speichert..." : "Registrieren"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function AuthFields({
  form,
  state,
}: {
  form: UseFormReturn<AuthInput>;
  state: AuthState;
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Anzeigename</FormLabel>
            <FormControl>
              <Input
                required
                minLength={3}
                maxLength={32}
                placeholder="red_user"
                {...field}
              />
            </FormControl>
            <FormMessage />
            {state.errors?.username ? (
              <p className="text-xs text-red-700">
                {state.errors.username[0]}
              </p>
            ) : null}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Passwort</FormLabel>
            <FormControl>
              <Input
                type="password"
                required
                minLength={6}
                maxLength={128}
                {...field}
              />
            </FormControl>
            <FormMessage />
            {state.errors?.password ? (
              <p className="text-xs text-red-700">
                {state.errors.password[0]}
              </p>
            ) : null}
          </FormItem>
        )}
      />

      {state.message ? (
        <p className="text-xs text-red-700" aria-live="polite">
          {state.message}
        </p>
      ) : null}
    </>
  );
}
