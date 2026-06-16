# RedCanvas Progress

Stand: 2026-06-16

## Projektidee

RedCanvas ist ein anonymes Community-Board mit zwei Bereichen:

- Imageboard: anonyme Threads und Antworten mit gesichertem Anzeigenamen.
- Pixel-Place: gemeinsame Pixel-Leinwand im Stil von r/place.

## Existiert bereits

- Next.js App Router Projekt mit TypeScript, Tailwind und ESLint.
- shadcn/ui ist eingerichtet.
- Prisma 7 ist auf PostgreSQL/Supabase umgestellt.
- Zod ist installiert und wird fuer client- und serverseitige Formularvalidierung genutzt.
- react-hook-form und zodResolver sind in den Formularen eingebunden.
- Basisnavigation mit Startseite, `/threads` und `/place`.
- Prisma-Modelle fuer `Thread`, `Post` und `Pixel`.
- Aktueller Praktikum-10-Branch baut auf Imageboard und Pixel-Place auf.
- `/threads` zeigt echte Threads aus Prisma.
- Neue Threads koennen erstellt werden.
- Threads haben Titel, Inhalt und einen gesicherten Anzeigenamen.
- `/threads/[id]` zeigt einen Thread mit Antworten.
- Antworten koennen erstellt werden.
- Thread- und Antwortformulare nutzen Server Actions und Zod.
- Username+Passwort-Login existiert ohne E-Mail oder Telefonnummer.
- RedCanvas-Logo ist in der Navigation eingebunden.
- Favicon ist fuer Browser-Tabs eingebunden.
- Pixel-Place ist funktional.
- Pixel setzen erfordert denselben Login wie das Imageboard.
- Die alten SQLite-Migrationen wurden durch eine Postgres-Baseline-Migration ersetzt.
- `.env.example` dokumentiert die benoetigten Supabase/Vercel-Variablen.
- Open Graph Metadata und ein generiertes OG-Bild existieren.
- Vercel Web Analytics ist eingebunden.
- Der Background wird als komprimiertes WebP ausgeliefert.
- Lighthouse Performance Audit wurde dokumentiert.

## Bewusste Entscheidungen

- Es gibt keine E-Mail-Adressen und keine Telefonnummern.
- Anonymitaet bleibt nach aussen erhalten, aber Anzeigenamen sind per Passwort gesichert.
- Bild-URLs wurden entfernt. Bilder sollen spaeter als echte Anhaenge umgesetzt werden.
- `authorName` faellt auf `Anonymous` zurueck, wenn kein Anzeigename gesetzt wird.
- `Thread.content` hat in Prisma einen Default, damit alte lokale Testdaten leichter migrierbar bleiben.
- Supabase wird ueber Prisma angebunden, nicht ueber direkten Browserzugriff. Dadurch bleiben Datenbankzugriffe serverseitig.

## Noch offen fuer Praktikum 10

- Branch pushen.
- Pull Request mit Beschreibung oeffnen.
- Gegenseitiges Review durchfuehren.
- Nach dem naechsten Vercel-Deploy Lighthouse erneut pruefen, damit die WebP-Optimierung live gemessen ist.

## Naechste sinnvolle Features

- Moderations-/Postfilter fuer gesperrte Begriffe und Codes.
- Echte Bildanhaenge statt Bild-URLs.
- UX-Polish, Edge Cases und responsive Feinschliff fuer Praktikum 11.
- README bei groesseren Projektentscheidungen aktuell halten.

## Assets

Backgrounds und andere statische Dateien gehoeren nach:

```txt
public/backgrounds/
```

Die aktive Background-Datei liegt unter:

```txt
public/backgrounds/redcanvas-bg.webp
```

Das Navigationslogo liegt unter:

```txt
public/redcanvas-logo.png
```

Das Browser-Favicon liegt unter:

```txt
public/favicon.ico
```
