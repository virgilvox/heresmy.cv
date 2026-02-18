"use client";

import type { Block } from "@/lib/blocks/types";
import { cn } from "@/lib/utils";
import { HeaderBlock } from "./blocks/header";
import { BioBlock } from "./blocks/bio";
import { IntroBlock } from "./blocks/intro";
import { HeadingBlock } from "./blocks/heading";
import { ExperienceBlock } from "./blocks/experience";
import { SkillsBlock } from "./blocks/skills";
import { ProjectsBlock } from "./blocks/projects";
import { PublicationsBlock } from "./blocks/publications";
import { LinksBlock } from "./blocks/links";
import { VideoBlock } from "./blocks/video";
import { ImageBlock } from "./blocks/image";
import { CustomHtmlBlock } from "./blocks/custom-html";
import { EducationBlock } from "./blocks/education";
import { TestimonialsBlock } from "./blocks/testimonials";
import { StatsBlock } from "./blocks/stats";
import { AwardsBlock } from "./blocks/awards";

import {
  Briefcase,
  Wrench,
  FolderOpen,
  BookOpen,
  Link as LinkIcon,
  Play,
  Image as ImageIcon,
  Code,
  GraduationCap,
  MessageSquareQuote,
  BarChart3,
  Trophy,
} from "lucide-react";

const sectionMeta: Record<
  string,
  { label: string; icon: React.ComponentType<{ size?: number; className?: string }> } | undefined
> = {
  experience: { label: "Experience", icon: Briefcase },
  skills: { label: "Skills", icon: Wrench },
  projects: { label: "Projects", icon: FolderOpen },
  publications: { label: "Publications", icon: BookOpen },
  links: { label: "Links", icon: LinkIcon },
  video: { label: "Videos", icon: Play },
  image: { label: "Image", icon: ImageIcon },
  "custom-html": { label: "Custom", icon: Code },
  education: { label: "Education", icon: GraduationCap },
  testimonials: { label: "Testimonials", icon: MessageSquareQuote },
  stats: { label: "Stats", icon: BarChart3 },
  awards: { label: "Awards & Achievements", icon: Trophy },
};

function SectionHeader({ type }: { type: string }) {
  const meta = sectionMeta[type];
  if (!meta) return null;

  const Icon = meta.icon;

  return (
    <div className="flex items-center gap-2 mb-6" data-section-header>
      <Icon size={18} className="text-cv-accent" />
      <h2 className="text-sm font-semibold uppercase tracking-wider text-cv-accent">
        {meta.label}
      </h2>
    </div>
  );
}

// ── Band types ──────────────────────────────────────────────────────────────

interface Band {
  key: string;
  blocks: Block[];
  isHero: boolean;
}

/**
 * Group visible blocks into "bands" — full-width sections with alternating
 * backgrounds. Heading blocks get merged into the next band. Intro blocks
 * are always standalone hero bands. Everything else gets its own band.
 */
function groupIntoBands(blocks: Block[]): Band[] {
  const bands: Band[] = [];
  let pendingHeading: Block | null = null;

  for (const block of blocks) {
    if (block.type === "intro") {
      bands.push({ key: block.id, blocks: [block], isHero: true });
    } else if (block.type === "heading") {
      pendingHeading = block;
    } else {
      const bandBlocks = pendingHeading
        ? [pendingHeading, block]
        : [block];
      pendingHeading = null;
      bands.push({ key: block.id, blocks: bandBlocks, isHero: false });
    }
  }

  // Trailing heading with no following block
  if (pendingHeading) {
    bands.push({
      key: pendingHeading.id,
      blocks: [pendingHeading],
      isHero: false,
    });
  }

  return bands;
}

// ── Block content renderer ──────────────────────────────────────────────────

