"use client";

export function TapeDecoration() {
  return (
    <>
      {/* Top-left tape strip */}
      <div
        className="fixed top-12 -left-4 w-32 h-6 opacity-60 pointer-events-none z-10"
        style={{
          background: "rgba(255, 243, 200, 0.5)",
          transform: "rotate(-12deg)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      />
      {/* Top-right tape strip */}
      <div
        className="fixed top-20 -right-2 w-28 h-6 opacity-50 pointer-events-none z-10"
        style={{
          background: "rgba(255, 243, 200, 0.4)",
          transform: "rotate(8deg)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      />
      {/* Middle tape */}
      <div
        className="fixed top-1/3 -left-6 w-36 h-5 opacity-40 pointer-events-none z-10"
        style={{
          background: "rgba(200, 230, 255, 0.4)",
          transform: "rotate(-5deg)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      />
    </>
  );
}
