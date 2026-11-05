import type { RefObject } from "react";
import { ROOMS, type Room } from "../data/rooms";
import type { SearchCriteria } from "./SearchBar";
import { RoomCard } from "./RoomCard";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
  criteria: SearchCriteria | null;
  onReserve: (room: Room) => void;
  onClear: () => void;
};

export function RoomsSection({ sectionRef, criteria, onReserve, onClear }: Props) {
  const rooms = criteria
    ? ROOMS.filter(
        (room) =>
          (criteria.type === "any" || room.type === criteria.type) &&
          room.maxGuests >= criteria.guests
      )
    : ROOMS;

  return (
    <section className="section" id="rooms" ref={sectionRef} aria-labelledby="rooms-title">
      <header className="section__head">
        <p className="eyebrow">Stay with us</p>
        <h2 id="rooms-title">Rooms &amp; Suites</h2>
        <p className="section__lede">
          Eight spaces restored from the old woodshop — every beam, screen and chest kept, every
          comfort added.
        </p>
      </header>

      {criteria ? (
        <div className="search-summary" role="status">
          <span>
            {rooms.length} {rooms.length === 1 ? "space" : "spaces"} for {criteria.guests}{" "}
            {criteria.guests === 1 ? "guest" : "guests"} · {criteria.checkIn} → {criteria.checkOut}
          </span>
          <button type="button" className="link-button" onClick={onClear}>
            Clear filters
          </button>
        </div>
      ) : null}

      {rooms.length ? (
        <div className="room-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onReserve={onReserve} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No space matches those dates and guests.</p>
          <button type="button" className="button button--ghost" onClick={onClear}>
            Show all rooms
          </button>
        </div>
      )}
    </section>
  );
}

export default RoomsSection;
