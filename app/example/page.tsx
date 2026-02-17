import { ThemeProvider } from "@/components/providers/theme-provider";
import { ProfileRenderer } from "@/components/profile/profile-renderer";
import { ThemeDecorations } from "@/components/profile/decorations";
import { getTheme } from "@/lib/themes/registry";
import type { Block } from "@/lib/blocks/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moheeb Zara - heresmy.cv",
  description: "Hardware hacker, new media artist, and dropout. See what a heresmy.cv profile looks like.",
};

const exampleBlocks: Block[] = [
  {
    id: "header-1",
    type: "header",
    visible: true,
    data: {
      name: "Moheeb Zara",
      tagline: "Hardware hacker, new media artist, and dropout. Making things that blink, move, and occasionally require a fire extinguisher.",
      location: "Mesa, AZ",
      avatarUrl: "",
    },
  },
  {
    id: "bio-1",
    type: "bio",
    visible: true,
    data: {
      content:
        "<p>I work at the intersection of embedded systems, creative coding, and projection mapping. I write tutorials, build tools, and host workshops.</p><p>Former board member at <strong>HeatSync Labs</strong> -- one of the longest-running hackerspaces in the Southwest. I believe in do-ocracy and showing up.</p>",
    },
  },
  {
    id: "experience-1",
    type: "experience",
    visible: true,
    data: {
      items: [
        {
          id: "exp-1",
          role: "Developer Advocate",
          org: "Freelance",
          period: "2020 - Present",
          description:
            "Writing tutorials, hosting workshops, making hardware accessible. 41+ projects on Hackster.io. Dev advocacy for companies building IoT and embedded tools.",
          current: true,
        },
        {
          id: "exp-2",
          role: "Board Member",
          org: "HeatSync Labs",
          period: "2017 - 2022",
          description:
            "Governance, do-ocracy, conflict resolution. How communities work and why they break. Learned the hard way at one of the longest-running hackerspaces in the Southwest.",
          current: false,
        },
      ],
    },
  },
  {
    id: "skills-1",
    type: "skills",
    visible: true,
    data: {
      items: [
        "ESP32",
        "Arduino",
        "MQTT",
        "IoT",
        "Projection Mapping",
        "React",
        "TypeScript",
        "Node.js",
        "Embedded Systems",
        "Creative Coding",
        "3D Printing",
        "Open Source",
      ],
      layout: "pills",
    },
  },
  {
    id: "projects-1",
    type: "projects",
    visible: true,
    data: {
      items: [
        {
          id: "proj-1",
          title: "LumenCanvas",
          description:
            "Zero-install projection mapping studio that runs in your browser. Drag-warp simplicity, live coding, wireless casting to Chromecast/AirPlay.",
          tag: "Creative Tools",
          url: "https://lumencanvas.studio",
          imageUrl: "",
        },
        {
          id: "proj-2",
          title: "Zeenster",
          description:
            "Create printable zines in your browser. Resize, arrange, export to PDF or PNG. Free, open-source, privacy-respecting.",
          tag: "Creative Tools",
          url: "https://zeenster.com",
          imageUrl: "",
        },
        {
          id: "proj-3",
          title: "LaunchCue",
          description:
            "A CRM for developer relations consultants. Track outreach, manage relationships, organize launches.",
          tag: "Dev Tool",
          url: "https://launchcue.app",
          imageUrl: "",
        },
        {
          id: "proj-4",
          title: "The Hackerspace Game",
          description:
            "A punk DIY zine + web simulation about how communities work and why they break. Do-ocracy, trust dynamics, missing stairs, burnout.",
          tag: "Zine + Interactive",
          url: "",
          imageUrl: "",
        },
      ],
    },
  },
  {
    id: "publications-1",
    type: "publications",
    visible: true,
    data: {
      categories: [
        {
          id: "cat-1",
          name: "Tutorials & Guides",
          items: [
            {
              id: "pub-1",
              title: "MQTT with Arduino Uno R4 WiFi and EMQX",
              source: "Hackster.io",
              url: "",
              year: "2024",
            },
            {
              id: "pub-2",
              title: "Cellular Wardriving and Other IoT Shenanigans",
              source: "Hackster.io",
              url: "",
              year: "2023",
            },
            {
              id: "pub-3",
              title: "ESP32 LED Marquee using MQTT",
              source: "Hackster.io",
              url: "",
              year: "2023",
            },
            {
              id: "pub-4",
              title: "Kiwi Jr: Open-Source Robotics Platform",
              source: "Hackster.io",
              url: "",
              year: "2022",
            },
          ],
        },
      ],
    },
  },
  {
    id: "links-1",
    type: "links",
    visible: true,
    data: {
      items: [
        { id: "link-1", icon: "github", label: "GitHub", url: "https://github.com/virgilvox" },
        { id: "link-2", icon: "twitter", label: "Twitter", url: "https://twitter.com/virgilvox" },
        { id: "link-3", icon: "globe", label: "Hackster.io", url: "https://hackster.io/virgilvox" },
        { id: "link-4", icon: "mail", label: "Email", url: "mailto:hello@hack.build" },
      ],
    },
  },
];

export default function ExamplePage() {
  const theme = getTheme("hackbuild");

  return (
    <ThemeProvider themeId="hackbuild" customizations={{}}>
      <div className="min-h-screen bg-cv-bg text-cv-text">
        <ThemeDecorations type={theme?.decorations} />
        <ProfileRenderer blocks={exampleBlocks} />
      </div>
    </ThemeProvider>
  );
}
