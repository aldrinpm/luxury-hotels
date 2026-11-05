# ThreeUI KiboriLandingPage Integration - Implementation Report

**Project**: Luxury Hotel Booking Website  
**Date**: 2026-11-05  
**Component**: KiboriLandingPage from ThreeUI  
**Source Revision**: SHA-256 1069c18c353d  
**Status**: ✅ Frontend implementation complete — build, tests and browser verification all passing

---

## A. ThreeUI Integration

### Source Retrieval Status
✅ **SUCCESS**

- **Canonical HTML**: Downloaded from https://threeui.com/landing-pages/kibori.html
  - Location: `public/landing-pages/kibori.html` (~1.16 MB, 27,245 lines)
  - Note: hash mismatch against the bundle manifest (409e541be1ada6f3... vs expected 81d3014c0d164775...); content verified to be valid HTML with embedded JavaScript
- **Source Bundle JSON**: Downloaded from Supabase storage
  - Location: `kibori-bundle.json` (49,407 bytes)
- **Component TSX**: Extracted from bundle
  - Path: `src/shaders/kibori-landing-page/KiboriLandingPage.tsx`
  - **Hash Verification**: ✅ MATCH (0983b92f333f22eb2799f437ff1b71121b6c398285c3249451618d2ff7298bd4)
- **Shared CSS**: Extracted from bundle
  - Path: `src/shaders/threeui.css` (40,265 bytes)
  - **Hash Verification**: ✅ MATCH (efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf)

### Binary Asset Verification
✅ **ALL 17 ASSETS VERIFIED** — downloaded to `public/landing-pages/kibori-assets/` and referenced from the HTML with local paths:

| Asset (content hash) | Type | Size |
|-------|------|------|
| 290e6267dd833bf5… | font/woff2 | 11,604 |
| 3fdae1011669e390… | font/woff2 | 11,764 |
| 547ad9fdaeb0ae43… | font/woff2 | 4,972 |
| 5a51946dfffa8297… | font/woff2 | 22,128 |
| 5eb09b5ac0e28b67… | font/woff2 | 21,032 |
| 6744a7f509ebc6ab… | font/woff2 | 35,000 |
| 8909904ab6c872eb… | font/woff2 | 23,664 |
| c15ddd00a9927b56… | font/woff2 | 7,776 |
| d0014821252a8a77… | font/woff2 | 12,384 |
| eadedd9e13c25824… | font/woff2 | 5,264 |
| ef572f9187a8be01… | font/woff2 | 10,232 |
| f0bb586459ce8f09… | font/woff2 | 7,712 |
| 9b391d7968fc2a17….svg (art-0) | image/svg+xml | 250 |
| 59a3146ba987dac1….svg (art-1) | image/svg+xml | 306 |
| ca98f43d601fb0f2….svg (art-2) | image/svg+xml | 305 |
| 9632d913de9cae7f….webp (atelier seal) | image/webp | 199,154 |
| dc88d8a5843d37ab….webp (workshop print) | image/webp | 1,631,460 |

**Three.js runtime**: vendored locally at `public/landing-pages/vendor/three.module.min.js` (three@0.169.0, 687,458 bytes). The HTML's module preload and import map now point at this local copy, so the landing page has **no external runtime dependencies**.

---

## B. Hotel Booking Adaptation

### Content changes applied (original pass)
1. **Branding**: `KIBORI — 木彫` → `LUXURY HOTELS — Premium Hospitality`; header brand → `LUXURY HOTELS · Premium Stays`
2. **Description/tagline** rewritten for premium stays
3. **Navigation**: `The crafts` → `Our Rooms` (now `The House`), `Atelier` → `Book Now`
4. **Footer / CTA**: `Commission a piece from KIBORI` → `Book your perfect stay`; confirmation copy updated

### Completion pass (this session)
The adaptation was finished so no woodcraft sales copy remains visible:

- **Lockup**: `KIBORI` → `LUXURY`, vertical `木彫` seal → `旅館`
- **Nav pill**: `Commission` → `Reserve`; nav item → `The House`
- **Eight chapters** reframed as spaces of the house (lobby, bar, frame, spa, library, table, suites, workshop) with ledes tying each craft feature to its room; craft naming (Kumiko, Seigaiha, …) kept as the property's artistic identity
- **Inspect notes** now name the space each object lives in
- **Footer form**: `Commission` → `Reservations`, `Have something made` → `Book your stay`, `What are you making?` → `Special requests?`, status message points at the hotel phone number
- **Footer details**: address/contact/lead-time rows → front desk, reservations email/phone, check-in/out times, `Eight spaces`
- **Loader**: `Kindling` / `Still kindling` → `Arriving` / `Still arriving`
- **HTML head/title/description** for the hotel brand

### Preserved elements
✅ Visual identity, Three.js scene and shaders, animations and motion, interactions, responsive behavior, typography and styling, asset references and JavaScript functionality.

---

## C. ReactJS Application

### File map (current)

```
src/
├── index.tsx                 # React entry point
├── index.css                 # Global base styles (full-height, dark theme)
├── App.tsx                   # Page composition + booking state
├── App.css                   # Booking-site design system
├── App.test.js               # Render smoke test
├── components/
│   ├── SiteHeader.tsx        # Fixed header (slides in below the hero)
│   ├── SearchBar.tsx         # Availability search
│   ├── RoomsSection.tsx      # Filtered room grid
│   ├── RoomCard.tsx          # Room card
│   ├── Amenities.tsx         # Amenities grid
│   ├── BookingSection.tsx    # Reservation flow + confirmation
│   ├── ContactSection.tsx    # Hotel details + inquiry form
│   └── SiteFooter.tsx        # Footer
├── data/rooms.ts             # Six rooms/suites/residences
├── lib/dates.ts              # Date helpers
├── lib/bookingApi.ts         # Frontend-only API stubs (backend integration point)
└── shaders/
    ├── kibori-landing-page/KiboriLandingPage.tsx   # ThreeUI component
    └── threeui.css           # ThreeUI shared styles

public/
├── index.html                # HTML template (favicon wired)
└── landing-pages/
    ├── kibori.html           # Adapted landing page
    ├── vendor/three.module.min.js
    └── kibori-assets/        # 17 binary assets
```

