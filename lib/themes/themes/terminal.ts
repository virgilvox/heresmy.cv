import { ThemeConfig } from "../types";

export const terminal: ThemeConfig = {
  id: "terminal",
  name: "Terminal",
  description: "Green phosphor on black. CRT scanlines and a blinking cursor that never sleeps.",
  preview: {
    bg: "#0d1117",
    fg: "#00ff41",
    accent: "#00ff41",
  },
  variables: {
    "--cv-bg": "#0d1117",
    "--cv-surface": "#161b22",
    "--cv-card": "#0d1117",
    "--cv-border": "#21262d",
    "--cv-text": "#00ff41",
    "--cv-text-muted": "#00cc33",
    "--cv-text-dim": "#008822",
    "--cv-accent": "#00ff41",
    "--cv-accent-glow": "rgba(0, 255, 65, 0.2)",
  },
  fonts: {
    heading: "'VT323', 'Courier New', monospace",
    body: "'VT323', 'Courier New', monospace",
    mono: "'VT323', 'Courier New', monospace",
  },
  googleFontImports: [
    "https://fonts.googleapis.com/css2?family=VT323&display=swap",
  ],
  decorations: "scanlines",
  customCSS: `
    /* CRT text glow */
    [data-theme="terminal"] {
      text-shadow: 0 0 8px rgba(0, 255, 65, 0.4);
    }

    [data-theme="terminal"] h1,
    [data-theme="terminal"] h2,
    [data-theme="terminal"] h3 {
      text-shadow: 0 0 12px rgba(0, 255, 65, 0.6), 0 0 24px rgba(0, 255, 65, 0.2);
    }

    /* Accent elements get stronger glow */
    [data-theme="terminal"] a,
    [data-theme="terminal"] [data-accent] {
      text-shadow: 0 0 10px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 65, 0.3);
    }

    /* Prompt prefix for headings */
    [data-theme="terminal"] h2::before {
      content: "> ";
      opacity: 0.5;
    }

    /* Slight flicker animation */
    @keyframes terminal-flicker {
      0%, 100% { opacity: 1; }
      92% { opacity: 1; }
      93% { opacity: 0.8; }
      94% { opacity: 1; }
    }
    [data-theme="terminal"] {
      animation: terminal-flicker 4s infinite;
    }
  `,
};
