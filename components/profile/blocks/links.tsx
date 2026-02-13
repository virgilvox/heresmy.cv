import {
  Globe,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Youtube,
  Link as LinkIcon,
} from "lucide-react";
import type { LinksBlockData } from "@/lib/blocks/types";
import { safeHref } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  globe: Globe,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  youtube: Youtube,
  link: LinkIcon,
};

export function LinksBlock({ data }: { data: LinksBlockData }) {
  const items = data.items || [];

  if (items.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-2.5">
        {items.map((item) => {
          const Icon = iconMap[item.icon] || Globe;

          return (
            <a
              key={item.id}
              href={safeHref(item.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-cv-surface border border-cv-border rounded-lg text-sm text-cv-text hover:border-cv-accent/40 hover:text-cv-accent transition-colors"
            >
              <Icon size={15} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
