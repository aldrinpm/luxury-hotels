import { useState, type FormEvent } from "react";
import { ROOM_TYPE_LABELS, type RoomType } from "../data/rooms";
import { todayISO } from "../lib/dates";

export type SearchCriteria = {
  checkIn: string;
  checkOut: string;
  guests: number;
  type: RoomType | "any";
};

type Props = {
  onSearch: (criteria: SearchCriteria) => void;
};

export function SearchBar({ onSearch }: Props) {
  const [checkIn, setCheckIn] = useState(() => todayISO(1));
  const [checkOut, setCheckOut] = useState(() => todayISO(3));
  const [guests, setGuests] = useState(2);
  const [type, setType] = useState<RoomType | "any">("any");
  const [error, setError] = useState("");

  const minDate = todayISO();

  const changeCheckIn = (value: string) => {
    setCheckIn(value);
    if (checkOut <= value) setCheckOut(todayISO(2));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (checkIn < minDate) {
      setError("Check-in cannot be in the past.");
      return;
    }
    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }
    setError("");
    onSearch({ checkIn, checkOut, guests, type });
  };

  return (
    <form className="search-bar" onSubmit={submit} aria-label="Find a room">
      <div className="field">
        <label htmlFor="search-checkin">Check-in</label>
        <input
          id="search-checkin"
          type="date"
          value={checkIn}
          min={minDate}
          onChange={(event) => changeCheckIn(event.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="search-checkout">Check-out</label>
        <input
          id="search-checkout"
          type="date"
          value={checkOut}
          min={checkIn}
          onChange={(event) => setCheckOut(event.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="search-guests">Guests</label>
        <select id="search-guests" value={guests} onChange={(event) => setGuests(Number(event.target.value))}>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="search-type">Room type</label>
        <select id="search-type" value={type} onChange={(event) => setType(event.target.value as RoomType | "any")}>
          <option value="any">Any space</option>
          {(Object.keys(ROOM_TYPE_LABELS) as RoomType[]).map((key) => (
            <option key={key} value={key}>
              {ROOM_TYPE_LABELS[key]}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="button">
        Check availability
      </button>
      {error ? (
        <p className="search-bar__error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}

export default SearchBar;
