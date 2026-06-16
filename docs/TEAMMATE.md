# RedCanvas Team Handoff

## Kurzbeschreibung

RedCanvas ist ein Praktikumsprojekt mit Next.js, Prisma, SQLite, Zod und
shadcn/ui. Es kombiniert ein anonymes Imageboard mit einem spaeteren
Pixel-Place.

## Aktueller Fokus

Der Branch `feature/imageboard` baut den Imageboard-Teil:

- `/threads`: Thread-Liste und Formular fuer neue Threads.
- `/threads/[id]`: Detailansicht mit Startpost und Antworten.
- Threads und Antworten sind pseudonym: Anzeigenamen sind per Passwort gesichert.
- Es gibt keine E-Mail-Adressen und keine Telefonnummern.
- Bilder sind vorerst nicht aktiv. Spaeter sollen echte Anhaenge kommen.

## Wichtige Dateien

- `app/threads/page.tsx`: Thread-Uebersicht.
- `app/threads/new-thread-form.tsx`: Formular fuer neue Threads.
- `app/threads/[id]/page.tsx`: Detailseite fuer einen Thread.
- `app/threads/[id]/post-form.tsx`: Antwortformular.
- `app/auth/page.tsx`: Login und Registrierung.
- `lib/auth.ts`: Session-Cookies und Passwort-Hashing.
- `app/threads/actions.ts`: Server Actions fuer Thread und Antwort.
- `schemas/thread.ts`: Zod-Schemas.
- `prisma/schema.prisma`: Datenmodell.
- `lib/prisma.ts`: Prisma Client mit SQLite Adapter.

## Lokal starten

```powershell
npm.cmd install
npx.cmd prisma migrate dev
npm.cmd run dev
```

Danach:

```txt
http://localhost:3000
http://localhost:3000/threads
http://localhost:3000/place
```

## Vor PR pruefen

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit --incremental false
npx.cmd prisma validate
npm.cmd run build
```

## Hinweise

- Unter Windows besser `npm.cmd` und `npx.cmd` verwenden.
- `.env`, `dev.db`, `.next`, `node_modules` und `generated/` nicht committen.
- Statische Bilder gehoeren nach `public/backgrounds/`.
