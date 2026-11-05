export type RoomType = "suite" | "room" | "residence";

export type Room = {
  id: string;
  name: string;
  motif: string;
  type: RoomType;
  typeLabel: string;
  tagline: string;
  description: string;
  size: number;
  maxGuests: number;
  bed: string;
  price: number;
  art: string;
  amenities: string[];
};

export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  suite: "Suite",
  room: "Room",
  residence: "Residence",
};

export const ROOMS: Room[] = [
  {
    id: "lattice-suite",
    name: "The Lattice Suite",
    motif: "組子",
    type: "suite",
    typeLabel: "Suite · Second floor",
    tagline: "Hinoki light, locked without a nail",
    description:
      "Slatted hinoki screens filter the morning into ribbons of gold across a king bed dressed in stone-washed linen.",
    size: 48,
    maxGuests: 2,
    bed: "King 180 cm",
    price: 420,
    art: "art-lattice",
    amenities: ["Private cedar bath", "Garden view", "Minibar"],
  },
  {
    id: "wave-room",
    name: "The Wave Room",
    motif: "青海波",
    type: "room",
    typeLabel: "Room · Second floor",
    tagline: "Cedar carved into breaking water",
    description:
      "Carved cedar waves run the length of the headboard wall, so the room seems to breathe with the tide from the koi pond.",
    size: 36,
    maxGuests: 2,
    bed: "Queen 160 cm",
    price: 320,
    art: "art-wave",
    amenities: ["Pond view", "Deep soaking tub", "Tea set"],
  },
  {
    id: "garden-pavilion",
    name: "The Garden Pavilion",
    motif: "木組",
    type: "suite",
    typeLabel: "Pavilion · Garden level",
    tagline: "Pegged and wedged, opening to the garden",
    description:
      "A frame raised the old way — no glue, no steel — opening onto a private moss garden and its own cedar veranda.",
    size: 60,
    maxGuests: 3,
    bed: "King + daybed",
    price: 560,
    art: "art-joinery",
    amenities: ["Private garden", "Cedar veranda", "Outdoor bath"],
  },
  {
    id: "ember-suite",
    name: "The Ember Suite",
    motif: "焼杉",
    type: "suite",
    typeLabel: "Suite · Spa wing",
    tagline: "Charred cedar and a private sauna",
    description:
      "Scorched cedar walls hold the heat of a private sauna. The room breathes slow until the fire is lit beneath the stones.",
    size: 52,
    maxGuests: 2,
    bed: "King 180 cm",
    price: 480,
    art: "art-ember",
    amenities: ["Private sauna", "Cold plunge", "Spa access"],
  },
  {
    id: "atelier-penthouse",
    name: "The Atelier Penthouse",
    motif: "鑿",
    type: "residence",
    typeLabel: "Residence · Top floor",
    tagline: "The atelier's tools, kept sharp",
    description:
      "The corner residence above the workshop: a writing desk of solid oak, the atelier's tools in the cabinet, and the city lights beyond.",
    size: 88,
    maxGuests: 4,
    bed: "King + sofa bed",
    price: 960,
    art: "art-atelier",
    amenities: ["Workshop access", "City view", "Butler service"],
  },
  {
    id: "lacquer-residence",
    name: "The Lacquer Residence",
    motif: "漆",
    type: "residence",
    typeLabel: "Residence · Guest house",
    tagline: "Forty coats, and gold in the last",
    description:
      "A residence finished in urushi and maki-e, where the dining table is set with the house's lacquerware each evening.",
    size: 74,
    maxGuests: 2,
    bed: "King 180 cm",
    price: 840,
    art: "art-lacquer",
    amenities: ["Private dining", "Lacquerware service", "Residents' lounge"],
  },
];
