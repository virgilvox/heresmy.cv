"use client";

import type { Block } from "@/lib/blocks/types";
import { HeaderBlockEditor } from "./blocks/header";
import { BioBlockEditor } from "./blocks/bio";
import { ExperienceBlockEditor } from "./blocks/experience";
import { SkillsBlockEditor } from "./blocks/skills";
import { ProjectsBlockEditor } from "./blocks/projects";
import { PublicationsBlockEditor } from "./blocks/publications";
import { LinksBlockEditor } from "./blocks/links";
import { VideoBlockEditor } from "./blocks/video";
import { ImageBlockEditor } from "./blocks/image";
import { CustomHtmlBlockEditor } from "./blocks/custom-html";

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
    default:
      return <div className="text-cv-text-dim text-sm">Unknown block type</div>;
  }
}
