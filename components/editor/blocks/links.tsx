"use client";

import { nanoid } from "nanoid";
import { Plus, Trash2 } from "lucide-react";
import type { LinksBlockData, LinkItem } from "@/lib/blocks/types";

const ICON_OPTIONS = [
  { value: "globe", label: "Globe" },
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
  { value: "mail", label: "Mail" },
  { value: "youtube", label: "YouTube" },
  { value: "link", label: "Link" },
] as const;

interface Props {
  data: LinksBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function LinksBlockEditor({ data, onUpdate }: Props) {
  const items: LinkItem[] = data.items || [];

  function updateItem(id: string, patch: Partial<LinkItem>) {
    onUpdate({
      items: items.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  }

  function addItem() {
    const newItem: LinkItem = {
      id: nanoid(),
      icon: "globe",
      label: "",
      url: "",
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
              <div className="flex gap-2">
                <select
                  value={item.icon}
                  onChange={(e) =>
                    updateItem(item.id, { icon: e.target.value })
                  }
                  className="w-28 bg-cv-bg border border-cv-border rounded-md px-2 py-2 text-sm text-cv-text outline-none focus:border-cv-accent transition-colors cursor-pointer"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <input
                  value={item.label}
                  onChange={(e) =>
                    updateItem(item.id, { label: e.target.value })
                  }
                  placeholder="Label (e.g., My Website)"
                  className="flex-1 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
                />
              </div>
              <input
                value={item.url}
                onChange={(e) =>
                  updateItem(item.id, { url: e.target.value })
                }
                placeholder="URL (e.g., https://example.com)"
                className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
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
        Add link
      </button>
    </div>
  );
}
