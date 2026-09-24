/** Sections below the hero, in page order. The margin rail is built from this. */
export const SECTIONS = [
  { id: "work", title: "Work" },
  { id: "experience", title: "Experience" },
  { id: "writing", title: "Writing" },
  { id: "capabilities", title: "Capabilities" },
  { id: "record", title: "Record" },
  { id: "contact", title: "Contact" },
] as const

export type SectionId = (typeof SECTIONS)[number]["id"]

export function sectionTitle(id: SectionId): string {
  return SECTIONS.find((s) => s.id === id)!.title
}
