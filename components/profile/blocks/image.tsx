import Image from "next/image";
import type { ImageBlockData } from "@/lib/blocks/types";

export function ImageBlock({ data }: { data: ImageBlockData }) {
  if (!data.url) return null;

  return (
    <div>
      <figure>
        <div className="rounded-lg overflow-hidden border border-cv-border bg-cv-surface">
          <Image
            src={data.url}
            alt={data.alt || ""}
            width={680}
            height={400}
            className="w-full h-auto object-cover"
            loading="lazy"
            unoptimized
          />
        </div>
        {data.caption && (
          <figcaption className="text-xs text-cv-text-dim text-center mt-2">
            {data.caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
