"use client";

import type { HeaderBlockData } from "@/lib/blocks/types";

interface Props {
  data: HeaderBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function HeaderBlockEditor({ data, onUpdate }: Props) {
  return (
    <div className="space-y-3">
      <input
        value={data.name || ""}
        onChange={(e) => onUpdate({ name: e.target.value })}
        placeholder="Your name"
        className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2.5 text-xl font-bold font-serif text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
      />
      <input
        value={data.tagline || ""}
        onChange={(e) => onUpdate({ tagline: e.target.value })}
        placeholder="Tagline (e.g., Software Engineer · Open Source Enthusiast)"
        className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
      />
      <input
        value={data.location || ""}
        onChange={(e) => onUpdate({ location: e.target.value })}
        placeholder="Location (e.g., San Francisco, CA)"
        className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
      />
    </div>
  );
}
