import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ProfileRenderer } from "@/components/profile/profile-renderer";
import { ViewCounter } from "./view-counter";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
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

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params;
  let profile;

  try {
    profile = await fetchQuery(api.profiles.getBySlug, { slug });
  } catch {
    notFound();
  }

  if (!profile) {
    notFound();
  }

  return (
    <ThemeProvider
      themeId={profile.themeId}
      customizations={profile.customizations}
    >
      <div className="min-h-screen bg-cv-bg text-cv-text">
        <ProfileRenderer blocks={profile.blocks} />
        <ViewCounter slug={slug} />
      </div>
    </ThemeProvider>
  );
}
