"use client";

import type { BlockType } from "@/lib/blocks/types";
import { blockRegistry } from "@/lib/blocks/registry";
import {
  User,
  FileText,
  Briefcase,
  Code,
  Layers,
  BookOpen,
  Link,
  Play,
  Image,
  Code2,
  UserCircle,
  Type,
  GraduationCap,
  Quote,
  BarChart3,
  Trophy,
} from "lucide-react";

const iconMap = {
  User, FileText, Briefcase, Code, Layers, BookOpen, Link, Play, Image, Code2,
  UserCircle, Type, GraduationCap, Quote, BarChart3, Trophy,
} as Record<string, React.ComponentType<{ size?: number }>>;

interface AddBlockMenuProps {
  onAdd: (type: BlockType) => void;
}

export function AddBlockMenu({ onAdd }: AddBlockMenuProps) {
  const types = (Object.entries(blockRegistry) as [BlockType, (typeof blockRegistry)[BlockType]][])
    .filter(([, meta]) => !meta.hidden);

  return (
    <div className="border-2 border-dashed border-cv-border rounded-xl p-6 text-center mt-4">
      <p className="text-cv-text-dim text-sm mb-4">Add a content block</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {types.map(([type, meta]) => {
          const IconComponent = iconMap[meta.icon];
          return (
            <button
              key={type}
              onClick={() => onAdd(type)}
              className="flex items-center gap-1.5 bg-cv-surface border border-cv-border rounded-lg px-3 py-2 text-xs text-cv-text hover:border-cv-accent transition-colors cursor-pointer"
            >
              {IconComponent && <IconComponent size={13} />}
              {meta.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
