"use client";

import Image from "next/image";
import DOMPurify from "dompurify";
import { MapPin } from "lucide-react";
import type { IntroBlockData } from "@/lib/blocks/types";

export function IntroBlock({ data }: { data: IntroBlockData }) {
  const initials = (data.name || "?").charAt(0).toUpperCase();

  return (
    <div className="mb-12">
      {/* Two-column layout: bio left, profile card right */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column: name + bio */}
        <div className="flex-1 min-w-0">
          {data.name && (
            <div className="mb-6">
              <h1 className="text-4xl font-bold tracking-tight">
                {data.name}
              </h1>
              <div className="mt-2 h-1 w-24 bg-cv-accent rounded-full" />
            </div>
          )}

          {data.bio && (
            <div
              className="text-base leading-relaxed text-cv-text space-y-4 prose-a:text-cv-accent prose-p:mb-3"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.bio) }}
            />
          )}
        </div>

        {/* Right column: profile card */}
        <div className="shrink-0 w-full md:w-64">
          <div className="border-2 border-dashed border-cv-border rounded-lg p-6 flex flex-col items-center gap-3">
            {/* Avatar with accent ring */}
            <div className="w-24 h-24 rounded-full ring-4 ring-cv-accent ring-offset-2 ring-offset-cv-bg bg-gradient-to-br from-cv-accent to-orange-500 flex items-center justify-center text-3xl font-bold text-cv-bg font-serif overflow-hidden">
              {data.avatarUrl ? (
                <Image
                  src={data.avatarUrl}
                  alt={data.name || "Avatar"}
                  width={96}
                  height={96}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            {data.tagline && (
              <p className="text-sm text-cv-text-muted text-center leading-snug mt-1">
                {data.tagline}
              </p>
            )}

            {data.location && (
              <div className="flex items-center gap-1.5 text-cv-text-dim text-sm">
                <MapPin size={13} className="text-cv-accent" /> {data.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Optional pull quote */}
      {data.quote && (
        <blockquote className="mt-10 border-l-4 border-cv-accent pl-5 py-3">
          <p className="text-lg italic text-cv-text-muted leading-relaxed">
            &ldquo;{data.quote}&rdquo;
          </p>
          {data.quoteAttribution && (
            <cite className="block mt-2 text-sm text-cv-text-dim not-italic">
              &mdash; {data.quoteAttribution}
            </cite>
          )}
        </blockquote>
      )}
    </div>
  );
}
