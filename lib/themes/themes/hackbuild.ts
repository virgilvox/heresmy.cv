import { ThemeConfig } from "../types";

export const hackbuild: ThemeConfig = {
  id: "hackbuild",
  name: "Hackbuild",
  description: "Scrapbook aesthetic with tape, markers, and paper textures. A resume that looks handmade.",
  preview: {
    bg: "#2a2520",
    fg: "#f5f0e6",
    accent: "#ff3366",
  },
  variables: {
    "--cv-bg": "#2a2520",
    "--cv-surface": "#f5f0e6",
    "--cv-card": "#f5f0e6",
    "--cv-border": "#1a1a1a",
    "--cv-text": "#f5f0e6",
    "--cv-text-muted": "#c5c0b6",
    "--cv-text-dim": "#8a8575",
    "--cv-accent": "#ff3366",
    "--cv-accent-glow": "rgba(255, 51, 102, 0.2)",
  },
  fonts: {
    heading: "'Permanent Marker', cursive",
    body: "'Special Elite', 'Courier New', monospace",
    mono: "'Courier Prime', 'Courier New', monospace",
  },
  googleFontImports: [
    "https://fonts.googleapis.com/css2?family=Special+Elite&display=swap",
    "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap",
    "https://fonts.googleapis.com/css2?family=VT323&display=swap",
    "https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap",
  ],
  decorations: null,
  customCSS: `
    /* Paper texture with SVG noise overlay */
    [data-theme="hackbuild"] {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
    }

    /* Kill all border-radius for scrapbook feel */
    [data-theme="hackbuild"],
    [data-theme="hackbuild"] * {
      border-radius: 0 !important;
    }

    /* Name heading: underlined, slightly rotated */
    [data-theme="hackbuild"] h1 {
      border-bottom: 4px solid var(--cv-text);
      display: inline-block;
      padding-bottom: 6px;
      transform: rotate(-1deg);
    }

    /* ── FIX 1 & 5: SECTION HEADINGS ─────────────────────── */

    /* Section header h2 → HUGE centered Permanent Marker */
    [data-theme="hackbuild"] [data-section-header] h2 {
      font-family: 'Permanent Marker', cursive !important;
      font-size: 3rem !important;
      background: none !important;
      color: var(--cv-text) !important;
      padding: 0 !important;
      text-transform: none !important;
      letter-spacing: normal !important;
    }

    /* Accent underline bar under section headings */
    [data-theme="hackbuild"] [data-section-header] h2::after {
      content: '';
      display: block;
      width: 80px;
      height: 4px;
      background: var(--cv-accent);
      margin: 8px auto 0;
    }

    /* Hide the icon in section headers */
    [data-theme="hackbuild"] [data-section-header] svg {
      display: none;
    }

    /* Center standalone section headers */
    [data-theme="hackbuild"] [data-section-header] {
      justify-content: center;
    }

    /* Standalone heading blocks: centered */
    [data-theme="hackbuild"] [data-block="heading"]:not(:has(+ [data-block-type])) {
      text-align: center;
    }

    /* ── Combined heading: badge + big heading side by side ── */

    /* Heading block before content → VT323 badge */
    [data-theme="hackbuild"] [data-block="heading"]:has(+ [data-block-type]) :is(h2, h3) {
      font-family: 'VT323', monospace !important;
      font-size: 14px !important;
      background: var(--cv-accent);
      color: #2a2520 !important;
      padding: 3px 10px;
      display: inline-block;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transform: none;
      border-bottom: none;
    }

    /* Hide accent bar in combined headings */
    [data-theme="hackbuild"] [data-block="heading"]:has(+ [data-block-type]) :is(h2, h3) + div {
      display: none;
    }

    /* Center the heading row when heading + content are in same band */
    [data-theme="hackbuild"] section > div:has(> [data-block="heading"]) {
      text-align: center;
    }

    /* Heading badge: inline-block so it flows with section header */
    [data-theme="hackbuild"] [data-block="heading"]:has(+ [data-block-type]) {
      display: inline-block;
      margin-right: 12px;
      margin-bottom: 24px;
      vertical-align: middle;
    }

    /* Content wrapper after heading: expose children for inline flow */
    [data-theme="hackbuild"] [data-block="heading"] + [data-block-type] {
      display: contents;
    }

    /* Section header in combined mode: inline next to badge */
    [data-theme="hackbuild"] [data-block="heading"] + [data-block-type] > [data-section-header] {
      display: inline-flex;
      vertical-align: middle;
      margin-bottom: 24px;
    }

    /* Content below combined heading: full width, left-aligned */
    [data-theme="hackbuild"] [data-block="heading"] + [data-block-type] > :not([data-section-header]) {
      display: block;
      text-align: left;
      width: 100%;
    }

    /* ── FIX 2: ALTERNATING DARK / PAPER SECTIONS ─────────── */

    [data-theme="hackbuild"] .section-alt {
      background-color: #f5f0e6 !important;
      color: #1a1a1a !important;
      --cv-text: #1a1a1a;
      --cv-text-muted: #4a4a4a;
      --cv-text-dim: #7a7a7a;
      --color-cv-text: #1a1a1a;
      --color-cv-text-muted: #4a4a4a;
      --color-cv-text-dim: #7a7a7a;
      --cv-border: #d4cfc5;
      --color-cv-border: #d4cfc5;
    }

    /* Intro/hero section: paper background with dark text */
    [data-theme="hackbuild"] [data-band="hero"] {
      background-color: #f5f0e6 !important;
      color: #1a1a1a !important;
      --cv-text: #1a1a1a;
      --cv-text-muted: #4a4a4a;
      --cv-text-dim: #7a7a7a;
      --color-cv-text: #1a1a1a;
      --color-cv-text-muted: #4a4a4a;
      --color-cv-text-dim: #7a7a7a;
    }

    /* h1 underline should be dark on paper bg */
    [data-theme="hackbuild"] [data-band="hero"] h1 {
      border-bottom-color: #1a1a1a;
    }

    /* ── Cards: paper bg with ink borders, dark text ──────── */
    [data-theme="hackbuild"] .bg-cv-surface {
      border: 3px solid #1a1a1a !important;
      background: #f5f0e6 !important;
      box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.25);
      transition: transform 0.2s, box-shadow 0.2s;
      --color-cv-text: #1a1a1a;
      --color-cv-text-muted: #4a4a4a;
      --color-cv-text-dim: #7a7a7a;
      --cv-text: #1a1a1a;
      --cv-text-muted: #4a4a4a;
      --cv-text-dim: #7a7a7a;
    }

    /* ── FIX 3: EXPERIENCE — left accent border, no card ──── */

    [data-theme="hackbuild"] section [data-block-type="experience"] .bg-cv-surface {
      border-top: none !important;
      border-right: none !important;
      border-bottom: none !important;
      border-left: 3px solid var(--cv-accent) !important;
      box-shadow: none !important;
      padding-left: 20px !important;
    }

    /* Experience on dark bg: dark card with light text */
    [data-theme="hackbuild"] section:not(.section-alt) [data-block-type="experience"] .bg-cv-surface {
      background: rgba(0, 0, 0, 0.2) !important;
      --color-cv-text: #f5f0e6;
      --color-cv-text-muted: #c5c0b6;
      --color-cv-text-dim: #8a8575;
      --cv-text: #f5f0e6;
      --cv-text-muted: #c5c0b6;
      --cv-text-dim: #8a8575;
    }

    /* Experience on paper bg: paper card with dark text */
    [data-theme="hackbuild"] .section-alt [data-block-type="experience"] .bg-cv-surface {
      background: rgba(0, 0, 0, 0.04) !important;
    }

    /* ── FIX 4: AWARDS — pink/accent borders ──────────────── */

    [data-theme="hackbuild"] [data-block-type="awards"] .bg-cv-surface {
      border-color: var(--cv-accent) !important;
    }

    /* ── Existing styles (cleaned up) ─────────────────────── */

    /* Project cards in grid: alternate rotations */
    [data-theme="hackbuild"] .grid > div:nth-child(odd) {
      transform: rotate(-0.5deg);
    }
    [data-theme="hackbuild"] .grid > div:nth-child(even) {
      transform: rotate(0.5deg);
    }

    /* Project card hover: lift + accent shadow */
    [data-theme="hackbuild"] .grid > div:hover {
      transform: translateY(-6px) rotate(-1deg) !important;
      box-shadow: 8px 8px 0 var(--cv-accent) !important;
    }

    /* Link items: centered + hover lift */
    [data-theme="hackbuild"] [data-block-type="links"] .flex-wrap {
      justify-content: center;
    }
    [data-theme="hackbuild"] a.inline-flex:hover {
      transform: translateY(-2px);
      box-shadow: 4px 4px 0 #1a1a1a;
    }

    /* Skill pills: ghost style */
    [data-theme="hackbuild"] .flex-wrap > span {
      border: 2px solid var(--cv-text) !important;
      background: rgba(245, 240, 230, 0.08) !important;
      color: var(--cv-text) !important;
      font-family: 'VT323', monospace !important;
      font-size: 15px !important;
      padding: 4px 10px !important;
    }
    [data-theme="hackbuild"] .flex-wrap > span:nth-child(odd) {
      transform: rotate(-1.2deg);
    }
    [data-theme="hackbuild"] .flex-wrap > span:nth-child(even) {
      transform: rotate(0.8deg);
    }
    [data-theme="hackbuild"] .flex-wrap > span:nth-child(3n) {
      transform: rotate(1.5deg);
    }

    /* Education timeline: thick ink line */
    [data-theme="hackbuild"] .border-l-2 {
      border-left-width: 3px !important;
      border-left-color: var(--cv-text) !important;
    }

    /* Current/accent badges: label style */
    [data-theme="hackbuild"] .bg-cv-accent-glow {
      background: var(--cv-accent) !important;
      color: #2a2520 !important;
      font-family: 'VT323', monospace !important;
    }
    [data-theme="hackbuild"] .bg-cv-accent-glow * {
      color: #2a2520 !important;
    }

    /* Avatar: square with ink border */
    [data-theme="hackbuild"] .bg-gradient-to-br {
      border: 3px solid #1a1a1a;
      box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.25);
    }

    /* Body text: generous line-height for typewriter feel */
    [data-theme="hackbuild"] p {
      line-height: 1.8;
    }

    /* Footer: subtle border on dark bg */
    [data-theme="hackbuild"] footer {
      border-top: 3px solid rgba(245, 240, 230, 0.15) !important;
    }

    /* Publication items: left accent border */
    [data-theme="hackbuild"] .divide-cv-border > div {
      border-left: 3px solid var(--cv-accent);
      padding-left: 12px;
    }

    /* Stats containers on dark bg: ghost borders */
    [data-theme="hackbuild"] .border-cv-border {
      border-color: rgba(245, 240, 230, 0.2) !important;
    }
    /* Cards keep their dark ink borders */
    [data-theme="hackbuild"] .bg-cv-surface.border-cv-border,
    [data-theme="hackbuild"] .bg-cv-surface .border-cv-border {
      border-color: #1a1a1a !important;
    }
  `,
};
