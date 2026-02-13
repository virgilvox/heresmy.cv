import { ThemeConfig } from "../types";

export const hackbuild: ThemeConfig = {
  id: "hackbuild",
  name: "Hackbuild",
  description: "Scrapbook aesthetic with tape, markers, and paper textures. A resume that looks handmade.",
  preview: {
    bg: "#f5f0e6",
    fg: "#1a1a1a",
    accent: "#ff3366",
  },
  variables: {
    "--cv-bg": "#f5f0e6",
    "--cv-surface": "#f5f0e6",
    "--cv-card": "#f5f0e6",
    "--cv-border": "#1a1a1a",
    "--cv-text": "#1a1a1a",
    "--cv-text-muted": "#4a4a4a",
    "--cv-text-dim": "#7a7a7a",
    "--cv-accent": "#ff3366",
    "--cv-accent-glow": "rgba(255, 51, 102, 0.15)",
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
  decorations: "tape",
  customCSS: `
    /* Paper texture with SVG noise overlay */
    [data-theme="hackbuild"] {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
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

    /* Section labels: VT323 terminal-style on accent background */
    [data-theme="hackbuild"] h2 {
      font-family: 'VT323', monospace !important;
      font-size: 14px !important;
      background: var(--cv-accent);
      color: var(--cv-bg) !important;
      padding: 3px 10px;
      display: inline-block;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Project & link cards: 3px ink borders, directional shadow */
    [data-theme="hackbuild"] .bg-cv-surface {
      border: 3px solid var(--cv-text) !important;
      background: rgba(255, 255, 255, 0.4) !important;
      box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

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

    /* Link items hover: lift */
    [data-theme="hackbuild"] a.inline-flex:hover {
      transform: translateY(-2px);
      box-shadow: 4px 4px 0 var(--cv-text);
    }

    /* Skill pills: ink borders, VT323 font, alternating rotations */
    [data-theme="hackbuild"] .flex-wrap > span {
      border: 2px solid var(--cv-text) !important;
      background: rgba(255, 255, 255, 0.4) !important;
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

    /* Experience timeline: thick ink line */
    [data-theme="hackbuild"] .border-l-2 {
      border-left-width: 3px !important;
      border-left-color: var(--cv-text) !important;
    }

    /* Current/accent badges: label style */
    [data-theme="hackbuild"] .bg-cv-accent-glow {
      background: var(--cv-accent) !important;
      color: var(--cv-bg) !important;
      font-family: 'VT323', monospace !important;
    }

    /* Avatar: square with ink border */
    [data-theme="hackbuild"] .bg-gradient-to-br {
      border: 3px solid var(--cv-text);
      box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
    }

    /* Body text: generous line-height for typewriter feel */
    [data-theme="hackbuild"] p {
      line-height: 1.8;
    }

    /* Footer: ink top border */
    [data-theme="hackbuild"] footer {
      border-top: 3px solid var(--cv-text) !important;
    }

    /* Publication items: left accent border */
    [data-theme="hackbuild"] .divide-cv-border > div {
      border-left: 3px solid var(--cv-accent);
      padding-left: 12px;
    }
  `,
};
