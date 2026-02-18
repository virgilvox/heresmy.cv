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

export interface IntroBlockData {
  name: string;
  tagline: string;
  location: string;
  avatarUrl: string;
  bio: string;
  quote?: string;
  quoteAttribution?: string;
}

export interface HeadingBlockData {
  text: string;
  level: "h2" | "h3";
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

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  period: string;
  description?: string;
  current: boolean;
}

export interface EducationBlockData {
  items: EducationItem[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role?: string;
  org?: string;
}

export interface TestimonialsBlockData {
  items: TestimonialItem[];
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface StatsBlockData {
  items: StatItem[];
  layout: "row" | "grid";
}

export interface AwardItem {
  id: string;
  title: string;
  year: string;
  location?: string;
  description?: string;
}

export interface AwardsBlockData {
  items: AwardItem[];
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

export interface IntroBlock {
  id: string;
  type: "intro";
  visible: boolean;
  data: IntroBlockData;
}

export interface HeadingBlock {
  id: string;
  type: "heading";
  visible: boolean;
  data: HeadingBlockData;
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

export interface EducationBlock {
  id: string;
  type: "education";
  visible: boolean;
  data: EducationBlockData;
}

export interface TestimonialsBlock {
  id: string;
  type: "testimonials";
  visible: boolean;
  data: TestimonialsBlockData;
}

export interface StatsBlock {
  id: string;
  type: "stats";
  visible: boolean;
  data: StatsBlockData;
}

export interface AwardsBlock {
  id: string;
  type: "awards";
  visible: boolean;
  data: AwardsBlockData;
}

// ── Union type & BlockType literal ───────────────────────────────────────────

export type Block =
  | HeaderBlock
  | BioBlock
  | IntroBlock
  | HeadingBlock
  | ExperienceBlock
  | SkillsBlock
  | ProjectsBlock
  | PublicationsBlock
  | LinksBlock
  | VideoBlock
  | ImageBlock
  | CustomHtmlBlock
  | EducationBlock
  | TestimonialsBlock
  | StatsBlock
  | AwardsBlock;

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
  intro: {
    name: "",
    tagline: "",
    location: "",
    avatarUrl: "",
    bio: "",
    quote: "",
    quoteAttribution: "",
  } as IntroBlockData,
  heading: {
    text: "",
    level: "h2",
  } as HeadingBlockData,
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
  education: {
    items: [],
  } as EducationBlockData,
  testimonials: {
    items: [],
  } as TestimonialsBlockData,
  stats: {
    items: [],
    layout: "row",
  } as StatsBlockData,
  awards: {
    items: [],
  } as AwardsBlockData,
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

/** Deep-clone a block, assigning fresh IDs to the block and all nested items. */
export function duplicateBlock(block: Block): Block {
  const cloned = structuredClone(block);
  cloned.id = nanoid();

  // Re-ID any nested items/categories that have `id` fields
  const data = cloned.data as Record<string, unknown>;
  if (Array.isArray(data.items)) {
    data.items = data.items.map((item: Record<string, unknown>) => ({
      ...item,
      id: nanoid(),
    }));
  }
  if (Array.isArray(data.categories)) {
    data.categories = data.categories.map((cat: Record<string, unknown>) => ({
      ...cat,
      id: nanoid(),
      items: Array.isArray(cat.items)
        ? (cat.items as Record<string, unknown>[]).map((item) => ({
            ...item,
            id: nanoid(),
          }))
        : cat.items,
    }));
  }

  return cloned;
}
