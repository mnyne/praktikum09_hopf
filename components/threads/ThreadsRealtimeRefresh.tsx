"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type ThreadsRealtimeRefreshProps = {
  threadId?: number;
};

export function ThreadsRealtimeRefresh({
  threadId,
}: ThreadsRealtimeRefreshProps) {
  const router = useRouter();
  const refreshTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      return;
    }

    function scheduleRefresh() {
      if (refreshTimeout.current) {
        clearTimeout(refreshTimeout.current);
      }

      refreshTimeout.current = setTimeout(() => {
        router.refresh();
      }, 250);
    }

    const channel = supabase.channel(
      threadId ? `thread-${threadId}-posts` : "threads-overview"
    );

    if (threadId) {
      channel.on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Post",
          filter: `threadId=eq.${threadId}`,
        },
        scheduleRefresh
      );
    } else {
      channel
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "Thread",
          },
          scheduleRefresh
        )
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "Post",
          },
          scheduleRefresh
        );
    }

    channel.subscribe();

    return () => {
      if (refreshTimeout.current) {
        clearTimeout(refreshTimeout.current);
      }

      void supabase.removeChannel(channel);
    };
  }, [router, threadId]);

  return null;
}
