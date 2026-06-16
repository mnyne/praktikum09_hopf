# RedCanvas

RedCanvas ist ein Gruppenprojekt fuer das Praktikum
**Multimediaapplikationen/b: Full Stack Development**.

## Beschreibung

RedCanvas ist ein anonymes, solidarisches Community-Board mit zwei Bereichen:

- **Imageboard:** Nutzerinnen und Nutzer koennen Threads erstellen und darauf
  antworten. Anzeigenamen sind per Passwort gesichert, ohne E-Mail-Adresse,
  Telefonnummer oder Profilzwang.
- **Pixel-Place:** Eine gemeinsame Pixel-Leinwand, auf der angemeldete Nutzer
  gemeinsam Pixel setzen und so ein sichtbares Gemeinschaftsbild bauen.

Das Projekt versteht sich als offener, antifaschistischer und kreativer Raum im
Netz. Es nimmt die Idee anonymer Boards auf, aber ohne Hass als Grundton:
Diskussion, Widerspruch, Solidaritaet und gemeinsames Gestalten stehen im
Vordergrund.

Die App ist fuer Studierende, Projektteams und Menschen gedacht, die sehen
wollen, wie ein kleines Full-Stack-Projekt mit Next.js, Prisma, Supabase,
Server Actions, Validierung und Deployment aufgebaut sein kann.

## Tech Stack

- Next.js 16 mit App Router
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma 7
- PostgreSQL ueber Supabase
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
├── ui/                    # shadcn/ui Komponenten
└── theme-switcher.tsx     # Dropdown fuer Current/Polished Theme

lib/
├── auth.ts                # Session-Cookies und Passwort-Hashing
├── prisma.ts              # Prisma Client mit PostgreSQL Adapter
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

- Username+Passwort-Login ohne E-Mail oder Telefonnummer
- HTTP-only Session-Cookie
- Threads erstellen und beantworten
- Client- und serverseitige Validierung mit Zod
- Pixel auf gemeinsamer Leinwand setzen
- Place ist nur fuer eingeloggte Nutzer beschreibbar
- Theme-Dropdown mit `Current` und `Polished`
- Industrial/Lost-Place-inspiriertes `Polished` Theme
- Open Graph Metadata und generiertes OG-Bild
- Vercel Analytics
- Loading- und Error-State

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
