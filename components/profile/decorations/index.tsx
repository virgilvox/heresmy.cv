"use client";

import dynamic from "next/dynamic";

const TapeDecoration = dynamic(
  () => import("./tape").then((m) => m.TapeDecoration),
  { ssr: false }
);
const ScanlinesDecoration = dynamic(
  () => import("./scanlines").then((m) => m.ScanlinesDecoration),
  { ssr: false }
);
const SparklesDecoration = dynamic(
  () => import("./sparkles").then((m) => m.SparklesDecoration),
  { ssr: false }
);
const MushroomsDecoration = dynamic(
  () => import("./mushrooms").then((m) => m.MushroomsDecoration),
  { ssr: false }
);

type DecorationType =
  | "tape"
  | "scanlines"
  | "sparkles"
  | "mushrooms"
  | "grid"
  | "retrowave-grid"
  | null;

export function ThemeDecorations({
  type,
}: {
  type: DecorationType | undefined;
}) {
  if (!type) return null;

  switch (type) {
    case "tape":
      return <TapeDecoration />;
    case "scanlines":
      return <ScanlinesDecoration />;
    case "sparkles":
      return <SparklesDecoration />;
    case "mushrooms":
      return <MushroomsDecoration />;
    case "grid":
      return (
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,0,170,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,170,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      );
    case "retrowave-grid":
      return (
        <div
          className="fixed bottom-0 left-0 right-0 h-1/3 pointer-events-none z-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,110,199,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,110,199,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            perspective: "500px",
            transform: "rotateX(60deg)",
            transformOrigin: "bottom",
          }}
        />
      );
    default:
      return null;
  }
}
