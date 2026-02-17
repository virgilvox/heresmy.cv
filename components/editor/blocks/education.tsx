"use client";

import { nanoid } from "nanoid";
import { Plus, Trash2 } from "lucide-react";
import type { EducationBlockData, EducationItem } from "@/lib/blocks/types";

interface Props {
  data: EducationBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function EducationBlockEditor({ data, onUpdate }: Props) {
  const items: EducationItem[] = data.items || [];

  function updateItem(id: string, patch: Partial<EducationItem>) {
    onUpdate({
      items: items.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  }

  function addItem() {
    const newItem: EducationItem = {
      id: nanoid(),
      school: "",
      degree: "",
      field: "",
      period: "",
      description: "",
      current: false,
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
                value={item.school}
                onChange={(e) => updateItem(item.id, { school: e.target.value })}
                placeholder="School or institution"
                className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm font-medium text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
              />
              <div className="flex gap-2">
                <input
                  value={item.degree}
                  onChange={(e) => updateItem(item.id, { degree: e.target.value })}
                  placeholder="Degree (e.g., B.S.)"
                  className="flex-1 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
                />
                <input
                  value={item.field}
                  onChange={(e) => updateItem(item.id, { field: e.target.value })}
                  placeholder="Field of study"
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

          <div className="flex items-center gap-3">
            <input
              value={item.period}
              onChange={(e) => updateItem(item.id, { period: e.target.value })}
              placeholder="Period (e.g., 2018 - 2022)"
              className="flex-1 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
            />
            <label className="flex items-center gap-1.5 text-xs text-cv-text-muted cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={item.current}
                onChange={(e) =>
                  updateItem(item.id, { current: e.target.checked })
                }
                className="rounded border-cv-border accent-cv-accent"
              />
              Current
            </label>
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
        Add education
      </button>
    </div>
  );
}
