/**
 * Shared scroll-state for the 3D flight.
 * Written by the scroll driver in ScrollWorld.tsx, read by the camera rig
 * inside the R3F render loop — no re-renders, no prop plumbing.
 */
export const WORLD_PROGRESS = { p: 0 }

/**
 * Map scroll progress p ∈ [0,1] to camU ("anchor index space").
 *
 * Layout contract (matches the sticky-panel CSS):
 *   • scroll amount for scene i = (i + 0.5) · H / n  → camU = i + 0.5
 *     (i.e. camU = p·n - 0.5), where H = world height − 100vh.
 *   • While camU − i ∈ [-0.1875, 0.375] the camera HOLDS on anchor i;
 *     outside that it FLIES toward anchor i+1.
 */
export function camUFromP(p: number, n: number): number {
  return p * n - 0.5
}
