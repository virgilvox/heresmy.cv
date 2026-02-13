import { useState, useRef, useEffect } from "react";

// ============================================================
// heresmy.cv — Resume builder platform mockup
// Landing → Editor → Live Profile Preview
// ============================================================

const COLORS = {
  bg: "#0a0a0f",
  surface: "#12121a",
  surfaceHover: "#1a1a25",
  card: "#16161f",
  border: "#2a2a3a",
  borderLight: "#3a3a4a",
  text: "#e8e6f0",
  textMuted: "#8888a0",
  textDim: "#5a5a70",
  accent: "#c8ff00",
  accentDim: "#8aad00",
  accentGlow: "rgba(200, 255, 0, 0.15)",
  warm: "#ff6b4a",
  blue: "#4a9eff",
  purple: "#a855f7",
  paper: "#faf8f4",
  paperDark: "#e8e4dc",
  ink: "#1a1a1a",
};

const sampleProfile = {
  name: "Moheeb Zara",
  slug: "moheeb",
  tagline: "Developer Relations · Hardware Hacker · New Media Artist",
  location: "Phoenix, AZ",
  bio: "10+ years building at the intersection of developer advocacy, IoT hardware, and open-source communities. I prototype first and document everything. If a tool doesn't exist, I build it.",
  links: [
    { icon: "globe", label: "hack.build", url: "https://hack.build" },
    { icon: "github", label: "virgilvox", url: "https://github.com/virgilvox" },
    { icon: "linkedin", label: "moheeb-zara", url: "#" },
    { icon: "mail", label: "moheeb@hack.build", url: "#" },
  ],
  experience: [
    { role: "Founder", org: "LumenCanvas", period: "2023 — Present", desc: "Browser-based projection mapping platform. Open-source alternative to MadMapper and Resolume." },
    { role: "Partner", org: "devEco Consulting", period: "2021 — Present", desc: "Developer advocacy and IoT hardware consulting. DevEx audits, technical content, community strategy." },
    { role: "Developer Advocate", org: "Hologram", period: "2019 — 2021", desc: "Cellular IoT developer relations. Created tutorials, ran workshops, built reference hardware." },
  ],
  skills: ["IoT / Embedded", "ESP32", "MQTT", "Projection Mapping", "Developer Relations", "Gleam", "Node.js", "Creative Coding", "3D Printing", "Technical Writing"],
  projects: [
    { title: "CLASP Protocol", desc: "Creative Low-latency Application Streaming Protocol", tag: "Protocol" },
    { title: "LATCH", desc: "Live Art Tool for Creative Humans — visual flow programming", tag: "Tool" },
    { title: "LumenCanvas", desc: "Browser-based projection mapping platform", tag: "Platform" },
    { title: "Kiwi Jr", desc: "Open-source omni-wheel robot platform", tag: "Hardware" },
  ],
  publications: [
    { title: "Building a Cellular IoT Gateway with ESP32", source: "Hackster.io" },
    { title: "Projection Mapping Without the Price Tag", source: "hack.build" },
    { title: "MQTT for Artists: A Practical Guide", source: "Medium" },
  ],
};

const editorBlocks = [
  { id: "1", type: "header", content: "Moheeb Zara", locked: true },
  { id: "2", type: "tagline", content: "Developer Relations · Hardware Hacker · New Media Artist" },
  { id: "3", type: "bio", content: "10+ years building at the intersection of developer advocacy, IoT hardware, and open-source communities. I prototype first and document everything. If a tool doesn't exist, I build it." },
  { id: "4", type: "experience", content: "Experience", items: sampleProfile.experience },
  { id: "5", type: "skills", content: "Skills", items: sampleProfile.skills },
  { id: "6", type: "projects", content: "Featured Projects", items: sampleProfile.projects },
  { id: "7", type: "publications", content: "Publications", items: sampleProfile.publications },
  { id: "8", type: "links", content: "Links", items: sampleProfile.links },
];

// ============================================================
// ICONS (inline SVGs to avoid deps)
// ============================================================
const Icon = ({ name, size = 16 }) => {
  const icons = {
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    github: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
    linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    grip: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" opacity="0.4"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    share: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    briefcase: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    code: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    book: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    link: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    image: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    palette: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5" fill="none"/><circle cx="8.5" cy="7.5" r="2.5" fill="none"/><circle cx="6.5" cy="12.5" r="2.5" fill="none"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    chevronDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    layers: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  };
  return icons[name] || null;
};

