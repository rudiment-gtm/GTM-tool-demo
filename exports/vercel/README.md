# ProYard Sales Map - navigation demo

Front-end demo of the four-destination shell: **Chat / Map / Prospect / Enrich**.
All data is local and faked - there is no backend. Built to show the UI, not the plumbing.

## Run locally

    npm install
    npm run dev

## Deploy to Vercel

Push this folder to a GitHub repo and import it at vercel.com. Vercel auto-detects Vite:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

No environment variables are needed.

## What works in the demo

- **Tab switcher** - keyboard-navigable, deep-linkable via `#/chat`, `#/map`, `#/prospect`, `#/enrich`.
- **Chat** - type a message or click a suggestion; canned replies are keyword-matched in `src/data.js`. Model picker switches between Claude and GPT names. "Show these on map" navigates to Map and updates the visible count and pin banner.
- **Map** - a real Leaflet map (free CARTO/OSM dark tiles, no API key) pinning 83 real Wasatch Front/Utah County businesses from a Google Maps export, with popups and a name/address search filter. "Find surrounding businesses" routes into Enrich.
- **Prospect** - row selection, "Add N to map", per-row Enrich.
- **Enrich** - "Reveal - 2" unmasks a contact and deducts 2 credits from the live balance; "Reveal all" charges in bulk. Meter turns amber below 10%.

## File map

    src/App.jsx                  app shell, all state, tab routing
    src/data.js                  every piece of demo data + canned chat replies
    src/theme.js                 color palette and shared style objects
    src/components/Sidebar.jsx   tab switcher + per-destination sidebar bodies
    src/components/CreditMeter.jsx
    src/components/Toast.jsx
    src/views/MapView.jsx        Leaflet map, top bar, pin banner, map actions
    src/views/ChatView.jsx       thread, model picker, composer
    src/views/ProspectView.jsx   query card + results table
    src/views/EnrichView.jsx     contacts table, credits, company profile

## Wiring it up for real

1. **Map** - `BUSINESSES` in `src/data.js` holds real business records but coordinates are approximated from each city center (no live geocoding was reachable at build time). Swap in real lat/lng from a geocoder, or point the tile layer at Mapbox with a token, when the backend lands. Keep the node mounted: the wrapper toggles `visibility`, never unmounts, so the map never re-initializes on tab switch.
2. **Chat** - replace the `setTimeout` in `App.jsx` `send()` with a streaming `fetch('/api/chat')`. Keep API keys server-side only.
3. **Credits** - the client decrement in `revealContact` / `revealAll` is display only. Real deduction belongs in the same server transaction that returns enriched data, with an idempotency key so a re-reveal of purchased data costs nothing.
