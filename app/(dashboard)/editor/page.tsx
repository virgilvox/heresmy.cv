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
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Check,
  Menu,
  X,
  Copy,
  ExternalLink,
  LogOut,
  Cloud,
  MoreVertical,
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
  const { signOut } = useAuthActions();
  const router = useRouter();

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [sidebarTab, setSidebarTab] = useState<"blocks" | "style" | "settings">("blocks");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const creatingRef = useRef(false);

  // UX state
  const [copied, setCopied] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync blocks from server on load
  useEffect(() => {
    if (profile && !initialized) {
      setBlocks(profile.blocks as Block[]);
      setInitialized(true);
    }
  }, [profile, initialized]);

  // Create profile if none exists (retry with new slug on collision)
  useEffect(() => {
    if (profile === null && !creatingRef.current) {
      creatingRef.current = true;
      const attempt = async (retries = 3) => {
        for (let i = 0; i < retries; i++) {
          try {
            const slug = `user-${Math.random().toString(36).slice(2, 8)}`;
            await createProfile({ slug });
            return;
          } catch {
            if (i === retries - 1) creatingRef.current = false;
          }
        }
      };
      void attempt();
    }
  }, [profile, createProfile]);

  // Debounced save to Convex with status tracking
  const debouncedSaveBlocks = useDebouncedCallback(
    async (newBlocks: Block[]) => {
      if (profile) {
        setSaveStatus("saving");
        try {
          await updateBlocks({ blocks: newBlocks });
          setSaveStatus("saved");
          if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
          saveTimeoutRef.current = setTimeout(() => setSaveStatus("idle"), 2000);
        } catch {
          setSaveStatus("idle");
        }
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

  const handleToggleBlock = useCallback(
    (id: string) => {
      setActiveBlockId((prev) => (prev === id ? null : id));
    },
    []
  );

  const handleCopyUrl = useCallback(() => {
    if (!profile) return;
    void navigator.clipboard.writeText(`https://heresmy.cv/${profile.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [profile]);

  const handlePublishToggle = useCallback(() => {
    if (!profile) return;
    if (profile.isPublished) {
      if (!confirm("This will take your page offline. Continue?")) return;
    }
    void publish({ isPublished: !profile.isPublished });
  }, [profile, publish]);

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
        <div className="h-13 bg-cv-surface border-b border-cv-border flex items-center justify-between px-3 sm:px-4 shrink-0 gap-2">
          {/* Left: Logo + URL */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href="/"
              className="font-serif font-bold text-cv-text text-base shrink-0"
            >
              heresmy<span className="text-cv-accent">.</span>cv
            </Link>

            {/* Copyable URL bar — desktop only */}
            <div className="hidden sm:flex items-center gap-1.5 min-w-0 bg-cv-bg/50 border border-cv-border rounded-md px-2 py-1">
              <span className="text-cv-text-dim shrink-0">/</span>
              <span className="text-cv-text text-xs truncate">{profile.slug}</span>
              <button
                onClick={handleCopyUrl}
                className="shrink-0 p-0.5 text-cv-text-muted hover:text-cv-accent transition-colors cursor-pointer"
                aria-label="Copy profile URL"
              >
                {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Save indicator */}
            {saveStatus !== "idle" && (
              <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-cv-text-muted">
                {saveStatus === "saving" ? (
                  <>
                    <Cloud size={14} className="animate-pulse" />
                    <span className="hidden sm:inline">Saving...</span>
                  </>
                ) : (
                  <>
                    <Check size={14} className="text-green-500" />
                    <span className="hidden sm:inline text-green-500">Saved</span>
                  </>
                )}
              </div>
            )}

            {/* Preview — opens in new tab */}
            <a
              href={`/${profile.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs border border-cv-border rounded-md text-cv-text hover:border-cv-accent transition-colors"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Preview</span>
            </a>

            {/* Publish button */}
            <button
              onClick={handlePublishToggle}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-bold bg-cv-accent text-cv-bg rounded-md hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
            >
              <Check size={14} />
              {profile.isPublished ? "Published" : "Publish"}
            </button>

            {/* More menu — contains copy URL + sign out */}
            <div className="relative">
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex p-2 text-cv-text-muted hover:text-cv-accent transition-colors cursor-pointer"
                aria-label="More options"
              >
                <MoreVertical size={16} />
              </button>
              {showAccountMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowAccountMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 z-50 bg-cv-surface border border-cv-border rounded-md shadow-lg py-1 min-w-[160px]">
                    <button
                      onClick={() => {
                        handleCopyUrl();
                        setShowAccountMenu(false);
                      }}
                      className="w-full flex items-center gap-2 text-left px-3 py-2 text-xs text-cv-text hover:bg-cv-bg transition-colors cursor-pointer"
                    >
                      <Copy size={13} />
                      Copy URL
                    </button>
                    <div className="border-t border-cv-border my-1" />
                    <button
                      onClick={() => {
                        void signOut().then(() => router.push("/"));
                      }}
                      className="w-full flex items-center gap-2 text-left px-3 py-2 text-xs text-red-500 hover:bg-cv-bg transition-colors cursor-pointer"
                    >
                      <LogOut size={13} />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile sidebar toggle */}
            <button
              aria-label="Toggle sidebar"
              className="md:hidden p-2 text-cv-text-muted cursor-pointer"
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            >
              {showMobileSidebar ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Block Canvas */}
          <div className="flex-1 overflow-auto p-4 md:p-8">
            <div className="max-w-[680px] mx-auto">
              {/* Empty state for new users */}
              {blocks.length === 0 && (
                <div className="text-center py-12 mb-6">
                  <h2 className="text-lg font-bold text-cv-text mb-2">Start building your CV</h2>
                  <p className="text-sm text-cv-text-muted">
                    Add your first block below. Start with a Header for your name and tagline.
                  </p>
                </div>
              )}
              <BlockCanvas
                blocks={blocks}
                activeBlockId={activeBlockId}
                onBlocksChange={handleBlocksChange}
                onSelectBlock={handleToggleBlock}
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
              onSelectBlock={handleToggleBlock}
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
                    handleToggleBlock(id);
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
