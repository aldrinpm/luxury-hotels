import type { ReactElement } from "react";

type Amenity = {
  title: string;
  text: string;
  icon: ReactElement;
};

const icon = (paths: string[]) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths.map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
);

const AMENITIES: Amenity[] = [
  {
    title: "Onsen & Spa",
    text: "Cedar baths fed by the house spring, open from first light to midnight.",
    icon: icon(["M12 3s6 6.4 6 10.8a6 6 0 1 1-12 0C6 9.4 12 3 12 3z"]),
  },
  {
    title: "The Table",
    text: "A seasonal kaiseki menu served on the house's own lacquerware.",
    icon: icon(["M4 12h16a8 8 0 0 1-16 0z", "M9 7c0-1.4 2-1.4 2-2.8", "M14 8c0-1.4 2-1.4 2-2.8"]),
  },
  {
    title: "Infinity Pool",
    text: "A quiet water line against the garden, warmed through winter.",
    icon: icon(["M3 12c2-1.8 4-1.8 6 0s4 1.8 6 0 4-1.8 6 0", "M3 17c2-1.8 4-1.8 6 0s4 1.8 6 0 4-1.8 6 0"]),
  },
  {
    title: "Airport Transfer",
    text: "A private car meets every arrival and sees every departure.",
    icon: icon(["M5 16l1.6-5.2A2 2 0 0 1 8.5 9.4h7a2 2 0 0 1 1.9 1.4L19 16", "M4 16h16v3.4H4z", "M7.5 19.4V21", "M16.5 19.4V21"]),
  },
  {
    title: "24h Concierge",
    text: "Tickets, tables, trails — the front desk never closes.",
    icon: icon(["M12 5V3", "M5 18h14", "M6 18a6 6 0 0 1 12 0"]),
  },
  {
    title: "Fibre & Wi-Fi",
    text: "Quietly fast everywhere, from the library to the garden pavilion.",
    icon: icon(["M2 8.5a15 15 0 0 1 20 0", "M5.5 12a10 10 0 0 1 13 0", "M9 15.5a5 5 0 0 1 6 0", "M12 19h.01"]),
  },
  {
    title: "Fitness Room",
    text: "Bespoke iron and oak, with a trainer on request.",
    icon: icon(["M6 9v6", "M18 9v6", "M3 10.5v3", "M21 10.5v3", "M6 12h12"]),
  },
  {
    title: "Valet Parking",
    text: "Leave the car with us; Nishijin is best explored on foot.",
    icon: icon(["M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z", "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"]),
  },
];

export function Amenities() {
  return (
    <section className="section" id="amenities" aria-labelledby="amenities-title">
      <header className="section__head">
        <p className="eyebrow">The house</p>
        <h2 id="amenities-title">Amenities</h2>
        <p className="section__lede">
          Everything the woodshop kept, everything a modern stay needs — under one roof.
        </p>
      </header>
      <div className="amenities-grid">
        {AMENITIES.map((amenity) => (
          <article className="amenity" key={amenity.title}>
            <span className="amenity__icon">{amenity.icon}</span>
            <h3>{amenity.title}</h3>
            <p>{amenity.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Amenities;
