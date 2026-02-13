"use client";

import Link from "next/link";
import { useConvexAuth } from "convex/react";

export function Nav() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-15 flex items-center px-6 justify-between border-b border-cv-border bg-cv-bg/85 backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight font-serif text-cv-text">
          heresmy<span className="text-cv-accent">.</span>cv
        </span>
      </Link>
      <div className="flex gap-2">
        {isLoading ? (
          <div className="h-9" />
        ) : isAuthenticated ? (
          <Link
            href="/editor"
            className="px-5 py-2 text-sm font-bold bg-cv-accent text-cv-bg rounded-md hover:opacity-90 transition-opacity"
          >
            Go to editor
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="px-4 py-2 text-sm border border-cv-border rounded-md text-cv-text hover:border-cv-accent hover:text-cv-accent transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 text-sm font-bold bg-cv-accent text-cv-bg rounded-md hover:opacity-90 transition-opacity"
            >
              Create yours free
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
