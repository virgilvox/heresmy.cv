import type { ExperienceBlockData } from "@/lib/blocks/types";

export function ExperienceBlock({ data }: { data: ExperienceBlockData }) {
  const items = data.items || [];

  if (items.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="relative border-l-2 border-cv-border pl-6 space-y-8">
        {items.map((item, index) => {
          const isAccent = index === 0 || item.current;

          return (
            <div key={item.id} className="relative">
              {/* Timeline dot */}
              <div
                className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                  isAccent
                    ? "bg-cv-accent border-cv-accent"
                    : "bg-cv-bg border-cv-border"
                }`}
              />

              <div>
                <h3 className="text-sm font-semibold text-cv-text leading-snug">
                  {item.role}
                  {item.org && (
                    <span className="font-normal text-cv-text-muted">
                      {" "}
                      at {item.org}
                    </span>
                  )}
                </h3>

                {item.period && (
                  <p className="text-xs text-cv-text-dim mt-1">
                    {item.period}
                    {item.current && (
                      <span className="ml-2 inline-block px-1.5 py-0.5 rounded text-[10px] bg-cv-accent-glow text-cv-accent font-medium">
                        Current
                      </span>
                    )}
                  </p>
                )}

                {item.description && (
                  <p className="text-sm text-cv-text-muted mt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