// ============================================================
// LANDING PAGE
// ============================================================
const LandingPage = ({ onNavigate }) => {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.bg,
      color: COLORS.text,
      fontFamily: "'Courier New', monospace",
      overflow: "hidden",
    }}>
      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10, 10, 15, 0.85)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${COLORS.border}`,
        height: 60, display: "flex", alignItems: "center", padding: "0 24px",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: "'Georgia', serif" }}>
            heresmy<span style={{ color: COLORS.accent }}>.</span>cv
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onNavigate("editor")} style={{
            background: "transparent", border: `1px solid ${COLORS.border}`,
            color: COLORS.text, padding: "8px 16px", cursor: "pointer",
            fontFamily: "inherit", fontSize: 13, borderRadius: 6,
            transition: "all 0.2s",
          }} onMouseEnter={e => { e.target.style.borderColor = COLORS.accent; e.target.style.color = COLORS.accent; }}
             onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.text; }}>
            Log in
          </button>
          <button onClick={() => onNavigate("editor")} style={{
            background: COLORS.accent, border: "none", color: COLORS.bg,
            padding: "8px 20px", cursor: "pointer", fontFamily: "inherit",
            fontSize: 13, fontWeight: 700, borderRadius: 6,
          }}>
            Create yours free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        paddingTop: 160, paddingBottom: 100, textAlign: "center",
        maxWidth: 800, margin: "0 auto", padding: "160px 24px 80px",
        opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          display: "inline-block", background: COLORS.accentGlow,
          border: `1px solid ${COLORS.accentDim}40`, borderRadius: 20,
          padding: "6px 16px", fontSize: 12, color: COLORS.accent,
          marginBottom: 32, letterSpacing: "0.05em",
        }}>
          YOUR CV, YOUR URL, YOUR RULES
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 700,
          lineHeight: 1.05, marginBottom: 24,
          fontFamily: "'Georgia', serif", letterSpacing: "-0.03em",
        }}>
          One page.<br />
          <span style={{ color: COLORS.accent }}>Everything</span> you are.
        </h1>

        <p style={{
          fontSize: 18, color: COLORS.textMuted, lineHeight: 1.6,
          maxWidth: 520, margin: "0 auto 48px",
          fontFamily: "'Courier New', monospace",
        }}>
          Build a resume that's also a landing page. No templates, no bloat — just 
          blocks you arrange. Get your link in under 5 minutes.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => onNavigate("editor")} style={{
            background: COLORS.accent, border: "none", color: COLORS.bg,
            padding: "14px 32px", cursor: "pointer", fontFamily: "inherit",
            fontSize: 15, fontWeight: 700, borderRadius: 8,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            Start building <Icon name="arrow" size={16} />
          </button>
          <button onClick={() => onNavigate("preview")} style={{
            background: "transparent", border: `1px solid ${COLORS.border}`,
            color: COLORS.text, padding: "14px 28px", cursor: "pointer",
            fontFamily: "inherit", fontSize: 15, borderRadius: 8,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <Icon name="eye" size={16} /> See example
          </button>
        </div>

        {/* URL preview */}
        <div style={{
          marginTop: 64, display: "inline-flex", alignItems: "center",
          background: COLORS.surface, border: `1px solid ${COLORS.border}`,
          borderRadius: 10, padding: "12px 24px", gap: 8,
        }}>
          <span style={{ color: COLORS.textDim, fontSize: 14 }}>heresmy.cv/</span>
          <span style={{ color: COLORS.accent, fontSize: 14, fontWeight: 700, borderBottom: `2px solid ${COLORS.accent}40`, paddingBottom: 2 }}>yourname</span>
        </div>
      </div>

      {/* Features */}
      <div style={{
        maxWidth: 1000, margin: "0 auto", padding: "0 24px 120px",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16,
      }}>
        {[
          { icon: "layers", title: "Block-based editor", desc: "Drag and arrange content blocks — bio, experience, projects, links. No wrestling with templates." },
          { icon: "eye", title: "Live preview", desc: "See your page as you build it. What you see is what visitors see." },
          { icon: "download", title: "Export to PDF", desc: "One click to download a properly formatted resume PDF. Same content, print-ready." },
          { icon: "palette", title: "Make it yours", desc: "Choose themes, fonts, accent colors. Professional or expressive — your call." },
          { icon: "zap", title: "Instant link", desc: "heresmy.cv/you — share one URL everywhere. LinkedIn, email signatures, business cards." },
          { icon: "share", title: "Open Graph ready", desc: "Rich link previews when shared on socials. Your name, your photo, your tagline." },
        ].map((f, i) => (
          <div key={i} style={{
            background: COLORS.surface, border: `1px solid ${COLORS.border}`,
            borderRadius: 12, padding: 28,
            transition: "all 0.2s",
          }} onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.borderLight; e.currentTarget.style.background = COLORS.surfaceHover; }}
             onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.background = COLORS.surface; }}>
            <div style={{ color: COLORS.accent, marginBottom: 16 }}>
              <Icon name={f.icon} size={22} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, fontFamily: "'Georgia', serif" }}>{f.title}</h3>
            <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        textAlign: "center", padding: "80px 24px",
        borderTop: `1px solid ${COLORS.border}`,
      }}>
        <p style={{ color: COLORS.textDim, fontSize: 13, marginBottom: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>Free forever for individuals</p>
        <h2 style={{ fontSize: 32, fontFamily: "'Georgia', serif", marginBottom: 24 }}>
          Your next opportunity starts with a link.
        </h2>
        <button onClick={() => onNavigate("editor")} style={{
          background: COLORS.accent, border: "none", color: COLORS.bg,
          padding: "14px 32px", cursor: "pointer", fontFamily: "inherit",
          fontSize: 15, fontWeight: 700, borderRadius: 8,
        }}>
          Create your page
        </button>
      </div>
    </div>
  );
};

// ============================================================
// EDITOR (hack.build style block editor + sidebar)
// ============================================================
const Editor = ({ onNavigate }) => {
  const [blocks, setBlocks] = useState(editorBlocks);
  const [activeBlock, setActiveBlock] = useState("2");
  const [sidebarTab, setSidebarTab] = useState("blocks");
  const [theme, setTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState("#c8ff00");
  const [slug, setSlug] = useState("moheeb");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const blockTypeConfig = {
    header: { icon: "user", label: "Name / Title", color: COLORS.accent },
    tagline: { icon: "zap", label: "Tagline", color: COLORS.warm },
    bio: { icon: "edit", label: "Bio", color: COLORS.blue },
    experience: { icon: "briefcase", label: "Experience", color: COLORS.purple },
    skills: { icon: "code", label: "Skills", color: "#14b8a6" },
    projects: { icon: "layers", label: "Projects", color: "#f59e0b" },
    publications: { icon: "book", label: "Publications", color: "#ec4899" },
    links: { icon: "link", label: "Links", color: "#6366f1" },
  };

  const addableBlocks = [
    { type: "text", label: "Text Block", icon: "edit" },
    { type: "experience", label: "Experience", icon: "briefcase" },
    { type: "projects", label: "Projects", icon: "layers" },
    { type: "skills", label: "Skills", icon: "code" },
    { type: "publications", label: "Publications", icon: "book" },
    { type: "links", label: "Links", icon: "link" },
    { type: "image", label: "Image / Banner", icon: "image" },
  ];

  return (
    <div style={{
      height: "100vh", display: "flex", flexDirection: "column",
      background: COLORS.bg, color: COLORS.text,
      fontFamily: "'Courier New', monospace",
    }}>
      {/* Editor Top Bar */}
      <div style={{
        height: 52, background: COLORS.surface,
        borderBottom: `1px solid ${COLORS.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => onNavigate("landing")} style={{
            background: "none", border: "none", color: COLORS.textMuted,
            cursor: "pointer", fontSize: 16, fontFamily: "'Georgia', serif",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontWeight: 700, color: COLORS.text }}>heresmy<span style={{ color: COLORS.accent }}>.</span>cv</span>
          </button>
          <span style={{ color: COLORS.textDim }}>/</span>
          <span style={{ color: COLORS.textMuted, fontSize: 13 }}>Editing: {slug}</span>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => onNavigate("preview")} style={{
            background: "transparent", border: `1px solid ${COLORS.border}`,
            color: COLORS.text, padding: "6px 14px", cursor: "pointer",
            fontFamily: "inherit", fontSize: 12, borderRadius: 6,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <Icon name="eye" size={14} /> Preview
          </button>
          <button style={{
            background: COLORS.accent, border: "none", color: COLORS.bg,
            padding: "6px 16px", cursor: "pointer", fontFamily: "inherit",
            fontSize: 12, fontWeight: 700, borderRadius: 6,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <Icon name="check" size={14} /> Publish
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Block Canvas */}
        <div style={{
          flex: 1, overflow: "auto", padding: "32px 24px",
          background: `${COLORS.bg}`,
        }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            {/* URL bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: COLORS.surface, border: `1px solid ${COLORS.border}`,
              borderRadius: 8, padding: "8px 16px", marginBottom: 32, fontSize: 13,
            }}>
              <Icon name="globe" size={14} />
              <span style={{ color: COLORS.textDim }}>heresmy.cv/</span>
              <input value={slug} onChange={e => setSlug(e.target.value)} style={{
                background: "none", border: "none", color: COLORS.accent,
                fontFamily: "inherit", fontSize: 13, fontWeight: 700,
                outline: "none", width: 120,
              }} />
              <div style={{ flex: 1 }} />
              <span style={{ color: COLORS.textDim, fontSize: 11 }}>
                <Icon name="check" size={12} /> Available
              </span>
            </div>

            {/* Blocks */}
            {blocks.map((block) => {
              const config = blockTypeConfig[block.type] || { icon: "edit", label: "Block", color: COLORS.textMuted };
              const isActive = activeBlock === block.id;

              return (
                <div key={block.id} onClick={() => setActiveBlock(block.id)} style={{
                  background: isActive ? COLORS.surfaceHover : COLORS.surface,
                  border: `1px solid ${isActive ? config.color + "60" : COLORS.border}`,
                  borderRadius: 10, marginBottom: 8, cursor: "pointer",
                  transition: "all 0.15s",
                  boxShadow: isActive ? `0 0 0 1px ${config.color}30` : "none",
                }}>
                  {/* Block Header */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 14px", borderBottom: isActive ? `1px solid ${COLORS.border}` : "none",
                  }}>
                    <span style={{ cursor: "grab", opacity: 0.4 }}><Icon name="grip" size={14} /></span>
                    <span style={{ color: config.color }}><Icon name={config.icon} size={14} /></span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: config.color, letterSpacing: "0.03em", textTransform: "uppercase" }}>
                      {config.label}
                    </span>
                    <div style={{ flex: 1 }} />
                    {!block.locked && (
                      <button style={{
                        background: "none", border: "none", color: COLORS.textDim,
                        cursor: "pointer", opacity: 0.5, padding: 2,
                      }}>
                        <Icon name="trash" size={13} />
                      </button>
                    )}
                  </div>

                  {/* Block Content */}
                  {isActive && (
                    <div style={{ padding: "14px" }}>
                      {(block.type === "header" || block.type === "tagline") && (
                        <input
                          defaultValue={block.content}
                          style={{
                            width: "100%", background: COLORS.bg,
                            border: `1px solid ${COLORS.border}`, borderRadius: 6,
                            padding: "10px 14px", color: COLORS.text,
                            fontFamily: block.type === "header" ? "'Georgia', serif" : "inherit",
                            fontSize: block.type === "header" ? 24 : 14,
                            fontWeight: block.type === "header" ? 700 : 400,
                            outline: "none",
                          }}
                        />
                      )}

                      {block.type === "bio" && (
                        <textarea
                          defaultValue={block.content}
                          rows={4}
                          style={{
                            width: "100%", background: COLORS.bg,
                            border: `1px solid ${COLORS.border}`, borderRadius: 6,
                            padding: "10px 14px", color: COLORS.text,
                            fontFamily: "inherit", fontSize: 13, resize: "vertical",
                            outline: "none", lineHeight: 1.6,
                          }}
                        />
                      )}

                      {block.type === "experience" && block.items && (
                        <div>
                          {block.items.map((item, i) => (
                            <div key={i} style={{
                              background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                              borderRadius: 8, padding: 14, marginBottom: 8,
                            }}>
                              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                                <input defaultValue={item.role} placeholder="Role" style={{
                                  flex: 1, background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                                  borderRadius: 4, padding: "6px 10px", color: COLORS.text,
                                  fontFamily: "inherit", fontSize: 13, fontWeight: 700, outline: "none",
                                }} />
                                <input defaultValue={item.org} placeholder="Company" style={{
                                  flex: 1, background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                                  borderRadius: 4, padding: "6px 10px", color: COLORS.text,
                                  fontFamily: "inherit", fontSize: 13, outline: "none",
                                }} />
                              </div>
                              <input defaultValue={item.period} placeholder="Period" style={{
                                width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                                borderRadius: 4, padding: "6px 10px", color: COLORS.textMuted,
                                fontFamily: "inherit", fontSize: 12, outline: "none", marginBottom: 8,
                              }} />
                              <textarea defaultValue={item.desc} rows={2} style={{
                                width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                                borderRadius: 4, padding: "6px 10px", color: COLORS.text,
                                fontFamily: "inherit", fontSize: 12, outline: "none", resize: "none",
                              }} />
                            </div>
                          ))}
                          <button style={{
                            width: "100%", background: "none", border: `1px dashed ${COLORS.border}`,
                            borderRadius: 8, padding: 10, color: COLORS.textDim,
                            cursor: "pointer", fontFamily: "inherit", fontSize: 12,
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                          }}>
                            <Icon name="plus" size={14} /> Add experience
                          </button>
                        </div>
                      )}

                      {block.type === "skills" && block.items && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {block.items.map((skill, i) => (
                            <span key={i} style={{
                              background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                              borderRadius: 20, padding: "5px 12px", fontSize: 12,
                              display: "flex", alignItems: "center", gap: 6,
                            }}>
                              {skill}
                              <button style={{
                                background: "none", border: "none", color: COLORS.textDim,
                                cursor: "pointer", padding: 0, fontSize: 10,
                              }}>
                                <Icon name="x" size={10} />
                              </button>
                            </span>
                          ))}
                          <span style={{
                            border: `1px dashed ${COLORS.border}`, borderRadius: 20,
                            padding: "5px 12px", fontSize: 12, color: COLORS.textDim,
                            cursor: "pointer",
                          }}>
                            <Icon name="plus" size={10} /> Add
                          </span>
                        </div>
                      )}

                      {block.type === "projects" && block.items && (
                        <div>
                          {block.items.map((proj, i) => (
                            <div key={i} style={{
                              background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                              borderRadius: 8, padding: 12, marginBottom: 8,
                              display: "flex", gap: 12, alignItems: "center",
                            }}>
                              <div style={{ flex: 1 }}>
                                <input defaultValue={proj.title} style={{
                                  width: "100%", background: "none", border: "none",
                                  color: COLORS.text, fontFamily: "inherit", fontSize: 13,
                                  fontWeight: 700, outline: "none", marginBottom: 4,
                                }} />
                                <input defaultValue={proj.desc} style={{
                                  width: "100%", background: "none", border: "none",
                                  color: COLORS.textMuted, fontFamily: "inherit", fontSize: 12,
                                  outline: "none",
                                }} />
                              </div>
                              <span style={{
                                background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                                borderRadius: 4, padding: "3px 8px", fontSize: 10,
                                color: COLORS.textMuted, whiteSpace: "nowrap",
                              }}>{proj.tag}</span>
                            </div>
                          ))}
                          <button style={{
                            width: "100%", background: "none", border: `1px dashed ${COLORS.border}`,
                            borderRadius: 8, padding: 10, color: COLORS.textDim,
                            cursor: "pointer", fontFamily: "inherit", fontSize: 12,
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                          }}>
                            <Icon name="plus" size={14} /> Add project
                          </button>
                        </div>
                      )}

                      {block.type === "publications" && block.items && (
                        <div>
                          {block.items.map((pub, i) => (
                            <div key={i} style={{
                              background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                              borderRadius: 8, padding: 12, marginBottom: 8,
                            }}>
                              <input defaultValue={pub.title} style={{
                                width: "100%", background: "none", border: "none",
                                color: COLORS.text, fontFamily: "inherit", fontSize: 13, outline: "none",
                              }} />
                              <input defaultValue={pub.source} style={{
                                width: "100%", background: "none", border: "none",
                                color: COLORS.textMuted, fontFamily: "inherit", fontSize: 11, outline: "none",
                              }} />
                            </div>
                          ))}
                        </div>
                      )}

                      {block.type === "links" && block.items && (
                        <div>
                          {block.items.map((lnk, i) => (
                            <div key={i} style={{
                              background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                              borderRadius: 8, padding: "8px 12px", marginBottom: 6,
                              display: "flex", alignItems: "center", gap: 10,
                            }}>
                              <span style={{ color: COLORS.textMuted }}><Icon name={lnk.icon} size={14} /></span>
                              <input defaultValue={lnk.label} style={{
                                flex: 1, background: "none", border: "none",
                                color: COLORS.text, fontFamily: "inherit", fontSize: 13, outline: "none",
                              }} />
                              <input defaultValue={lnk.url} style={{
                                flex: 2, background: "none", border: "none",
                                color: COLORS.textDim, fontFamily: "inherit", fontSize: 11, outline: "none",
                              }} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Add Block */}
            <div style={{
              border: `2px dashed ${COLORS.border}`, borderRadius: 12,
              padding: 24, textAlign: "center", marginTop: 16,
            }}>
              <p style={{ color: COLORS.textDim, fontSize: 13, marginBottom: 16 }}>Add a content block</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {addableBlocks.map((ab) => (
                  <button key={ab.type} style={{
                    background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                    borderRadius: 8, padding: "8px 14px", color: COLORS.text,
                    cursor: "pointer", fontFamily: "inherit", fontSize: 12,
                    display: "flex", alignItems: "center", gap: 6,
                    transition: "all 0.15s",
                  }} onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; }}
                     onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; }}>
                    <Icon name={ab.icon} size={13} /> {ab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{
          width: 280, borderLeft: `1px solid ${COLORS.border}`,
          background: COLORS.surface, overflow: "auto", flexShrink: 0,
          display: "flex", flexDirection: "column",
        }}>
          {/* Sidebar Tabs */}
          <div style={{
            display: "flex", borderBottom: `1px solid ${COLORS.border}`,
          }}>
            {[
              { id: "blocks", label: "Blocks" },
              { id: "style", label: "Style" },
              { id: "settings", label: "Settings" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setSidebarTab(tab.id)} style={{
                flex: 1, background: "none", border: "none",
                padding: "12px 0", cursor: "pointer", fontFamily: "inherit",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: sidebarTab === tab.id ? COLORS.accent : COLORS.textDim,
                borderBottom: sidebarTab === tab.id ? `2px solid ${COLORS.accent}` : "2px solid transparent",
              }}>
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: 16, flex: 1 }}>
            {sidebarTab === "blocks" && (
              <div>
                <p style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Page Structure
                </p>
                {blocks.map(block => {
                  const config = blockTypeConfig[block.type] || { icon: "edit", label: "Block", color: COLORS.textMuted };
                  return (
                    <div key={block.id} onClick={() => setActiveBlock(block.id)} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "8px 10px", borderRadius: 6, marginBottom: 2,
                      cursor: "pointer",
                      background: activeBlock === block.id ? COLORS.surfaceHover : "transparent",
                    }}>
                      <span style={{ color: config.color }}><Icon name={config.icon} size={13} /></span>
                      <span style={{ fontSize: 12 }}>{config.label}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {sidebarTab === "style" && (
              <div>
                <p style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Theme
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
                  {[
                    { id: "dark", label: "Dark", bg: "#0a0a0f", fg: "#e8e6f0" },
                    { id: "light", label: "Light", bg: "#faf8f4", fg: "#1a1a1a" },
                    { id: "paper", label: "Paper", bg: "#f5f0e6", fg: "#1a1a1a" },
                    { id: "terminal", label: "Terminal", bg: "#0d1117", fg: "#00ff41" },
                  ].map(t => (
                    <button key={t.id} onClick={() => setTheme(t.id)} style={{
                      background: t.bg, border: theme === t.id ? `2px solid ${COLORS.accent}` : `1px solid ${COLORS.border}`,
                      borderRadius: 8, padding: 14, cursor: "pointer",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    }}>
                      <div style={{ width: 32, height: 4, background: t.fg, borderRadius: 2 }} />
                      <div style={{ width: 24, height: 3, background: t.fg, borderRadius: 2, opacity: 0.5 }} />
                      <span style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: "inherit" }}>{t.label}</span>
                    </button>
                  ))}
                </div>

                <p style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Accent Color
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
                  {["#c8ff00", "#ff6b4a", "#4a9eff", "#a855f7", "#14b8a6", "#f59e0b", "#ec4899", "#6366f1"].map(c => (
                    <button key={c} onClick={() => setAccentColor(c)} style={{
                      width: 28, height: 28, background: c, borderRadius: 6,
                      border: accentColor === c ? "2px solid white" : "2px solid transparent",
                      cursor: "pointer",
                    }} />
                  ))}
                </div>

                <p style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Font
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {["System", "Mono", "Serif", "Typewriter"].map(f => (
                    <button key={f} style={{
                      background: f === "Mono" ? COLORS.surfaceHover : "transparent",
                      border: `1px solid ${f === "Mono" ? COLORS.border : "transparent"}`,
                      borderRadius: 6, padding: "8px 12px", color: COLORS.text,
                      cursor: "pointer", fontFamily: f === "Serif" ? "Georgia" : f === "Mono" ? "'Courier New'" : f === "Typewriter" ? "'Courier New'" : "system-ui",
                      fontSize: 13, textAlign: "left",
                    }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sidebarTab === "settings" && (
              <div>
                <p style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Page URL
                </p>
                <div style={{
                  display: "flex", alignItems: "center", background: COLORS.bg,
                  border: `1px solid ${COLORS.border}`, borderRadius: 6,
                  padding: "8px 12px", marginBottom: 20,
                }}>
                  <span style={{ color: COLORS.textDim, fontSize: 12 }}>heresmy.cv/</span>
                  <input value={slug} onChange={e => setSlug(e.target.value)} style={{
                    background: "none", border: "none", color: COLORS.accent,
                    fontFamily: "inherit", fontSize: 12, fontWeight: 700, outline: "none",
                  }} />
                </div>

                <p style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  SEO / Social Preview
                </p>
                <div style={{
                  background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                  borderRadius: 8, padding: 14, marginBottom: 20,
                }}>
                  <label style={{ fontSize: 11, color: COLORS.textDim, display: "block", marginBottom: 4 }}>Title</label>
                  <input defaultValue="Moheeb Zara — Developer Relations & Hardware Hacker" style={{
                    width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                    borderRadius: 4, padding: "6px 10px", color: COLORS.text,
                    fontFamily: "inherit", fontSize: 12, outline: "none", marginBottom: 10,
                  }} />
                  <label style={{ fontSize: 11, color: COLORS.textDim, display: "block", marginBottom: 4 }}>Description</label>
                  <textarea defaultValue="10+ years building at the intersection of developer advocacy, IoT hardware, and open-source communities." rows={3} style={{
                    width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                    borderRadius: 4, padding: "6px 10px", color: COLORS.text,
                    fontFamily: "inherit", fontSize: 12, outline: "none", resize: "none",
                  }} />
                </div>

                <p style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Export
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <button style={{
                    background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                    borderRadius: 6, padding: "10px 14px", color: COLORS.text,
                    cursor: "pointer", fontFamily: "inherit", fontSize: 12,
                    display: "flex", alignItems: "center", gap: 8, textAlign: "left",
                  }}>
                    <Icon name="download" size={14} /> Export as PDF Resume
                  </button>
                  <button style={{
                    background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                    borderRadius: 6, padding: "10px 14px", color: COLORS.text,
                    cursor: "pointer", fontFamily: "inherit", fontSize: 12,
                    display: "flex", alignItems: "center", gap: 8, textAlign: "left",
                  }}>
                    <Icon name="code" size={14} /> Export as HTML
                  </button>
                  <button style={{
                    background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                    borderRadius: 6, padding: "10px 14px", color: COLORS.text,
                    cursor: "pointer", fontFamily: "inherit", fontSize: 12,
                    display: "flex", alignItems: "center", gap: 8, textAlign: "left",
                  }}>
                    <Icon name="share" size={14} /> Export as JSON
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PROFILE PREVIEW (the output — what visitors see)
// ============================================================
const ProfilePreview = ({ onNavigate }) => {
  const p = sampleProfile;

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg,
      fontFamily: "'Courier New', monospace", color: COLORS.text,
    }}>
      {/* Floating edit bar */}
      <div style={{
        position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
        zIndex: 100, background: COLORS.surface, border: `1px solid ${COLORS.border}`,
        borderRadius: 12, padding: "10px 20px", display: "flex", gap: 10,
        alignItems: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        backdropFilter: "blur(20px)",
      }}>
        <span style={{ fontSize: 12, color: COLORS.textMuted }}>Preview mode</span>
        <div style={{ width: 1, height: 20, background: COLORS.border }} />
        <button onClick={() => onNavigate("editor")} style={{
          background: COLORS.accent, border: "none", color: COLORS.bg,
          padding: "6px 14px", cursor: "pointer", fontFamily: "inherit",
          fontSize: 12, fontWeight: 700, borderRadius: 6,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <Icon name="edit" size={12} /> Edit
        </button>
        <button onClick={() => onNavigate("landing")} style={{
          background: "none", border: `1px solid ${COLORS.border}`,
          color: COLORS.text, padding: "6px 14px", cursor: "pointer",
          fontFamily: "inherit", fontSize: 12, borderRadius: 6,
        }}>
          Home
        </button>
      </div>

      {/* Profile Content */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px 120px" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.warm})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 24, fontSize: 32, fontWeight: 700, color: COLORS.bg,
            fontFamily: "'Georgia', serif",
          }}>
            M
          </div>

          <h1 style={{
            fontSize: 36, fontWeight: 700, fontFamily: "'Georgia', serif",
            letterSpacing: "-0.02em", marginBottom: 8,
          }}>
            {p.name}
          </h1>

          <p style={{ fontSize: 15, color: COLORS.textMuted, marginBottom: 16 }}>
            {p.tagline}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.textDim, fontSize: 13 }}>
            <Icon name="mapPin" size={13} /> {p.location}
          </div>
        </div>

        {/* Bio */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text }}>
            {p.bio}
          </p>
        </div>

        {/* Links */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 56,
        }}>
          {p.links.map((lnk, i) => (
            <a key={i} href={lnk.url} style={{
              display: "flex", alignItems: "center", gap: 8,
              background: COLORS.surface, border: `1px solid ${COLORS.border}`,
              borderRadius: 8, padding: "8px 16px", color: COLORS.text,
              textDecoration: "none", fontSize: 13, transition: "all 0.15s",
            }} onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accent; }}
               onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.text; }}>
              <Icon name={lnk.icon} size={14} />
              {lnk.label}
            </a>
          ))}
        </div>

        {/* Experience */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{
            fontSize: 12, fontWeight: 700, color: COLORS.accent,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <Icon name="briefcase" size={14} /> Experience
          </h2>
          {p.experience.map((exp, i) => (
            <div key={i} style={{
              borderLeft: `2px solid ${COLORS.border}`,
              paddingLeft: 20, marginBottom: 24,
              position: "relative",
            }}>
              <div style={{
                position: "absolute", left: -5, top: 4,
                width: 8, height: 8, borderRadius: "50%",
                background: i === 0 ? COLORS.accent : COLORS.border,
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>
                  {exp.role} <span style={{ color: COLORS.textMuted, fontWeight: 400 }}>at {exp.org}</span>
                </h3>
              </div>
              <p style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 8 }}>{exp.period}</p>
              <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>{exp.desc}</p>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{
            fontSize: 12, fontWeight: 700, color: COLORS.accent,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <Icon name="code" size={14} /> Skills
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {p.skills.map((skill, i) => (
              <span key={i} style={{
                background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                borderRadius: 6, padding: "6px 14px", fontSize: 13,
              }}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{
            fontSize: 12, fontWeight: 700, color: COLORS.accent,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <Icon name="layers" size={14} /> Featured Projects
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {p.projects.map((proj, i) => (
              <div key={i} style={{
                background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                borderRadius: 10, padding: 18, transition: "all 0.15s",
                cursor: "pointer",
              }} onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.borderLight; }}
                 onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; }}>
                <span style={{
                  display: "inline-block", background: COLORS.accentGlow,
                  color: COLORS.accent, fontSize: 10, padding: "2px 8px",
                  borderRadius: 4, marginBottom: 10, fontWeight: 700,
                }}>{proj.tag}</span>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{proj.title}</h3>
                <p style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>{proj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{
            fontSize: 12, fontWeight: 700, color: COLORS.accent,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <Icon name="book" size={14} /> Publications
          </h2>
          {p.publications.map((pub, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 0", borderBottom: `1px solid ${COLORS.border}`,
            }}>
              <span style={{ fontSize: 14 }}>{pub.title}</span>
              <span style={{ fontSize: 11, color: COLORS.textDim, whiteSpace: "nowrap", marginLeft: 16 }}>{pub.source}</span>
            </div>
          ))}
        </section>

        {/* Footer */}
        <div style={{
          textAlign: "center", paddingTop: 40,
          borderTop: `1px solid ${COLORS.border}`,
        }}>
          <p style={{ fontSize: 12, color: COLORS.textDim }}>
            Built with <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("landing"); }} style={{ color: COLORS.accent, textDecoration: "none" }}>heresmy.cv</a>
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [page, setPage] = useState("landing");

  return (
    <div>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        input, textarea, button { font-family: inherit; }
        ::selection { background: ${COLORS.accent}40; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${COLORS.borderLight}; }
      `}</style>

      {page === "landing" && <LandingPage onNavigate={setPage} />}
      {page === "editor" && <Editor onNavigate={setPage} />}
      {page === "preview" && <ProfilePreview onNavigate={setPage} />}
    </div>
  );
}
