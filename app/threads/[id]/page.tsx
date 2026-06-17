import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostForm } from "./post-form";

export const dynamic = "force-dynamic";

type ThreadDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ThreadDetailPage({
  params,
}: ThreadDetailPageProps) {
  const { id } = await params;
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
      <Link href="/threads" className="text-sm text-red-700 hover:underline">
        Zurueck zu allen Threads
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>{thread.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="whitespace-pre-wrap text-zinc-300">
            {thread.content}
          </p>

          <p className="text-xs text-zinc-500">
            {thread.authorName} - Startpost -{" "}
            {thread.createdAt.toLocaleString("de-DE")}
          </p>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Antworten</h2>

        {thread.posts.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-sm text-zinc-300">
              Noch keine Antworten vorhanden.
            </CardContent>
          </Card>
        ) : (
          thread.posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="space-y-3 py-4 text-sm">
                <p className="whitespace-pre-wrap text-zinc-300">
                  {post.content}
                </p>

                <p className="text-xs text-zinc-500">
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
