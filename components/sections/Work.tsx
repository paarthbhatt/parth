import { collapsedProjectsData, securityProjectsData } from "@/lib/data"
import { projectId } from "@/lib/slug"
import { NewTab, Section } from "./Section"
import { ProjectIndex, type IndexItem } from "./ProjectIndex"

function isRepo(url: string) {
  return url.startsWith("https://github.com/")
}

/** Up to two links per project: the live thing, and its source. */
function projectLinks(url: string, sourceUrl?: string) {
  const links: { label: string; href: string }[] = []
  if (!isRepo(url)) links.push({ label: "Live site", href: url })
  const source = sourceUrl && isRepo(sourceUrl) ? sourceUrl : isRepo(url) ? url : undefined
  if (source) links.push({ label: "Source", href: source })
  return links
}

export function Work() {
  const featured = securityProjectsData.filter((p) => p.highlights?.length)
  const featuredTitles = new Set(featured.map((p) => p.title))

  const index: IndexItem[] = [
    ...securityProjectsData
      .filter((p) => !featuredTitles.has(p.title))
      .map((p) => ({
        id: projectId(p.title),
        title: p.title,
        kind: p.tag,
        group: "security" as const,
        description: p.description,
        links: projectLinks(p.url, p.sourceUrl),
      })),
    ...collapsedProjectsData.map((p) => ({
      id: projectId(p.title),
      title: p.title,
      kind: p.tag,
      group: "web" as const,
      links: projectLinks(p.url),
    })),
  ]

  return (
    <Section id="work" title="Work">
      <div className="featured">
        {featured.map((p) => (
          <article key={p.title} id={projectId(p.title)} className="feature" aria-labelledby={`${projectId(p.title)}-title`}>
            <div className="feature-grid">
              <div className="feature-head">
                <h3 id={`${projectId(p.title)}-title`} className="feature-title display">
                  {p.title}
                </h3>
                <p className="meta">
                  {p.tag}
                  {p.stack ? (
                    <>
                      <br />
                      {p.stack.split(" | ").join(", ")}
                    </>
                  ) : null}
                </p>
              </div>
              <div className="feature-body">
                <ul className="feature-points">
                  {p.highlights!.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <ul className="links" aria-label={`${p.title} links`}>
                  {projectLinks(p.url, p.sourceUrl).map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label}
                        <span className="visually-hidden"> for {p.title}</span>
                        <NewTab />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <ProjectIndex items={index} />
    </Section>
  )
}
