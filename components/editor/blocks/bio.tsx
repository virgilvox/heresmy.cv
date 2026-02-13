"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { Bold, Italic, List, Link as LinkIcon } from "lucide-react";
import { cn, safeHref } from "@/lib/utils";
import type { BioBlockData } from "@/lib/blocks/types";

interface Props {
  data: BioBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function BioBlockEditor({ data, onUpdate }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write about yourself..." }),
    ],
    content: data.content || "",
    onUpdate: ({ editor: ed }) => {
      onUpdate({ content: ed.getHTML() });
    },
  });

  // Sync external changes (e.g. undo/redo from parent)
  useEffect(() => {
    if (
      editor &&
      data.content !== undefined &&
      editor.getHTML() !== data.content
    ) {
      editor.commands.setContent(data.content);
    }
  }, [data.content, editor]);

  if (!editor) return null;

  const toolbarButtons = [
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
  ];

  return (
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
  );
}
