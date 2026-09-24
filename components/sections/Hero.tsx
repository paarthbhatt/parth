import { contactInfo, educationData, experienceData } from "@/lib/data"

/**
 * First thing after the intro: who, what, and the two actions a recruiter
 * wants. The facts line is built from data so it never drifts from the
 * sections below.
 */
export function Hero() {
  const drdo = experienceData.find((e) => e.org.startsWith("DRDO"))
  const city = contactInfo.location.split(",")[0]

  return (
    <header className="hero" aria-labelledby="hero-name">
      <h1 id="hero-name" className="hero-name display">
        {contactInfo.name}
      </h1>
      <p className="hero-lede">
        I pen-test web applications and AI systems, and build the tools that defend them.
      </p>
      <div className="hero-actions">
        <a className="btn btn-primary" href={contactInfo.resume} download>
          Download résumé
        </a>
        <a className="btn btn-secondary" href={`mailto:${contactInfo.email}`}>
          Email
        </a>
      </div>
      <p className="hero-facts">
        {drdo ? (
          <>
            <span>{drdo.role}, DRDO (SAG), {drdo.when}</span>
            {" · "}
          </>
        ) : null}
        <span>
          B.Tech CSE, {educationData.school}, {educationData.when}
        </span>
        {" · "}
        <span>{city}</span>
      </p>
    </header>
  )
}
