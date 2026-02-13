"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Code, Share2, Check, X, Loader2 } from "lucide-react";
import { validateSlug as checkSlugFormat } from "@/lib/utils";

interface SettingsTabProps {
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  onUpdateSlug: (slug: string) => void;
  onUpdateSeo: (seo: { seoTitle?: string; seoDescription?: string }) => void;
}

export function SettingsTab({
  slug: currentSlug,
  seoTitle,
  seoDescription,
  onUpdateSlug,
  onUpdateSeo,
}: SettingsTabProps) {
  const [slugInput, setSlugInput] = useState(currentSlug);
  const [slugDirty, setSlugDirty] = useState(false);
  const [slugFormatError, setSlugFormatError] = useState<string | undefined>();

  // Only query availability when slug has changed from current and passes local validation
  const slugToCheck = slugDirty && slugInput.length >= 3 && !slugFormatError ? slugInput : "skip";
  const availability = useQuery(
    api.slugs.checkAvailability,
    slugToCheck !== "skip" ? { slug: slugToCheck } : "skip"
  );

  // Reset slug input when external slug changes
  useEffect(() => {
    setSlugInput(currentSlug);
    setSlugDirty(false);
  }, [currentSlug]);

  function handleSlugChange(value: string) {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setSlugInput(sanitized);
    const dirty = sanitized !== currentSlug;
    setSlugDirty(dirty);
    if (dirty && sanitized.length >= 3) {
      const result = checkSlugFormat(sanitized);
      setSlugFormatError(result.valid ? undefined : result.error);
    } else {
      setSlugFormatError(undefined);
    }
  }

  function handleSlugSave() {
    if (slugDirty && !slugFormatError && availability?.available) {
      onUpdateSlug(slugInput);
      setSlugDirty(false);
    }
  }

  function handlePdfDownload() {
    window.open(`/api/pdf?slug=${currentSlug}`, "_blank");
  }

  return (
    <div className="flex-1 overflow-auto p-3 space-y-6">
      {/* Page URL */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-cv-text-dim mb-3 px-1">
          Page URL
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-0 rounded-md border border-cv-border bg-cv-bg overflow-hidden focus-within:border-cv-accent transition-colors">
            <span className="text-xs text-cv-text-dim px-3 py-2 bg-cv-surface border-r border-cv-border shrink-0 select-none">
              heresmy.cv/
            </span>
            <input
              type="text"
              value={slugInput}
              onChange={(e) => handleSlugChange(e.target.value)}
              onBlur={handleSlugSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSlugSave();
              }}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-cv-text outline-none min-w-0"
              placeholder="your-name"
              maxLength={30}
            />
            {/* Status indicator */}
            <div className="pr-3 shrink-0">
              {slugDirty && slugInput.length >= 3 && (
                <>
                  {slugFormatError && (
                    <X size={14} className="text-red-400" />
                  )}
                  {!slugFormatError && availability === undefined && (
                    <Loader2 size={14} className="text-cv-text-dim animate-spin" />
                  )}
                  {!slugFormatError && availability?.available && (
                    <Check size={14} className="text-green-400" />
                  )}
                  {!slugFormatError && availability && !availability.available && (
                    <X size={14} className="text-red-400" />
                  )}
                </>
              )}
            </div>
          </div>
          {slugDirty && slugFormatError && (
            <p className="text-[11px] text-red-400 px-1">
              {slugFormatError}
            </p>
          )}
          {slugDirty && !slugFormatError && availability && !availability.available && (
            <p className="text-[11px] text-red-400 px-1">
              {availability.reason}
            </p>
          )}
        </div>
      </section>

      {/* SEO */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-cv-text-dim mb-3 px-1">
          SEO
        </p>
        <div className="space-y-3">
          <Input
            label="Page title"
            value={seoTitle || ""}
            onChange={(e) => onUpdateSeo({ seoTitle: e.target.value })}
            placeholder="Your Name — CV"
          />
          <Textarea
            label="Meta description"
            value={seoDescription || ""}
            onChange={(e) => onUpdateSeo({ seoDescription: e.target.value })}
            placeholder="A brief description for search engines..."
            rows={3}
          />
        </div>
      </section>

      {/* Export */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-cv-text-dim mb-3 px-1">
          Export
        </p>
        <div className="space-y-1.5">
          <button
            onClick={handlePdfDownload}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-cv-border text-sm text-cv-text hover:border-cv-accent hover:text-cv-accent transition-colors cursor-pointer"
          >
            <Download size={14} />
            Download PDF
          </button>
          <button
            disabled
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-cv-border text-sm text-cv-text-dim cursor-not-allowed opacity-60"
          >
            <Code size={14} />
            Export HTML (Coming soon)
          </button>
          <button
            disabled
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-cv-border text-sm text-cv-text-dim cursor-not-allowed opacity-60"
          >
            <Share2 size={14} />
            Export JSON (Coming soon)
          </button>
        </div>
      </section>
    </div>
  );
}
