import { nanoid } from "nanoid";

// ── Individual block data types ──────────────────────────────────────────────

export interface HeaderBlockData {
  name?: string;
  tagline?: string;
  location?: string;
  avatarUrl?: string;
}

export interface BioBlockData {
  content: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  description: string;
  current: boolean;
}

export interface ExperienceBlockData {
  items: ExperienceItem[];
}

export interface SkillsBlockData {
  items: string[];
  layout: "pills" | "list" | "grid";
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  url: string;
  imageUrl: string;
}

export interface ProjectsBlockData {
  items: ProjectItem[];
}

export interface PublicationItem {
  id: string;
  title: string;
  source: string;
  url: string;
  year: string;
}

export interface PublicationCategory {
  id: string;
  name: string;
  items: PublicationItem[];
}

export interface PublicationsBlockData {
  categories: PublicationCategory[];
}

export interface LinkItem {
  id: string;
  icon: string;
  label: string;
  url: string;
}

export interface LinksBlockData {
  items: LinkItem[];
}

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  category: string;
}

export interface VideoBlockData {
  items: VideoItem[];
}

export interface ImageBlockData {
  url: string;
  alt: string;
  caption: string;
}

export interface CustomHtmlBlockData {
  html: string;
  height: number;
}

// ── Block types (discriminated union members) ────────────────────────────────

export interface HeaderBlock {
  id: string;
  type: "header";
  visible: boolean;
  data: HeaderBlockData;
}

export interface BioBlock {
  id: string;
  type: "bio";
  visible: boolean;
  data: BioBlockData;
}

export interface ExperienceBlock {
  id: string;
  type: "experience";
  visible: boolean;
  data: ExperienceBlockData;
}

export interface SkillsBlock {
  id: string;
  type: "skills";
  visible: boolean;
  data: SkillsBlockData;
}

export interface ProjectsBlock {
  id: string;
  type: "projects";
  visible: boolean;
  data: ProjectsBlockData;
}

export interface PublicationsBlock {
  id: string;
  type: "publications";
  visible: boolean;
  data: PublicationsBlockData;
}

export interface LinksBlock {
  id: string;
  type: "links";
  visible: boolean;
  data: LinksBlockData;
}

export interface VideoBlock {
  id: string;
  type: "video";
  visible: boolean;
  data: VideoBlockData;
}

export interface ImageBlock {
  id: string;
  type: "image";
  visible: boolean;
  data: ImageBlockData;
}

export interface CustomHtmlBlock {
  id: string;
  type: "custom-html";
  visible: boolean;
  data: CustomHtmlBlockData;
}

// ── Union type & BlockType literal ───────────────────────────────────────────

export type Block =
  | HeaderBlock
  | BioBlock
  | ExperienceBlock
  | SkillsBlock
  | ProjectsBlock
  | PublicationsBlock
  | LinksBlock
  | VideoBlock
  | ImageBlock
  | CustomHtmlBlock;

export type BlockType = Block["type"];

// ── Default data per block type ──────────────────────────────────────────────

const defaultDataMap: Record<BlockType, Block["data"]> = {
  header: {
    name: "",
    tagline: "",
    location: "",
    avatarUrl: "",
  } as HeaderBlockData,
  bio: {
    content: "",
  } as BioBlockData,
  experience: {
    items: [],
  } as ExperienceBlockData,
  skills: {
    items: [],
    layout: "pills",
  } as SkillsBlockData,
  projects: {
    items: [],
  } as ProjectsBlockData,
  publications: {
    categories: [],
  } as PublicationsBlockData,
  links: {
    items: [],
  } as LinksBlockData,
  video: {
    items: [],
  } as VideoBlockData,
  image: {
    url: "",
    alt: "",
    caption: "",
  } as ImageBlockData,
  "custom-html": {
    html: "",
    height: 200,
  } as CustomHtmlBlockData,
};

// ── Factory function ─────────────────────────────────────────────────────────

export function createBlock<T extends BlockType>(type: T): Extract<Block, { type: T }> {
  return {
    id: nanoid(),
    type,
    visible: true,
    data: structuredClone(defaultDataMap[type]),
  } as Extract<Block, { type: T }>;
}
