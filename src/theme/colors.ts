/**
 * Lingua Design System — Color Tokens
 * Source: 01-design-system.png
 *
 * CSS utility class reference:
 *   bg-primary        text-primary        → #6C4EF5
 *   bg-primary-deep   text-primary-deep   → #5B3BF6
 *   bg-blue           text-blue           → #4D8BFF
 *   bg-green          text-green          → #21C16B
 *   bg-success        text-success        → #21C16B
 *   bg-warning        text-warning        → #FFC800
 *   bg-streak         text-streak         → #FF8A00
 *   bg-error          text-error          → #FF4D4F
 *   bg-info           text-info           → #4D8BFF
 *   text-fg                               → #0D132B
 *   text-muted                            → #6B7280
 *   bg-surface                            → #F6F7FB
 *   bg-background                         → #FFFFFF
 *   border-border                         → #E5E7EB
 */

export const colors = {
  // ─── Primary ────────────────────────────────────────────────────────────
  primary: "#6C4EF5",
  primaryDeep: "#5B3BF6",
  blue: "#4D8BFF",
  green: "#21C16B",

  // ─── Semantic ───────────────────────────────────────────────────────────
  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  // ─── Neutrals ───────────────────────────────────────────────────────────
  fg: "#0D132B",
  muted: "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
} as const;

export type ColorKey = keyof typeof colors;
