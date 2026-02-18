"use client";

import { useEffect, useState } from "react";
import { Printer, FileText, Palette } from "lucide-react";

function waitForImages(): Promise<void> {
  const images = Array.from(document.querySelectorAll("img"));
  if (images.length === 0) return Promise.resolve();

  return Promise.all(
    images.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            })
    )
  ).then(() => {});
}

async function triggerPrint(mode: "clean" | "theme") {
  document.documentElement.setAttribute("data-print-mode", mode);

  try {
    await document.fonts.ready;
  } catch {
    // ignore
  }
  await waitForImages();

  requestAnimationFrame(() => {
    window.print();
  });
}

export function PrintTrigger() {
  const [ready, setReady] = useState(false);

  // Wait for page to be fully loaded before showing options
  useEffect(() => {
    const init = async () => {
      try {
        await document.fonts.ready;
      } catch {
        // ignore
      }
      await waitForImages();
      setReady(true);
    };
    init();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center no-print">
      <div className="bg-cv-surface border border-cv-border rounded-xl shadow-2xl w-[90vw] max-w-sm p-5">
        <div className="flex items-center gap-2 mb-1">
          <Printer size={16} className="text-cv-accent" />
          <h2 className="text-sm font-bold text-cv-text">Export as PDF</h2>
        </div>
        <p className="text-[11px] text-cv-text-muted mb-4">
          Choose a style for your export
        </p>

        <div className="flex flex-col gap-2">
          <button
            disabled={!ready}
            onClick={() => triggerPrint("clean")}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-cv-border hover:border-cv-accent text-left transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
          >
            <FileText size={18} className="text-cv-accent shrink-0" />
            <div>
              <p className="text-xs font-bold text-cv-text">Clean</p>
              <p className="text-[11px] text-cv-text-muted">White background, optimized for paper</p>
            </div>
          </button>

          <button
            disabled={!ready}
            onClick={() => triggerPrint("theme")}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-cv-border hover:border-cv-accent text-left transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
          >
            <Palette size={18} className="text-cv-accent shrink-0" />
            <div>
              <p className="text-xs font-bold text-cv-text">With theme</p>
              <p className="text-[11px] text-cv-text-muted">Preserves your theme colors and style</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
