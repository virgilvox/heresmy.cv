import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ProfileRenderer } from "@/components/profile/profile-renderer";
import { ThemeDecorations } from "@/components/profile/decorations";
import { getTheme } from "@/lib/themes/registry";
import { ViewCounter } from "./view-counter";
import { PrintTrigger } from "./print-trigger";
import type { Block } from "@/lib/blocks/types";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const profile = await fetchQuery(api.profiles.getBySlug, { slug });
    if (!profile) return { title: "Not Found" };

    const title = profile.seoTitle || `${(profile.blocks[0]?.data as { name?: string })?.name || slug} — heresmy.cv`;
    const description = profile.seoDescription || (profile.blocks[0]?.data as { tagline?: string })?.tagline || "A personal page built with heresmy.cv";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://heresmy.cv/${slug}`,
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function ProfilePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { print } = await searchParams;
  let profile;

  try {
    profile = await fetchQuery(api.profiles.getBySlug, { slug });
  } catch {
    notFound();
  }

  if (!profile) {
    notFound();
  }

  const theme = getTheme(profile.themeId);

  return (
    <ThemeProvider
      themeId={profile.themeId}
      customizations={profile.customizations}
    >
      <div className="min-h-screen bg-cv-bg text-cv-text">
        <ThemeDecorations type={theme?.decorations} />
        <ProfileRenderer blocks={profile.blocks as Block[]} />
        {print === "true" && <PrintTrigger />}
        {print !== "true" && <ViewCounter slug={slug} />}
      </div>
    </ThemeProvider>
  );
}
