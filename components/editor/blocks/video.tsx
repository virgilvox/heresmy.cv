"use client";

import { useMemo } from "react";
import { nanoid } from "nanoid";
import { Plus, Trash2 } from "lucide-react";
import type { VideoBlockData, VideoItem } from "@/lib/blocks/types";
import { getVideoThumbnail, getEmbedUrl } from "@/lib/video";

// ── Thumbnail preview sub-component ──────────────────────────────────────────

function VideoPreview({ url }: { url: string }) {
  const thumbnail = useMemo(() => getVideoThumbnail(url), [url]);
  const embedUrl = useMemo(() => getEmbedUrl(url), [url]);

  if (!url.trim()) return null;

  if (thumbnail) {
    return (
      <div className="mt-2 rounded-md overflow-hidden border border-cv-border">
        <img
          src={thumbnail}
          alt="Video thumbnail"
          className="w-full h-auto object-cover max-h-32"
        />
      </div>
    );
  }

  if (embedUrl) {
    return (
      <div className="mt-2 rounded-md overflow-hidden border border-cv-border">
        <iframe
          src={embedUrl}
          title="Video preview"
          className="w-full h-32"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <p className="mt-2 text-xs text-cv-text-dim">
      Paste a YouTube or Vimeo URL to see a preview
    </p>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

interface Props {
  data: VideoBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function VideoBlockEditor({ data, onUpdate }: Props) {
  const items: VideoItem[] = data.items || [];

  function updateItem(id: string, patch: Partial<VideoItem>) {
    onUpdate({
      items: items.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  }

  function addItem() {
    const newItem: VideoItem = {
      id: nanoid(),
      title: "",
      url: "",
      category: "",
    };
    onUpdate({ items: [...items, newItem] });
  }

  function removeItem(id: string) {
    onUpdate({ items: items.filter((item) => item.id !== id) });
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-cv-bg border border-cv-border rounded-lg p-3 space-y-2"
        >
          <div className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <input
                value={item.title}
                onChange={(e) =>
                  updateItem(item.id, { title: e.target.value })
                }
                placeholder="Video title"
                className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm font-medium text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
              />
              <input
                value={item.url}
                onChange={(e) =>
                  updateItem(item.id, { url: e.target.value })
                }
                placeholder="Video URL (YouTube or Vimeo)"
                className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
              />
              <input
                value={item.category}
                onChange={(e) =>
                  updateItem(item.id, { category: e.target.value })
                }
                placeholder="Category (optional)"
                className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="p-1.5 text-cv-text-dim hover:text-red-400 transition-colors shrink-0 mt-1"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <VideoPreview url={item.url} />
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-cv-border rounded-lg px-4 py-3 text-sm text-cv-text-muted hover:text-cv-text hover:border-cv-accent transition-colors cursor-pointer"
      >
        <Plus size={14} />
        Add video
      </button>
    </div>
  );
}
