"use client";

import Image from "next/image";
import DOMPurify from "dompurify";
import { MapPin } from "lucide-react";
import type { IntroBlockData } from "@/lib/blocks/types";

export function IntroBlock({ data }: { data: IntroBlockData }) {
  const initials = (data.name || "?").charAt(0).toUpperCase();

  return (
    <div className="flex flex-col md:flex-row md:items-start md:gap-12 gap-8">
      {/* Left column: name, tagline, bio, quote */}
      <div className="flex-1 min-w-0">
        {data.name && (
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            {data.name}
          </h1>
        )}

        <div className="h-1 w-20 bg-cv-accent mb-6" />

        {data.tagline && (
          <p className="text-lg md:text-xl text-cv-text-muted max-w-2xl mb-4 leading-relaxed">
            {data.tagline}
          </p>
        )}

        {data.bio && (
          <div
            className="text-base leading-relaxed text-cv-text max-w-2xl space-y-4 prose-a:text-cv-accent prose-p:mb-3"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.bio) }}
          />
        )}

        {data.quote && (
          <blockquote className="mt-8 max-w-xl border-l-4 border-cv-accent pl-5 py-3">
            <p className="text-lg italic text-cv-text-muted leading-relaxed">
              &ldquo;{data.quote}&rdquo;
            </p>
            {data.quoteAttribution && (
              <cite className="block mt-2 text-sm text-cv-text-dim not-italic">
                {data.quoteAttribution}
              </cite>
            )}
          </blockquote>
        )}
      </div>

      {/* Right column: avatar, location */}
      <div className="shrink-0 flex flex-col items-center md:items-end gap-4">
        <div className="w-36 h-36 md:w-40 md:h-40 rounded-full ring-4 ring-cv-accent ring-offset-4 ring-offset-cv-bg bg-gradient-to-br from-cv-accent to-orange-500 flex items-center justify-center text-5xl font-bold text-cv-bg font-serif overflow-hidden">
          {data.avatarUrl ? (
            <Image
              src={data.avatarUrl}
              alt={data.name || "Avatar"}
              width={160}
              height={160}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        {data.location && (
          <div className="flex items-center gap-1.5 text-cv-text-dim text-sm">
            <MapPin size={14} className="text-cv-accent" /> {data.location}
          </div>
        )}
      </div>
    </div>
  );
}
