"use client";

import DOMPurify from "dompurify";
import type { BioBlockData } from "@/lib/blocks/types";

export function BioBlock({ data }: { data: BioBlockData }) {
  if (!data.content) return null;

  return (
    <div className="mb-12">
      <div
        className="text-base leading-relaxed text-cv-text prose-a:text-cv-accent"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }}
      />
    </div>
  );
}
