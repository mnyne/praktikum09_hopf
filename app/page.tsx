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
            Ein anonymes Community-Board fuer Diskussionen und kollaborative
            Pixelkunst.
          </h1>
          <p className="text-sm leading-6 text-zinc-100">
            RedCanvas entsteht als Gruppenprojekt im Praktikum. Der erste
            Bereich ist ein textbasiertes Imageboard mit gesicherten
            Anzeigenamen ohne E-Mail oder Telefonnummer. Spaeter folgen
            Bildanhaenge, Moderation und ein gemeinsames Pixel-Canvas im Stil
            von r/place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/threads">Threads oeffnen</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/auth">Namen sichern</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Imageboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-zinc-600">
              Erstelle Threads und Antworten unter einem gesicherten
              Anzeigenamen, ohne E-Mail, Telefonnummer oder Profilzwang.
            </p>
            <Button asChild>
              <Link href="/threads">Threads oeffnen</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pixel-Place</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-zinc-600">
              Die Canvas-Seite ist vorbereitet. Im naechsten Schritt wird
              daraus eine gemeinsame Flaeche, auf der Pixel gesetzt werden.
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
