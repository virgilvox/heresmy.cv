"use client";

import { nanoid } from "nanoid";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StatsBlockData, StatItem } from "@/lib/blocks/types";

interface Props {
  data: StatsBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

const layoutOptions: { value: StatsBlockData["layout"]; label: string }[] = [
  { value: "row", label: "Row" },
  { value: "grid", label: "Grid" },
];

export function StatsBlockEditor({ data, onUpdate }: Props) {
  const items: StatItem[] = data.items || [];
  const layout = data.layout || "row";

  function updateItem(id: string, patch: Partial<StatItem>) {
    onUpdate({
      items: items.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
      layout,
    });
  }

  function addItem() {
    const newItem: StatItem = {
      id: nanoid(),
      value: "",
      label: "",
    };
    onUpdate({ items: [...items, newItem], layout });
  }

  function removeItem(id: string) {
    onUpdate({ items: items.filter((item) => item.id !== id), layout });
  }

  return (
    <div className="space-y-3">
      {/* Layout selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-cv-text-dim uppercase tracking-wider">
          Layout
        </span>
        <div className="flex gap-1">
          {layoutOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onUpdate({ items, layout: opt.value })}
              className={cn(
                "px-2.5 py-1 rounded text-xs transition-colors",
                layout === opt.value
                  ? "bg-cv-accent/20 text-cv-accent"
                  : "bg-cv-bg text-cv-text-muted hover:text-cv-text border border-cv-border"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="bg-cv-bg border border-cv-border rounded-lg p-3"
        >
          <div className="flex items-start gap-2">
            <div className="flex-1 flex gap-2">
              <input
                value={item.value}
                onChange={(e) => updateItem(item.id, { value: e.target.value })}
                placeholder="Value (e.g., 50+)"
                className="w-28 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm font-bold text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
              />
              <input
                value={item.label}
                onChange={(e) => updateItem(item.id, { label: e.target.value })}
                placeholder="Label (e.g., Projects Shipped)"
                className="flex-1 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="p-1.5 text-cv-text-dim hover:text-red-400 transition-colors shrink-0 mt-1"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-cv-border rounded-lg px-4 py-3 text-sm text-cv-text-muted hover:text-cv-text hover:border-cv-accent transition-colors cursor-pointer"
      >
        <Plus size={14} />
        Add stat
      </button>
    </div>
  );
}
