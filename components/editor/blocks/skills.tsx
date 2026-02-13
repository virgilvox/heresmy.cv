"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SkillsBlockData } from "@/lib/blocks/types";

interface Props {
  data: SkillsBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

const layoutOptions: { value: SkillsBlockData["layout"]; label: string }[] = [
  { value: "pills", label: "Pills" },
  { value: "list", label: "List" },
  { value: "grid", label: "Grid" },
];

export function SkillsBlockEditor({ data, onUpdate }: Props) {
  const items: string[] = data.items || [];
  const layout = data.layout || "pills";
  const [inputValue, setInputValue] = useState("");

  function addSkill() {
    const skill = inputValue.trim();
    if (!skill || items.includes(skill)) return;
    onUpdate({ items: [...items, skill], layout });
    setInputValue("");
  }

  function removeSkill(index: number) {
    onUpdate({
      items: items.filter((_, i) => i !== index),
      layout,
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
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

      {/* Skill pills */}
      <div className="flex flex-wrap gap-1.5">
        {items.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="inline-flex items-center gap-1 bg-cv-bg border border-cv-border rounded-full px-2.5 py-1 text-xs text-cv-text"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="text-cv-text-dim hover:text-red-400 transition-colors"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      {/* Add skill input */}
      <div className="flex gap-2">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter"
          className="flex-1 bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
        />
        <button
          type="button"
          onClick={addSkill}
          disabled={!inputValue.trim()}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-md text-xs transition-colors",
            inputValue.trim()
              ? "bg-cv-accent/20 text-cv-accent hover:bg-cv-accent/30 cursor-pointer"
              : "bg-cv-bg text-cv-text-dim border border-cv-border cursor-not-allowed"
          )}
        >
          <Plus size={14} />
          Add
        </button>
      </div>
    </div>
  );
}
