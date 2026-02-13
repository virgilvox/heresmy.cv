"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableBlock } from "./sortable-block";
import type { Block } from "@/lib/blocks/types";

interface BlockCanvasProps {
  blocks: Block[];
  activeBlockId: string | null;
  onBlocksChange: (blocks: Block[]) => void;
  onSelectBlock: (id: string) => void;
  onUpdateBlock: (id: string, data: Record<string, unknown>) => void;
  onDeleteBlock: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

export function BlockCanvas({
  blocks,
  activeBlockId,
  onBlocksChange,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onToggleVisibility,
}: BlockCanvasProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      onBlocksChange(arrayMove(blocks, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={blocks.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {blocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              isActive={activeBlockId === block.id}
              onSelect={() => onSelectBlock(block.id)}
              onUpdate={(data) => onUpdateBlock(block.id, data)}
              onDelete={() => onDeleteBlock(block.id)}
              onToggleVisibility={() => onToggleVisibility(block.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
