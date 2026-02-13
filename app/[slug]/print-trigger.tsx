"use client";

import { useEffect, useState } from "react";
import { Printer } from "lucide-react";

export function PrintTrigger() {
  const [autoPrinted, setAutoPrinted] = useState(false);

  useEffect(() => {
    // Try auto-print after fonts load; if blocked, the button is the fallback
    const trigger = async () => {
      try {
        await document.fonts.ready;
      } catch {
        // ignore
      }
      setTimeout(() => {
        window.print();
        setAutoPrinted(true);
      }, 800);
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
