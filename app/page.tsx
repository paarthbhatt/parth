import { Intro } from "@/components/intro/Intro"
import { Hero } from "@/components/sections/Hero"
import { SectionRail } from "@/components/sections/SectionRail"
import { Work } from "@/components/sections/Work"
import { Experience } from "@/components/sections/Experience"
import { Writing } from "@/components/sections/Writing"
import { Capabilities } from "@/components/sections/Capabilities"
import { Record } from "@/components/sections/Record"
import { Contact } from "@/components/sections/Contact"
import { contactInfo } from "@/lib/data"

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Intro />
      <main id="main-content" tabIndex={-1} className="page">
        <Hero />
        <div className="body-grid">
          <SectionRail />
          <div className="sections">
            <Work />
            <Experience />
            <Writing />
            <Capabilities />
            <Record />
            <Contact />
          </div>
        </div>
      </main>
      <footer className="page">
        <div className="site-footer">
          <p>© {new Date().getFullYear()} {contactInfo.name}</p>
          <p>
            <a href="#main-content">Back to top</a>
          </p>
        </div>
      </footer>
    </>
  )
}
