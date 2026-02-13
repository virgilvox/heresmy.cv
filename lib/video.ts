// ── Shared video URL parsing ─────────────────────────────────────────────────

export function parseYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function parseVimeoId(url: string): string | null {
  const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  return match ? match[1] : null;
}

export function getEmbedUrl(url: string): string | null {
  if (!url) return null;

  const ytId = parseYouTubeId(url);
  if (ytId) return `https://www.youtube.com/embed/${ytId}`;

  const vimeoId = parseVimeoId(url);
  if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}`;

  return null;
}

export function getVideoThumbnail(url: string): string | null {
  const ytId = parseYouTubeId(url);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`;

  // Vimeo thumbnails require an API call
  return null;
}
