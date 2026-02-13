import Image from "next/image";
import { MapPin } from "lucide-react";
import type { HeaderBlockData } from "@/lib/blocks/types";

export function HeaderBlock({ data }: { data: HeaderBlockData }) {
  const initials = (data.name || "?").charAt(0).toUpperCase();

  return (
    <div className="mb-12">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cv-accent to-orange-500 flex items-center justify-center mb-6 text-3xl font-bold text-cv-bg font-serif">
        {data.avatarUrl ? (
          <Image
            src={data.avatarUrl}
            alt={data.name || "Avatar"}
            width={80}
            height={80}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      {data.name && (
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {data.name}
        </h1>
      )}

      {data.tagline && (
        <p className="text-base text-cv-text-muted mb-4">{data.tagline}</p>
      )}

      {data.location && (
        <div className="flex items-center gap-1.5 text-cv-text-dim text-sm">
          <MapPin size={13} /> {data.location}
        </div>
      )}
    </div>
  );
}
