# RedCanvas

RedCanvas ist ein Gruppenprojekt fuer das Praktikum
**Multimediaapplikationen/b: Full Stack Development**.

## Beschreibung

RedCanvas ist eine Community-Plattform mit Fokus auf Anonymität, Kreativität und gemeinschaftliche Gestaltung. Die Anwendung besteht aus zwei zentralen Bereichen:

* **Imageboard:** Nutzerinnen und Nutzer können Threads erstellen und diskutieren. Anzeigenamen lassen sich per Passwort schützen – ganz ohne E-Mail-Adresse, Telefonnummer oder verpflichtendes Profil.
* **Pixel-Place:** Eine gemeinsame Pixel-Leinwand, auf der registrierte Nutzer Pixel platzieren und gemeinsam ein fortlaufendes Gemeinschaftswerk erschaffen.

RedCanvas greift die Idee klassischer anonymer Boards auf, setzt jedoch einen anderen Schwerpunkt: Statt Provokation und Feindseligkeit stehen respektvoller Austausch, kreative Beiträge und gemeinsames Gestalten im Vordergrund.

Das Projekt entstand im Rahmen des Praktikums *Multimediaapplikationen/b: Full Stack Development* und dient als praxisnahes Beispiel für die Entwicklung moderner Full-Stack-Webanwendungen mit Next.js, Prisma, Supabase und TypeScript.

## Tech Stack

- Next.js 16 mit App Router
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma 7
- PostgreSQL ueber Supabase
- Supabase Realtime fuer Live-Updates im Pixel-Place und Imageboard
- Zod fuer Validierung
- react-hook-form fuer clientseitige Formulare
- Vercel Analytics

## Setup

Repository klonen und Abhaengigkeiten installieren:

```powershell
git clone [repository-url]
cd redcanvas
npm.cmd install
```

Lokale Environment-Datei anlegen:

```powershell
Copy-Item .env.example .env
```

In `.env` muss mindestens eine PostgreSQL-Verbindung gesetzt werden:

```env
DATABASE_URL="postgresql://..."
```

Prisma Client generieren und App starten:

```powershell
npx.cmd prisma generate
npm.cmd run dev
```

Danach laeuft die App lokal unter:

```txt
http://localhost:3000
```

Wenn eine neue/leere Supabase-Datenbank vorbereitet werden soll:

```powershell
npx.cmd prisma migrate deploy
```

## Wichtige Routen

```txt
/          Startseite
/about     Projektidee und Haltung
/auth      Login und Registrierung
/threads   Imageboard
/place     Pixel-Place
```

## Screenshots

Screenshots fuer die finale Dokumentation sollten im Ordner `docs/screenshots/`
abgelegt und hier eingebunden werden.

Vorgeschlagene Screenshots:

- Startseite mit `Polished` Theme
- Imageboard mit Thread-Liste
- Pixel-Place

```md
![Startseite](docs/screenshots/home.png)
![Threads](docs/screenshots/threads.png)
![Place](docs/screenshots/place.png)
```

## Architektur

```txt
app/
├── about/                 # About-Seite mit Projektidee
├── auth/                  # Login, Registrierung und Auth Server Actions
├── place/                 # Pixel-Place Seite und Pixel Server Actions
├── threads/               # Imageboard Uebersicht, Detailseite und Formulare
├── error.tsx              # Globale Error Boundary
├── loading.tsx            # Globaler Loading State
├── layout.tsx             # Root Layout, Navigation, Theme Switcher, Analytics
├── opengraph-image.tsx    # Generiertes Open Graph Bild
└── page.tsx               # Startseite

components/
├── place/                 # PixelGrid, PixelComponent, ColorPicker
├── threads/               # Realtime-Refresh fuer Threadseiten
├── ui/                    # shadcn/ui Komponenten
└── theme-switcher.tsx     # Dropdown fuer Current/Polished Theme

lib/
├── auth.ts                # Session-Cookies und Passwort-Hashing
├── prisma.ts              # Prisma Client mit PostgreSQL Adapter
├── supabase-browser.ts    # Supabase Browser Client fuer Realtime
└── utils.ts               # Utility-Funktionen

schemas/
└── thread.ts              # Zod-Schemas fuer Threads, Posts und Pixel

prisma/
├── schema.prisma          # Datenmodell
└── migrations/            # Postgres-Migrationen

docs/
├── PRAKTIKUM_10.md        # Deployment, Caching, Lighthouse
├── PROGRESS.md            # Arbeitsstand und offene Aufgaben
├── SUPABASE_SETUP.md      # Supabase/Vercel Environment Setup
└── TEAMMATE.md            # Kurzer Team-Handoff
```

## Features

* Benutzeranmeldung mit Username und Passwort ohne E-Mail-Adresse
* Sichere Authentifizierung über HTTP-only Session-Cookies
* Erstellen und Beantworten von Diskussionsthreads
* Client- und serverseitige Eingabevalidierung mit Zod
* Gemeinsame Pixel-Leinwand für kollaborative Kunstprojekte
* Schreibzugriff auf den Pixel-Place nur für angemeldete Nutzer
* Live-Updates im Pixel-Place und Imageboard über Supabase Realtime
* Umschaltbares Theme-System mit `Current` und `Polished`
* Industrial- und Lost-Place-inspiriertes Design im `Polished` Theme
* Automatisch generierte Open-Graph-Metadaten und Vorschaubilder
* Integration von Vercel Analytics
* Globale Loading- und Error-States für eine konsistente Nutzererfahrung

## Pull-Request Checks

Vor einem Pull Request:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit --incremental false
npx.cmd prisma validate
npm.cmd run build
```

## Team

Bitte vor der finalen Abgabe ergaenzen:

```txt
Name 1 - Beitrag
Name 2 - Beitrag
Name 3 - Beitrag
```

Moegliche Beitraege:

- Imageboard und Thread-Funktionen
- Pixel-Place
- Authentifizierung
- Supabase/Vercel Deployment
- UI Polish und Dokumentation
