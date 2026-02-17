"use client";

import { cn } from "@/lib/utils";
import type { HeadingBlockData } from "@/lib/blocks/types";

interface Props {
  data: HeadingBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

const levelOptions: { value: HeadingBlockData["level"]; label: string }[] = [
  { value: "h2", label: "H2" },
  { value: "h3", label: "H3" },
];

export function HeadingBlockEditor({ data, onUpdate }: Props) {
  const level = data.level || "h2";

  return (
    <div className="space-y-3">
      {/* Level selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-cv-text-dim uppercase tracking-wider">
          Level
        </span>
        <div className="flex gap-1">
          {levelOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onUpdate({ text: data.text, level: opt.value })}
              className={cn(
                "px-2.5 py-1 rounded text-xs transition-colors",
                level === opt.value
                  ? "bg-cv-accent/20 text-cv-accent"
                  : "bg-cv-bg text-cv-text-muted hover:text-cv-text border border-cv-border"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <input
        value={data.text || ""}
        onChange={(e) => onUpdate({ text: e.target.value, level })}
        placeholder="Section heading text"
        className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2.5 text-lg font-bold text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
      />
    </div>
  );
}
