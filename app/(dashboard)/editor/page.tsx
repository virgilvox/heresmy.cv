"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { BlockCanvas } from "@/components/editor/block-canvas";
import { Sidebar } from "@/components/editor/sidebar/sidebar";
import { AddBlockMenu } from "@/components/editor/add-block-menu";
import { ProfileRenderer } from "@/components/profile/profile-renderer";
import { ThemeDecorations } from "@/components/profile/decorations";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getTheme } from "@/lib/themes/registry";
import { createBlock, duplicateBlock } from "@/lib/blocks/types";
import type { Block, BlockType } from "@/lib/blocks/types";
import { useDebouncedCallback } from "use-debounce";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { validateSlug as checkSlugFormat } from "@/lib/utils";
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
  Eye,
  EyeOff,
  RefreshCw,
  Loader2,
  Share2,
  Pencil,
  Link2,
} from "lucide-react";

function InlineSlugEditor({
  slug,
  onSave,
  onCopy,
  copied,
  variant = "desktop",
}: {
  slug: string;
  onSave: (slug: string) => void;
  onCopy: () => void;
  copied: boolean;
  variant?: "desktop" | "mobile";
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(slug);
  const [formatError, setFormatError] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  const isDirty = value !== slug;
  const slugToCheck = isDirty && value.length >= 3 && !formatError ? value : "skip";
  const availability = useQuery(
    api.slugs.checkAvailability,
    slugToCheck !== "skip" ? { slug: slugToCheck } : "skip"
  );

  useEffect(() => {
    if (editing) {
      setValue(slug);
      setFormatError(undefined);
      requestAnimationFrame(() => inputRef.current?.select());
    }
  }, [editing, slug]);

  function handleChange(raw: string) {
    const sanitized = raw.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setValue(sanitized);
    if (sanitized !== slug && sanitized.length >= 3) {
      const result = checkSlugFormat(sanitized);
      setFormatError(result.valid ? undefined : result.error);
    } else {
      setFormatError(undefined);
    }
  }

  function handleSave() {
    if (isDirty && !formatError && availability?.available) {
      onSave(value);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") setEditing(false);
  }

  const isMobile = variant === "mobile";
  const wrapperClass = isMobile ? "sm:hidden" : "hidden sm:flex";
  const prefix = isMobile ? "heresmy.cv/" : "/";

  if (!editing) {
    return (
      <div className={`${wrapperClass} flex items-center gap-1.5 min-w-0 bg-cv-bg/50 border border-cv-border rounded-md px-2 py-1 ${isMobile ? "px-3 py-2" : ""}`}>
        <span className="text-cv-text-dim shrink-0 text-xs">{prefix}</span>
        <span
          className="text-cv-text text-xs truncate cursor-pointer hover:text-cv-accent transition-colors"
          onDoubleClick={() => setEditing(true)}
        >
          {slug}
        </span>
        <button
          onClick={() => setEditing(true)}
          className="shrink-0 p-0.5 text-cv-text-muted hover:text-cv-accent transition-colors cursor-pointer"
          aria-label="Edit slug"
        >
          <Pencil size={12} />
        </button>
        <button
          onClick={onCopy}
          className="shrink-0 p-0.5 text-cv-text-muted hover:text-cv-accent transition-colors cursor-pointer ml-auto"
          aria-label="Copy profile URL"
        >
          {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
        </button>
      </div>
    );
  }

  return (
    <div className={`${wrapperClass} flex flex-col gap-1`}>
      <div className={`flex items-center gap-0 rounded-md border border-cv-accent bg-cv-bg overflow-hidden ${isMobile ? "px-1" : ""}`}>
        <span className={`text-xs text-cv-text-dim shrink-0 select-none ${isMobile ? "px-2 py-2" : "px-2 py-1"}`}>{prefix}</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={`flex-1 bg-transparent text-xs text-cv-text outline-none min-w-0 pr-1 ${isMobile ? "py-2" : "py-1 w-32"}`}
          maxLength={30}
          aria-label="Edit slug"
        />
        <div className="pr-2 shrink-0 flex items-center">
          {isDirty && value.length >= 3 && (
            <>
              {formatError && <X size={13} className="text-red-400" />}
              {!formatError && availability === undefined && (
                <Loader2 size={13} className="text-cv-text-dim animate-spin" />
              )}
              {!formatError && availability?.available && (
                <Check size={13} className="text-green-400" />
              )}
              {!formatError && availability && !availability.available && (
                <X size={13} className="text-red-400" />
              )}
            </>
          )}
        </div>
      </div>
      {isDirty && (formatError || (availability && !availability.available)) && (
        <p className="text-[10px] text-red-400 leading-tight">
          {formatError || availability?.reason}
        </p>
      )}
    </div>
  );
}

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
  const [showPreview, setShowPreview] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDirtyRef = useRef(false);

  // Sync blocks from server on load
  useEffect(() => {
    if (profile && !initialized) {
      setBlocks(profile.blocks as Block[]);
      setInitialized(true);
    }
  }, [profile, initialized]);

  // Warn on unsaved changes when navigating away
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirtyRef.current) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

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
          isDirtyRef.current = false;
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
      isDirtyRef.current = true;
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

  const handleDuplicateBlock = useCallback(
    (blockId: string) => {
      const idx = blocks.findIndex((b) => b.id === blockId);
      if (idx === -1) return;
      const cloned = duplicateBlock(blocks[idx]);
      const newBlocks = [...blocks];
      newBlocks.splice(idx + 1, 0, cloned);
      handleBlocksChange(newBlocks);
      setActiveBlockId(cloned.id);
    },
    [blocks, handleBlocksChange]
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

  const handlePublish = useCallback(async () => {
    if (!profile) return;
    debouncedSaveBlocks.flush();
    await publish({ isPublished: true });
  }, [profile, publish, debouncedSaveBlocks]);

  const handleUnpublish = useCallback(() => {
    if (!profile) return;
    if (!confirm("This will take your page offline. Continue?")) return false;
    void publish({ isPublished: false });
    return true;
  }, [profile, publish]);

  const hasUnpublishedChanges = useMemo(() => {
    if (!profile?.isPublished || !profile.publishedBlocks) return false;
    return (
      JSON.stringify(blocks) !== JSON.stringify(profile.publishedBlocks) ||
      profile.themeId !== profile.publishedThemeId ||
      JSON.stringify(profile.customizations) !== JSON.stringify(profile.publishedCustomizations)
    );
  }, [blocks, profile]);

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

            {/* Editable URL bar — desktop only */}
            <InlineSlugEditor
              slug={profile.slug}
              onSave={(slug) => void updateSlug({ slug })}
              onCopy={handleCopyUrl}
              copied={copied}
            />
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

            {/* Preview toggle */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs border rounded-md transition-colors cursor-pointer ${
                showPreview
                  ? "border-cv-accent text-cv-accent bg-cv-accent/10"
                  : "border-cv-border text-cv-text hover:border-cv-accent"
              }`}
            >
              <Eye size={14} />
              <span className="hidden sm:inline">Preview</span>
            </button>

            {/* Share button — only when published */}
            {profile.isPublished && (
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs border border-cv-border rounded-md text-cv-text hover:border-cv-accent transition-colors cursor-pointer"
              >
                <Share2 size={14} />
                <span className="hidden sm:inline">Share</span>
              </button>
            )}

            {/* Publish button — 3 states */}
            {!profile.isPublished ? (
              <button
                onClick={() => void handlePublish()}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-bold bg-cv-accent text-cv-bg rounded-md hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
              >
                <Check size={14} />
                Publish
              </button>
            ) : hasUnpublishedChanges ? (
              <button
                onClick={() => void handlePublish()}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-bold bg-cv-accent text-cv-bg rounded-md hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
              >
                <RefreshCw size={14} />
                <span className="relative">
                  Republish
                  <span className="absolute -top-1 -right-2.5 w-2 h-2 bg-amber-400 rounded-full" />
                </span>
              </button>
            ) : (
              <span className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-bold bg-cv-accent/20 text-cv-accent rounded-md whitespace-nowrap">
                <Check size={14} />
                Published
              </span>
            )}

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
                    {profile.isPublished && (
                      <a
                        href={`/${profile.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowAccountMenu(false)}
                        className="w-full flex items-center gap-2 text-left px-3 py-2 text-xs text-cv-text hover:bg-cv-bg transition-colors cursor-pointer"
                      >
                        <ExternalLink size={13} />
                        View live page
                      </a>
                    )}
                    {profile.isPublished && (
                      <>
                        <div className="border-t border-cv-border my-1" />
                        <button
                          onClick={() => {
                            if (handleUnpublish()) setShowAccountMenu(false);
                          }}
                          className="w-full flex items-center gap-2 text-left px-3 py-2 text-xs text-cv-text hover:bg-cv-bg transition-colors cursor-pointer"
                        >
                          <EyeOff size={13} />
                          Take offline
                        </button>
                      </>
                    )}
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
          {/* Block Canvas / Preview */}
          {showPreview ? (
            <div className="flex-1 overflow-auto relative">
              <ThemeDecorations type={getTheme(profile.themeId)?.decorations} />
              <ProfileRenderer blocks={blocks} />
            </div>
          ) : (
            <div className="flex-1 overflow-auto p-4 md:p-8">
              <div className="max-w-[680px] mx-auto">
                {/* Mobile URL bar — tap pencil to edit slug */}
                <div className="mb-4">
                  <InlineSlugEditor
                    slug={profile.slug}
                    onSave={(slug) => void updateSlug({ slug })}
                    onCopy={handleCopyUrl}
                    copied={copied}
                    variant="mobile"
                  />
                </div>
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
                  onDuplicateBlock={handleDuplicateBlock}
                  onToggleVisibility={handleToggleVisibility}
                />
                <AddBlockMenu onAdd={handleAddBlock} />
              </div>
            </div>
          )}

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
            <div className="md:hidden fixed inset-0 top-13 z-40 bg-cv-bg/80 backdrop-blur-sm" onClick={() => setShowMobileSidebar(false)}>
              <div className="absolute right-0 top-0 bottom-0 w-72 bg-cv-surface border-l border-cv-border flex flex-col" onClick={(e) => e.stopPropagation()}>
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

        {/* Share modal */}
        {showShareModal && (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => { setShowShareModal(false); setShareCopied(false); }}
            />
            <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cv-surface border border-cv-border rounded-xl shadow-2xl w-[90vw] max-w-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-cv-text">Share your page</h2>
                <button
                  onClick={() => { setShowShareModal(false); setShareCopied(false); }}
                  className="p-1 text-cv-text-muted hover:text-cv-text transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* URL display */}
              <div className="flex items-center gap-2 bg-cv-bg border border-cv-border rounded-md px-3 py-2.5 mb-4">
                <Link2 size={14} className="text-cv-text-dim shrink-0" />
                <span className="text-xs text-cv-text truncate flex-1">
                  heresmy.cv/{profile.slug}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    void navigator.clipboard.writeText(`https://heresmy.cv/${profile.slug}`);
                    setShareCopied(true);
                    setTimeout(() => setShareCopied(false), 2000);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold bg-cv-accent text-cv-bg rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {shareCopied ? (
                    <>
                      <Check size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy link
                    </>
                  )}
                </button>
                {typeof navigator !== "undefined" && navigator.share && (
                  <button
                    onClick={() => {
                      void navigator.share({
                        title: "heresmy.cv",
                        url: `https://heresmy.cv/${profile.slug}`,
                      }).then(() => setShowShareModal(false));
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold border border-cv-border text-cv-text rounded-md hover:border-cv-accent hover:text-cv-accent transition-colors cursor-pointer"
                  >
                    <Share2 size={14} />
                    Share via...
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
