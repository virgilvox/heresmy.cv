import type { AwardsBlockData } from "@/lib/blocks/types";
import { Trophy } from "lucide-react";

export function AwardsBlock({ data }: { data: AwardsBlockData }) {
  const items = data.items || [];

  if (items.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-cv-surface border border-cv-border rounded-lg p-5 flex gap-4"
          >
            <div className="shrink-0 mt-0.5">
              <div className="w-9 h-9 rounded-full bg-cv-accent-glow flex items-center justify-center">
                <Trophy size={16} className="text-cv-accent" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-cv-text leading-snug">
                {item.title}
              </h3>
              {(item.year || item.location) && (
                <p className="text-xs text-cv-text-dim mt-1">
                  {item.year}
                  {item.year && item.location && " \u2022 "}
                  {item.location}
                </p>
              )}
              {item.description && (
                <p className="text-sm text-cv-text-muted mt-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
