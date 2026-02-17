import type { Block } from "@/lib/blocks/types";

interface ExportData {
  blocks: Block[];
  themeId: string;
  customizations?: {
    accentColor?: string;
    fontFamily?: string;
  };
  slug: string;
  exportedAt: string;
}

export function exportAsJson(profile: {
  blocks: Block[];
  themeId: string;
  customizations?: { accentColor?: string; fontFamily?: string };
  slug: string;
}) {
  const data: ExportData = {
    blocks: profile.blocks.map(({ id, type, data, visible }) => ({
      id,
      type,
      data,
      visible,
    })) as Block[],
    themeId: profile.themeId,
    customizations: profile.customizations,
    slug: profile.slug,
    exportedAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${profile.slug}-heresmy-cv.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportAsHtml(slug: string, isPublished: boolean) {
  if (!isPublished) {
    alert("Publish your profile first to export as HTML.");
    return;
  }
  window.open(`/${slug}`, "_blank");
}
