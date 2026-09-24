"use client"

import { useCallback, useEffect, useState, useSyncExternalStore, type MouseEvent } from "react"
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react"
import { NewTab } from "./Section"

export type IndexItem = {
  id: string
  title: string
  kind: string
  group: "security" | "web"
  description?: string
  links: { label: string; href: string }[]
}

type Filter = "all" | IndexItem["group"]

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "security", label: "Security tools" },
  { value: "web", label: "Web and data" },
]

const noop = () => () => {}

/** True only after hydration, so JS-only controls never render without JS. */
function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
}

function canViewTransition() {
  return (
    typeof document !== "undefined" &&
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

const clearNames = (els: HTMLElement[]) => {
  for (const el of els) el.style.removeProperty("view-transition-name")
}

/**
 * Expand/collapse one row inside a View Transition. The row is a native
 * <details>, so without JS (or without the API) the browser toggles it and
 * CSS animates ::details-content instead.
 */
function toggleWithTransition(event: MouseEvent<HTMLElement>) {
  if (!document.documentElement.classList.contains("vt")) return
  const details = event.currentTarget.parentElement
  const row = details?.parentElement
  if (!(details instanceof HTMLDetailsElement) || !row) return
  event.preventDefault()

  const html = document.documentElement
  const opening = !details.open
  const title = details.querySelector<HTMLElement>(".index-title")
  const siblings = Array.from(row.parentElement?.children ?? []) as HTMLElement[]
  const below = siblings.slice(siblings.indexOf(row) + 1)
  const nextSection = row.closest("section")?.nextElementSibling as HTMLElement | null

  const named: HTMLElement[] = [row]
  row.style.setProperty("view-transition-name", "index-active-row")
  if (title) {
    title.style.setProperty("view-transition-name", "index-active-title")
    named.push(title)
  }
  below.forEach((el, i) => {
    el.style.setProperty("view-transition-name", `index-row-${i}`)
    named.push(el)
  })
  if (nextSection) {
    nextSection.style.setProperty("view-transition-name", "index-after")
    named.push(nextSection)
  }
  html.classList.add("vt-disclosure", opening ? "vt-open" : "vt-close")

  const transition = document.startViewTransition(() => {
    details.open = opening
  })
  transition.finished.finally(() => {
    clearNames(named)
    html.classList.remove("vt-disclosure", "vt-open", "vt-close")
  })
}

export function ProjectIndex({ items }: { items: IndexItem[] }) {
  const hydrated = useHydrated()
  const [filter, setFilter] = useState<Filter>("all")
  const visible = filter === "all" ? items : items.filter((i) => i.group === filter)

  // Opt the page into the View Transition path for disclosures.
  useEffect(() => {
    if (!canViewTransition()) return
    const html = document.documentElement
    html.classList.add("vt")
    return () => html.classList.remove("vt")
  }, [])

  // Deep links (the intro graph links to #project-…) open the target row.
  const openFromHash = useCallback(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id || !items.some((i) => i.id === id)) return
    setFilter("all")
    requestAnimationFrame(() => {
      const details = document.getElementById(id)?.querySelector("details")
      if (details) details.open = true
    })
  }, [items])

  useEffect(() => {
    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    return () => window.removeEventListener("hashchange", openFromHash)
  }, [openFromHash])

  const count = (f: Filter) => (f === "all" ? items.length : items.filter((i) => i.group === f).length)

  return (
    <div className="project-index">
      <div className="index-head">
        <h3 className="subhead display" id="index-title">
          More projects <span className="count">{visible.length}</span>
        </h3>
        {hydrated ? (
          <div className="filter" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                className="filter-btn"
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
              >
                {f.label} <span className="count">{count(f.value)}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <MotionConfig reducedMotion="user" transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}>
        <LayoutGroup>
          <ul className="index" aria-labelledby="index-title">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((item) => (
                <motion.li
                  key={item.id}
                  id={item.id}
                  className="index-row"
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {item.description ? (
                    <details className="index-details">
                      <summary className="index-summary" onClick={toggleWithTransition}>
                        <span className="index-toggle" aria-hidden="true" />
                        <span className="index-title">{item.title}</span>
                        <span className="index-kind">{item.kind}</span>
                      </summary>
                      <div className="index-panel">
                        <p>{item.description}</p>
                        {item.links.length > 1 ? (
                          <ul className="links" aria-label={`${item.title} links`}>
                            {item.links.map((l) => (
                              <li key={l.href}>
                                <a href={l.href} target="_blank" rel="noopener noreferrer">
                                  {l.label}
                                  <span className="visually-hidden"> for {item.title}</span>
                                  <NewTab />
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </details>
                  ) : (
                    <div className="index-summary index-summary--static">
                      <span className="index-toggle index-toggle--none" aria-hidden="true" />
                      <span className="index-title">{item.title}</span>
                      <span className="index-kind">{item.kind}</span>
                    </div>
                  )}
                  {item.links[0] ? (
                    <a className="index-link" href={item.links[0].href} target="_blank" rel="noopener noreferrer">
                      {item.links[0].label}
                      <span className="visually-hidden"> for {item.title}</span>
                      <NewTab />
                    </a>
                  ) : null}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </LayoutGroup>
      </MotionConfig>
    </div>
  )
}
