# Cosmetic Divine Leads

Marketing site for **Divine Leads** — AI patient acquisition for aesthetic & cosmetic clinics in India.

Built with **TanStack Start** (React 19 SSR), Vite, and Tailwind CSS. Deployed as a Node server on Railway.

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

## Environment variables

Set these in Railway (and in a local `.env` for testing):

| Variable                  | Purpose                                                        |
| ------------------------- | ------------------------------------------------------------- |
| `VITE_ASSESSMENT_URL`     | The Assess360 assessment opt-in URL every CTA points to.      |
| `VITE_META_PIXEL_ID`      | Meta Pixel ID (optional; analytics only fire when set).       |
| `VITE_GA4_MEASUREMENT_ID` | GA4 measurement ID (optional).                                |

> `VITE_*` variables are inlined at **build time**, so changing them requires a redeploy.

## Deployment (Railway)

Build/run is defined in `nixpacks.toml` and `railway.json`:

- Build: `npm run build` with `NITRO_PRESET=node-server`
- Start: `node .output/server/index.mjs`

The public domain is `cosmetic.divineleads.guru` (fronted by Cloudflare — use SSL mode **Full (strict)** and do not cache HTML).
