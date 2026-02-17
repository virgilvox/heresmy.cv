"use client";

import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { HeaderBlockData } from "@/lib/blocks/types";
import { Camera, Loader2 } from "lucide-react";

interface Props {
  data: HeaderBlockData;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function HeaderBlockEditor({ data, onUpdate }: Props) {
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
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // Keep a ref to onUpdate so the effect always calls the latest version
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  // Sync avatar URL from storage to block data when it changes
  useEffect(() => {
    if (avatarUrl && avatarUrl !== data.avatarUrl) {
      onUpdateRef.current({ avatarUrl });
    }
  }, [avatarUrl, data.avatarUrl]);

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
    </div>
  );
}
