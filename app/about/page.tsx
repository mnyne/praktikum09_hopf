import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="bg-zinc-950/75 px-6 py-14 text-white backdrop-blur-[1px] md:px-10">
        <div className="max-w-3xl space-y-5">
          <p className="text-xs font-medium uppercase tracking-wide text-red-200">
            Worum es geht
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            RedCanvas ist ein offener Raum fuer Diskussion, Pixelkunst und
            solidarische Spuren im Netz.
          </h1>
          <p className="text-sm leading-7 text-zinc-100">
            RedCanvas verbindet ein anonymes Board mit einer gemeinsamen
            Leinwand. Es soll ein antifaschistischer und kreativer Ort sein,
            den man sich teilt: offen für Gedanken, Widerspruch, kleine
            Kunstwerke und spontane Beiträge, aber ohne Hass als Grundton.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Anonym, nicht beliebig</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-zinc-400">
              Du brauchst kein Profil, keine Telefonnummer und keine E-Mail,
              um etwas beizutragen. Anzeigenamen geben Orientierung, ohne aus
              jedem Beitrag gleich eine persönliche Marke zu machen.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Diskussion als Raum</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-zinc-400">
              Threads sind hier keine perfekte Timeline, sondern ein Ort für
              Gedanken, Fragen, Widerspruch, Solidarität und Fundstücke aus
              dem digitalen Alltag.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pixel als Spuren</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-zinc-400">
              Auf dem Canvas entsteht nichts allein. Jeder Pixel ist klein,
              aber zusammen wird daraus eine Fläche, die zeigt, wie viele
              kleine Beiträge sichtbar werden können.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="bg-zinc-950/75 px-6 py-10 text-white backdrop-blur-[1px] md:px-10">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-bold">Warum RedCanvas?</h2>
          <p className="text-sm leading-7 text-zinc-100">
            Viele Orte im Netz kippen schnell in Selbstdarstellung, Zynismus oder rechte Dogwhistles. RedCanvas will einen anderen Weg gehen: einen gemeinsamen Raum schaffen, in dem Anonymität nicht als Ausrede für Hass dient, sondern Platz für ehrliche, kreative und solidarische Beiträge lässt. 
            <br />
            <br />
            Schreiben, Pixel setzen, etwas hinterlassen - einfach, weil man etwas ausdrücken oder mit anderen teilen möchte.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <Link href="/threads">In die Threads</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/place">Zum Place</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
