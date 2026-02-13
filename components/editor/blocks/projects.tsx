"use client";

import { nanoid } from "nanoid";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import type { ProjectsBlockData, ProjectItem } from "@/lib/blocks/types";

interface Props {
  data: ProjectsBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function ProjectsBlockEditor({ data, onUpdate }: Props) {
  const items: ProjectItem[] = data.items || [];

  function updateItem(id: string, patch: Partial<ProjectItem>) {
    onUpdate({
      items: items.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  }

  function addItem() {
    const newItem: ProjectItem = {
      id: nanoid(),
      title: "",
      description: "",
      tag: "",
      url: "",
      imageUrl: "",
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
            <input
              value={item.title}
              onChange={(e) => updateItem(item.id, { title: e.target.value })}
              placeholder="Project title"
              className="flex-1 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm font-medium text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
            />
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="p-1.5 text-cv-text-dim hover:text-red-400 transition-colors shrink-0 mt-1"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <textarea
            value={item.description}
            onChange={(e) =>
              updateItem(item.id, { description: e.target.value })
            }
            placeholder="Describe this project..."
            rows={2}
            className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors resize-vertical"
          />

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={item.tag}
              onChange={(e) => updateItem(item.id, { tag: e.target.value })}
              placeholder="Tag (e.g., Open Source)"
              className="sm:flex-1 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
            />
            <div className="sm:flex-1 relative">
              <input
                value={item.url}
                onChange={(e) => updateItem(item.id, { url: e.target.value })}
                placeholder="URL (e.g., https://github.com/...)"
                className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 pr-8 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
              />
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-cv-text-dim hover:text-cv-accent transition-colors"
                >
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-cv-border rounded-lg px-4 py-3 text-sm text-cv-text-muted hover:text-cv-text hover:border-cv-accent transition-colors cursor-pointer"
      >
        <Plus size={14} />
        Add project
      </button>
    </div>
  );
}
