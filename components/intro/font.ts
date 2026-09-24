import localFont from "next/font/local"

/**
 * Bricolage Grotesque, self-hosted from @fontsource-variable. The "wdth" file
 * carries both the width (75–100) and weight (200–800) axes. The intro uses
 * it for the particle name raster, the poster name and the project labels.
 */
export const bricolage = localFont({
  src: "../../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
  variable: "--font-intro-display",
  fallback: ["system-ui", "Helvetica Neue", "Arial", "sans-serif"],
})
