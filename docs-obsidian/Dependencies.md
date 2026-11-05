# Dependencies

## Runtime (package.json)

| Package | Version | Use |
|---------|---------|-----|
| react | ^18.2.0 | UI |
| react-dom | ^18.2.0 | DOM renderer |
| react-scripts | 5.0.1 | CRA build/test tooling (also supplies webpack, babel, eslint, jest) |

## Development types
- @types/node ^26.6.6
- @types/react ^19.3.0
- @types/react-dom ^19.3.0

> Note: React 18 runtime with React 19 type packages asked for one accommodation — refs passed as props are typed `RefObject<HTMLElement | null>`.

## Vendored / static (not npm)
- `public/landing-pages/vendor/three.module.min.js` — three.js r169 (687,458 bytes), served locally to the landing page via import map; replaces the original unpkg CDN reference
- `public/landing-pages/kibori-assets/*` — 17 hash-verified assets: 12 woff2 fonts, 3 SVG art tiles, 2 webp images (atelier seal, workshop print)
- `public/landing-pages/kibori.html` — adapted landing document with embedded cannon-es physics

## Tooling used during implementation (not project deps)
- `graphify` 0.9.97 — AST knowledge graph (`graphify-out/`)
- `puppeteer-core` (temp install) — headless Chrome verification flow

## External services at runtime
**None.** The page is fully self-contained; no CDN, no API, no analytics.

## Future backend seam
Only `src/lib/bookingApi.ts` (`createBooking`, `sendInquiry`) needs to change to talk to a reservations backend (`POST /api/bookings`, `POST /api/inquiries`).
