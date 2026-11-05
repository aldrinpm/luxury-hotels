import { useCallback, useRef, useState } from "react";
import { KiboriLandingPage } from "./shaders/kibori-landing-page/KiboriLandingPage";
import "./shaders/threeui.css";
import "./App.css";
import { SiteHeader } from "./components/SiteHeader";
import { SearchBar, type SearchCriteria } from "./components/SearchBar";
import { RoomsSection } from "./components/RoomsSection";
import { Amenities } from "./components/Amenities";
import { BookingSection } from "./components/BookingSection";
import { ContactSection } from "./components/ContactSection";
import { SiteFooter } from "./components/SiteFooter";
import { ROOMS, type Room } from "./data/rooms";

export function App() {
  const [criteria, setCriteria] = useState<SearchCriteria | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState(ROOMS[0].id);
  const roomsRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLElement>(null);

  const handleSearch = useCallback((next: SearchCriteria) => {
    setCriteria(next);
    roomsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleReserve = useCallback((room: Room) => {
    setSelectedRoomId(room.id);
    bookRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const clearSearch = useCallback(() => setCriteria(null), []);

  return (
    <div className="App">
      <SiteHeader />

      <section className="hero" id="top" aria-label="Luxury Hotels landing experience">
        <div className="shader-frame">
          <KiboriLandingPage />
        </div>
      </section>

      <main>
        <section className="section intro" aria-labelledby="intro-title">
          <p className="eyebrow">A woodshop, kept whole</p>
          <h1 id="intro-title">A 200-year-old Kyoto woodshop, now eight rooms and suites.</h1>
          <p className="section__lede">
            The house opens to guests year-round: cedar baths and a private garden, a table set with
            the workshop's own lacquerware, and the atelier still working at the back of the
            courtyard.
          </p>
          <ul className="intro__stats">
            <li>
              <b>08</b> spaces
            </li>
            <li>
              <b>1826</b> established
            </li>
            <li>
              <b>Kyoto</b> Japan
            </li>
          </ul>
        </section>

        <div className="section section--search">
          <SearchBar onSearch={handleSearch} />
        </div>

        <RoomsSection
          sectionRef={roomsRef}
          criteria={criteria}
          onReserve={handleReserve}
          onClear={clearSearch}
        />
        <Amenities />
        <BookingSection sectionRef={bookRef} initialRoomId={selectedRoomId} />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
