# ProYard Sales Map - navigation demo

Front-end demo of the four-destination shell: **Chat / Map / Prospect / Enrich**.
Most data is local and faked, except two real serverless functions at the repo root:
`/api/find-contacts` (LeadMagic contact search) and `/api/chat` (real Claude replies). Built
to show the UI, not the plumbing.

## Run locally

    npm install
    npm run dev

## Deploy to Vercel

Push this folder to a GitHub repo and import it at vercel.com. Vercel auto-detects Vite:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

Set `LEADMAGIC_API_KEY` and `ANTHROPIC_API_KEY` as Vercel project environment variables to
enable live contact search and real Claude replies (both server-side only - never in client
code). Without a key, each feature reports that it isn't connected yet instead of failing
silently.

When adding either variable, check **Preview** and **Production** (Vercel's "Development"
checkbox only applies to `vercel dev` run locally with the Vercel CLI - it does nothing for
an actual deployed URL). Also note Vercel only injects env vars into deployments created
*after* the variable was added, so a variable added post-deploy needs a fresh deploy
(push a commit, or "Redeploy" in the dashboard) before it takes effect.

## What works in the demo

- **Tab switcher** - keyboard-navigable, deep-linkable via `#/chat`, `#/map`, `#/prospect`, `#/enrich`.
- **Chat** - the model picker's two Claude entries (Opus 5, Sonnet 5) call `/api/chat` for real replies; the two GPT entries have no connected key and keep using the canned, keyword-matched replies in `src/data.js`. "Show these on map" navigates to Map and updates the visible count and pin banner (canned replies only - real Claude replies are plain text).
- **Map** - a real Leaflet map (free OpenStreetMap tiles, no API key) pinning 83 real Wasatch Front/Utah County businesses from a Google Maps export, with a name/address search filter. Nearby businesses cluster into a numbered bubble until you zoom in, so dense towns don't turn into an unclickable pile of overlapping dots. Clicking a pin opens a right-side detail panel (rating, phone, website, address) with a **Find contacts** button that calls `/api/find-contacts` (LeadMagic) to look up a main contact. "Find surrounding businesses" routes into Enrich.
- **Prospect** - row selection, "Add N to map", per-row Enrich.
- **Enrich** - "Reveal - 2" unmasks a contact and deducts 2 credits from the live balance; "Reveal all" charges in bulk. Meter turns amber below 10%.

## File map

    api/find-contacts.js         serverless proxy to LeadMagic (holds the API key)
    api/chat.js                  serverless proxy to the Claude API (holds the API key)
    src/App.jsx                  app shell, all state, tab routing
    src/data.js                  every piece of demo data + canned chat replies
    src/theme.js                 color palette and shared style objects
    src/services/leadmagic.js    client for /api/find-contacts
    src/components/Sidebar.jsx   tab switcher + per-destination sidebar bodies
    src/components/CreditMeter.jsx
    src/components/BusinessPanel.jsx  right-side business detail + contact panel
    src/components/Toast.jsx
    src/views/MapView.jsx        Leaflet map, top bar, pin banner, map actions
    src/views/ChatView.jsx       thread, model picker, composer
    src/views/ProspectView.jsx   query card + results table
    src/views/EnrichView.jsx     contacts table, credits, company profile

## Wiring it up for real

1. **Map** - `BUSINESSES` in `src/data.js` holds real business records but coordinates are approximated from each city center (no live geocoding was reachable at build time). Swap in real lat/lng from a geocoder, or point the tile layer at Mapbox with a token, when the backend lands. Keep the node mounted: the wrapper toggles `visibility`, never unmounts, so the map never re-initializes on tab switch.
2. **Contacts** - `api/find-contacts.js` calls LeadMagic's `profile-search` endpoint. That request/response shape is a best-effort read of LeadMagic's docs, not verified against a live account - confirm it matches your LeadMagic API version and adjust that one file if not.
3. **Chat** - `api/chat.js` calls the real Claude API (non-streaming) via the official `@anthropic-ai/sdk`, only for the two Claude entries in `CLAUDE_MODEL_IDS` (`src/data.js`); GPT-5 / GPT-5 mini have no key and stay on canned replies. For a nicer typing effect, switch to `client.messages.stream(...)` and render tokens as they arrive instead of waiting for the full response.
4. **Credits** - the client decrement in `revealContact` / `revealAll` is display only. Real deduction belongs in the same server transaction that returns enriched data, with an idempotency key so a re-reveal of purchased data costs nothing.
