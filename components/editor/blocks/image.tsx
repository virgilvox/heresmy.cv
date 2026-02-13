"use client";

import { useState } from "react";
import type { ImageBlockData } from "@/lib/blocks/types";

interface Props {
  data: ImageBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function ImageBlockEditor({ data, onUpdate }: Props) {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <input
          value={data.url || ""}
          onChange={(e) => {
            setImageError(false);
            onUpdate({ url: e.target.value });
          }}
          placeholder="Image URL (e.g., https://example.com/photo.jpg)"
          className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
        />
        <input
          value={data.alt || ""}
          onChange={(e) => onUpdate({ alt: e.target.value })}
          placeholder="Alt text (describes the image for accessibility)"
          className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
        />
        <input
          value={data.caption || ""}
          onChange={(e) => onUpdate({ caption: e.target.value })}
          placeholder="Caption (optional)"
          className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
        />
      </div>

      {/* Image preview */}
      {data.url?.trim() ? (
        <div className="border border-cv-border rounded-lg overflow-hidden bg-cv-bg">
          {imageError ? (
            <div className="flex items-center justify-center py-8 text-xs text-cv-text-dim">
              Could not load image preview
            </div>
          ) : (
            <img
              src={data.url}
              alt={data.alt || "Preview"}
              className="w-full h-auto max-h-64 object-contain"
              onError={() => setImageError(true)}
            />
          )}
          {data.caption && (
            <p className="px-3 py-2 text-xs text-cv-text-muted border-t border-cv-border">
              {data.caption}
            </p>
          )}
        </div>
      ) : (
        <div className="border border-dashed border-cv-border rounded-lg py-8 flex items-center justify-center">
          <p className="text-xs text-cv-text-dim">
            Enter an image URL above to see a preview
          </p>
        </div>
      )}
    </div>
  );
}