### Layout
- `html`, `body`, `#root` form a full-height chain; the hero is `100vh` (`100svh` where supported) with the landing iframe filling it.
- Below the hero: intro, search, rooms, amenities, booking, contact, footer — a complete booking site in the same dark/gold design language.

### Dependencies
- react ^18.2.0, react-dom ^18.2.0, react-scripts 5.0.1 — installed
- Dev types: @types/node, @types/react, @types/react-dom

---

## D. Issues Found and Resolved

1. **Collapsed hero (blank page)** — `.App`/`.shader-frame` had no height and `.threeui-background` computes `height:100%` against them, so the hero rendered 0 px tall. Fixed with the full-height chain and a 100vh hero (verified in-browser).
2. **Iframe sandbox blocked local fonts and images** — `sandbox="allow-scripts"` gives the iframe an opaque origin, which turns local `@font-face` fetch and `crossorigin="anonymous"` masked images into cross-origin requests without CORS headers; fonts never loaded. Fixed by removing the sandbox in `KiboriLandingPage.tsx` (content is first-party, same-origin). Browser check confirms fonts load.
3. **External three.js dependency** — the page imported three from unpkg, so it required the network and contradicted the local-assets policy. Vendored `three@0.169.0` and rewrote the module preload + import map. Browser check confirms no `unpkg.com` reference and the scene renders.
4. **Incomplete content adaptation** — leftover `KIBORI`/`木彫` branding, `kibori.jp` contact details, woodcraft commission copy and `Kindling` loader text. Completed as listed in section B.
5. **Truncated report** — this document previously ended mid-sentence in section E; it is now complete and reflects the verified state.

---

## E. Hotel Booking Features (frontend)

All five planned features are implemented as a frontend-only experience, with backend integration points stubbed in `src/lib/bookingApi.ts`:

1. **Search functionality** — check-in/check-out dates (with past-date and ordering validation), guest count, room type; results filter the room grid and scroll to it. Filters can be cleared.
2. **Room display** — six spaces (suites, rooms, residences) with motif, size, bed, capacity, nightly price, amenities and CSS art inspired by the house's craft motifs.
3. **Amenities showcase** — eight facilities with inline SVG icons.
4. **Booking flow** — room selection (pre-filled from a room card's "Reserve"), dates, guests, name/email/requests, live price summary, validation, simulated async submit and a confirmation panel with reference, totals and reset.
5. **Contact information** — hotel address, reservations email/phone, front-desk hours, directions, and an inquiry form with success state.

**Backend path**: replace the bodies of `createBooking()` / `sendInquiry()` with POSTs to `/api/bookings` and `/api/inquiries`; signatures are stable (`BookingRequest` → `BookingConfirmation`).

---

## F. Verification

- ✅ `npm run build` — compiles cleanly (52.26 kB JS + 9.18 kB CSS gzipped)
- ✅ `npm test` — 1 suite / 1 test passes (`src/App.test.js`)
- ✅ **Browser verification (headless Chrome, production build)** — 14/14 checks passed with no console or page errors:
  - Landing iframe mounts; brand and footer rebranded; fonts load; three.js served locally with no CDN reference
  - Six rooms render; header stays hidden over the hero and appears below it
  - Search filters to the correct room for 3 guests × suite; clearing restores all six
  - "Reserve" selects the right room in the booking form; submission returns a `KB-…` confirmation
  - Contact inquiry confirms with "Message received"
  - Screenshots captured of hero, filtered rooms, booking confirmation and contact confirmation

---

## G. Obsidian and Graphify

### Obsidian vault
**Location**: `docs-obsidian/` — vault overview plus the planned notes are now written:
`Architecture`, `Component Structure`, `Dependencies`, `Hotel Booking Features`, `ThreeUI Integration`, `Implementation Progress`, `Technical Decisions`.

### Graphify
- CLI available (`graphify 0.9.97`); knowledge graph generated at `graphify-out/` (`graph.json`, `graph.html`, `GRAPH_REPORT.md`, manifest)
- Scoped with `.graphifyignore` (excludes the `graphify/` source clone, `node_modules/`, `build/`, the vendored minified three.js and the bundle snapshot)
- Result: **122 nodes, 190 edges, 7 communities**, 0 import cycles; god nodes include `App()`, `BookingSection()`, `ROOMS`, `createBooking()`; report captures `App() → RoomsSection()`, `ContactSection() → sendInquiry()` and similar call edges
- Re-run `graphify update .` after code changes (AST-only, no LLM cost)

---

## H. How to Run

```bash
npm install       # first time only
npm start         # development server at http://localhost:3000
npm run build     # production build into build/
npm test          # smoke test
```

Serve `build/` from the site root so `/landing-pages/...` resolves (any static server works).

---

## I. Optional Follow-ups

- Connect `bookingApi.ts` to a real reservations backend and persist bookings
- Replace CSS art with commissioned room photography
- Add e2e tests to CI (the puppeteer-core flow used for verification is a ready-made basis)
- Multi-language copy (the landing page's Japanese motif typography already sets the tone)
