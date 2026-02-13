"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import type {
  PublicationsBlockData,
  PublicationCategory,
  PublicationItem,
} from "@/lib/blocks/types";

interface Props {
  data: PublicationsBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function PublicationsBlockEditor({ data, onUpdate }: Props) {
  const categories: PublicationCategory[] = data.categories || [];
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function toggleCollapse(id: string) {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  // ── Category operations ─────────────────────────────────────────────────

  function addCategory() {
    const newCat: PublicationCategory = {
      id: nanoid(),
      name: "",
      items: [],
    };
    onUpdate({ categories: [...categories, newCat] });
  }

  function removeCategory(id: string) {
    onUpdate({ categories: categories.filter((c) => c.id !== id) });
  }

  function updateCategoryName(id: string, name: string) {
    onUpdate({
      categories: categories.map((c) =>
        c.id === id ? { ...c, name } : c
      ),
    });
  }

  // ── Item operations ─────────────────────────────────────────────────────

  function addItem(categoryId: string) {
    const newItem: PublicationItem = {
      id: nanoid(),
      title: "",
      source: "",
      url: "",
      year: "",
    };
    onUpdate({
      categories: categories.map((c) =>
        c.id === categoryId ? { ...c, items: [...c.items, newItem] } : c
      ),
    });
  }

  function removeItem(categoryId: string, itemId: string) {
    onUpdate({
      categories: categories.map((c) =>
        c.id === categoryId
          ? { ...c, items: c.items.filter((i) => i.id !== itemId) }
          : c
      ),
    });
  }

  function updateItem(
    categoryId: string,
    itemId: string,
    patch: Partial<PublicationItem>
  ) {
    onUpdate({
      categories: categories.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              items: c.items.map((i) =>
                i.id === itemId ? { ...i, ...patch } : i
              ),
            }
          : c
      ),
    });
  }

  return (
    <div className="space-y-3">
      {categories.map((cat) => {
        const isCollapsed = collapsed[cat.id] ?? false;

        return (
          <div
            key={cat.id}
            className="bg-cv-bg border border-cv-border rounded-lg overflow-hidden"
          >
            {/* Category header */}
            <div className="flex items-center gap-2 px-3 py-2.5">
              <button
                type="button"
                onClick={() => toggleCollapse(cat.id)}
                className="text-cv-text-dim hover:text-cv-text-muted transition-colors shrink-0"
              >
                {isCollapsed ? (
                  <ChevronRight size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </button>
              <input
                value={cat.name}
                onChange={(e) => updateCategoryName(cat.id, e.target.value)}
                placeholder="Category name (e.g., Journal Articles)"
                className="flex-1 bg-transparent border-none text-sm font-medium text-cv-text placeholder:text-cv-text-dim outline-none"
              />
              <span className="text-xs text-cv-text-dim shrink-0">
                {cat.items.length} item{cat.items.length !== 1 ? "s" : ""}
              </span>
              <button
                type="button"
                onClick={() => removeCategory(cat.id)}
                className="p-1 text-cv-text-dim hover:text-red-400 transition-colors shrink-0"
              >
                <Trash2 size={13} />
              </button>
            </div>

            {/* Category items */}
            {!isCollapsed && (
              <div className="px-3 pb-3 space-y-2">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-cv-surface border border-cv-border rounded-md p-2.5 space-y-2"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1 space-y-2">
                        <input
                          value={item.title}
                          onChange={(e) =>
                            updateItem(cat.id, item.id, {
                              title: e.target.value,
                            })
                          }
                          placeholder="Publication title"
                          className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm font-medium text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
                        />
                        <div className="flex gap-2">
                          <input
                            value={item.source}
                            onChange={(e) =>
                              updateItem(cat.id, item.id, {
                                source: e.target.value,
                              })
                            }
                            placeholder="Source (e.g., Nature, IEEE)"
                            className="flex-1 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
                          />
                          <input
                            value={item.year}
                            onChange={(e) =>
                              updateItem(cat.id, item.id, {
                                year: e.target.value,
                              })
                            }
                            placeholder="Year"
                            className="w-20 bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
                          />
                        </div>
                        <input
                          value={item.url}
                          onChange={(e) =>
                            updateItem(cat.id, item.id, {
                              url: e.target.value,
                            })
                          }
                          placeholder="URL (optional)"
                          className="w-full bg-transparent border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(cat.id, item.id)}
                        className="p-1.5 text-cv-text-dim hover:text-red-400 transition-colors shrink-0 mt-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addItem(cat.id)}
                  className="w-full flex items-center justify-center gap-2 border border-dashed border-cv-border rounded-md px-3 py-2 text-xs text-cv-text-muted hover:text-cv-text hover:border-cv-accent transition-colors cursor-pointer"
                >
                  <Plus size={12} />
                  Add publication
                </button>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={addCategory}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-cv-border rounded-lg px-4 py-3 text-sm text-cv-text-muted hover:text-cv-text hover:border-cv-accent transition-colors cursor-pointer"
      >
        <Plus size={14} />
        Add category
      </button>
    </div>
  );
}
