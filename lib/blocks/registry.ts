import type { BlockType } from "./types";

export interface BlockMeta {
  label: string;
  icon: string;
  description: string;
  defaultData: Record<string, unknown>;
}

export const blockRegistry: Record<BlockType, BlockMeta> = {
  header: {
    label: "Header",
    icon: "User",
    description: "Your name, tagline, location, and avatar",
    defaultData: { name: "", tagline: "", location: "", avatarUrl: "" },
  },
  bio: {
    label: "Bio",
    icon: "FileText",
    description: "A rich-text biography or summary section",
    defaultData: { content: "" },
  },
  experience: {
    label: "Experience",
    icon: "Briefcase",
    description: "Work history with roles, organizations, and descriptions",
    defaultData: { items: [] },
  },
  skills: {
    label: "Skills",
    icon: "Code",
    description: "A list of skills displayed as pills, a list, or a grid",
    defaultData: { items: [], layout: "pills" },
  },
  projects: {
    label: "Projects",
    icon: "Layers",
    description: "Showcase projects with descriptions, tags, and links",
    defaultData: { items: [] },
  },
  publications: {
    label: "Publications",
    icon: "BookOpen",
    description: "Articles, papers, and other publications organized by category",
    defaultData: { categories: [] },
  },
  links: {
    label: "Links",
    icon: "Link",
    description: "Social links, portfolios, and other URLs",
    defaultData: { items: [] },
  },
  video: {
    label: "Video",
    icon: "Play",
    description: "Embedded video content organized by category",
    defaultData: { items: [] },
  },
  image: {
    label: "Image",
    icon: "Image",
    description: "A single image with alt text and an optional caption",
    defaultData: { url: "", alt: "", caption: "" },
  },
  "custom-html": {
    label: "Custom HTML",
    icon: "Code2",
    description: "Embed arbitrary HTML with a configurable height",
    defaultData: { html: "", height: 200 },
  },
};

export function getBlockMeta(type: BlockType): BlockMeta {
  return blockRegistry[type];
}
