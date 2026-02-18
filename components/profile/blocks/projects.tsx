import { ExternalLink } from "lucide-react";
import type { ProjectsBlockData } from "@/lib/blocks/types";
import { safeHref } from "@/lib/utils";

export function ProjectsBlock({ data }: { data: ProjectsBlockData }) {
  const items = data.items || [];

  if (items.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((project) => (
          <div
            key={project.id}
            className="group bg-cv-surface border border-cv-border rounded-xl overflow-hidden hover:border-cv-accent/40 transition-colors"
          >
            {project.imageUrl && (
              <div className="w-full h-36 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-5">
            {project.tag && (
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-cv-accent-glow text-cv-accent mb-3">
                {project.tag}
              </span>
            )}

            <h3 className="text-sm font-bold text-cv-text mb-1.5">
              {project.title}
            </h3>

            {project.description && (
              <p className="text-xs text-cv-text-muted leading-relaxed mb-3">
                {project.description}
              </p>
            )}

            {project.url && (
              <a
                href={safeHref(project.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-cv-accent hover:underline"
              >
                View project <ExternalLink size={11} />
              </a>
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
