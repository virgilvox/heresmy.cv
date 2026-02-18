"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ExperienceBlockData } from "@/lib/blocks/types";

const INITIAL_COUNT = 3;

export function ExperienceBlock({ data }: { data: ExperienceBlockData }) {
  const items = data.items || [];
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const hasMore = items.length > INITIAL_COUNT;
  const visibleItems = expanded ? items : items.slice(0, INITIAL_COUNT);
  const hiddenCount = items.length - INITIAL_COUNT;

  return (
    <div>
      <div className="space-y-4">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="bg-cv-surface border border-cv-border rounded-lg p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div className="min-w-0">
                {item.org && (
                  <p className="text-sm font-semibold text-cv-accent">
                    {item.org}
                  </p>
                )}
                <h3 className="text-base font-bold text-cv-text leading-snug">
                  {item.role}
                </h3>
              </div>

              {item.period && (
                <p className="text-xs text-cv-text-dim shrink-0 sm:text-right">
                  {item.period}
                  {item.current && (
                    <span className="ml-2 inline-block px-1.5 py-0.5 rounded text-[10px] bg-cv-accent-glow text-cv-accent font-medium">
                      Current
                    </span>
                  )}
                </p>
              )}
            </div>

            {item.description && (
              <p className="text-sm text-cv-text-muted mt-3 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1.5 text-xs font-medium text-cv-accent hover:text-cv-text transition-colors cursor-pointer group"
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
          {expanded
            ? "Show less"
            : `Show ${hiddenCount} more position${hiddenCount === 1 ? "" : "s"}`}
        </button>
      )}
    </div>
  );
}
