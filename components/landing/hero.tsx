"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";

export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="pt-40 pb-20 text-center max-w-[800px] mx-auto px-6 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {/* Badge */}
      <div className="inline-block bg-cv-accent-glow border border-cv-accent/25 rounded-full px-4 py-1.5 text-xs text-cv-accent mb-8 tracking-widest">
        YOUR CV, YOUR URL, YOUR RULES
      </div>

      {/* Heading */}
      <h1 className="text-[clamp(40px,7vw,72px)] font-bold leading-[1.05] mb-6 font-serif tracking-tight">
        One page.
        <br />
        <span className="text-cv-accent">Everything</span> you are.
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-cv-text-muted leading-relaxed max-w-[520px] mx-auto mb-12 font-mono">
        Build a resume that&apos;s also a landing page. No templates, no bloat
        &mdash; just blocks you arrange. Get your link in under 5 minutes.
      </p>

      {/* CTAs */}
      <div className="flex gap-3 justify-center flex-wrap">
        <Link
          href="/signup"
          className="bg-cv-accent text-cv-bg px-8 py-3.5 text-[15px] font-bold rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          Start building <ArrowRight size={16} />
        </Link>
        <Link
          href="/moheeb"
          className="border border-cv-border text-cv-text px-7 py-3.5 text-[15px] rounded-lg flex items-center gap-2 hover:border-cv-accent hover:text-cv-accent transition-colors"
        >
          <Eye size={16} /> See example
        </Link>
      </div>

      {/* URL preview */}
      <div className="mt-16 inline-flex items-center bg-cv-surface border border-cv-border rounded-[10px] px-6 py-3 gap-2">
        <span className="text-cv-text-dim text-sm">heresmy.cv/</span>
        <span className="text-cv-accent text-sm font-bold border-b-2 border-cv-accent/25 pb-0.5">
          yourname
        </span>
      </div>
    </section>
  );
}
