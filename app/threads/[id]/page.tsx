import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusMessage } from "@/components/ui/status-message";
import { ThreadsRealtimeRefresh } from "@/components/threads/ThreadsRealtimeRefresh";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostForm } from "./post-form";

export const dynamic = "force-dynamic";

type ThreadDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ notice?: string }>;
};

export default async function ThreadDetailPage({
  params,
  searchParams,
}: ThreadDetailPageProps) {
  const [{ id }, { notice }] = await Promise.all([params, searchParams]);
  const threadId = Number(id);
  const currentUser = await getCurrentUser();

  if (!Number.isInteger(threadId) || threadId < 1) {
    notFound();
  }

  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    include: {
      posts: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!thread) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <ThreadsRealtimeRefresh threadId={thread.id} />
      {notice === "thread-created" ? (
        <StatusMessage>Thread erfolgreich erstellt!</StatusMessage>
      ) : null}
      <Button asChild variant="outline">
        <Link href="/threads">Zurueck zu allen Threads</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{thread.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="whitespace-pre-wrap text-card-foreground">
            {thread.content}
          </p>

          <p className="text-xs text-muted-foreground">
            {thread.authorName} - Startpost -{" "}
            {thread.createdAt.toLocaleString("de-DE")}
          </p>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Antworten</h2>

        {thread.posts.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-sm text-card-foreground">
              Noch keine Antworten vorhanden.
            </CardContent>
          </Card>
        ) : (
          thread.posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="space-y-3 py-4 text-sm">
                <p className="whitespace-pre-wrap text-card-foreground">
                  {post.content}
                </p>

                <p className="text-xs text-muted-foreground">
                  {post.authorName} - {post.createdAt.toLocaleString("de-DE")}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </section>

      <PostForm
        threadId={thread.id}
        currentUserName={currentUser?.username ?? null}
      />
    </div>
  );
}
