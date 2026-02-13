// ── Class name helper ────────────────────────────────────────────────────────

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ── Slug utilities ───────────────────────────────────────────────────────────

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric runs with a hyphen
    .replace(/-+/g, "-")          // collapse consecutive hyphens
    .replace(/^-|-$/g, "");       // trim leading/trailing hyphens
}

export interface SlugValidation {
  valid: boolean;
  error?: string;
}

export function validateSlug(slug: string): SlugValidation {
  if (slug.length < 3 || slug.length > 30) {
    return { valid: false, error: "Slug must be between 3 and 30 characters" };
  }

  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug)) {
    return { valid: false, error: "Slug must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen" };
  }

  return { valid: true };
}

// ── URL safety ──────────────────────────────────────────────────────────────

const SAFE_URL_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];

export function safeHref(url: string): string {
  try {
    const parsed = new URL(url);
    if (SAFE_URL_PROTOCOLS.includes(parsed.protocol)) return url;
  } catch {
    // relative URLs are safe (no protocol)
    if (url.startsWith("/") || url.startsWith("#")) return url;
  }
  return "#";
}

// ── Convex storage URL ───────────────────────────────────────────────────────

export function getStorageUrl(storageId: string): string {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${storageId}`;
}
