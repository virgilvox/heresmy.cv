import { ExternalLink } from "lucide-react";
import type { PublicationsBlockData } from "@/lib/blocks/types";

export function PublicationsBlock({ data }: { data: PublicationsBlockData }) {
  const categories = data.categories || [];

  if (categories.length === 0) return null;

  const hasMultipleCategories = categories.length > 1;

  return (
    <div className="mb-12">
      {categories.map((category) => {
        if (category.items.length === 0) return null;

        return (
          <div key={category.id} className="mb-6 last:mb-0">
            {hasMultipleCategories && category.name && (
              <h3 className="text-xs font-semibold uppercase tracking-wider text-cv-accent mb-3">
                {category.name}
              </h3>
            )}

            <div className="divide-y divide-cv-border">
              {category.items.map((pub) => (
                <div key={pub.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      {pub.url ? (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-cv-text hover:text-cv-accent transition-colors inline-flex items-center gap-1.5"
                        >
                          {pub.title}
                          <ExternalLink size={11} className="shrink-0 opacity-50" />
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-cv-text">
                          {pub.title}
                        </p>
                      )}

                      {pub.source && (
                        <p className="text-xs text-cv-text-dim mt-0.5">
                          {pub.source}
                        </p>
                      )}
                    </div>

                    {pub.year && (
                      <span className="text-xs text-cv-text-dim shrink-0 tabular-nums">
                        {pub.year}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
