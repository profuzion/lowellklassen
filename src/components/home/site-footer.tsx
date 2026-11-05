import { contact } from "@/content/home";

export function SiteFooter() {
  return (
    <footer className="lk-footer">
      <p className="lk-signature">
        <img src="/brand/lowell-profile.webp" alt="Lowell D. Klassen" />
      </p>
      <div className="lk-footer-meta">
        <a href={contact.studioHref} target="_blank" rel="noreferrer">
          {contact.studio}
        </a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
        <a href="/selected-work">Case Studies</a>
        <a href="/name-it-right">Name It Right</a>
        <a href="/brand-clarity-audit">Brand Clarity Audit</a>
        <a href={contact.facebook} target="_blank" rel="noreferrer">
          Facebook
        </a>
      </div>
    </footer>
  );
}
