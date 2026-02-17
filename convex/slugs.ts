import { v } from "convex/values";
import { query } from "./_generated/server";

const RESERVED_SLUGS = [
  "login",
  "signup",
  "editor",
  "settings",
  "api",
  "admin",
  "about",
  "help",
  "pricing",
  "blog",
  "terms",
  "privacy",
  "support",
  "docs",
  "dashboard",
  "profile",
  "account",
  "auth",
  "new",
  "search",
  "example",
];

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

export const checkAvailability = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const slug = args.slug.toLowerCase();

    if (slug.length < 3 || slug.length > 30) {
      return {
        available: false,
        reason: "Slug must be between 3 and 30 characters",
      };
    }

    if (!SLUG_REGEX.test(slug)) {
      return {
        available: false,
        reason:
          "Slug must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen",
      };
    }

    if (RESERVED_SLUGS.includes(slug)) {
      return {
        available: false,
        reason: "This slug is reserved",
      };
    }

    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (existing) {
      return {
        available: false,
        reason: "This slug is already taken",
      };
    }

    return { available: true };
  },
});
