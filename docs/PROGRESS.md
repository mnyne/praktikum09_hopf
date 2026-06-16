# RedCanvas Progress

Stand: 2026-06-16

## Projektidee

RedCanvas ist ein anonymes Community-Board mit zwei Bereichen:

- Imageboard: anonyme Threads und Antworten mit gesichertem Anzeigenamen.
- Pixel-Place: gemeinsame Pixel-Leinwand im Stil von r/place.

## Existiert bereits

- Next.js App Router Projekt mit TypeScript, Tailwind und ESLint.
- shadcn/ui ist eingerichtet.
- Prisma 7 mit SQLite und better-sqlite3 Adapter ist eingerichtet.
- Zod ist installiert und wird fuer Formularvalidierung genutzt.
- Basisnavigation mit Startseite, `/threads` und `/place`.
- Prisma-Modelle fuer `Thread`, `Post` und `Pixel`.
- Imageboard-Branch `feature/imageboard`.
- `/threads` zeigt echte Threads aus Prisma.
- Neue Threads koennen erstellt werden.
- Threads haben Titel, Inhalt und einen gesicherten Anzeigenamen.
- `/threads/[id]` zeigt einen Thread mit Antworten.
- Antworten koennen erstellt werden.
- Thread- und Antwortformulare nutzen Server Actions und Zod.
- Username+Passwort-Login existiert ohne E-Mail oder Telefonnummer.

## Bewusste Entscheidungen

- Es gibt keine E-Mail-Adressen und keine Telefonnummern.
- Anonymitaet bleibt nach aussen erhalten, aber Anzeigenamen sind per Passwort gesichert.
- Bild-URLs wurden entfernt. Bilder sollen spaeter als echte Anhaenge umgesetzt werden.
- `authorName` faellt auf `Anonymous` zurueck, wenn kein Anzeigename gesetzt wird.
- `Thread.content` hat in Prisma einen Default, damit alte lokale Testdaten migrierbar bleiben.

## Noch offen fuer Praktikum 9

- Checks laufen lassen:
  - `npm.cmd run lint`
  - `npx.cmd tsc --noEmit --incremental false`
  - `npx.cmd prisma validate`
  - `npm.cmd run build`
- Commit erstellen.
- Branch pushen.
- Pull Request mit Beschreibung oeffnen.
- Gegenseitiges Review durchfuehren.

## Naechste sinnvolle Features

- Moderations-/Postfilter fuer gesperrte Begriffe und Codes.
- Echte Bildanhaenge statt Bild-URLs.
- Pixel-Place funktional machen.
- README bei groesseren Projektentscheidungen aktuell halten.
- Optional: GitHub Actions CI fuer Pull Requests.

## Assets

Backgrounds und andere statische Dateien gehoeren nach:

```txt
public/backgrounds/
```

Eine Datei `public/backgrounds/redcanvas-bg.png` waere im Browser erreichbar unter:

```txt
/backgrounds/redcanvas-bg.png
```
