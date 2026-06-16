# Praktikum 10 Plan

Stand: 2026-06-16

## Ziel

RedCanvas soll fuer Praktikum 10 deploymentfaehig, bewusster gecacht und mit
einem Performance-Audit dokumentiert werden.

## Aufgabenteilung

### Deployment / Vercel

Wird vom Team ueber das GitHub-Projekt in Vercel betreut.

Zu pruefen:

- Repository ist in Vercel importiert.
- Vercel erkennt das Projekt als Next.js-App.
- Preview Deployments fuer Pull Requests laufen.
- Production Deployment laeuft nach Merge auf `main`.
- Environment Variables sind in Vercel gesetzt.

### Datenbank

Das Projekt nutzt Prisma mit PostgreSQL und ist fuer Supabase vorbereitet.

Supabase-Projekt:

```txt
https://nsotbmddxiizibegulqb.supabase.co
```

Wichtig:

- `DATABASE_URL` darf nie mit `NEXT_PUBLIC_` beginnen.
- Lokale `.env`-Dateien werden nicht committed.
- Der Supabase Publishable Key ersetzt keine Postgres `DATABASE_URL`.
- Die Server Actions schreiben ueber Prisma in die Datenbank; Supabase ist hier die gehostete Postgres-Datenbank.
- Details stehen in `docs/SUPABASE_SETUP.md`.

## Caching / Revalidation

Bereits umgesetzt:

- Imageboard-Mutationen rufen `revalidatePath("/threads")` auf.
- Thread-Antworten revalidieren auch die Detailroute.
- Place-Mutationen rufen `revalidatePath("/place")` auf.

Bewusste Entscheidung:

- `/threads`, `/threads/[id]`, `/place` und `/auth` sind dynamische Routen,
  weil sie nutzerspezifische Session-Daten oder haeufig wechselnde Daten lesen.
- Fuer diese Seiten ist aktuelle Darstellung wichtiger als aggressives Caching.

## Performance / Lighthouse

Nach dem Deployment:

1. Deployed URL in Chrome oeffnen.
2. DevTools -> Lighthouse.
3. Modus: Navigation.
4. Kategorie: Performance.
5. Geraet: Mobile.
6. Ziel: Score 80+.

Zu dokumentieren:

```txt
URL:
Datum:
Score vorher:
Top 3 Issues:
Fixes:
Score nachher:
```

Moegliche Fixes:

- Bilder weiter komprimieren.
- Unnoetige JS-Imports entfernen.
- Layout-Shift durch feste Groessen vermeiden.
- Background/Logo-Dateien bei Bedarf optimieren.

## Praktikum-10-Branch

Aktueller Branch:

```txt
feature/place-auth-integration
```

Inhalt:

- Place-Pixel setzen erfordert denselben Login wie das Imageboard.
- Alte Cookie-basierte Place-User-ID wurde durch echte `User.id` ersetzt.
- Nicht eingeloggte Nutzer sehen den Canvas, koennen aber keine Pixel setzen.
- Loading- und Error-State wurden ergaenzt.
- Prisma wurde von SQLite auf PostgreSQL/Supabase vorbereitet.
- Eine Postgres-Baseline-Migration ersetzt die alten SQLite-Migrationen.
- GitHub Actions CI wird nicht genutzt, weil das Repository privat ist.

## Vor Pull Request

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit --incremental false
npx.cmd prisma validate
npm.cmd run build
```

Wenn `DATABASE_URL` auf Supabase gesetzt ist:

```powershell
npx.cmd prisma migrate deploy
```
