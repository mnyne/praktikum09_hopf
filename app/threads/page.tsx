import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusMessage } from "@/components/ui/status-message";
import { ThreadsRealtimeRefresh } from "@/components/threads/ThreadsRealtimeRefresh";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NewThreadForm } from "./new-thread-form";

export const dynamic = "force-dynamic";

export default async function ThreadsPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  const [{ notice }, currentUser, threads] = await Promise.all([
    searchParams,
    getCurrentUser(),
    prisma.thread.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    }),
  ]);

  const successMessage = getSuccessMessage(notice);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <ThreadsRealtimeRefresh />
      <section className="space-y-4">
        {successMessage ? (
          <StatusMessage>{successMessage}</StatusMessage>
        ) : null}
        <div>
          <h1 className="text-3xl font-bold">Threads</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Anonyme Diskussionen mit frei waehlbarem Anzeigenamen.
          </p>
        </div>

        {threads.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-sm text-card-foreground">
              Noch keine Threads vorhanden.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {threads.map((thread) => (
              <Card key={thread.id}>
                <CardHeader>
                  <CardTitle className="thread-title text-lg">
                    <Link
                      href={`/threads/${thread.id}`}
                      className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      {thread.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="thread-preview whitespace-pre-wrap text-card-foreground">
                    {thread.content}
                  </p>
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button asChild size="sm">
                      <Link href={`/threads/${thread.id}`}>Mitreden</Link>
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      {thread.authorName} - {thread._count.posts} Antworten -{" "}
                      {thread.createdAt.toLocaleString("de-DE")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <aside>
        <NewThreadForm currentUserName={currentUser?.username ?? null} />
      </aside>
    </div>
  );
}

function getSuccessMessage(notice?: string) {
  if (notice === "registered") {
    return "Anzeigename erfolgreich erstellt. Du bist jetzt eingeloggt.";
  }

  if (notice === "logged-in") {
    return "Erfolgreich eingeloggt.";
  }

  return null;
}
