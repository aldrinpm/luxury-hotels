# Component Structure

## `src/App.tsx`
Page composition and shared state.
- Owns `criteria` (search) and `selectedRoomId` (reserve) state
- `handleSearch` → set criteria + scroll to rooms
- `handleReserve` → set selected room + scroll to booking
- Renders hero, intro, search, rooms, amenities, booking, contact, footer

## `src/components/`

| Component | Props | Responsibility |
|-----------|-------|----------------|
| `SiteHeader` | — | Fixed header; hidden while the hero fills the screen, slides in below it; brand + section links + Reserve |
| `SearchBar` | `onSearch(criteria)` | Dates, guests, room type; validates and emits `SearchCriteria` |
| `RoomsSection` | `sectionRef`, `criteria`, `onReserve`, `onClear` | Filters `ROOMS` by type/guests; result summary; empty state; grid |
| `RoomCard` | `room`, `onReserve` | Art header (motif + CSS pattern), facts, amenities, price, Reserve |
| `Amenities` | — | Eight facilities with inline SVG icons |
| `BookingSection` | `sectionRef`, `initialRoomId` | Reservation form, live totals, async submit, confirmation panel, reset |
| `ContactSection` | — | Hotel details + inquiry form with success state |
| `SiteFooter` | — | Brand, links, fine print |

## `src/shaders/kibori-landing-page/KiboriLandingPage.tsx`
Extracted ThreeUI component (hash-verified). Behaviour:
- `IntersectionObserver` → pauses (unmounts iframe) when scrolled away
- `visibilitychange` → pauses when the tab is hidden
- 240 ms opacity fade on load
- Renders the iframe **without** a sandbox attribute: the content is first-party and local fonts / `crossorigin` masked images require same-origin access (fix documented in [[Technical Decisions]])

## `src/data/rooms.ts`
- `Room` type: id, name, motif (kanji), type (`suite`/`room`/`residence`), typeLabel, tagline, description, size, maxGuests, bed, price, art class, amenities
- `ROOMS`: The Lattice Suite, The Wave Room, The Garden Pavilion, The Ember Suite, The Atelier Penthouse, The Lacquer Residence

## `src/lib/`
- `dates.ts` — `todayISO(offset)`, `nightsBetween(checkIn, checkOut)`
- `bookingApi.ts` — `BookingRequest`/`BookingConfirmation`/`InquiryRequest` types; `createBooking()` and `sendInquiry()` stubs (the backend seam)
