import type { AwardsBlockData } from "@/lib/blocks/types";
import { Trophy } from "lucide-react";

export function AwardsBlock({ data }: { data: AwardsBlockData }) {
  const items = data.items || [];

  if (items.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-cv-accent-glow flex items-center justify-center">
                <Trophy size={14} className="text-cv-accent" />
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
