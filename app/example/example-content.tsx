"use client";

import { useState } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ProfileRenderer } from "@/components/profile/profile-renderer";
import { ThemeDecorations } from "@/components/profile/decorations/index";
import { getAllThemes, getTheme } from "@/lib/themes/registry";
import { Palette } from "lucide-react";
import type { Block } from "@/lib/blocks/types";

const exampleBlocks: Block[] = [
  {
    id: "intro-1",
    type: "intro",
    visible: true,
    data: {
      name: "Moheeb Zara",
      tagline:
        "Hardware hacker and new media artist. Making things that blink, move, and occasionally require a fire extinguisher.",
      location: "Mesa, AZ",
      avatarUrl: "",
      bio: '<p>Developer advocate and technical content creator with over 10 years of experience bridging hardware and software communities. Specializing in embedded systems, IoT, and creative technology.</p><p>My work spans from building open-source robotics platforms to creating browser-based creative tools. I develop tutorials, documentation, and educational content that makes complex technical concepts accessible. Focus areas include MQTT/IoT protocols, projection mapping, cellular connectivity, and interactive web experiences.</p><p>Former board member at <strong>HeatSync Labs</strong>, one of the longest-running hackerspaces in the Southwest. Co-founder of <strong>South West Maker Festival</strong>. Previously held developer advocacy roles at AWS, SignalWire, SORACOM, EMQ, and others. Studied at <strong>ASU Arts Media &amp; Engineering</strong> (2009-2014).</p>',
      quote: "Technology should be accessible. When the existing tools are too expensive or complex, there's an opportunity to build something better for the community.",
      quoteAttribution: "On open-source philosophy",
    },
  },
  {
    id: "heading-work",
    type: "heading",
    visible: true,
    data: {
      text: "Work History",
      level: "h2",
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
          role: "Partner",
          org: "devEco Consulting",
          period: "June 2025 - Present",
          description:
            "Partner in devrel consultancy working on delivering developer focused hardware and software content across mediums.",
          current: true,
        },
        {
          id: "exp-2",
          role: "Founder/Creator",
          org: "LumenCanvas",
          period: "May 2025 - Present",
          description:
            "Creator of LumenCanvas.Studio - browser native projection mapping platform built for everyone. Transform any environment with creative coding tools.",
          current: true,
        },
        {
          id: "exp-3",
          role: "Developer Advocate",
          org: "EMQ Technologies",
          period: "May 2023 - Dec 2023",
          description:
            "Created technical content, documentation, and examples for MQTT and IoT platform.",
          current: false,
        },
        {
          id: "exp-4",
          role: "Developer Advocate",
          org: "SignalWire",
          period: "Dec 2021 - Nov 2022",
          description:
            "Produced content, wrote and published opensource examples for communications platform.",
          current: false,
        },
        {
          id: "exp-5",
          role: "Developer Evangelist",
          org: "SORACOM Inc.",
          period: "Dec 2020 - Oct 2021",
          description:
            "Developer evangelism for cellular IoT connectivity platform.",
          current: false,
        },
        {
          id: "exp-6",
          role: "Senior Developer Advocate - AWS Serverless",
          org: "Amazon Web Services (AWS)",
          period: "Apr 2019 - Oct 2020",
          description:
            "Developer advocacy for AWS serverless technologies, created tutorials and demos.",
          current: false,
        },
        {
          id: "exp-7",
          role: "Software/Hardware Evangelist",
          org: "Hologram Inc.",
          period: "Mar 2018 - Nov 2018",
          description:
            "Developer evangelism for cellular IoT platform, created hardware tutorials.",
          current: false,
        },
        {
          id: "exp-8",
          role: "Full Stack Engineer + IoT Community Manager (Octoblu)",
          org: "Citrix",
          period: "Feb 2014 - Nov 2017",
          description:
            "Wrote code, built demos, ran hackathons for Octoblu IoT platform. Partnered with Local Motors and IBM on world's first connected 3D printed car.",
          current: false,
        },
        {
          id: "exp-9",
          role: "Board Of Directors / Volunteer",
          org: "HeatSync Labs",
          period: "May 2009 - Oct 2015",
          description:
            "Helped run one of the longest-running hackerspaces in the Southwest. Co-founded South West Maker Festival.",
          current: false,
        },
        {
          id: "exp-10",
          role: "Intern",
          org: "NASA Space Grant",
          period: "2009 - 2010",
          description:
            "Youngest intern ever hired with NASA Space Grant. Focused on underwater robotics research and competition.",
          current: false,
        },
      ],
    },
  },
  {
    id: "awards-1",
    type: "awards",
    visible: true,
    data: {
      items: [
        {
          id: "award-1",
          title: "Top Intel Software Innovator",
          year: "2015",
          location: "",
          description:
            "Recognized by Intel for innovative software development and contributions to the developer community.",
        },
        {
          id: "award-2",
          title: "China vs US Young Maker Competition",
          year: "2017",
          location: "Beijing, China",
          description:
            "Finalist - Selected as 1 of 10 teams in the US to travel to Beijing and compete against 60 Chinese teams in international maker competition.",
        },
      ],
    },
  },
  {
    id: "education-1",
    type: "education",
    visible: true,
    data: {
      items: [
        {
          id: "edu-1",
          school: "Arizona State University",
          degree: "Arts, Media & Engineering",
          field: "",
          period: "2009 - 2014",
          description: "",
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
    id: "stats-1",
    type: "stats",
    visible: true,
    data: {
      items: [
        { id: "stat-1", value: "41+", label: "Hackster Projects" },
        { id: "stat-2", value: "10+", label: "Years Dev Advocacy" },
      ],
      layout: "row",
    },
  },
  {
    id: "video-1",
    type: "video",
    visible: true,
    data: {
      items: [
        {
          id: "vid-1",
          title: "MQTT with the Arduino Uno R4 WiFi and EMQX",
          url: "https://www.youtube.com/watch?v=S334qTpjPR4",
          category: "EMQX & MQTT",
        },
        {
          id: "vid-2",
          title: "DIY MQTT Devices & Automation with Home Assistant",
          url: "https://www.youtube.com/watch?v=QA1zyINZCws",
          category: "EMQX & MQTT",
        },
        {
          id: "vid-3",
          title: "Using ROS2 with EMQX",
          url: "https://www.youtube.com/watch?v=9tYPP-ZMjCE",
          category: "EMQX & MQTT",
        },
        {
          id: "vid-4",
          title: "ESP32 LED Marquee using MQTT",
          url: "https://www.youtube.com/watch?v=8df1c9",
          category: "EMQX & MQTT",
        },
        {
          id: "vid-5",
          title: "Kiwi Jr - Open-Source OmniBot Platform",
          url: "https://www.youtube.com/watch?v=6nJC45BOKj4",
          category: "Hardware & IoT",
        },
        {
          id: "vid-6",
          title: "BluSpike - Build a Solar Powered BLE Sensor Array",
          url: "https://www.youtube.com/watch?v=kyoeOA1pdK0",
          category: "Hardware & IoT",
        },
        {
          id: "vid-7",
          title: "OpenSkan Full Body 3D Scanner",
          url: "https://www.youtube.com/watch?v=ao3EYU3NY7Y",
          category: "Hardware & IoT",
        },
        {
          id: "vid-8",
          title: "Build a serverless Martian weather display",
          url: "https://www.youtube.com/watch?v=wrmUnaPJviI",
          category: "AWS & Serverless",
        },
        {
          id: "vid-9",
          title: "Remote IoT Alert Automation With AWS Lambda",
          url: "https://www.youtube.com/watch?v=Yn5oU9oL8EM",
          category: "AWS & Serverless",
        },
        {
          id: "vid-10",
          title: "HDDG 33: How we started a Decentralized Space Agency",
          url: "https://www.youtube.com/watch?v=Qod-JfsZWEw",
          category: "Talks & Speaking",
        },
        {
          id: "vid-11",
          title: "Hackster Live Stream: Alex Glow and Moheeb Zara",
          url: "https://www.youtube.com/watch?v=I9kTyF2vjoI",
          category: "Talks & Speaking",
        },
        {
          id: "vid-12",
          title: "Fractured Future: Interactive DJ/VJ Installation",
          url: "https://www.youtube.com/watch?v=lw4yWTakaqQ",
          category: "Art & Creative Tech",
        },
        {
          id: "vid-13",
          title: "Projection Mapping Demo",
          url: "https://www.youtube.com/watch?v=EaJFbt0hboQ",
          category: "Art & Creative Tech",
        },
        {
          id: "vid-14",
          title: "Mind Blown: Leap Motion orb control",
          url: "https://www.youtube.com/watch?v=630N99H_Dq0",
          category: "Art & Creative Tech",
        },
        {
          id: "vid-15",
          title: "Nodebots Day 2014 at HeatSync Labs",
          url: "https://www.youtube.com/watch?v=2tuxFFcRuI8",
          category: "HeatSync Labs",
        },
        {
          id: "vid-16",
          title: "Nodebots Day 2015 Battle Royale",
          url: "https://www.youtube.com/watch?v=DNmjuJAWO00",
          category: "HeatSync Labs",
        },
      ],
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
    id: "testimonials-1",
    type: "testimonials",
    visible: true,
    data: {
      items: [
        {
          id: "test-1",
          quote:
            "Moheeb's workshops are the perfect mix of technical depth and accessibility. He makes embedded systems feel approachable.",
          author: "Workshop Attendee",
          role: "Engineer",
          org: "IoT Startup",
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
        {
          id: "link-1",
          icon: "github",
          label: "GitHub",
          url: "https://github.com/virgilvox",
        },
        {
          id: "link-2",
          icon: "twitter",
          label: "Twitter",
          url: "https://twitter.com/virgilvox",
        },
        {
          id: "link-3",
          icon: "globe",
          label: "Hackster.io",
          url: "https://hackster.io/virgilvox",
        },
        {
          id: "link-4",
          icon: "mail",
          label: "Email",
          url: "mailto:hello@hack.build",
        },
      ],
    },
  },
];

export function ExampleContent() {
  const themes = getAllThemes();
  const [themeId, setThemeId] = useState("hackbuild");
  const theme = getTheme(themeId);

  return (
    <ThemeProvider themeId={themeId} customizations={{}}>
      <div className="min-h-screen bg-cv-bg text-cv-text pt-14">
        <ThemeDecorations type={theme?.decorations} />
        <ProfileRenderer blocks={exampleBlocks} />

        {/* Theme selector bar - top */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-700 px-4 py-3">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <Palette size={16} className="text-zinc-500" />
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Theme
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setThemeId(t.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                    themeId === t.id
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {/* Color preview dots */}
                  <div className="flex -space-x-1 shrink-0">
                    <div
                      className="w-3 h-3 rounded-full border border-white/50 dark:border-zinc-500/50"
                      style={{ backgroundColor: t.preview.bg }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border border-white/50 dark:border-zinc-500/50"
                      style={{ backgroundColor: t.preview.accent }}
                    />
                  </div>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
