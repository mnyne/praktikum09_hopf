import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NewThreadForm } from "./new-thread-form";

export const dynamic = "force-dynamic";

export default async function ThreadsPage() {
  const currentUser = await getCurrentUser();
  const threads = await prisma.thread.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <section className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Threads</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Anonyme Diskussionen mit frei waehlbarem Anzeigenamen.
          </p>
        </div>

        {threads.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-sm text-zinc-300">
              Noch keine Threads vorhanden.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {threads.map((thread) => (
              <Card key={thread.id}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-200">
                    <Link href={`/threads/${thread.id}`}>{thread.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-zinc-300">
                  <p className="line-clamp-3 whitespace-pre-wrap text-zinc-300">
                    {thread.content}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {thread.authorName} - {thread._count.posts} Antworten -{" "}
                    {thread.createdAt.toLocaleString("de-DE")}
                  </p>
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
