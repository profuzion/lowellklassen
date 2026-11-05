import { contact } from "@/content/home";

export function ContactSection() {
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent("A conversation about what comes next")}`;

  return (
    <section className="lk-contact" id="contact" aria-labelledby="contact-title">
      <div className="lk-grid">
        <div className="lk-contact-copy">
          <h2 id="contact-title" className="lk-display">
            What are you ready to become?
          </h2>
          <p className="lk-lede">
            If the name, the logo, or the site still describes an earlier
            version of the company, book a call.
          </p>
          <div className="lk-actions">
            <a className="lk-button" href={contact.booking}>
              Book a call with Lowell
            </a>
          </div>
          <div className="lk-contact-meta">
            <a href={mailto}>{contact.email}</a>
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
