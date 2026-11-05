# Technical Decisions

## Keep the landing page as an iframe
**Decision**: The adapted Kibori document stays a self-contained HTML file loaded in an iframe; the booking site is React below it.
**Why**: The document is 27k lines of tightly-coupled WebGL/physics/CSS that assumes it owns the viewport; porting it to React components would risk the visual identity with no user-facing gain. The iframe preserves it exactly and isolates its global styles.
**Consequence**: Communication is by page scroll only; the hero is 100vh with the landing scrolling internally, then chaining to the booking site.

## No sandbox on the iframe
**Decision**: Removed `sandbox="allow-scripts"` from the original component.
**Why**: A sandboxed (opaque-origin) document treats local `@font-face` fetches and `crossorigin="anonymous"` images as cross-origin; without CORS headers they fail, leaving invisible text and missing images. The content is first-party, so same-origin is safe.
**Alternative considered**: `sandbox="allow-scripts allow-same-origin"` — equivalent here but emits console warnings and implies false isolation.

## Vendor three.js locally
**Decision**: three@0.169.0 is stored at `public/landing-pages/vendor/` and referenced via the import map.
**Why**: Removes the only external runtime dependency; the page must work offline and the project policy is local assets. Verified that no `unpkg.com` reference remains.

## Full-height layout chain
**Decision**: `html, body, #root { height: 100% }`, `.App` flows, `.hero { height: 100vh/100svh }`, `.shader-frame { height: 100% }`.
**Why**: `.threeui-background` computes `height: 100%`; without a sized ancestor the hero collapses to 0 px. `svh` avoids mobile browser-chrome jump.

## CSS art instead of photography
**Decision**: Room cards use layered gradients/patterns + kanji watermark; no image generation or stock photos.
**Why**: Keeps the bundle tiny and matches the landing's aesthetic; no asset licensing questions. Swap `art-*` classes for `<img>` when real photography exists.

## API stubs as the backend seam
**Decision**: `createBooking()` / `sendInquiry()` simulate latency and return typed results.
**Why**: The UI, validation and success states are complete and testable today; wiring a backend later touches one file. Components never call `fetch` directly.

## Section refs passed as props
**Decision**: `sectionRef` props instead of `forwardRef`.
**Why**: Simpler and explicit; React 19 type packages require `RefObject<HTMLElement | null>` — documented in [[Dependencies]].

## Graphify graph scoped by `.graphifyignore`
**Decision**: Exclude the `graphify/` source clone, `node_modules/`, `build/`, vendored minified three.js and the bundle snapshot from the knowledge graph.
**Why**: The first build produced 26,546 nodes dominated by the tool's own source; scoping yields a focused 122-node graph of this project. `graphify update .` is AST-only and free to re-run.
