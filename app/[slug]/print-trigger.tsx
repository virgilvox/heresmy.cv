"use client";

import { useEffect, useState } from "react";
import { Printer } from "lucide-react";

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

export function PrintTrigger() {
  const [autoPrinted, setAutoPrinted] = useState(false);

  useEffect(() => {
    const trigger = async () => {
      try {
        await document.fonts.ready;
      } catch {
        // ignore
      }
      await waitForImages();
      // One more frame to ensure layout is settled
      requestAnimationFrame(() => {
        window.print();
        setAutoPrinted(true);
      });
    };
    trigger();
  }, []);

  // Always show a print button as fallback (hidden when printing)
  if (autoPrinted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      <button
        onClick={() => {
          window.print();
          setAutoPrinted(true);
        }}
        className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg shadow-xl text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <Printer size={15} />
        Print / Save as PDF
      </button>
    </div>
  );
}
