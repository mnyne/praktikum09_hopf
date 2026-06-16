# Supabase Setup

Stand: 2026-06-16

## Was wir haben

Supabase-Projekt:

```txt
https://nsotbmddxiizibegulqb.supabase.co
```

Der Publishable Key ist fuer Browser-/Supabase-Client-Zugriff gedacht. Fuer
Prisma reicht er nicht aus.

## Was Prisma braucht

Prisma braucht eine Datenbank-URL zu Postgres:

```txt
DATABASE_URL="postgresql://..."
```

Diese URL findest du im Supabase Dashboard unter:

```txt
Project Settings -> Database -> Connection string
```

Empfohlen fuer Vercel/Serverless ist normalerweise die Pooler-Connection.

Wichtig:

- `DATABASE_URL` niemals committen.
- `DATABASE_URL` niemals mit `NEXT_PUBLIC_` prefixen.
- `NEXT_PUBLIC_*` Variablen sind im Browser sichtbar.

## Aktueller Projektstand

Der Code ist auf PostgreSQL/Supabase vorbereitet:

- `prisma/schema.prisma` nutzt `provider = "postgresql"`.
- `lib/prisma.ts` nutzt `@prisma/adapter-pg`.
- `prisma.config.ts` liest die URL aus `DATABASE_URL`.
- Die Migrationen enthalten eine Postgres-Baseline fuer den aktuellen Zielzustand.

Die Server Actions muessen nicht speziell auf den Supabase SDK umgebaut werden.
Sie schreiben weiter ueber Prisma. Sobald `DATABASE_URL` auf Supabase zeigt,
landen Threads, Posts, Sessions und Pixel in Supabase Postgres.

## Lokale Einrichtung

1. `.env.example` kopieren und als `.env` speichern.
2. In `.env` die echte Supabase-Postgres-URL eintragen:

```txt
DATABASE_URL="postgresql://..."
```

3. Prisma Client generieren:

```powershell
npx.cmd prisma generate
```

4. App starten:

```powershell
npm.cmd run dev
```

## Migration auf Supabase ausfuehren

Wenn die Supabase-Datenbank leer oder fuer das Praktikum neu angelegt ist:

```powershell
npx.cmd prisma migrate deploy
```

Warum `deploy` und nicht `dev`?

- `migrate deploy` wendet vorhandene Migrationen an und ist fuer Deployment gedacht.
- `migrate dev` ist fuer lokale Entwicklung gedacht und kann interaktiv neue Migrationen erzeugen.

## Vercel Environment Variables

In Vercel unter dem Projekt:

```txt
Settings -> Environment Variables
```

Eintragen:

```txt
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://nsotbmddxiizibegulqb.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Wichtig:

- `DATABASE_URL` fuer Production, Preview und Development setzen, wenn Preview Deployments funktionieren sollen.
- Danach Deployment neu starten, weil Vercel Environment Variables nicht rueckwirkend in laufende Builds injiziert.

## Nach dem Setup pruefen

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit --incremental false
npx.cmd prisma validate
npm.cmd run build
```
