import type { CSSProperties } from "react"
import { experienceData } from "@/lib/data"
import { Section } from "./Section"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** "Jun 2026" -> months since year 0, or null if the text doesn't parse. */
function monthIndex(text: string): number | null {
  const [mon, year] = text.trim().split(/\s+/)
  const m = MONTHS.indexOf(mon)
  const y = Number(year)
  return m < 0 || !Number.isFinite(y) ? null : y * 12 + m
}

/** Parse "Jun 2026 – Jul 2026" into an inclusive month range. */
function parseRange(when: string) {
  const [a, b] = when.split(/\s+[–-]\s+/)
  const start = monthIndex(a ?? "")
  const end = monthIndex(b ?? a ?? "")
  return start === null || end === null ? null : { start, end }
}

type Vars = CSSProperties & Record<`--${string}`, string | number>

/**
 * A dated sequence, so a date column and a real time axis both earn their
 * place: each bar's position and length are computed from the role's dates,
 * which also shows where roles overlapped.
 */
export function Experience() {
  const jobs = experienceData.map((job) => ({ ...job, range: parseRange(job.when) }))
  const ranges = jobs.flatMap((j) => (j.range ? [j.range] : []))
  const axisStart = Math.min(...ranges.map((r) => r.start))
  const axisEnd = Math.max(...ranges.map((r) => r.end)) + 1
  const span = axisEnd - axisStart

  const years: number[] = []
  for (let y = Math.ceil(axisStart / 12); y * 12 < axisEnd; y++) years.push(y)

  return (
    <Section id="experience" title="Experience">
      <div className="timeline-wrap">
        <div className="timeline-axis" aria-hidden="true">
          {years.map((y) => (
            <span key={y} style={{ "--at": (y * 12 - axisStart) / span } as Vars}>
              {y}
            </span>
          ))}
        </div>
        <ol className="timeline">
          {jobs.map((job) => (
            <li key={`${job.role}-${job.org}`} className="job">
              <p className="job-when">{job.when}</p>
              {job.range ? (
                <div className="job-track" aria-hidden="true">
                  <span
                    className="job-bar"
                    style={
                      {
                        "--start": (job.range.start - axisStart) / span,
                        "--len": (job.range.end - job.range.start + 1) / span,
                      } as Vars
                    }
                  />
                </div>
              ) : null}
              <div className="job-text">
                <h3 className="job-role">{job.role}</h3>
                <p className="job-org">{job.org}</p>
                <p className="job-desc">{job.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
