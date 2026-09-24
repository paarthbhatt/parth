import localFont from "next/font/local"

/**
 * Bricolage Grotesque, display only. This latin file carries both the wght
 * (200–800) and wdth (75–100) axes; the page and the intro animate both. The
 * opsz axis lives in a heavier file and is not needed at display sizes.
 */
export const bricolage = localFont({
  src: "../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
})
