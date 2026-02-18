"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockRenderer } from "./block-renderer";
import { blockRegistry } from "@/lib/blocks/registry";
import type { Block } from "@/lib/blocks/types";
import { GripVertical, Trash2, Eye, EyeOff, ChevronDown, ChevronRight, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableBlockProps {
  block: Block;
  isActive: boolean;
  onSelect: () => void;
  onUpdate: (data: Record<string, unknown>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onToggleVisibility: () => void;
}

export function SortableBlock({
  block,
  isActive,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onToggleVisibility,
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const meta = blockRegistry[block.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-cv-surface border rounded-lg transition-all",
        isActive
          ? "border-cv-accent/40 shadow-[0_0_0_1px_var(--cv-accent)/20]"
          : "border-cv-border",
        isDragging && "opacity-50 z-50",
        !block.visible && "opacity-50"
      )}
    >
      {/* Block Header */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2.5 cursor-pointer select-none",
          isActive && "border-b border-cv-border"
        )}
        onClick={onSelect}
      >
        <button
          aria-label="Drag to reorder"
          className="cursor-grab text-cv-text-dim hover:text-cv-text-muted touch-none shrink-0"
          onClick={(e) => e.stopPropagation()}
          {...attributes}
          {...listeners}
        >
          <GripVertical size={14} />
        </button>
        <div className="text-cv-text-dim shrink-0">
          {isActive ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-cv-accent flex-1 truncate">
          {meta?.label || block.type}
        </span>
        <button
          aria-label={block.visible ? "Hide block" : "Show block"}
          className="p-1.5 text-cv-text-dim hover:text-cv-text-muted transition-colors shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
        >
          {block.visible ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>
        <button
          aria-label="Duplicate block"
          className="p-1.5 text-cv-text-dim hover:text-cv-accent transition-colors shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
        >
          <Copy size={14} />
        </button>
        <button
          aria-label="Delete block"
          className="p-1.5 text-cv-text-dim hover:text-red-400 transition-colors shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Block Content (expanded when active) */}
      {isActive && (
        <div className="p-3">
          <BlockRenderer block={block} onUpdate={onUpdate} />
        </div>
      )}
    </div>
  );
}
