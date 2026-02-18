import type { HeadingBlockData } from "@/lib/blocks/types";

export function HeadingBlock({ data }: { data: HeadingBlockData }) {
  if (!data.text) return null;

  const Tag = data.level === "h3" ? "h3" : "h2";
  const sizeClass = data.level === "h3" ? "text-xl md:text-2xl" : "text-3xl md:text-4xl";

  return (
    <div className="mb-6" data-block="heading">
      <Tag className={`${sizeClass} font-bold text-cv-text`}>
        {data.text}
      </Tag>
      <div className="mt-1 w-12 h-1 bg-cv-accent rounded" />
    </div>
  );
}
