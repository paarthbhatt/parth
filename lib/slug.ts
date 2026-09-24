/** Stable DOM id for a project, shared by the intro graph and the work section. */
export function projectId(title: string): string {
  return "project-" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}
