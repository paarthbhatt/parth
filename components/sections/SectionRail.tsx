"use client"

import { useEffect, useState } from "react"
import { SECTIONS, type SectionId } from "./nav"

/**
 * Margin rail: the section headings as in-page nav. The current section is
 * tracked with an IntersectionObserver (a thin band across the upper third
 * of the viewport) and exposed as aria-current, which the CSS styles. The
 * rail's fill line is a pure CSS scroll-driven animation. Without JS the rail
 * is still a working list of links.
 */
export function SectionRail() {
  const [current, setCurrent] = useState<SectionId | null>(null)

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el)
    if (!els.length || !("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id as SectionId)
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="rail">
      <nav className="rail-nav" aria-label="Sections">
        <span className="rail-progress" aria-hidden="true" />
        <ol>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                className="rail-link display"
                href={`#${s.id}`}
                aria-current={current === s.id ? "location" : undefined}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
