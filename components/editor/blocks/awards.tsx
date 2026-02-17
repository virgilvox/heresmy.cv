"use client";

import { nanoid } from "nanoid";
import { Plus, Trash2 } from "lucide-react";
import type { AwardsBlockData, AwardItem } from "@/lib/blocks/types";

interface Props {
  data: AwardsBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function AwardsBlockEditor({ data, onUpdate }: Props) {
  const items: AwardItem[] = data.items || [];

  function updateItem(id: string, patch: Partial<AwardItem>) {
    onUpdate({
      items: items.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  }

  function addItem() {
    const newItem: AwardItem = {
      id: nanoid(),
      title: "",
      year: "",
      location: "",
      description: "",
    };
    onUpdate({ items: [...items, newItem] });
  }

  function removeItem(id: string) {
    onUpdate({ items: items.filter((item) => item.id !== id) });
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-cv-bg border border-cv-border rounded-lg p-3 space-y-2"
        >
          <div className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <input
                value={item.title}
                onChange={(e) => updateItem(item.id, { title: e.target.value })}
                placeholder="Award or achievement title"
                className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm font-medium text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
              />
              <div className="flex gap-2">
                <input
                  value={item.year}
                  onChange={(e) => updateItem(item.id, { year: e.target.value })}
                  placeholder="Year (e.g., 2015)"
                  className="w-32 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
                />
                <input
                  value={item.location || ""}
                  onChange={(e) => updateItem(item.id, { location: e.target.value })}
                  placeholder="Location (optional)"
                  className="flex-1 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="p-1.5 text-cv-text-dim hover:text-red-400 transition-colors shrink-0 mt-1"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <textarea
            value={item.description || ""}
            onChange={(e) =>
              updateItem(item.id, { description: e.target.value })
            }
            placeholder="Description (optional)"
            rows={2}
            className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors resize-vertical"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-cv-border rounded-lg px-4 py-3 text-sm text-cv-text-muted hover:text-cv-text hover:border-cv-accent transition-colors cursor-pointer"
      >
        <Plus size={14} />
        Add award
      </button>
    </div>
  );
}
