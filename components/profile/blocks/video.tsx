"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VideoBlockData, VideoItem } from "@/lib/blocks/types";
import { getEmbedUrl } from "@/lib/video";

export function VideoBlock({ data }: { data: VideoBlockData }) {
  const items = data.items || [];

  // Group by category
  const categorized = useMemo(() => {
    const groups: Record<string, VideoItem[]> = {};
    for (const item of items) {
      const cat = item.category || "";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    }
    return groups;
  }, [items]);

  const categoryKeys = Object.keys(categorized);
  const hasCategories =
    categoryKeys.length > 1 ||
    (categoryKeys.length === 1 && categoryKeys[0] !== "");

  const [activeCategory, setActiveCategory] = useState(
    hasCategories ? categoryKeys[0] : ""
  );
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  if (items.length === 0) return null;

  // Single video — simple player, no list/tabs
  if (items.length === 1) {
    const embedUrl = getEmbedUrl(items[0].url);
    if (!embedUrl) return null;

    return (
      <div>
        <div className="relative w-full rounded-lg overflow-hidden border border-cv-border bg-cv-surface aspect-video">
          <iframe
            src={embedUrl}
            title={items[0].title || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        {items[0].title && (
          <p className="text-sm text-cv-text mt-2">{items[0].title}</p>
        )}
      </div>
    );
  }

  const currentVideos = hasCategories
    ? categorized[activeCategory] || []
    : items;

  const clampedIndex = Math.min(activeVideoIndex, currentVideos.length - 1);
  const activeVideo = currentVideos[clampedIndex];
  const activeEmbedUrl = activeVideo ? getEmbedUrl(activeVideo.url) : null;

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setActiveVideoIndex(0);
  }

  function handlePrev() {
    setActiveVideoIndex((i) => Math.max(0, i - 1));
  }

  function handleNext() {
    setActiveVideoIndex((i) => Math.min(currentVideos.length - 1, i + 1));
  }

  return (
    <div>
      {/* Category tabs */}
      {hasCategories && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categoryKeys.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                activeCategory === cat
                  ? "bg-cv-accent text-cv-bg"
                  : "bg-cv-surface border border-cv-border text-cv-text-muted hover:text-cv-text"
              )}
            >
              {cat || "Uncategorized"}
            </button>
          ))}
        </div>
      )}

      {/* Two-column: player + list */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Player */}
        <div className="flex-1 min-w-0">
          {activeEmbedUrl ? (
            <div className="relative w-full rounded-lg overflow-hidden border border-cv-border bg-cv-surface aspect-video">
              <iframe
                key={activeVideo.id}
                src={activeEmbedUrl}
                title={activeVideo.title || "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : (
            <div className="w-full aspect-video rounded-lg border border-cv-border bg-cv-surface flex items-center justify-center text-cv-text-dim text-sm">
              No valid video URL
            </div>
          )}

          {/* Prev/Next buttons */}
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={handlePrev}
              disabled={clampedIndex === 0}
              className={cn(
                "flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors",
                clampedIndex === 0
                  ? "text-cv-text-dim cursor-not-allowed"
                  : "text-cv-text-muted hover:text-cv-text"
              )}
            >
              <ChevronLeft size={14} />
              Prev
            </button>
            <span className="text-xs text-cv-text-dim">
              {clampedIndex + 1} / {currentVideos.length}
            </span>
            <button
              onClick={handleNext}
              disabled={clampedIndex === currentVideos.length - 1}
              className={cn(
                "flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors",
                clampedIndex === currentVideos.length - 1
                  ? "text-cv-text-dim cursor-not-allowed"
                  : "text-cv-text-muted hover:text-cv-text"
              )}
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Numbered video list */}
        <div className="w-full md:w-64 shrink-0 max-h-[400px] overflow-y-auto space-y-1">
          {currentVideos.map((video, index) => {
            const isActive = index === clampedIndex;
            return (
              <button
                key={video.id}
                onClick={() => setActiveVideoIndex(index)}
                className={cn(
                  "w-full text-left flex items-start gap-2 px-3 py-2 rounded-lg text-xs transition-colors",
                  isActive
                    ? "bg-cv-accent/10 text-cv-accent border border-cv-accent/30"
                    : "text-cv-text-muted hover:text-cv-text hover:bg-cv-surface"
                )}
              >
                <span
                  className={cn(
                    "shrink-0 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold",
                    isActive
                      ? "bg-cv-accent text-cv-bg"
                      : "bg-cv-surface text-cv-text-dim"
                  )}
                >
                  {index + 1}
                </span>
                <span className="line-clamp-2 leading-snug">
                  {video.title || "Untitled"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
