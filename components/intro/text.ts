/**
 * Rasterises the name to an offscreen 2D canvas and returns world-space
 * sample points on the filled glyph pixels. The particles use these as
 * their "resolved" targets.
 */

export interface NameRaster {
  /** xyz triplets, world units, centred on the origin. */
  points: Float32Array
  width: number
  height: number
}

const RASTER_PX = 220

/** Resolves the CSS font-family to rasterise with, waiting briefly for Bricolage. */
export async function resolveNameFont(family: string, timeoutMs = 900): Promise<string> {
  const fallback = 'system-ui, "Helvetica Neue", Arial, sans-serif'
  if (typeof document === "undefined" || !document.fonts) return fallback
  const spec = `760 ${RASTER_PX}px ${family}`
  try {
    const loaded = await Promise.race([
      document.fonts.load(spec, "Parth Bhatt"),
      new Promise<FontFace[]>((r) => setTimeout(() => r([]), timeoutMs)),
    ])
    if (loaded.length > 0 || document.fonts.check(spec, "Parth Bhatt")) return family
  } catch {
    // fall through to the system face
  }
  return fallback
}

/**
 * @param lines   one or two lines of text
 * @param worldWidth width of the widest line in world units
 */
export function rasterName(
  lines: string[],
  fontFamily: string,
  count: number,
  worldWidth: number,
  rand: () => number,
): NameRaster {
  const px = RASTER_PX
  const lineH = px * 0.96
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) throw new Error("2d canvas unavailable")

  const font = `760 ${px}px ${fontFamily}`
  ctx.font = font
  const widths = lines.map((l) => ctx.measureText(l).width)
  const pad = Math.ceil(px * 0.2)
  const w = Math.ceil(Math.max(...widths)) + pad * 2
  const h = Math.ceil(lineH * lines.length + pad * 2)
  canvas.width = w
  canvas.height = h

  ctx.font = font
  ctx.fillStyle = "#fff"
  ctx.textBaseline = "alphabetic"
  // Left-aligned, like the rest of the page. Multi-line names share a left edge.
  const maxW = Math.max(...widths)
  lines.forEach((l, i) => {
    ctx.fillText(l, pad, pad + lineH * (i + 0.78))
  })

  const data = ctx.getImageData(0, 0, w, h).data
  const filled: number[] = []
  let minX = w, maxX = 0, minY = h, maxY = 0
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 140) {
        filled.push(y * w + x)
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  if (filled.length === 0) throw new Error("name raster is empty")

  const scale = worldWidth / maxW
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  const points = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const idx = filled[(rand() * filled.length) | 0]
    const x = (idx % w) + rand()
    const y = ((idx / w) | 0) + rand()
    points[i * 3] = (x - cx) * scale
    points[i * 3 + 1] = -(y - cy) * scale
    points[i * 3 + 2] = (rand() - 0.5) * 0.12
  }
  return { points, width: (maxX - minX) * scale, height: (maxY - minY) * scale }
}
