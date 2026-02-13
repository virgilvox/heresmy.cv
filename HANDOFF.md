# heresmy.cv — Handoff Document

## What Is This?

A resume/portfolio builder where users sign up, build a profile using a block-based editor, pick from 12 themes, and publish at `heresmy.cv/their-slug`. Profiles serve as resumes (with PDF export), portfolios, or linktree replacements.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 App Router (TypeScript) |
| Styling | Tailwind CSS 4 (CSS-variable theme tokens) |
| Backend | Convex (database, auth, file storage) |
| Auth | @convex-dev/auth (GitHub, Google, Password) |
| Editor | @dnd-kit (drag-and-drop), @tiptap (rich text) |
| Deployment | Netlify (serverless functions for PDF) |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up Convex
npx convex dev
# This will prompt you to create a project and generate convex/_generated/ files
# It also starts the Convex dev server

# 3. Configure environment
cp .env.local.example .env.local
# Fill in CONVEX_DEPLOYMENT and NEXT_PUBLIC_CONVEX_URL from the Convex dashboard

# 4. Set auth provider env vars in the Convex dashboard:
#    AUTH_GITHUB_ID, AUTH_GITHUB_SECRET
#    AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET

# 5. Start the app
npm run dev
# Runs both `npx convex dev` and `next dev --turbopack` concurrently
```

## Project Structure (83 source files)

```
app/
├── layout.tsx                          Root layout (providers, fonts)
├── page.tsx                            Landing page
├── globals.css                         Tailwind 4 + CSS variable theme tokens
├── not-found.tsx                       Custom 404
├── (auth)/
│   ├── login/page.tsx                  Login (GitHub, Google, email/password)
│   └── signup/page.tsx                 Signup → creates profile with generated slug
├── (dashboard)/
│   ├── layout.tsx                      Auth guard (redirects to /login if unauthenticated)
│   ├── editor/page.tsx                 Block editor (main app surface)
│   └── settings/page.tsx              Account settings
├── [slug]/
│   ├── page.tsx                        Public profile (SSR + generateMetadata)
│   ├── view-counter.tsx               Client-side view count increment
│   └── opengraph-image.tsx            Dynamic OG image generation
└── api/pdf/route.ts                   PDF export endpoint

components/
├── ui/                                 Shared primitives (button, input, textarea)
├── landing/                            Landing page (nav, hero, features-grid, cta-section)
├── editor/
│   ├── block-canvas.tsx               DnD context + sortable block list
│   ├── sortable-block.tsx             Individual draggable block wrapper
│   ├── block-renderer.tsx             Dispatches to correct block editor by type
│   ├── add-block-menu.tsx             Block type picker
│   ├── blocks/                        10 block EDITOR components
│   │   ├── header.tsx                 Name, tagline, location inputs
│   │   ├── bio.tsx                    Tiptap rich text editor
│   │   ├── experience.tsx             List of roles with add/remove
│   │   ├── skills.tsx                 Tag pills with layout selector
│   │   ├── projects.tsx               Project cards with links
│   │   ├── publications.tsx           Categories with nested items
│   │   ├── links.tsx                  Icon + label + URL per link
│   │   ├── video.tsx                  YouTube/Vimeo URL parsing + preview
│   │   ├── image.tsx                  URL + alt + caption with preview
│   │   └── custom-html.tsx            HTML textarea + sandboxed iframe
│   └── sidebar/
│       ├── sidebar.tsx                Tab switcher (Blocks/Style/Settings)
│       ├── blocks-tab.tsx             Block structure outline
│       ├── style-tab.tsx              Theme picker, accent colors, fonts
│       └── settings-tab.tsx           Slug, SEO, export buttons
├── profile/
│   ├── profile-renderer.tsx           Maps blocks → display components
│   ├── blocks/                        10 block DISPLAY components
│   │   └── (same names as editor/blocks — read-only versions)
│   └── decorations/
│       ├── index.tsx                  ThemeDecorations switcher (dynamic imports)
│       ├── tape.tsx                   Rotated tape strips (hack.build theme)
│       ├── scanlines.tsx              CRT overlay (terminal theme)
│       ├── sparkles.tsx               Animated sparkle SVGs (e-girl theme)
│       └── mushrooms.tsx              Mushroom/frog SVGs (forest theme)
└── providers/
    ├── convex-provider.tsx            ConvexAuthNextjsProvider wrapper
    └── theme-provider.tsx             CSS var injection + Google Fonts loader

