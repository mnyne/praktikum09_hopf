# RedCanvas

RedCanvas ist ein Gruppenprojekt fuer das Praktikum
**Multimediaapplikationen/b: Full Stack Development**.

Die Anwendung kombiniert zwei Community-Features:

- **Imageboard:** anonyme Threads und Antworten mit gesichertem Anzeigenamen.
- **Pixel-Place:** eine gemeinsame Pixel-Leinwand im Stil von r/place.

Der Fokus liegt aktuell auf Praktikum 9: Next.js App Router, Prisma, SQLite,
Zod, shadcn/ui, Feature-Branches und Pull Requests.

## Aktueller Stand

Bereits umgesetzt:

- Next.js App Router Projekt mit TypeScript, Tailwind und ESLint.
- shadcn/ui ist eingerichtet.
- Prisma 7 mit SQLite und better-sqlite3 Adapter ist eingerichtet.
- Zod-Schemas fuer Formularvalidierung existieren.
- Basisnavigation mit Startseite, `/threads` und `/place`.
- `/threads` zeigt echte Threads aus der Datenbank.
- Neue Threads koennen erstellt werden.
- `/threads/[id]` zeigt den Startpost und alle Antworten.
- Antworten koennen erstellt werden.
- Threads und Antworten verwenden gesicherte Anzeigenamen per Username+Passwort.
- Authentifizierung braucht keine E-Mail-Adresse und keine Telefonnummer.
- Bild-URLs wurden bewusst entfernt. Bilder sollen spaeter als echte Anhaenge kommen.

Noch offen:

- Pixel-Place funktional machen.
- Moderations-/Postfilter planen.
- Echte Bildanhaenge ergaenzen.
- Pull Request fuer den Imageboard-Branch oeffnen und reviewen.

Eine detailliertere Fortschrittsliste liegt in:

```txt
docs/PROGRESS.md
```

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- SQLite
- Zod

## Lokal starten

Unter Windows am besten `npm.cmd` und `npx.cmd` verwenden:

```powershell
npm.cmd install
npx.cmd prisma migrate dev
npm.cmd run dev
```

Danach im Browser:

```txt
http://localhost:3000
```

Wichtige Routen:

```txt
/          Startseite
/threads   Imageboard
/place     Pixel-Place
```

## Checks vor einem Pull Request

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit --incremental false
npx.cmd prisma validate
npm.cmd run build
```

## Wichtige Dateien

```txt
app/page.tsx                  Startseite
app/layout.tsx                Globales Layout und Navigation
app/threads/page.tsx          Thread-Uebersicht
app/threads/actions.ts        Server Actions fuer Threads und Antworten
app/threads/new-thread-form.tsx
app/threads/[id]/page.tsx     Thread-Detailseite
app/threads/[id]/post-form.tsx
app/auth/page.tsx              Login und Registrierung ohne E-Mail
lib/auth.ts                    Session- und Passwort-Hashing
app/place/page.tsx            Pixel-Place Platzhalter
schemas/thread.ts             Zod-Schemas
prisma/schema.prisma          Datenmodell
lib/prisma.ts                 Prisma Client
docs/PROGRESS.md              Fortschrittslog
```

## Assets

Statische Bilder und Hintergruende gehoeren nach:

```txt
public/backgrounds/
```

Beispiel:

```txt
public/backgrounds/redcanvas-bg.png
```

Diese Datei waere dann im Code erreichbar als:

```txt
/backgrounds/redcanvas-bg.png
```

## Arbeitsweise

Es wird nicht direkt auf `main` entwickelt. Neue Features entstehen auf eigenen
Branches, zum Beispiel:

```txt
feature/imageboard
feature/place
feature/moderation
```

Danach wird ein Pull Request erstellt und von mindestens einer weiteren Person
reviewt.
