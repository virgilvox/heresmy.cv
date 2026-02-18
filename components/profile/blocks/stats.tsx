import type { StatsBlockData } from "@/lib/blocks/types";

export function StatsBlock({ data }: { data: StatsBlockData }) {
  const items = data.items || [];
  const layout = data.layout || "row";

  if (items.length === 0) return null;

  if (layout === "grid") {
    return (
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-cv-surface border border-cv-border rounded-lg p-6 text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-cv-accent">
                {item.value}
              </div>
              <div className="text-xs text-cv-text-muted mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-cv-border rounded-lg p-6 text-center min-w-[120px]"
          >
            <div className="text-4xl md:text-5xl font-bold text-cv-accent">
              {item.value}
            </div>
            <div className="text-xs text-cv-text-muted mt-1">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
