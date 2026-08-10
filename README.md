# Cosmetic Divine Leads

Marketing site for **Divine Leads** — AI patient acquisition for aesthetic & cosmetic clinics in India.

Built with **TanStack Start** (React 19 SSR), Vite, and Tailwind CSS. Deployed as a Node server on Railway. Includes an admin dashboard at `/admin` for editing settings and content without redeploying.

## Development

Requires Node.js 20+ and npm.

```sh
npm install
npm run dev
```

## Production build & run

```sh
npm run build      # builds the Nitro node-server output to .output/
npm run start      # runs node .output/server/index.mjs
```

The server listens on `$PORT` (defaults handled by Nitro).

## Admin dashboard

- Lives at `/admin` (login at `/admin/login`), single admin, noindex + robots-disallowed.
- Manage: **Settings** (assessment URL, analytics IDs, contact email/WhatsApp), **Content**
  (hero, offer, FAQ, final CTA copy), **Leads** (inbox — no on-site capture form yet), **Analytics**
  (lightweight first-party counters).
- Settings/content are stored as JSON under `DATA_DIR` and injected into the site at request time,
  so edits go live immediately — no redeploy.

## Environment variables

Set these in Railway (and in a local `.env` for testing):

| Variable                  | Purpose                                                                    |
| ------------------------- | -------------------------------------------------------------------------- |
| `ADMIN_PASSWORD`          | **Required.** The admin login password (compared server-side; not stored). |
| `SESSION_SECRET`          | **Required.** Random string used to sign the session cookie.               |
| `DATA_DIR`                | Where JSON data is written. Set to the mounted volume path, e.g. `/data`.  |
| `VITE_ASSESSMENT_URL`     | First-boot seed for the assessment URL (afterwards edit it in the dashboard). |
| `VITE_META_PIXEL_ID`      | First-boot seed for the Meta Pixel ID.                                     |
| `VITE_GA4_MEASUREMENT_ID` | First-boot seed for the GA4 measurement ID.                                |

> The `VITE_*` values only seed `settings.json` the first time it's created; after that the dashboard
> is the source of truth. Generate a session secret with e.g. `node -e "console.log(crypto.randomUUID())"`.

## Data persistence (Railway volume)

The dashboard writes `settings.json`, `content.json`, `leads.json`, `analytics.json` under `DATA_DIR`.
In Railway, attach a **Volume** mounted at `/data` and set `DATA_DIR=/data` so data survives redeploys.
Because it's a file store, run a **single instance** (no horizontal scaling). The data layer in
`src/server/store.ts` is isolated, so switching to SQLite/Postgres later is a contained change.

## Deployment (Railway)

Build/run is defined in `nixpacks.toml` and `railway.json`:

- Build: `npm run build` with `NITRO_PRESET=node-server`
- Start: `node .output/server/index.mjs`

The public domain is `cosmetic.divineleads.guru` (fronted by Cloudflare — use SSL mode **Full (strict)** and do not cache HTML).
