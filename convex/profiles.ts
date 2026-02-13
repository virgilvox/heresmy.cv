import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// ── Shared validation ────────────────────────────────────────────────────────

const RESERVED_SLUGS = [
  "login", "signup", "editor", "settings", "api", "admin", "about",
  "help", "pricing", "blog", "terms", "privacy", "support", "docs",
  "dashboard", "profile", "account", "auth", "new", "search",
];

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

function validateSlug(slug: string): string {
  const normalized = slug.toLowerCase().trim();
  if (normalized.length < 3 || normalized.length > 30) {
    throw new Error("Slug must be between 3 and 30 characters");
  }
  if (!SLUG_REGEX.test(normalized)) {
    throw new Error("Slug must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen");
  }
  if (RESERVED_SLUGS.includes(normalized)) {
    throw new Error("This slug is reserved");
  }
  return normalized;
}

const VALID_THEME_IDS = [
  "midnight", "clean", "paper", "hackbuild", "terminal", "shibuya-punk",
  "egirl", "forest", "brutalist", "executive", "retrowave", "nordic",
];

const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

export const getMyProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    return profile;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!profile || !profile.isPublished) return null;

    return profile;
  },
});

export const createProfile = mutation({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const slug = validateSlug(args.slug);

    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (existing) throw new Error("Profile already exists");

    const slugTaken = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (slugTaken) throw new Error("Slug is already taken");

    const profileId = await ctx.db.insert("profiles", {
      userId,
      slug,
      themeId: "midnight",
      customizations: {},
      blocks: [],
      isPublished: false,
      viewCount: 0,
    });

    return profileId;
  },
});

export const updateBlocks = mutation({
  args: {
    blocks: v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        visible: v.boolean(),
        data: v.any(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) throw new Error("Profile not found");

    await ctx.db.patch(profile._id, { blocks: args.blocks });
  },
});

export const updateTheme = mutation({
  args: { themeId: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    if (!VALID_THEME_IDS.includes(args.themeId)) {
      throw new Error("Invalid theme ID");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) throw new Error("Profile not found");

    await ctx.db.patch(profile._id, { themeId: args.themeId });
  },
});

export const updateCustomizations = mutation({
  args: {
    customizations: v.object({
      accentColor: v.optional(v.string()),
      fontFamily: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const { accentColor, fontFamily } = args.customizations;

    if (accentColor !== undefined && !HEX_COLOR_REGEX.test(accentColor)) {
      throw new Error("Invalid accent color. Must be a hex color (e.g. #ff6600)");
    }

    if (fontFamily !== undefined && fontFamily.length > 100) {
      throw new Error("Font family value is too long");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) throw new Error("Profile not found");

    await ctx.db.patch(profile._id, {
      customizations: args.customizations,
    });
  },
});

export const updateSlug = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const slug = validateSlug(args.slug);

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) throw new Error("Profile not found");

    if (profile.slug === slug) return;

    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (existing) throw new Error("Slug is already taken");

    await ctx.db.patch(profile._id, { slug });
  },
});

export const updateSeo = mutation({
  args: {
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    if (args.seoTitle !== undefined && args.seoTitle.length > 70) {
      throw new Error("SEO title must be 70 characters or fewer");
    }
    if (args.seoDescription !== undefined && args.seoDescription.length > 160) {
      throw new Error("SEO description must be 160 characters or fewer");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) throw new Error("Profile not found");

    await ctx.db.patch(profile._id, {
      seoTitle: args.seoTitle,
      seoDescription: args.seoDescription,
    });
  },
});

export const publish = mutation({
  args: { isPublished: v.boolean() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) throw new Error("Profile not found");

    await ctx.db.patch(profile._id, { isPublished: args.isPublished });
  },
});

export const incrementViewCount = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!profile) throw new Error("Profile not found");

    await ctx.db.patch(profile._id, { viewCount: profile.viewCount + 1 });
  },
});

export const uploadAvatar = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) throw new Error("Profile not found");

    await ctx.db.patch(profile._id, { avatarStorageId: args.storageId });
  },
});

export const getAvatarUrl = query({
  args: { storageId: v.optional(v.id("_storage")) },
  handler: async (ctx, args) => {
    if (!args.storageId) return null;
    return await ctx.storage.getUrl(args.storageId);
  },
});
