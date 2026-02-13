"use client";

export function MushroomsDecoration() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Top-right mushroom */}
      <svg
        className="absolute top-20 right-8 opacity-20"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <ellipse cx="24" cy="20" rx="18" ry="14" fill="#7bc96a" />
        <rect x="20" y="20" width="8" height="16" rx="3" fill="#d0e8c8" />
        <circle cx="16" cy="16" r="3" fill="#5a7a50" opacity="0.5" />
        <circle cx="30" cy="14" r="2" fill="#5a7a50" opacity="0.5" />
      </svg>
      {/* Bottom-left frog */}
      <svg
        className="absolute bottom-32 left-6 opacity-15"
        width="40"
        height="36"
        viewBox="0 0 40 36"
        fill="none"
      >
        <ellipse cx="20" cy="22" rx="16" ry="12" fill="#7bc96a" />
        <circle cx="12" cy="12" r="6" fill="#7bc96a" />
        <circle cx="28" cy="12" r="6" fill="#7bc96a" />
        <circle cx="12" cy="11" r="3" fill="#0f1a0f" />
        <circle cx="28" cy="11" r="3" fill="#0f1a0f" />
        <circle cx="13" cy="10" r="1" fill="white" />
        <circle cx="29" cy="10" r="1" fill="white" />
      </svg>
      {/* Small mushroom bottom-right */}
      <svg
        className="absolute bottom-16 right-12 opacity-15"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <ellipse cx="16" cy="14" rx="12" ry="10" fill="#8aaa80" />
        <rect x="13" y="14" width="6" height="12" rx="2" fill="#d0e8c8" />
        <circle cx="12" cy="11" r="2" fill="#5a7a50" opacity="0.4" />
      </svg>
    </div>
  );
}
