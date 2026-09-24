import { writeupsData } from "@/lib/data"
import { NewTab, Section } from "./Section"

export function Writing() {
  return (
    <Section id="writing" title="Writing">
      <ul className="posts">
        {writeupsData.map((w) => (
          <li key={w.url} className="post">
            <h3 className="post-title display">
              <a href={w.url} target="_blank" rel="noopener noreferrer">
                {w.title}
                <NewTab />
              </a>
            </h3>
            <p className="meta">
              {w.tag}, on {w.platform}
            </p>
            <p>{w.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
