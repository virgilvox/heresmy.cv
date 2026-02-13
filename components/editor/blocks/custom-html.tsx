"use client";

import { useMemo } from "react";
import type { CustomHtmlBlockData } from "@/lib/blocks/types";

interface Props {
  data: CustomHtmlBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function CustomHtmlBlockEditor({ data, onUpdate }: Props) {
  const html = data.html || "";
  const height = data.height ?? 300;

  // Wrap user HTML in a minimal document so it renders cleanly in the sandbox
  const srcDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; padding: 8px; font-family: system-ui, sans-serif; font-size: 14px; color: #e8e6f0; background: #0a0a0f; }
    img, video, iframe { max-width: 100%; }
  </style>
</head>
<body>${html}</body>
</html>`;
  }, [html]);

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="block text-xs text-cv-text-dim uppercase tracking-wider">
          HTML Code
        </label>
        <textarea
          value={html}
          onChange={(e) => onUpdate({ html: e.target.value })}
          placeholder="<div>Your custom HTML here...</div>"
          rows={8}
          className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors resize-vertical font-mono"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-xs text-cv-text-dim uppercase tracking-wider">
          Height (px)
        </label>
        <input
          type="number"
          value={height}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            onUpdate({ height: isNaN(val) ? 300 : val });
          }}
          min={50}
          max={2000}
          step={10}
          className="w-32 bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
        />
      </div>

      {/* Sandboxed preview */}
      <div className="space-y-1">
        <label className="block text-xs text-cv-text-dim uppercase tracking-wider">
          Preview
        </label>
        {html.trim() ? (
          <iframe
            srcDoc={srcDoc}
            title="Custom HTML preview"
            sandbox="allow-scripts"
            style={{ height: `${height}px` }}
            className="w-full border border-cv-border rounded-md bg-cv-bg"
          />
        ) : (
          <div
            style={{ height: `${Math.min(height, 120)}px` }}
            className="w-full border border-dashed border-cv-border rounded-md flex items-center justify-center"
          >
            <p className="text-xs text-cv-text-dim">
              Write some HTML above to see a preview
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
