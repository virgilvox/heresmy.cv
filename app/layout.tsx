import type { Metadata } from "next";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexProvider } from "@/components/providers/convex-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "heresmy.cv — One page. Everything you are.",
  description: "Build a resume that's also a landing page. Block-based editor, 12+ themes, PDF export. Get your link in under 5 minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className="antialiased">
          <ConvexProvider>
            {children}
          </ConvexProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
