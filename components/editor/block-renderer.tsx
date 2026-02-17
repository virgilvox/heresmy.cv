"use client";

import type { Block } from "@/lib/blocks/types";
import { HeaderBlockEditor } from "./blocks/header";
import { BioBlockEditor } from "./blocks/bio";
import { IntroBlockEditor } from "./blocks/intro";
import { HeadingBlockEditor } from "./blocks/heading";
import { ExperienceBlockEditor } from "./blocks/experience";
import { SkillsBlockEditor } from "./blocks/skills";
import { ProjectsBlockEditor } from "./blocks/projects";
import { PublicationsBlockEditor } from "./blocks/publications";
import { LinksBlockEditor } from "./blocks/links";
import { VideoBlockEditor } from "./blocks/video";
import { ImageBlockEditor } from "./blocks/image";
import { CustomHtmlBlockEditor } from "./blocks/custom-html";
import { EducationBlockEditor } from "./blocks/education";
import { TestimonialsBlockEditor } from "./blocks/testimonials";
import { StatsBlockEditor } from "./blocks/stats";
import { AwardsBlockEditor } from "./blocks/awards";

interface BlockRendererProps {
  block: Block;
  onUpdate: (data: Record<string, unknown>) => void;
}

export function BlockRenderer({ block, onUpdate }: BlockRendererProps) {
  switch (block.type) {
    case "header":
      return <HeaderBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "bio":
      return <BioBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "intro":
      return <IntroBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "heading":
      return <HeadingBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "experience":
      return <ExperienceBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "skills":
      return <SkillsBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "projects":
      return <ProjectsBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "publications":
      return <PublicationsBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "links":
      return <LinksBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "video":
      return <VideoBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "image":
      return <ImageBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "custom-html":
      return <CustomHtmlBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "education":
      return <EducationBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "testimonials":
      return <TestimonialsBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "stats":
      return <StatsBlockEditor data={block.data} onUpdate={onUpdate} />;
    case "awards":
      return <AwardsBlockEditor data={block.data} onUpdate={onUpdate} />;
    default:
      return <div className="text-cv-text-dim text-sm">Unknown block type</div>;
  }
}
