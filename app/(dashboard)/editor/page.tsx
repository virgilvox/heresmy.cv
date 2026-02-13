"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useCallback, useEffect, useRef } from "react";
import { BlockCanvas } from "@/components/editor/block-canvas";
import { Sidebar } from "@/components/editor/sidebar/sidebar";
import { AddBlockMenu } from "@/components/editor/add-block-menu";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { createBlock } from "@/lib/blocks/types";
import type { Block, BlockType } from "@/lib/blocks/types";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import {
  Eye,
  Check,
  Menu,
  X,
} from "lucide-react";

export default function EditorPage() {
  const profile = useQuery(api.profiles.getMyProfile);
  const updateBlocks = useMutation(api.profiles.updateBlocks);
  const updateTheme = useMutation(api.profiles.updateTheme);
  const updateCustomizations = useMutation(api.profiles.updateCustomizations);
  const updateSlug = useMutation(api.profiles.updateSlug);
  const updateSeo = useMutation(api.profiles.updateSeo);
  const publish = useMutation(api.profiles.publish);
  const createProfile = useMutation(api.profiles.createProfile);

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [sidebarTab, setSidebarTab] = useState<"blocks" | "style" | "settings">("blocks");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const creatingRef = useRef(false);

  // Sync blocks from server on load
  useEffect(() => {
    if (profile && !initialized) {
      setBlocks(profile.blocks as Block[]);
      setInitialized(true);
    }
  }, [profile, initialized]);

  // Create profile if none exists
  useEffect(() => {
    if (profile === null && !creatingRef.current) {
      creatingRef.current = true;
      const slug = `user-${Math.random().toString(36).slice(2, 8)}`;
      void createProfile({ slug });
    }
  }, [profile, createProfile]);

  // Debounced save to Convex
  const debouncedSaveBlocks = useDebouncedCallback(
    (newBlocks: Block[]) => {
      if (profile) {
        void updateBlocks({ blocks: newBlocks });
      }
    },
    500
  );

  const handleBlocksChange = useCallback(
    (newBlocks: Block[]) => {
      setBlocks(newBlocks);
      debouncedSaveBlocks(newBlocks);
    },
    [debouncedSaveBlocks]
  );

  const handleAddBlock = useCallback(
    (type: BlockType) => {
      const newBlock = createBlock(type);
      const newBlocks = [...blocks, newBlock];
      handleBlocksChange(newBlocks);
      setActiveBlockId(newBlock.id);
    },
    [blocks, handleBlocksChange]
  );

  const handleDeleteBlock = useCallback(
    (blockId: string) => {
      const newBlocks = blocks.filter((b) => b.id !== blockId);
      handleBlocksChange(newBlocks);
      if (activeBlockId === blockId) {
        setActiveBlockId(null);
      }
    },
    [blocks, activeBlockId, handleBlocksChange]
  );

  const handleUpdateBlock = useCallback(
    (blockId: string, data: Record<string, unknown>) => {
      const newBlocks = blocks.map((b) =>
        b.id === blockId
          ? ({ ...b, data: { ...b.data, ...data } } as Block)
          : b
      );
      handleBlocksChange(newBlocks);
    },
    [blocks, handleBlocksChange]
  );

  const handleToggleVisibility = useCallback(
    (blockId: string) => {
      const newBlocks = blocks.map((b) =>
        b.id === blockId ? { ...b, visible: !b.visible } : b
      );
      handleBlocksChange(newBlocks);
    },
    [blocks, handleBlocksChange]
  );

  if (!profile) {
    return (
      <div className="min-h-screen bg-cv-bg flex items-center justify-center">
        <div className="text-cv-text-muted text-sm">Loading editor...</div>
      </div>
    );
  }

  return (
    <ThemeProvider
      themeId={profile.themeId}
      customizations={profile.customizations}
    >
      <div className="h-screen flex flex-col bg-cv-bg text-cv-text font-mono">
        {/* Top Bar */}
        <div className="h-13 bg-cv-surface border-b border-cv-border flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-serif font-bold text-cv-text text-base"
            >
              heresmy<span className="text-cv-accent">.</span>cv
            </Link>
            <span className="text-cv-text-dim">/</span>
            <span className="text-cv-text-muted text-sm">
              Editing: {profile.slug}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <button
              aria-label="Toggle sidebar"
              className="md:hidden p-2 text-cv-text-muted"
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            >
              {showMobileSidebar ? <X size={18} /> : <Menu size={18} />}
            </button>
            <Link
              href={`/${profile.slug}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs border border-cv-border rounded-md text-cv-text hover:border-cv-accent transition-colors"
            >
              <Eye size={14} /> Preview
            </Link>
            <button
              onClick={() => void publish({ isPublished: !profile.isPublished })}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-cv-accent text-cv-bg rounded-md hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Check size={14} />
              {profile.isPublished ? "Published" : "Publish"}
            </button>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Block Canvas */}
          <div className="flex-1 overflow-auto p-4 md:p-8">
            <div className="max-w-[680px] mx-auto">
              <BlockCanvas
                blocks={blocks}
                activeBlockId={activeBlockId}
                onBlocksChange={handleBlocksChange}
                onSelectBlock={setActiveBlockId}
                onUpdateBlock={handleUpdateBlock}
                onDeleteBlock={handleDeleteBlock}
                onToggleVisibility={handleToggleVisibility}
              />
              <AddBlockMenu onAdd={handleAddBlock} />
            </div>
          </div>

          {/* Sidebar — desktop */}
          <div className="hidden md:flex w-72 border-l border-cv-border bg-cv-surface flex-col shrink-0">
            <Sidebar
              tab={sidebarTab}
              onTabChange={setSidebarTab}
              blocks={blocks}
              activeBlockId={activeBlockId}
              onSelectBlock={setActiveBlockId}
              profile={profile}
              onUpdateTheme={(themeId) => void updateTheme({ themeId })}
              onUpdateCustomizations={(c) => void updateCustomizations({ customizations: c })}
              onUpdateSlug={(slug) => void updateSlug({ slug })}
              onUpdateSeo={(seo) => void updateSeo(seo)}
            />
          </div>

          {/* Sidebar — mobile overlay */}
          {showMobileSidebar && (
            <div className="md:hidden fixed inset-0 top-13 z-40 bg-cv-bg/80 backdrop-blur-sm">
              <div className="absolute right-0 top-0 bottom-0 w-72 bg-cv-surface border-l border-cv-border flex flex-col">
                <Sidebar
                  tab={sidebarTab}
                  onTabChange={setSidebarTab}
                  blocks={blocks}
                  activeBlockId={activeBlockId}
                  onSelectBlock={(id) => {
                    setActiveBlockId(id);
                    setShowMobileSidebar(false);
                  }}
                  profile={profile}
                  onUpdateTheme={(themeId) => void updateTheme({ themeId })}
                  onUpdateCustomizations={(c) => void updateCustomizations({ customizations: c })}
                  onUpdateSlug={(slug) => void updateSlug({ slug })}
                  onUpdateSeo={(seo) => void updateSeo(seo)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
