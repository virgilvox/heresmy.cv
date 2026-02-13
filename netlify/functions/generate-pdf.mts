import type { Context } from "@netlify/functions";

export default async (request: Request, _context: Context) => {
  const url = new URL(request.url);
  const profileUrl = url.searchParams.get("url");

  if (!profileUrl) {
    return new Response(JSON.stringify({ error: "Missing url parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Dynamic import for serverless environment
    const chromium = await import("@sparticuz/chromium-min");
    const puppeteer = await import("puppeteer-core");

    const browser = await puppeteer.default.launch({
      args: chromium.default.args,
      defaultViewport: chromium.default.defaultViewport,
      executablePath: await chromium.default.executablePath(
        "https://github.com/nichochar/chromium-binaries/releases/download/v133.0.0/chromium-v133.0.0-pack.tar"
      ),
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(profileUrl, { waitUntil: "networkidle0", timeout: 30000 });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "1cm", bottom: "1cm", left: "1cm", right: "1cm" },
    });

    await browser.close();

    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate PDF" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
