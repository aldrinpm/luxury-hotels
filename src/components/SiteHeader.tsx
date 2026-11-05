import { useEffect, useState } from "react";

const LINKS = [
  { href: "#rooms", label: "Rooms" },
  { href: "#amenities", label: "Amenities" },
  { href: "#book", label: "Book" },
  { href: "#contact", label: "Contact" },
];

/**
 * Fixed header for the booking site below the landing hero. It stays hidden
 * while the hero is on screen (the landing carries its own navigation) and
 * slides in once the visitor reaches the rooms and booking sections.
 */
export function SiteHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.62);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const tab = visible ? 0 : -1;

  return (
    <header className={`site-header${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <a className="site-header__brand" href="#top" tabIndex={tab}>
        LUXURY HOTELS <i>Premium Stays</i>
      </a>
      <nav className="site-header__nav" aria-label="Primary">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} tabIndex={tab}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="button button--small" href="#book" tabIndex={tab}>
        Reserve
      </a>
    </header>
  );
}

export default SiteHeader;
