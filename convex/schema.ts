import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// ── Block data validators ─────────────────────────────────────────────────

const headerData = v.object({
  name: v.optional(v.string()),
  tagline: v.optional(v.string()),
  location: v.optional(v.string()),
  avatarUrl: v.optional(v.string()),
});

const bioData = v.object({
  content: v.string(),
});

const introData = v.object({
  name: v.string(),
  tagline: v.string(),
  location: v.string(),
  avatarUrl: v.string(),
  bio: v.string(),
  quote: v.optional(v.string()),
  quoteAttribution: v.optional(v.string()),
});

const headingData = v.object({
  text: v.string(),
  level: v.union(v.literal("h2"), v.literal("h3")),
});

const experienceItem = v.object({
  id: v.string(),
  role: v.string(),
  org: v.string(),
  period: v.string(),
  description: v.string(),
  current: v.boolean(),
});

const experienceData = v.object({
  items: v.array(experienceItem),
});

const skillsData = v.object({
  items: v.array(v.string()),
  layout: v.union(v.literal("pills"), v.literal("list"), v.literal("grid")),
});

const projectItem = v.object({
  id: v.string(),
  title: v.string(),
  description: v.string(),
  tag: v.string(),
  url: v.string(),
  imageUrl: v.string(),
});

const projectsData = v.object({
  items: v.array(projectItem),
});

const publicationItem = v.object({
  id: v.string(),
  title: v.string(),
  source: v.string(),
  url: v.string(),
  year: v.string(),
});

const publicationCategory = v.object({
  id: v.string(),
  name: v.string(),
  items: v.array(publicationItem),
});

const publicationsData = v.object({
  categories: v.array(publicationCategory),
});

const linkItem = v.object({
  id: v.string(),
  icon: v.string(),
  label: v.string(),
  url: v.string(),
});

const linksData = v.object({
  items: v.array(linkItem),
});

const videoItem = v.object({
  id: v.string(),
  title: v.string(),
  url: v.string(),
  category: v.string(),
});

const videoData = v.object({
  items: v.array(videoItem),
});

const imageData = v.object({
  url: v.string(),
  alt: v.string(),
  caption: v.string(),
});

const customHtmlData = v.object({
  html: v.string(),
  height: v.number(),
});

const educationItem = v.object({
  id: v.string(),
  school: v.string(),
  degree: v.string(),
  field: v.string(),
  period: v.string(),
  description: v.optional(v.string()),
  current: v.boolean(),
});

const educationData = v.object({
  items: v.array(educationItem),
});

const testimonialItem = v.object({
  id: v.string(),
  quote: v.string(),
  author: v.string(),
  role: v.optional(v.string()),
  org: v.optional(v.string()),
});

const testimonialsData = v.object({
  items: v.array(testimonialItem),
});

const statItem = v.object({
  id: v.string(),
  value: v.string(),
  label: v.string(),
});

const statsData = v.object({
  items: v.array(statItem),
  layout: v.union(v.literal("row"), v.literal("grid")),
});

const awardItem = v.object({
  id: v.string(),
  title: v.string(),
  year: v.string(),
  location: v.optional(v.string()),
  description: v.optional(v.string()),
});

const awardsData = v.object({
  items: v.array(awardItem),
});

// ── Typed block validator (discriminated union on `type`) ──────────────────

const blockValidator = v.union(
  v.object({ id: v.string(), type: v.literal("header"), visible: v.boolean(), data: headerData }),
  v.object({ id: v.string(), type: v.literal("bio"), visible: v.boolean(), data: bioData }),
  v.object({ id: v.string(), type: v.literal("intro"), visible: v.boolean(), data: introData }),
  v.object({ id: v.string(), type: v.literal("heading"), visible: v.boolean(), data: headingData }),
  v.object({ id: v.string(), type: v.literal("experience"), visible: v.boolean(), data: experienceData }),
  v.object({ id: v.string(), type: v.literal("skills"), visible: v.boolean(), data: skillsData }),
  v.object({ id: v.string(), type: v.literal("projects"), visible: v.boolean(), data: projectsData }),
  v.object({ id: v.string(), type: v.literal("publications"), visible: v.boolean(), data: publicationsData }),
  v.object({ id: v.string(), type: v.literal("links"), visible: v.boolean(), data: linksData }),
  v.object({ id: v.string(), type: v.literal("video"), visible: v.boolean(), data: videoData }),
  v.object({ id: v.string(), type: v.literal("image"), visible: v.boolean(), data: imageData }),
  v.object({ id: v.string(), type: v.literal("custom-html"), visible: v.boolean(), data: customHtmlData }),
  v.object({ id: v.string(), type: v.literal("education"), visible: v.boolean(), data: educationData }),
  v.object({ id: v.string(), type: v.literal("testimonials"), visible: v.boolean(), data: testimonialsData }),
  v.object({ id: v.string(), type: v.literal("stats"), visible: v.boolean(), data: statsData }),
  v.object({ id: v.string(), type: v.literal("awards"), visible: v.boolean(), data: awardsData }),
);

// ── Schema ────────────────────────────────────────────────────────────────

const schema = defineSchema({
  ...authTables,
  profiles: defineTable({
    userId: v.id("users"),
    slug: v.string(),
    themeId: v.string(),
    customizations: v.object({
      accentColor: v.optional(v.string()),
      fontFamily: v.optional(v.string()),
    }),
    blocks: v.array(blockValidator),
    avatarStorageId: v.optional(v.id("_storage")),
    isPublished: v.boolean(),
    viewCount: v.number(),
    lastViewedAt: v.optional(v.number()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_userId", ["userId"]),
});

export default schema;
