# RedCanvas Team Handoff

## Kurzbeschreibung

RedCanvas ist ein Praktikumsprojekt mit Next.js, Prisma, Supabase/PostgreSQL,
Zod und shadcn/ui. Es kombiniert ein anonymes Imageboard mit einem
Pixel-Place.

## Aktueller Fokus

Der aktuelle Branch bereitet Praktikum 10 vor:

- `/threads`: Thread-Liste und Formular fuer neue Threads.
- `/threads/[id]`: Detailansicht mit Startpost und Antworten.
- `/place`: gemeinsame Pixel-Leinwand.
- Threads und Antworten sind pseudonym: Anzeigenamen sind per Passwort gesichert.
- Pixel setzen erfordert denselben Login wie das Imageboard.
- Es gibt keine E-Mail-Adressen und keine Telefonnummern.
- Formulare nutzen react-hook-form mit Zod-Resolver fuer clientseitige Validierung.
- Bilder sind vorerst nicht aktiv. Spaeter sollen echte Anhaenge kommen.
- Prisma nutzt PostgreSQL und ist auf Supabase/Vercel Deployment vorbereitet.
- Open Graph Metadata, generiertes OG-Bild und Vercel Web Analytics sind eingebunden.
- Lighthouse Performance Audit ist in `docs/PRAKTIKUM_10.md` dokumentiert.

## Wichtige Dateien

- `app/threads/page.tsx`: Thread-Uebersicht.
- `app/threads/new-thread-form.tsx`: Formular fuer neue Threads.
- `app/threads/[id]/page.tsx`: Detailseite fuer einen Thread.
- `app/threads/[id]/post-form.tsx`: Antwortformular.
- `app/auth/page.tsx`: Login und Registrierung.
- `app/place/page.tsx`: Pixel-Place.
- `app/place/actions.ts`: Server Actions fuer Pixel.
- `app/opengraph-image.tsx`: generiertes Open Graph Bild.
- `lib/auth.ts`: Session-Cookies und Passwort-Hashing.
- `components/ui/form.tsx`: Form-Helfer fuer react-hook-form.
- `app/threads/actions.ts`: Server Actions fuer Thread und Antwort.
- `schemas/thread.ts`: Zod-Schemas.
- `prisma/schema.prisma`: Datenmodell.
- `lib/prisma.ts`: Prisma Client mit PostgreSQL Adapter.
- `docs/PRAKTIKUM_10.md`: PR10-Plan, Lighthouse-Werte und Deployment-Notizen.
- `docs/SUPABASE_SETUP.md`: Supabase-Setup und Environment-Variablen.

## Lokal starten

```powershell
npm.cmd install
npx.cmd prisma generate
npm.cmd run dev
```

Vorher muss lokal eine `.env` existieren. Vorlage:

```txt
.env.example
```

Die wichtigste Variable ist:

```txt
DATABASE_URL=postgresql://...
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

Wenn eine leere Supabase-Datenbank frisch vorbereitet werden soll:

```powershell
npx.cmd prisma migrate deploy
```

## Hinweise

- Unter Windows besser `npm.cmd` und `npx.cmd` verwenden.
- `.env`, `dev.db`, `.next`, `node_modules` und `generated/` nicht committen.
- Statische Bilder gehoeren nach `public/backgrounds/`.
- Aktiver Background ist `public/backgrounds/redcanvas-bg.webp`.
- Vercel braucht `DATABASE_URL` als Environment Variable ohne Anfuehrungszeichen.
- Vercel Web Analytics muss im Vercel Dashboard aktiviert sein.
