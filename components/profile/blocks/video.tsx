"use client";

import type { VideoBlockData, VideoItem } from "@/lib/blocks/types";
import { getEmbedUrl } from "@/lib/video";

function VideoCard({ item }: { item: VideoItem }) {
  const embedUrl = getEmbedUrl(item.url);

  if (!embedUrl) return null;

  return (
    <div>
      <div className="relative w-full rounded-lg overflow-hidden border border-cv-border bg-cv-surface aspect-video">
        <iframe
          src={embedUrl}
          title={item.title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {item.title && (
        <p className="text-sm text-cv-text mt-2">{item.title}</p>
      )}
    </div>
  );
}

export function VideoBlock({ data }: { data: VideoBlockData }) {
  const items = data.items || [];

  if (items.length === 0) return null;

  // Group by category if categories exist
  const categorized = items.reduce<Record<string, VideoItem[]>>(
    (acc, item) => {
      const cat = item.category || "";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {}
  );

  const categoryKeys = Object.keys(categorized);
  const hasCategories = categoryKeys.length > 1 || (categoryKeys.length === 1 && categoryKeys[0] !== "");

  return (
    <div className="mb-12">
      {hasCategories ? (
        categoryKeys.map((category) => (
          <div key={category} className="mb-6 last:mb-0">
            {category && (
              <h3 className="text-xs font-semibold uppercase tracking-wider text-cv-accent mb-3">
                {category}
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categorized[category].map((item) => (
                <VideoCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
