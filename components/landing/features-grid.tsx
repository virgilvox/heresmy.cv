import {
  Layers,
  Eye,
  Download,
  Palette,
  Zap,
  Share2,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Block-based editor",
    desc: "Drag and arrange content blocks \u2014 bio, experience, projects, links. No wrestling with templates.",
  },
  {
    icon: Eye,
    title: "Live preview",
    desc: "See your page as you build it. What you see is what visitors see.",
  },
  {
    icon: Download,
    title: "Export to PDF",
    desc: "One click to download a properly formatted resume PDF. Same content, print-ready.",
  },
  {
    icon: Palette,
    title: "Make it yours",
    desc: "Choose themes, fonts, accent colors. Professional or expressive \u2014 your call.",
  },
  {
    icon: Zap,
    title: "Instant link",
    desc: "heresmy.cv/you \u2014 share one URL everywhere. LinkedIn, email signatures, business cards.",
  },
  {
    icon: Share2,
    title: "Open Graph ready",
    desc: "Rich link previews when shared on socials. Your name, your photo, your tagline.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="max-w-[1000px] mx-auto px-6 pb-30">
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-cv-surface border border-cv-border rounded-xl p-7 transition-colors hover:border-cv-text-dim hover:bg-cv-card"
          >
            <div className="text-cv-accent mb-4">
              <feature.icon size={22} />
            </div>
            <h3 className="text-base font-bold mb-2 font-serif">
              {feature.title}
            </h3>
            <p className="text-[13px] text-cv-text-muted leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
