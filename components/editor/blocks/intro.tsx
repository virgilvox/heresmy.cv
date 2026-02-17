"use client";

import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Camera, Loader2, Bold, Italic, List, Link as LinkIcon } from "lucide-react";
import { cn, safeHref } from "@/lib/utils";
import type { IntroBlockData } from "@/lib/blocks/types";

interface Props {
  data: IntroBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function IntroBlockEditor({ data, onUpdate }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const profile = useQuery(api.profiles.getMyProfile);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const uploadAvatar = useMutation(api.profiles.uploadAvatar);
  const avatarUrl = useQuery(
    api.profiles.getAvatarUrl,
    profile?.avatarStorageId ? { storageId: profile.avatarStorageId } : "skip"
  );

  const initials = (data.name || "?").charAt(0).toUpperCase();

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5 MB.");
      return;
    }

    setUploading(true);
    try {
      const url = await generateUploadUrl();
      const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!result.ok) {
        throw new Error(`Upload failed (${result.status})`);
      }
      const { storageId } = await result.json();
      await uploadAvatar({ storageId });
    } catch (err) {
      console.error("Avatar upload failed:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useEffect(() => {
    if (avatarUrl && avatarUrl !== data.avatarUrl) {
      onUpdateRef.current({ avatarUrl });
    }
  }, [avatarUrl, data.avatarUrl]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write about yourself..." }),
    ],
    content: data.bio || "",
    onUpdate: ({ editor: ed }) => {
      onUpdateRef.current({ bio: ed.getHTML() });
    },
  });

  useEffect(() => {
    if (editor && data.bio !== undefined && editor.getHTML() !== data.bio) {
      editor.commands.setContent(data.bio);
    }
  }, [data.bio, editor]);

  const toolbarButtons = editor
    ? [
        { key: "bold", label: "Bold", icon: Bold, toggle: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
        { key: "italic", label: "Italic", icon: Italic, toggle: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
        { key: "bulletList", label: "Bullet list", icon: List, toggle: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
        {
          key: "link",
          label: "Insert link",
          icon: LinkIcon,
          toggle: () => {
            const url = window.prompt("URL:");
            if (url) {
              const safe = safeHref(url);
              if (safe === "#") {
                window.alert("Invalid URL. Only http, https, mailto, and tel links are allowed.");
                return;
              }
              editor.chain().focus().setLink({ href: safe }).run();
            }
          },
          active: editor.isActive("link"),
        },
      ]
    : [];

  return (
    <div className="space-y-3">
      {/* Avatar upload */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cv-accent to-orange-500 flex items-center justify-center text-2xl font-bold text-cv-bg font-serif shrink-0 overflow-hidden group cursor-pointer"
        >
          {avatarUrl || data.avatarUrl ? (
            <img
              src={avatarUrl || data.avatarUrl}
              alt={data.name || "Avatar"}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            {uploading ? (
              <Loader2 size={18} className="text-white animate-spin" />
            ) : (
              <Camera size={18} className="text-white" />
            )}
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="hidden"
        />
        <p className="text-xs text-cv-text-dim">Click to upload avatar</p>
      </div>

      <input
        value={data.name || ""}
        onChange={(e) => onUpdate({ name: e.target.value })}
        placeholder="Your name"
        className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2.5 text-xl font-bold font-serif text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
      />
      <input
        value={data.tagline || ""}
        onChange={(e) => onUpdate({ tagline: e.target.value })}
        placeholder="Tagline (e.g., Software Engineer · Open Source Enthusiast)"
        className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
      />
      <input
        value={data.location || ""}
        onChange={(e) => onUpdate({ location: e.target.value })}
        placeholder="Location (e.g., San Francisco, CA)"
        className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
      />

      {/* Bio rich text editor */}
      {editor && (
        <div>
          <div className="flex gap-1 mb-2 border-b border-cv-border pb-2">
            {toolbarButtons.map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.key}
                  type="button"
                  aria-label={btn.label}
                  onClick={btn.toggle}
                  className={cn(
                    "p-1.5 rounded text-xs transition-colors",
                    btn.active
                      ? "bg-cv-accent/20 text-cv-accent"
                      : "text-cv-text-muted hover:text-cv-text"
                  )}
                >
                  <Icon size={14} />
                </button>
              );
            })}
          </div>
          <EditorContent
            editor={editor}
            className="tiptap bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text min-h-[100px] outline-none focus-within:border-cv-accent transition-colors [&_.tiptap.ProseMirror]:outline-none [&_.tiptap.ProseMirror]:min-h-[80px]"
          />
        </div>
      )}

      {/* Quote fields */}
      <input
        value={data.quote || ""}
        onChange={(e) => onUpdate({ quote: e.target.value })}
        placeholder="Pull quote (optional)"
        className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
      />
      <input
        value={data.quoteAttribution || ""}
        onChange={(e) => onUpdate({ quoteAttribution: e.target.value })}
        placeholder="Quote attribution (optional)"
        className="w-full bg-cv-bg border border-cv-border rounded-md px-3 py-2 text-sm text-cv-text-muted placeholder:text-cv-text-dim outline-none focus:border-cv-accent transition-colors"
      />
    </div>
  );
}
