# ThreeUI Integration

## Source
- Original: https://threeui.com/landing-pages/kibori (revision SHA-256 1069c18c353d)
- Snapshot: `kibori-bundle.json` (component TSX + shared CSS + asset manifest + canonical HTML reference)
- Extracted files:
  - `src/shaders/kibori-landing-page/KiboriLandingPage.tsx` (hash ✅ 0983b92f…)
  - `src/shaders/threeui.css` (hash ✅ efe44471…)
- Canonical HTML hash mismatched the manifest but content was verified valid; the adapted copy lives at `public/landing-pages/kibori.html`

## Component behaviour
- Renders a host div (`.threeui-background`) and mounts the landing document in an iframe
- `IntersectionObserver` unmounts the iframe when far off-screen; `visibilitychange` pauses when the tab is hidden
- 240 ms opacity hand-over on load; `data-state` attribute exposes paused/loading/ready
- Iframe is intentionally **not sandboxed** — same-origin access is required for local fonts and `crossorigin` images (see [[Technical Decisions]])

## Assets
- 17 binary assets verified and rewritten to `/landing-pages/kibori-assets/<sha256>.<ext>`
- three.js r169 vendored to `/landing-pages/vendor/three.module.min.js`; module preload + import map updated — no unpkg/CDN references remain
- Favicon reused from the art tile; React `public/index.html` links it

## Content adaptation (final)
- Brand: `LUXURY HOTELS · Premium Stays` everywhere (lockup, header, footer, seal `旅館`)
- Chapters reframed as house spaces (lobby, bar, frame, spa, library, table, suites, workshop) while keeping the craft motifs as the property's identity
- Inspect notes reference the space each object lives in
- Footer: reservations flow (Book your stay, front desk, check-in/out), hotel contact details
- Loader: "Arriving" / "Still arriving"
- Head title/description for the hotel brand

## Preserved
Visual identity, shaders, physics, animations, interactions, responsive behaviour, typography — the scene is untouched; only text and asset URLs changed.

## Updating
If the source is re-fetched, re-apply: local asset paths, local three.js import map, brand/copy replacements, and the unsandboxed iframe in the React component.
