import { ExampleContent } from "./example-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moheeb Zara - heresmy.cv",
  description: "Hardware hacker, new media artist, and dropout. See what a heresmy.cv profile looks like.",
};

export default function ExamplePage() {
  return <ExampleContent />;
}
