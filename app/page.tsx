import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="min-h-[420px] bg-zinc-950/75 px-6 py-16 text-white backdrop-blur-[1px] md:px-10">
        <div className="flex min-h-[300px] max-w-2xl flex-col justify-end gap-4">
          <p className="text-xs font-medium uppercase tracking-wide text-red-200">
            RedCanvas
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Ein anonymes Community-Board für Diskussionen und kollaborative
            Pixelkunst.
          </h1>
          <p className="text-sm leading-6 text-zinc-100">
            RedCanvas entsteht als Gruppenprojekt im Praktikum. Die eine
            Hälfte ist ein textbasiertes Imageboard mit gesicherten
            Anzeigenamen ohne E-Mail oder Telefonnummer. Die zweite Hälfte ist
            eine gemeinsame Canvas, auf der Pixel gesetzt werden koennen.
            Später folgen Bildanhänge und Moderation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/auth">Namen sichern</Link>
            </Button>
            <Button asChild>
              <Link href="/about">Mehr erfahren</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="home-feature-grid grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Imageboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-zinc-400">
              Starte Diskussionen, sammle Gedanken und antworte frei unter
              deinem gesicherten Anzeigenamen, ohne Profilzwang.
            </p>
            <Button asChild>
              <Link href="/threads">Threads öffnen</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pixel-Place</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-zinc-400">
              Leb deine Kreativität gemeinsam mit anderen aus: setze Pixel,
              hinterlasse Spuren und bau Stück für Stück am gemeinsamen
              Canvas mit.
            </p>
            <Button asChild variant="outline">
              <Link href="/place">Place ansehen</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
