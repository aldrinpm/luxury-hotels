import { useEffect, useMemo, useState, type FormEvent, type RefObject } from "react";
import { ROOMS } from "../data/rooms";
import { createBooking, type BookingConfirmation } from "../lib/bookingApi";
import { nightsBetween, todayISO } from "../lib/dates";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
  initialRoomId: string;
};

export function BookingSection({ sectionRef, initialRoomId }: Props) {
  const [roomId, setRoomId] = useState(initialRoomId);
  const [checkIn, setCheckIn] = useState(() => todayISO(7));
  const [checkOut, setCheckOut] = useState(() => todayISO(9));
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requests, setRequests] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  useEffect(() => setRoomId(initialRoomId), [initialRoomId]);

  const room = useMemo(() => ROOMS.find((r) => r.id === roomId) ?? ROOMS[0], [roomId]);
  const nights = nightsBetween(checkIn, checkOut);

  useEffect(() => {
    if (guests > room.maxGuests) setGuests(room.maxGuests);
  }, [room, guests]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Please tell us your name.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError("A valid email lets us confirm the reservation.");
      return;
    }
    if (nights < 1) {
      setError("Check-out must be after check-in.");
      return;
    }
    if (guests > room.maxGuests) {
      setError(`${room.name} sleeps up to ${room.maxGuests} guests.`);
      return;
    }
    setError("");
    setSaving(true);
    const result = await createBooking({
      roomId: room.id,
      checkIn,
      checkOut,
      guests,
      name: name.trim(),
      email: email.trim(),
      requests: requests.trim() || undefined,
    });
    setSaving(false);
    setConfirmation(result);
  };

  const reset = () => {
    setConfirmation(null);
    setName("");
    setEmail("");
    setRequests("");
    setError("");
  };

  if (confirmation) {
    return (
      <section className="section" id="book" ref={sectionRef} aria-labelledby="book-title">
        <div className="confirmation" role="status">
          <p className="eyebrow">Reserved</p>
          <h2 id="book-title">We will see you soon, {confirmation.name.split(" ")[0]}.</h2>
          <p className="confirmation__reference">{confirmation.reference}</p>
          <dl className="confirmation__details">
            <div>
              <dt>Space</dt>
              <dd>{confirmation.roomName}</dd>
            </div>
            <div>
              <dt>Dates</dt>
              <dd>
                {confirmation.checkIn} → {confirmation.checkOut} · {confirmation.nights}{" "}
                {confirmation.nights === 1 ? "night" : "nights"}
              </dd>
            </div>
            <div>
              <dt>Guests</dt>
              <dd>{confirmation.guests}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>${confirmation.total}</dd>
            </div>
          </dl>
          <p className="confirmation__note">
            This is a frontend demo — wire <code>createBooking()</code> to the reservations API to
            make it real.
          </p>
          <button type="button" className="button button--ghost" onClick={reset}>
            Make another booking
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="book" ref={sectionRef} aria-labelledby="book-title">
      <header className="section__head">
        <p className="eyebrow">Reservations</p>
        <h2 id="book-title">Book your stay</h2>
        <p className="section__lede">
          Choose a space and we will confirm your reservation within minutes.
        </p>
      </header>

      <div className="booking">
        <form className="booking-form" onSubmit={submit} aria-label="Reservation form">
          <div className="field">
            <label htmlFor="book-room">Space</label>
            <select id="book-room" value={roomId} onChange={(event) => setRoomId(event.target.value)}>
              {ROOMS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — ${r.price} / night
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="book-guests">Guests</label>
            <select
              id="book-guests"
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value))}
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n} disabled={n > room.maxGuests}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="book-checkin">Check-in</label>
            <input
              id="book-checkin"
              type="date"
              value={checkIn}
              min={todayISO()}
              onChange={(event) => setCheckIn(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="book-checkout">Check-out</label>
            <input
              id="book-checkout"
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(event) => setCheckOut(event.target.value)}
              required
            />
          </div>
          <div className="field field--wide">
            <label htmlFor="book-name">Name</label>
            <input
              id="book-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="field field--wide">
            <label htmlFor="book-email">Email</label>
            <input
              id="book-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="field field--wide">
            <label htmlFor="book-requests">Special requests?</label>
            <textarea
              id="book-requests"
              rows={3}
              value={requests}
              onChange={(event) => setRequests(event.target.value)}
              placeholder="A celebration, a late arrival, a quiet room…"
            />
          </div>
          {error ? (
            <p className="booking-form__error" role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" className="button" disabled={saving}>
            {saving ? "Reserving…" : "Request reservation"}
          </button>
        </form>

        <aside className="booking-summary" aria-label="Reservation summary">
          <div className={`booking-summary__art ${room.art}`} aria-hidden="true">
            <span>{room.motif}</span>
          </div>
          <h3>{room.name}</h3>
          <p>{room.tagline}</p>
          <dl>
            <div>
              <dt>Nightly</dt>
              <dd>${room.price}</dd>
            </div>
            <div>
              <dt>
                {nights || 1} {nights === 1 ? "night" : "nights"}
              </dt>
              <dd>${(nights || 1) * room.price}</dd>
            </div>
            <div className="booking-summary__total">
              <dt>Total</dt>
              <dd>${(nights || 1) * room.price}</dd>
            </div>
          </dl>
          <p className="booking-summary__note">No card required for the request. Taxes at check-out.</p>
        </aside>
      </div>
    </section>
  );
}

export default BookingSection;
