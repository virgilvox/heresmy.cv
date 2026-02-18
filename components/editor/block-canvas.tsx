"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableBlock } from "./sortable-block";
import { blockRegistry } from "@/lib/blocks/registry";
import type { Block } from "@/lib/blocks/types";

interface BlockCanvasProps {
  blocks: Block[];
  activeBlockId: string | null;
  onBlocksChange: (blocks: Block[]) => void;
  onSelectBlock: (id: string) => void;
  onUpdateBlock: (id: string, data: Record<string, unknown>) => void;
  onDeleteBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

export function BlockCanvas({
  blocks,
  activeBlockId,
  onBlocksChange,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onToggleVisibility,
}: BlockCanvasProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      onBlocksChange(arrayMove(blocks, oldIndex, newIndex));
    }
  }

  const activeBlock = activeId ? blocks.find((b) => b.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={blocks.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {blocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              isActive={activeBlockId === block.id}
              onSelect={() => onSelectBlock(block.id)}
              onUpdate={(data) => onUpdateBlock(block.id, data)}
              onDelete={() => onDeleteBlock(block.id)}
              onDuplicate={() => onDuplicateBlock(block.id)}
              onToggleVisibility={() => onToggleVisibility(block.id)}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay dropAnimation={null}>
        {activeBlock && (
          <div className="bg-cv-surface border border-cv-accent/40 rounded-lg px-3 py-2.5 shadow-lg opacity-90 scale-95">
            <span className="text-xs font-bold uppercase tracking-wider text-cv-accent">
              {blockRegistry[activeBlock.type]?.label || activeBlock.type}
            </span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
