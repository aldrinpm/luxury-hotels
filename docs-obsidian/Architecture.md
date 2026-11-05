# Architecture

## Runtime shape

```
index.tsx
└── App
    ├── SiteHeader                 (fixed; slides in once past the hero)
    ├── hero (100vh)
    │   └── .shader-frame
    │       └── KiboriLandingPage  (src/shaders/kibori-landing-page)
    │           └── <iframe src="/landing-pages/kibori.html">
    ├── main
    │   ├── intro                  (brand statement + stats)
    │   ├── SearchBar              (filters rooms)
    │   ├── RoomsSection           (room grid ← criteria)
    │   ├── Amenities
    │   ├── BookingSection         (selected room ← reserve; confirmation)
    │   └── ContactSection
    └── SiteFooter
```

**Key idea**: the landing page is a self-contained document (`public/landing-pages/kibori.html`) rendered in an iframe as the hero; the booking site is ordinary React below it. The two communicate only through page scroll — no `postMessage` needed.

## State flow

- `App` owns two pieces of state:
  - `criteria: SearchCriteria | null` — set by `SearchBar`, consumed by `RoomsSection`
  - `selectedRoomId: string` — set by a room card's *Reserve*, consumed by `BookingSection`
- Section scrolling uses refs passed via props (`sectionRef`) with `scrollIntoView({ behavior: "smooth" })`.
- Booking and inquiry submissions go through `src/lib/bookingApi.ts` stubs (`createBooking`, `sendInquiry`) — the single backend integration point.

## Landing page internals

- One HTML file containing CSS, a WebGL scene (three.js), a physics block (cannon-es, embedded), a canvas-based loader ("Kindling" worker) and all interactions.
- Local assets: 17 hash-verified fonts/images + vendored `three.module.min.js`; no external CDN at runtime.
- Scroll drives a camera through 8 "chapters" (spaces of the house); `data-go` links glide between chapters; an inspect mode lifts props out of the scene.

## Styling

- `src/index.css` — reset, full-height chain (`html`/`body`/`#root`), dark base
- `src/shaders/threeui.css` — original ThreeUI shared component styles (unmodified)
- `src/App.css` — booking-site design system (tokens in `:root`, header/hero/sections/cards/forms/footer, responsive at 980px/640px)

## Build & deployment

- `react-scripts build` → `build/`; `public/` (including `landing-pages/`) is copied verbatim.
- Uses relative asset paths (`homepage: "."` in package.json, relative URLs inside the landing HTML and iframe), so it works at the site root or any subpath — including GitHub Pages project sites.
- No environment variables or external services required.

## Verification architecture

- `src/App.test.js` — server-render smoke test (renderToString) asserting landing, rooms and booking markup
- Headless Chrome + puppeteer-core flow (used during implementation, not committed) exercised search → reserve → confirm → contact end-to-end; 14 checks, no console errors

See [[Component Structure]], [[Dependencies]], [[Technical Decisions]].
