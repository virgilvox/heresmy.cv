import { ImageResponse } from "next/og";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const runtime = "edge";
export const alt = "Profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let name = slug;
  let tagline = "heresmy.cv";

  try {
    const profile = await fetchQuery(api.profiles.getBySlug, { slug });
    if (profile) {
      const headerBlock = profile.blocks.find(
        (b: { type: string }) => b.type === "header"
      );
      if (headerBlock) {
        const data = headerBlock.data as { name?: string; tagline?: string };
        name = data.name || slug;
        tagline = data.tagline || "heresmy.cv";
      }
    }
  } catch {
    // Use defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0f",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #c8ff00, #ff6b4a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              fontWeight: "bold",
              color: "#0a0a0f",
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#e8e6f0",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#8888a0",
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: "18px",
              color: "#5a5a70",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            heresmy
            <span style={{ color: "#c8ff00" }}>.</span>
            cv/{slug}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
