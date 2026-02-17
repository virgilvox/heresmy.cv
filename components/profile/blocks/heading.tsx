import type { HeadingBlockData } from "@/lib/blocks/types";

export function HeadingBlock({ data }: { data: HeadingBlockData }) {
  if (!data.text) return null;

  const Tag = data.level === "h3" ? "h3" : "h2";
  const sizeClass = data.level === "h3" ? "text-lg" : "text-2xl";

  return (
    <div className="mb-6 mt-10">
      <Tag className={`${sizeClass} font-bold text-cv-text`}>
        {data.text}
      </Tag>
      <div className="mt-1 w-8 h-0.5 bg-cv-accent rounded" />
    </div>
  );
}
