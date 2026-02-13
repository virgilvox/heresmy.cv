"use client";

import type { CustomHtmlBlockData } from "@/lib/blocks/types";

export function CustomHtmlBlock({ data }: { data: CustomHtmlBlockData }) {
  if (!data.html) return null;

  const height = data.height || 200;

  return (
    <div className="mb-12">
      <div className="rounded-lg overflow-hidden border border-cv-border bg-cv-surface">
        <iframe
          srcDoc={data.html}
          sandbox=""
          title="Custom content"
          className="w-full border-0"
          style={{ height: `${height}px` }}
        />
      </div>
    </div>
  );
}