lib/
├── utils.ts                           cn(), slugify(), validateSlug(), getStorageUrl()
├── blocks/
│   ├── types.ts                       Discriminated union type system (10 block types)
│   └── registry.ts                    Block metadata (labels, icons, defaults)
└── themes/
    ├── types.ts                       ThemeConfig interface
    ├── registry.ts                    getAllThemes(), getTheme()
    └── themes/                        12 theme definition files
        ├── midnight.ts                Dark, lime accent, monospace (default)
        ├── clean.ts                   Light, minimal, system fonts
        ├── paper.ts                   Warm cream, serif
        ├── hackbuild.ts              Paper + tape + marker font
        ├── terminal.ts               Green-on-black, CRT scanlines
        ├── shibuya-punk.ts           Neon pink/cyan, grid background
        ├── egirl.ts                  Pastel pink, sparkle decorations
        ├── forest.ts                 Deep green, mushroom decorations
        ├── brutalist.ts              Raw B&W, no border-radius
        ├── executive.ts              Navy/gold, serif, traditional
        ├── retrowave.ts              Purple/pink synthwave grid
        └── nordic.ts                 Cool white, muted blue

convex/
├── schema.ts                          Profiles table + auth tables
├── auth.ts                            GitHub, Google, Password providers
├── auth.config.ts                     OAuth provider domains
├── http.ts                            Auth HTTP routes
├── profiles.ts                        12 CRUD functions
├── slugs.ts                           Slug availability check (20 reserved words)
├── files.ts                           File upload URL generation
└── _generated/                        Stubs (replaced by `npx convex dev`)

