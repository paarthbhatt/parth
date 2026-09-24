import { capabilitiesData } from "@/lib/data"
import { Section } from "./Section"

export function Capabilities() {
  return (
    <Section id="capabilities" title="Capabilities">
      <div className="caps">
        <div className="caps-grid">
          {capabilitiesData.map((c) => (
            <div key={c.group} className="cap">
              <h3>{c.group}</h3>
              <ul>
                {c.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
