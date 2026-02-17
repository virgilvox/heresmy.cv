"use client";

import { nanoid } from "nanoid";
import { Plus, Trash2 } from "lucide-react";
import type { TestimonialsBlockData, TestimonialItem } from "@/lib/blocks/types";

interface Props {
  data: TestimonialsBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function TestimonialsBlockEditor({ data, onUpdate }: Props) {
  const items: TestimonialItem[] = data.items || [];

  function updateItem(id: string, patch: Partial<TestimonialItem>) {
    onUpdate({
      items: items.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  }

  function addItem() {
    const newItem: TestimonialItem = {
      id: nanoid(),
      quote: "",
      author: "",
      role: "",
      org: "",
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
              <textarea
                value={item.quote}
                onChange={(e) => updateItem(item.id, { quote: e.target.value })}
                placeholder="Testimonial quote"
                rows={4}
                className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors resize-vertical"
              />
              <input
                value={item.author}
                onChange={(e) => updateItem(item.id, { author: e.target.value })}
                placeholder="Author name"
                className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm font-medium text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
              />
              <div className="flex gap-2">
                <input
                  value={item.role || ""}
                  onChange={(e) => updateItem(item.id, { role: e.target.value })}
                  placeholder="Role (optional)"
                  className="flex-1 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
                />
                <input
                  value={item.org || ""}
                  onChange={(e) => updateItem(item.id, { org: e.target.value })}
                  placeholder="Organization (optional)"
                  className="flex-1 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
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
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-cv-border rounded-lg px-4 py-3 text-sm text-cv-text-muted hover:text-cv-text hover:border-cv-accent transition-colors cursor-pointer"
      >
        <Plus size={14} />
        Add testimonial
      </button>
    </div>
  );
}
