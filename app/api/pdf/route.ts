import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
  }

  // In production, this calls a Netlify serverless function with puppeteer
  // For development, redirect to the profile page with print param
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const profileUrl = `${baseUrl}/${slug}?print=true`;

  try {
    // Try to use the Netlify function endpoint
    const pdfEndpoint = `${baseUrl}/.netlify/functions/generate-pdf?url=${encodeURIComponent(profileUrl)}`;

    const response = await fetch(pdfEndpoint);

    if (!response.ok) {
      // Fallback: return instructions
      return NextResponse.json(
        {
          error: "PDF generation requires the Netlify serverless function. Deploy to Netlify or run locally with netlify dev.",
          profileUrl,
        },
        { status: 503 }
      );
    }

    const pdf = await response.arrayBuffer();

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}-resume.pdf"`,
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: "PDF generation service unavailable",
        fallback: profileUrl,
      },
      { status: 503 }
    );
  }
}