function renderBlockContent(block: Block) {
  switch (block.type) {
    case "header":
      return <HeaderBlock key={block.id} data={block.data} />;
    case "bio":
      return <BioBlock key={block.id} data={block.data} />;
    case "intro":
      return <IntroBlock key={block.id} data={block.data} />;
    case "heading":
      return <HeadingBlock key={block.id} data={block.data} />;
    case "experience":
      return (
        <div key={block.id} data-block-type="experience">
          <SectionHeader type="experience" />
          <ExperienceBlock data={block.data} />
        </div>
      );
    case "skills":
      return (
        <div key={block.id} data-block-type="skills">
          <SectionHeader type="skills" />
          <SkillsBlock data={block.data} />
        </div>
      );
    case "projects":
      return (
        <div key={block.id} data-block-type="projects">
          <SectionHeader type="projects" />
          <ProjectsBlock data={block.data} />
        </div>
      );
    case "publications":
      return (
        <div key={block.id} data-block-type="publications">
          <SectionHeader type="publications" />
          <PublicationsBlock data={block.data} />
        </div>
      );
    case "links":
      return (
        <div key={block.id} data-block-type="links">
          <SectionHeader type="links" />
          <LinksBlock data={block.data} />
        </div>
      );
    case "video":
      return (
        <div key={block.id} data-block-type="video">
          <SectionHeader type="video" />
          <VideoBlock data={block.data} />
        </div>
      );
    case "image":
      return (
        <div key={block.id} data-block-type="image">
          <SectionHeader type="image" />
          <ImageBlock data={block.data} />
        </div>
      );
    case "custom-html":
      return (
        <div key={block.id} data-block-type="custom-html">
          <SectionHeader type="custom-html" />
          <CustomHtmlBlock data={block.data} />
        </div>
      );
    case "education":
      return (
        <div key={block.id} data-block-type="education">
          <SectionHeader type="education" />
          <EducationBlock data={block.data} />
        </div>
      );
    case "testimonials":
      return (
        <div key={block.id} data-block-type="testimonials">
          <SectionHeader type="testimonials" />
          <TestimonialsBlock data={block.data} />
        </div>
      );
    case "stats":
      return (
        <div key={block.id} data-block-type="stats">
          <SectionHeader type="stats" />
          <StatsBlock data={block.data} />
        </div>
      );
    case "awards":
      return (
        <div key={block.id} data-block-type="awards">
          <SectionHeader type="awards" />
          <AwardsBlock data={block.data} />
        </div>
      );
    default:
      return null;
  }
}

// ── Main renderer ───────────────────────────────────────────────────────────

export function ProfileRenderer({ blocks }: { blocks: Block[] }) {
  const visibleBlocks = blocks.filter((b) => b.visible);
  const bands = groupIntoBands(visibleBlocks);

  // Track alternation index for non-hero bands only
  let nonHeroIndex = 0;

  return (
    <main role="main" aria-label="Profile">
      {bands.map((band) => {
        const isHero = band.isHero;
        const isAlt = !isHero && nonHeroIndex % 2 === 1;
        if (!isHero) nonHeroIndex++;

        // Derive an aria-label from the primary block type
        const primaryBlock = band.blocks.find((b) => b.type !== "heading") || band.blocks[0];
        const meta = sectionMeta[primaryBlock.type];
        const sectionLabel = meta?.label || primaryBlock.type;

        return (
          <section
            key={band.key}
            data-band={isHero ? "hero" : undefined}
            aria-label={sectionLabel}
            className={cn(
              isHero
                ? "bg-cv-bg py-14 md:py-20"
                : isAlt
                  ? "py-12 md:py-14 section-alt"
                  : "bg-cv-bg py-12 md:py-14"
            )}
          >
            <div className="max-w-5xl mx-auto px-6">
              {band.blocks.map((block) => renderBlockContent(block))}
            </div>
          </section>
        );
      })}

      <footer className="bg-cv-bg text-center py-10 border-t border-cv-border">
        <p className="text-xs text-cv-text-dim">
          Built with{" "}
          <a href="/" className="text-cv-accent hover:underline">
            heresmy.cv
          </a>
        </p>
      </footer>
    </main>
  );
}
