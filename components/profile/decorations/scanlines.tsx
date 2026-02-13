"use client";

export function ScanlinesDecoration() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)",
        animation: "scanlines 8s linear infinite",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes scanlines {
              0% { transform: translateY(0); }
              100% { transform: translateY(4px); }
            }
          `,
        }}
      />
    </div>
  );
}
