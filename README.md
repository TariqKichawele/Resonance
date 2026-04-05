# Resonance

Resonance is a web application for **AI text-to-speech** and **voice management**. Users sign in with organizations (Clerk), generate speech from text with configurable voices, browse generation history, and create or manage custom voices backed by object storage. Usage-oriented billing is integrated via Polar.

## Features

- **Text-to-speech** — Generate audio from prompts with voice selection, playback (including waveform preview), and per-generation settings.
- **Voices** — System and custom voices with categories, languages, and optional recorded samples stored in Cloudflare R2.
- **Dashboard** — Quick entry points into common narration and content workflows.
- **Authentication & orgs** — Clerk protects the app; users without an active organization are guided to org selection.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| Language | TypeScript |
| API | [tRPC](https://trpc.io/) + [TanStack Query](https://tanstack.com/query) |
| Database | [PostgreSQL](https://www.postgresql.org/) via [Prisma](https://www.prisma.io/) |
| Auth | [Clerk](https://clerk.com/) |
| Object storage | [Cloudflare R2](https://developers.cloudflare.com/r2/) (AWS S3–compatible SDK) |
| TTS backend | Chatterbox-compatible HTTP API (`CHATTERBOX_API_URL`) |
| Billing | [Polar](https://polar.sh/) |
| Observability | [Sentry](https://sentry.io/) (Next.js integration) |

UI uses Tailwind CSS 4, Radix / shadcn-style components, and Lucide icons.

## Prerequisites

- **Node.js** — Current LTS or the version your team standardizes on for Next 16.
- **PostgreSQL** — A database URL Prisma can use (local Docker, managed host, etc.).
- **External services** — Clerk application, R2 bucket and API credentials, Chatterbox (or compatible) TTS API, and Polar product/meters if you use billing.

## Environment variables

Create a `.env` in the project root. The app validates server-side variables at runtime (see `src/lib/env.ts`). Typical entries:

**App & database**

- `DATABASE_URL` — PostgreSQL connection string  
- `APP_URL` — Public site URL (e.g. `http://localhost:3000` in development)

**Clerk**

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`  
- `CLERK_SECRET_KEY`  
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_SIGN_UP_URL`  
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`

**Cloudflare R2**

- `R2_ACCOUNT_ID`  
- `R2_ACCESS_KEY_ID`  
- `R2_SECRET_ACCESS_KEY`  
- `R2_BUCKET_NAME`

**TTS API**

- `CHATTERBOX_API_URL` — Base URL of the TTS service  
- `CHATTERBOX_API_KEY` — API key accepted by that service

**Polar**

- `POLAR_ACCESS_TOKEN`  
- `POLAR_SERVER` — `sandbox` or `production`  
- `POLAR_PRODUCT_ID`  
- `POLAR_METER_VOICE_CREATION`  
- `POLAR_METER_TTS_GENERATION`  
- `POLAR_METER_TTS_PROPERTY`

**Optional / tooling**

- `SKIP_ENV_VALIDATION` — Set to a truthy value only if you need to bypass strict env checks (e.g. certain CI or codegen steps).  
- Sentry build/upload tokens and DSNs are configured per [Sentry’s Next.js guide](https://docs.sentry.io/platforms/javascript/guides/nextjs/) when you enable error reporting.

Never commit real secrets; use your host’s secret store in production.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment** — Copy the variable names above into `.env` and fill in values from Clerk, R2, your TTS provider, and Polar.

3. **Database**

   ```bash
   npx prisma migrate deploy
   ```

   For a fresh database during development you can use `npx prisma migrate dev` instead.

4. **Seed (optional)** — Seeds system voices when defined in `prisma.config.ts`:

   ```bash
   npx prisma db seed
   ```

5. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). Ensure `APP_URL` matches how you access the app so redirects and callbacks stay consistent.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js in development |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run sync-api` | Regenerate API-related types/scripts (`scripts/sync-api.ts`) |

`postinstall` runs `prisma generate` so the Prisma client stays in sync after installs.

## Project layout (high level)

- `src/app/` — App Router routes, API routes, and layouts  
- `src/features/` — Feature modules (dashboard, text-to-speech, voices, billing)  
- `src/trpc/` — tRPC routers and client setup  
- `prisma/` — Schema and migrations  
- `scripts/` — Maintenance scripts (API sync, seeding)

## License

This repository is private by default (`"private": true` in `package.json`). Add a `LICENSE` file if you intend to publish under an open-source license.
