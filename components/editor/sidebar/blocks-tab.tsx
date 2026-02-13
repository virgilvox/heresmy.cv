"use client";

import type { Block, BlockType } from "@/lib/blocks/types";
import { blockRegistry } from "@/lib/blocks/registry";
import {
  User,
  FileText,
  Briefcase,
  Code,
  Layers,
  BookOpen,
  Link,
  Play,
  Image,
  Code2,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  User,
  FileText,
  Briefcase,
  Code,
  Layers,
  BookOpen,
  Link,
  Play,
  Image,
  Code2,
};

interface BlocksTabProps {
  blocks: Block[];
  activeBlockId: string | null;
  onSelectBlock: (id: string) => void;
}

export function BlocksTab({
  blocks,
  activeBlockId,
  onSelectBlock,
}: BlocksTabProps) {
  if (blocks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-cv-text-dim text-xs text-center leading-relaxed">
          No blocks yet. Use the canvas below to add your first content block.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-3">
      <p className="text-[10px] uppercase tracking-wider text-cv-text-dim mb-3 px-1">
        Page structure
      </p>
      <div className="space-y-1">
        {blocks.map((block, index) => {
          const meta = blockRegistry[block.type as BlockType];
          if (!meta) return null;

          const IconComponent = iconMap[meta.icon];
          const isActive = activeBlockId === block.id;

          return (
            <button
              key={block.id}
              onClick={() => onSelectBlock(block.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer group",
                isActive
                  ? "bg-cv-accent/10 border border-cv-accent/30 text-cv-text"
                  : "bg-transparent border border-transparent text-cv-text-muted hover:bg-cv-surface-hover hover:text-cv-text"
              )}
            >
              <span className="text-cv-text-dim text-[10px] font-mono w-4 text-right shrink-0">
                {index + 1}
              </span>
              {IconComponent && (
                <IconComponent size={14} />
              )}
              <span className="text-xs font-medium truncate flex-1">
                {meta.label}
              </span>
              {!block.visible && (
                <EyeOff size={12} className="text-cv-text-dim shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
