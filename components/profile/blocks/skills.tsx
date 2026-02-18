import type { SkillsBlockData } from "@/lib/blocks/types";

export function SkillsBlock({ data }: { data: SkillsBlockData }) {
  const items = data.items || [];
  const layout = data.layout || "pills";

  if (items.length === 0) return null;

  return (
    <div>
      {layout === "pills" && (
        <div className="flex flex-wrap gap-2">
          {items.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="inline-block px-3 py-1.5 text-xs font-medium rounded-full bg-cv-surface border border-cv-border text-cv-text transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {layout === "list" && (
        <ul className="space-y-1.5">
          {items.map((skill, index) => (
            <li
              key={`${skill}-${index}`}
              className="flex items-center gap-2 text-sm text-cv-text"
            >
              <span className="w-1 h-1 rounded-full bg-cv-accent shrink-0" />
              {skill}
            </li>
          ))}
        </ul>
      )}

      {layout === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {items.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="px-3 py-2 text-xs font-medium text-center rounded-lg bg-cv-surface border border-cv-border text-cv-text"
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
