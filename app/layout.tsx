import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { logout } from "@/app/auth/actions";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { getCurrentUser } from "@/lib/auth";

const siteUrl = "https://praktikum09-hopf.vercel.app";
const siteDescription =
  "An anonymous community board with threads and a shared pixel canvas.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "RedCanvas",
  description: siteDescription,
  icons: {
    icon: [{ url: "/favicon.ico?v=2", type: "image/x-icon" }],
    shortcut: [{ url: "/favicon.ico?v=2", type: "image/x-icon" }],
  },
  openGraph: {
    title: "RedCanvas",
    description: siteDescription,
    url: siteUrl,
    siteName: "RedCanvas",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "RedCanvas preview",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RedCanvas",
    description: siteDescription,
    images: ["/opengraph-image"],
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
        <a
          href="#main-content"
          className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:not-sr-only focus:border focus:border-red-500 focus:bg-zinc-950 focus:px-4 focus:py-2 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <header className="site-header border-b border-white/20 bg-white/90 backdrop-blur">
          <nav className="site-nav mx-auto flex max-w-5xl items-center gap-6 px-6 py-4">
            <Link href="/" className="brand-mark flex items-center gap-2 font-bold">
              <Image
                src="/redcanvas-logo.png"
                alt=""
                width={123}
                height={40}
                priority
                className="h-9 w-auto"
              />
            </Link>
            <Link href="/threads" className="nav-link text-sm text-zinc-300 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500">
              Threads
            </Link>
            <Link href="/place" className="nav-link text-sm text-zinc-300 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500">
              Place
            </Link>
            <ThemeSwitcher />
            <Suspense
              fallback={
                <span className="auth-link ml-auto text-sm text-zinc-500">
                  Account laedt...
                </span>
              }
            >
              <AuthNav userPromise={userPromise} />
            </Suspense>
          </nav>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6"
        >
          {children}
        </main>
        <Analytics />
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
        className="auth-link ml-auto text-sm text-zinc-300 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="auth-link ml-auto flex items-center gap-3 text-sm">
      <span className="text-zinc-300">{user.username}</span>
      <form action={logout}>
        <button
          className="text-zinc-300 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
          type="submit"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
