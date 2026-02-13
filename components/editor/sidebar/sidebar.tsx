"use client";

import type { Block } from "@/lib/blocks/types";
import { BlocksTab } from "./blocks-tab";
import { StyleTab } from "./style-tab";
import { SettingsTab } from "./settings-tab";
import { cn } from "@/lib/utils";
import { LayoutGrid, Paintbrush, Settings } from "lucide-react";

type TabId = "blocks" | "style" | "settings";

interface SidebarProps {
  tab: TabId;
  onTabChange: (tab: TabId) => void;
  blocks: Block[];
  activeBlockId: string | null;
  onSelectBlock: (id: string) => void;
  profile: any;
  onUpdateTheme: (themeId: string) => void;
  onUpdateCustomizations: (c: {
    accentColor?: string;
    fontFamily?: string;
  }) => void;
  onUpdateSlug: (slug: string) => void;
  onUpdateSeo: (seo: {
    seoTitle?: string;
    seoDescription?: string;
  }) => void;
}

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "blocks", label: "Blocks", icon: LayoutGrid },
  { id: "style", label: "Style", icon: Paintbrush },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  tab,
  onTabChange,
  blocks,
  activeBlockId,
  onSelectBlock,
  profile,
  onUpdateTheme,
  onUpdateCustomizations,
  onUpdateSlug,
  onUpdateSeo,
}: SidebarProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
      <div className="flex border-b border-cv-border shrink-0">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors cursor-pointer",
              tab === id
                ? "text-cv-accent border-b-2 border-cv-accent"
                : "text-cv-text-muted hover:text-cv-text"
            )}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "blocks" && (
        <BlocksTab
          blocks={blocks}
          activeBlockId={activeBlockId}
          onSelectBlock={onSelectBlock}
        />
      )}

      {tab === "style" && (
        <StyleTab
          currentThemeId={profile.themeId}
          currentAccentColor={profile.customizations?.accentColor}
          currentFontFamily={profile.customizations?.fontFamily}
          onUpdateTheme={onUpdateTheme}
          onUpdateCustomizations={onUpdateCustomizations}
        />
      )}

      {tab === "settings" && (
        <SettingsTab
          slug={profile.slug}
          isPublished={profile.isPublished}
          seoTitle={profile.seoTitle}
          seoDescription={profile.seoDescription}
          onUpdateSlug={onUpdateSlug}
          onUpdateSeo={onUpdateSeo}
        />
      )}
    </div>
  );
}
