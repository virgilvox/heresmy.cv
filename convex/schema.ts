import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

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
    blocks: v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        visible: v.boolean(),
        data: v.any(),
      })
    ),
    avatarStorageId: v.optional(v.id("_storage")),
    isPublished: v.boolean(),
    viewCount: v.number(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_userId", ["userId"]),
});

export default schema;
