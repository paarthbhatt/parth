import { contactInfo, socialLinks } from "@/lib/data"
import { NewTab, Section } from "./Section"

const PROFILES = [
  { label: "LinkedIn", href: socialLinks.linkedin, handle: "Parth Bhatt" },
  { label: "GitHub", href: socialLinks.github, handle: "paarthbhatt" },
  { label: "X", href: socialLinks.twitter, handle: "@thatsparthbhatt" },
  { label: "Medium", href: socialLinks.medium, handle: "@paarthbhatt37" },
  { label: "TryHackMe", href: socialLinks.tryhackme, handle: "paarthbhatt37" },
]

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="contact-lede">
        Open to internships and part-time remote roles in cybersecurity and AI.
      </p>
      <a className="contact-email display" href={`mailto:${contactInfo.email}`}>
        {contactInfo.email}
      </a>
      <ul className="contact-list">
        <li>
          <span className="meta">Phone</span>
          <a href={`tel:${contactInfo.phone}`}>{contactInfo.phoneDisplay}</a>
        </li>
        <li>
          <span className="meta">Résumé</span>
          <a href={contactInfo.resume} download>
            Download PDF
          </a>
        </li>
        {PROFILES.map((p) => (
          <li key={p.label}>
            <span className="meta">{p.label}</span>
            <a href={p.href} target="_blank" rel="noopener noreferrer">
              {p.handle}
              <span className="visually-hidden"> on {p.label}</span>
              <NewTab />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