netlify/functions/
└── generate-pdf.mts                   Puppeteer-core PDF serverless function
```

## Architecture Decisions

### Blocks are denormalized inside the profile document
Blocks are stored as `v.array(v.object({id, type, visible, data: v.any()}))` directly in the profiles table. This means reordering = one mutation, and blocks are never queried independently. Convex's 1MB document limit is plenty for text-based CV content.

### CSS-variable-driven theming
All 12 themes set 9 CSS custom properties (`--cv-bg`, `--cv-surface`, `--cv-card`, `--cv-border`, `--cv-text`, `--cv-text-muted`, `--cv-text-dim`, `--cv-accent`, `--cv-accent-glow`). Tailwind 4's `@theme` block maps these to utility classes (`bg-cv-bg`, `text-cv-accent`, etc.). Theme switching is instant — just swap the CSS vars.

### Editor vs. Display components
Each block type has TWO components: an editor version (`components/editor/blocks/`) with inputs and controls, and a display version (`components/profile/blocks/`) that's read-only. The `ProfileRenderer` is shared between the public page and could be used for editor preview.

### Debounced saves
Block editors buffer changes locally and flush to Convex after 500ms idle via `use-debounce`. DnD reordering is optimistic — local state updates immediately, then persists.

### Convex _generated stubs
The `convex/_generated/` directory contains stub files so TypeScript compiles without running `npx convex dev`. These are overwritten by the real generated files when the Convex dev server starts. All TS errors in convex/ files are due to these stubs and resolve automatically.

## Data Model

### Profiles table
```
userId: Id<"users">           (indexed)
slug: string                   (indexed, unique)
themeId: string                Theme ID from registry
customizations: {
  accentColor?: string         Hex color override
  fontFamily?: string          Font family override
}
blocks: Array<{
  id: string                   nanoid
  type: string                 BlockType discriminant
  visible: boolean             Toggle in editor
  data: any                    Type-specific payload
}>
avatarStorageId?: Id<"_storage">
isPublished: boolean
viewCount: number
seoTitle?: string
seoDescription?: string
```

### Block Types
`header` | `bio` | `experience` | `skills` | `projects` | `publications` | `links` | `video` | `image` | `custom-html`

See `lib/blocks/types.ts` for the full discriminated union and data interfaces.

## Convex Functions (convex/profiles.ts)

| Function | Type | Auth | Purpose |
|----------|------|------|---------|
| `getMyProfile` | query | yes | Get authenticated user's profile |
| `getBySlug` | query | no | Get published profile by slug |
| `createProfile` | mutation | yes | Create new profile with slug |
| `updateBlocks` | mutation | yes | Replace blocks array |
| `updateTheme` | mutation | yes | Change theme ID |
| `updateCustomizations` | mutation | yes | Update accent/font overrides |
| `updateSlug` | mutation | yes | Change slug (uniqueness check) |
| `updateSeo` | mutation | yes | Update SEO title/description |
| `publish` | mutation | yes | Toggle isPublished |
| `incrementViewCount` | mutation | no | Bump view counter |
| `uploadAvatar` | mutation | yes | Set avatar storage ID |
| `getAvatarUrl` | query | no | Get storage URL for avatar |

## Themes

All 12 themes are in `lib/themes/themes/`. Each exports a `ThemeConfig` with:
- `variables`: The 9 CSS custom properties
- `fonts`: Heading + body font families
- `googleFontImports`: URLs for Google Fonts `@import`
- `customCSS`: Optional theme-specific CSS (scanlines, glow effects, etc.)
- `decorations`: Optional decoration type (`tape`, `scanlines`, `sparkles`, `mushrooms`, `grid`, `retrowave-grid`)
- `preview`: `{ bg, fg, accent }` colors for the theme picker swatch

## Deployment (Netlify)

The `netlify.toml` runs `npx convex deploy --cmd 'npm run build'` which deploys the Convex backend then builds Next.js.

Required environment variables in Netlify dashboard:
- `CONVEX_DEPLOY_KEY` — from Convex dashboard (Settings → Deploy keys)
- `NEXT_PUBLIC_CONVEX_URL` — your Convex deployment URL

For PDF export, the Netlify function at `netlify/functions/generate-pdf.mts` uses `puppeteer-core` + `@sparticuz/chromium-min`. These are **not yet installed** — add them before deploying:
```bash
npm install puppeteer-core @sparticuz/chromium-min
```

## Known Gaps / TODO

1. **Convex _generated files** — Run `npx convex dev` to generate proper typed modules. The stubs work for compilation but don't provide full type safety in convex/ files.

2. **PDF dependencies** — `puppeteer-core` and `@sparticuz/chromium-min` need to be installed for the PDF export Netlify function.

3. **Avatar upload UI** — The `uploadAvatar` mutation exists but there's no file upload widget in the editor UI yet. The header block has an `avatarUrl` text input as a placeholder.

4. **HTML/JSON export** — Settings tab has placeholder buttons for "Export HTML" and "Export JSON" that aren't wired up yet.

5. **Print stylesheet** — `globals.css` has basic `@media print` rules. May need refinement for specific themes.

6. **OAuth redirect URLs** — GitHub and Google OAuth apps need the correct redirect URLs configured pointing to your Convex deployment's auth callback endpoint.

7. **Reserved slug enforcement** — The `slugs.ts` check happens client-side via query. The `createProfile` and `updateSlug` mutations check uniqueness but don't check the reserved words list — consider adding server-side validation.

8. **Theme decorations integration** — The `ThemeDecorations` component exists but needs to be rendered in the public profile page (`app/[slug]/page.tsx`) and optionally in the editor preview. Currently imported but not called.
