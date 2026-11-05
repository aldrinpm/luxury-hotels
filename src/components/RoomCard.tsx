import type { Room } from "../data/rooms";

type Props = {
  room: Room;
  onReserve: (room: Room) => void;
};

export function RoomCard({ room, onReserve }: Props) {
  return (
    <article className={`room-card ${room.art}`}>
      <div className="room-card__art" aria-hidden="true">
        <span className="room-card__motif">{room.motif}</span>
      </div>
      <div className="room-card__body">
        <p className="room-card__type">{room.typeLabel}</p>
        <h3>{room.name}</h3>
        <p className="room-card__tagline">{room.tagline}</p>
        <p className="room-card__description">{room.description}</p>
        <ul className="room-card__amenities">
          {room.amenities.map((amenity) => (
            <li key={amenity}>{amenity}</li>
          ))}
        </ul>
        <div className="room-card__facts">
          <span>{room.size} m²</span>
          <span>{room.bed}</span>
          <span>Up to {room.maxGuests} guests</span>
        </div>
        <div className="room-card__foot">
          <p className="room-card__price">
            ${room.price}
            <small> / night</small>
          </p>
          <button type="button" className="button" onClick={() => onReserve(room)}>
            Reserve
          </button>
        </div>
      </div>
    </article>
  );
}

export default RoomCard;
