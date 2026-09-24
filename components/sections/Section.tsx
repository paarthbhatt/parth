import type { ReactNode } from "react"

/** A top-level section: a rule, the display heading, then its content. */
export function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section">
      <h2 id={`${id}-title`} className="section-title display">
        {title}
      </h2>
      {children}
    </section>
  )
}

/** Visually hidden suffix for links that open a new tab. */
export function NewTab() {
  return <span className="visually-hidden"> (opens in a new tab)</span>
}
