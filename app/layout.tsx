import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { logout } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "RedCanvas",
  description: "Community board with threads and a shared pixel canvas",
  icons: {
    icon: [{ url: "/favicon.ico?v=2", type: "image/x-icon" }],
    shortcut: [{ url: "/favicon.ico?v=2", type: "image/x-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userPromise = getCurrentUser();

  return (
    <html lang="de" className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
      </head>
      <body className="min-h-full bg-redcanvas text-zinc-950">
        <header className="border-b border-white/20 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Image
                src="/redcanvas-logo.png"
                alt=""
                width={123}
                height={40}
                priority
                className="h-9 w-auto"
              />
              <span>RedCanvas</span>
            </Link>
            <Link href="/threads" className="text-sm text-zinc-600 hover:text-zinc-950">
              Threads
            </Link>
            <Link href="/place" className="text-sm text-zinc-600 hover:text-zinc-950">
              Place
            </Link>
            <AuthNav userPromise={userPromise} />
          </nav>
        </header>

        <main className="mx-auto w-full max-w-5xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}

async function AuthNav({
  userPromise,
}: {
  userPromise: ReturnType<typeof getCurrentUser>;
}) {
  const user = await userPromise;

  if (!user) {
    return (
      <Link
        href="/auth"
        className="ml-auto text-sm text-zinc-600 hover:text-zinc-950"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="ml-auto flex items-center gap-3 text-sm">
      <span className="text-zinc-600">{user.username}</span>
      <form action={logout}>
        <button className="text-zinc-600 hover:text-zinc-950" type="submit">
          Logout
        </button>
      </form>
    </div>
  );
}
