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

Audit vom 2026-06-16:

```txt
URL: https://praktikum09-hopf.vercel.app
Tool: Lighthouse CLI 13.4.0 mit Microsoft Edge
Kategorie: Performance
Mobile Score: 99
Desktop Score: 97
```

Mobile-Metriken:

```txt
First Contentful Paint: 0.9 s
Largest Contentful Paint: 1.8 s
Total Blocking Time: 110 ms
Cumulative Layout Shift: 0
Speed Index: 2.1 s
```

Top-Hinweise:

- Hintergrundbild war zu gross.
- Etwas ungenutztes JavaScript bleibt uebrig.
- Legacy-JavaScript-Hinweis durch Browser-Kompatibilitaets-Bundles.

Fixes:

- Background von `redcanvas-bg.png` auf komprimiertes WebP umgestellt.
- Open Graph Metadata und generiertes OG-Bild ergaenzt.
- Vercel Web Analytics eingebunden.

Reports:

```txt
reports/lighthouse-pr10-mobile.json
reports/lighthouse-pr10.json
```

Nach dem naechsten Vercel-Deploy sollte der Audit erneut ausgefuehrt werden,
weil die WebP-Optimierung erst dann live wirksam ist.

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
- Open Graph Metadata und ein generiertes OG-Bild wurden ergaenzt.
- Vercel Web Analytics wurde eingebunden.
- Der grosse PNG-Background wurde durch eine WebP-Variante ersetzt.
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
