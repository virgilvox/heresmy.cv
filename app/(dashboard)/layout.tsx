"use client";

import { useConvexAuth } from "convex/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cv-bg flex items-center justify-center">
        <div className="text-cv-text-muted text-sm">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
