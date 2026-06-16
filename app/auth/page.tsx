import { AuthForm } from "./auth-form";

export default function AuthPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-600">
          Sichere dir einen Anzeigenamen mit Passwort. Es braucht keine E-Mail,
          keine Telefonnummer und kein Profil.
        </p>
      </section>

      <AuthForm />
    </div>
  );
}
