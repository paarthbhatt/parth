import {
  achievementsData,
  certificationsHighlight,
  certificationsOther,
  tryHackMeStanding,
} from "@/lib/data"
import { NewTab, Section } from "./Section"

// Strip a leading emoji from data titles; the page carries no emoji.
const LEADING_EMOJI = new RegExp("^\\p{Extended_Pictographic}\\uFE0F?\\s*", "u")
const cleanTitle = (t: string) => t.replace(LEADING_EMOJI, "").trim()

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

const WIN_LINK_LABELS: Record<string, string> = {
  hackathon: "Event page",
  github: "Source",
  live: "Live site",
}

type Cert = {
  title: string
  issuer: string
  date?: string
  subtitle?: string
  description?: string
  verify?: string
}

/** "Feb 2025" or "2025" -> 2025, for sorting and the year column. */
const yearOf = (date?: string) => (date ? Number(date.match(/\d{4}/)?.[0] ?? 0) : 0)

export function Record() {
  const wins = achievementsData.filter((a) => !("badge" in a && a.badge))

  const certs: Cert[] = [
    ...achievementsData
      .filter((a) => "badge" in a && a.badge)
      .map((a) => ({
        title: cleanTitle(a.title),
        issuer: a.issuer,
        date: a.date,
        subtitle: a.subtitle,
        description: a.description,
        verify: "verify" in a ? a.verify : undefined,
      })),
    ...certificationsHighlight.map((c) => ({
      title: c.title,
      issuer: c.issuer,
      date: c.date,
      description: c.description,
    })),
    ...certificationsOther.map((c) => ({ title: c.title, issuer: c.issuer })),
  ]
  // Newest first; stable, so the data's own order breaks ties.
  const sortedCerts = certs.map((c, i) => ({ c, i })).sort((a, b) => yearOf(b.c.date) - yearOf(a.c.date) || a.i - b.i).map(({ c }) => c)
  const verifiable = sortedCerts.filter((c) => c.verify).length

  return (
    <Section id="record" title="Record">
      <div className="record-block">
        <h3 className="subhead display" id="wins-title">
          Wins <span className="count">{wins.length}</span>
        </h3>
        <ul className="ledger" aria-labelledby="wins-title">
          {wins.map((w) => {
            const links = "links" in w && w.links ? Object.entries(w.links) : []
            return (
              <li key={w.title} className="ledger-row">
                <span className="ledger-year">{yearOf(w.date) || ""}</span>
                <div className="ledger-main">
                  <span className="ledger-title">{cleanTitle(w.title)}</span>
                  <span className="ledger-sub">
                    {w.subtitle}. {w.issuer}
                  </span>
                </div>
                {links.length ? (
                  <ul className="links ledger-aside" aria-label={`${cleanTitle(w.title)} links`}>
                    {links.map(([kind, href]) => (
                      <li key={kind}>
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          {WIN_LINK_LABELS[kind] ?? kind}
                          <NewTab />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="record-block">
        <h3 className="subhead display" id="thm-title">
          TryHackMe
        </h3>
        <ul className="ledger" aria-labelledby="thm-title">
          <li className="ledger-row">
            <span className="ledger-year" />
            <div className="ledger-main">
              <span className="ledger-title">{tryHackMeStanding.rank}</span>
              <span className="ledger-sub">{tryHackMeStanding.paths}</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="record-block">
        <h3 className="subhead display" id="certs-title">
          Certifications <span className="count">{sortedCerts.length}</span>
        </h3>
        <p className="meta record-note">
          {verifiable} of {sortedCerts.length} can be verified with the issuer. Select a title to see what it covered.
        </p>
        <ul className="ledger" aria-labelledby="certs-title">
          {sortedCerts.map((c) => {
            const id = `cert-${slug(c.title)}`
            return (
              <li key={c.title} className="ledger-row">
                <span className="ledger-year">{c.date ? yearOf(c.date) : ""}</span>
                <div className="ledger-main">
                  {c.description ? (
                    <>
                      <button
                        type="button"
                        className="cert-trigger"
                        popoverTarget={id}
                        style={{ anchorName: `--${id}` }}
                      >
                        {c.title}
                      </button>
                      <div id={id} popover="auto" className="cert-pop" style={{ positionAnchor: `--${id}` }}>
                        {c.subtitle ? <p><strong>{c.subtitle}</strong></p> : null}
                        <p>{c.description}</p>
                        <p className="meta">
                          Issued by {c.issuer}
                          {c.date ? `, ${c.date}` : ""}
                        </p>
                      </div>
                    </>
                  ) : (
                    <span className="ledger-title">{c.title}</span>
                  )}
                  <span className="ledger-sub">{c.issuer}</span>
                </div>
                {c.verify ? (
                  <a className="ledger-aside" href={c.verify} target="_blank" rel="noopener noreferrer">
                    Verify<span className="visually-hidden"> {c.title} with {c.issuer}</span>
                    <NewTab />
                  </a>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
