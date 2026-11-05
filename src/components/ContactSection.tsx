import { useState, type FormEvent } from "react";
import { sendInquiry } from "../lib/bookingApi";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("A name and a message are all we need.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError("A valid email lets us write back.");
      return;
    }
    setError("");
    setSaving(true);
    await sendInquiry({ name: name.trim(), email: email.trim(), message: message.trim() });
    setSaving(false);
    setSent(true);
  };

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <header className="section__head">
        <p className="eyebrow">Find us</p>
        <h2 id="contact-title">Contact</h2>
        <p className="section__lede">
          Nishijin, Kyoto — a short walk from the weaving district. Reach the front desk any hour.
        </p>
      </header>

      <div className="contact-grid">
        <div className="contact-card">
          <dl>
            <div>
              <dt>Address</dt>
              <dd>
                14-2 Nishijin Tondaya-cho
                <br />
                Kamigyo-ku, Kyoto 602-8265, Japan
              </dd>
            </div>
            <div>
              <dt>Reservations</dt>
              <dd>
                <a href="mailto:reservations@luxuryhotels.example">reservations@luxuryhotels.example</a>
                <br />
                <a href="tel:+81755550100">+81 75 555 0100</a>
              </dd>
            </div>
            <div>
              <dt>Front desk</dt>
              <dd>Open 24 hours · Check-in 15:00 · Check-out 11:00</dd>
            </div>
            <div>
              <dt>Getting here</dt>
              <dd>55 minutes from Kansai (KIX) by private car; 12 minutes from Imadegawa station.</dd>
            </div>
          </dl>
        </div>

        {sent ? (
          <div className="contact-card contact-card--sent" role="status">
            <h3>Message received</h3>
            <p>
              Thank you, {name.trim().split(" ")[0]}. The front desk will write back to{" "}
              <strong>{email.trim()}</strong> shortly.
            </p>
            <button type="button" className="button button--ghost" onClick={() => { setSent(false); setMessage(""); }}>
              Write another message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={submit} aria-label="Contact the front desk">
            <div className="field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="How can we help?"
                required
              />
            </div>
            {error ? (
              <p className="booking-form__error" role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit" className="button" disabled={saving}>
              {saving ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default ContactSection;
