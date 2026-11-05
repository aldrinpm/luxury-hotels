# Hotel Booking Features

All features are **frontend-only** for now; backend integration points are stubbed in `src/lib/bookingApi.ts`.

## 1. Search functionality — ✅ implemented
- Inputs: check-in, check-out (date pickers, min date = today), guests (1–4), room type (Any/Suite/Room/Residence)
- Validation: no past check-in; check-out after check-in; inline error message
- Behaviour: filters the room grid (`type` match **and** `maxGuests >= guests`) and smooth-scrolls to it; result summary shows count/dates plus *Clear filters*; empty state offers *Show all rooms*
- Dates are carried only as context in this demo; the booking flow captures its own dates

## 2. Room display — ✅ implemented
- Six spaces in `src/data/rooms.ts`; each card shows motif art, type, tagline, description, amenity chips, size/bed/capacity, nightly price and *Reserve*
- Art is pure CSS (layered gradients + patterns + kanji watermark) keyed by room (`art-lattice`, `art-wave`, `art-joinery`, `art-ember`, `art-atelier`, `art-lacquer`)

## 3. Amenities showcase — ✅ implemented
- Eight items with inline SVG icons: Onsen & Spa, The Table (dining), Infinity Pool, Airport Transfer, 24h Concierge, Fibre & Wi-Fi, Fitness Room, Valet Parking

## 4. Booking flow — ✅ implemented
- Selecting *Reserve* on a card pre-fills the booking form's space and scrolls to it
- Form: space, guests (options above capacity are disabled), dates, name, email, special requests
- Live summary card: room, nightly rate, nights, total
- Validation (name, email format, date order, capacity) → simulated async save → confirmation panel with reference code (`KB-XXXXXX`), stay summary and total; *Make another booking* resets the form

## 5. Contact information — ✅ implemented
- Address, reservations email & phone, front-desk hours, check-in/out times, travel times
- Inquiry form (name, email, message) with validation and a "Message received" success state

## Backend integration path
1. Stand up `POST /api/bookings` accepting `BookingRequest` and returning `BookingConfirmation`
2. Implement `POST /api/inquiries` accepting `InquiryRequest`
3. Replace the stub bodies in `createBooking()` / `sendInquiry()` — component code stays untouched
4. Optional next steps: availability calendar, payment, confirmation email, multi-language, real photography
