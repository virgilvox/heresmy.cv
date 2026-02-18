import type { TestimonialsBlockData } from "@/lib/blocks/types";

export function TestimonialsBlock({ data }: { data: TestimonialsBlockData }) {
  const items = data.items || [];

  if (items.length === 0) return null;

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <blockquote
          key={item.id}
          className="border-l-4 border-cv-accent pl-4 py-2"
        >
          <p className="text-sm italic text-cv-text leading-relaxed">
            &ldquo;{item.quote}&rdquo;
          </p>
          <footer className="mt-2 text-xs text-cv-text-muted">
            <span className="font-semibold not-italic text-cv-text">
              {item.author}
            </span>
            {(item.role || item.org) && (
              <span>
                {" "}&mdash;{" "}
                {[item.role, item.org].filter(Boolean).join(", ")}
              </span>
            )}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
