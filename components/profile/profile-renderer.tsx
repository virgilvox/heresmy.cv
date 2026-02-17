import type { Block } from "@/lib/blocks/types";
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
    <div className="flex items-center gap-2 mb-5">
      <Icon size={13} className="text-cv-accent" />
      <h2 className="text-xs font-semibold uppercase tracking-wider text-cv-accent">
        {meta.label}
      </h2>
    </div>
  );
}

function renderBlock(block: Block) {
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
        <div key={block.id}>
          <SectionHeader type="experience" />
          <ExperienceBlock data={block.data} />
        </div>
      );
    case "skills":
      return (
        <div key={block.id}>
          <SectionHeader type="skills" />
          <SkillsBlock data={block.data} />
        </div>
      );
    case "projects":
      return (
        <div key={block.id}>
          <SectionHeader type="projects" />
          <ProjectsBlock data={block.data} />
        </div>
      );
    case "publications":
      return (
        <div key={block.id}>
          <SectionHeader type="publications" />
          <PublicationsBlock data={block.data} />
        </div>
      );
    case "links":
      return (
        <div key={block.id}>
          <SectionHeader type="links" />
          <LinksBlock data={block.data} />
        </div>
      );
    case "video":
      return (
        <div key={block.id}>
          <SectionHeader type="video" />
          <VideoBlock data={block.data} />
        </div>
      );
    case "image":
      return (
        <div key={block.id}>
          <SectionHeader type="image" />
          <ImageBlock data={block.data} />
        </div>
      );
    case "custom-html":
      return (
        <div key={block.id}>
          <SectionHeader type="custom-html" />
          <CustomHtmlBlock data={block.data} />
        </div>
      );
    case "education":
      return (
        <div key={block.id}>
          <SectionHeader type="education" />
          <EducationBlock data={block.data} />
        </div>
      );
    case "testimonials":
      return (
        <div key={block.id}>
          <SectionHeader type="testimonials" />
          <TestimonialsBlock data={block.data} />
        </div>
      );
    case "stats":
      return (
        <div key={block.id}>
          <SectionHeader type="stats" />
          <StatsBlock data={block.data} />
        </div>
      );
    case "awards":
      return (
        <div key={block.id}>
          <SectionHeader type="awards" />
          <AwardsBlock data={block.data} />
        </div>
      );
    default:
      return null;
  }
}

export function ProfileRenderer({ blocks }: { blocks: Block[] }) {
  const visibleBlocks = blocks.filter((b) => b.visible);

  return (
    <div className="max-w-[640px] mx-auto px-6 py-20">
      {visibleBlocks.map((block) => renderBlock(block))}

      <footer className="text-center pt-10 border-t border-cv-border">
        <p className="text-xs text-cv-text-dim">
          Built with{" "}
          <a href="/" className="text-cv-accent hover:underline">
            heresmy.cv
          </a>
        </p>
      </footer>
    </div>
  );
}
