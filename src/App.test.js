import { renderToString } from "react-dom/server";
import App from "./App";

test("renders the landing experience plus the rooms and booking flow", () => {
  const html = renderToString(<App />);
  expect(html).toContain("Interactive luxury hotel landing page");
  expect(html).toContain("LUXURY HOTELS");
  expect(html).toContain("The Lattice Suite");
  expect(html).toContain("Book your stay");
  expect(html).toContain("Amenities");
  expect(html).toContain("Contact");
});
