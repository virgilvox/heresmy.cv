"use client";

import Link from "next/link";

export default function EditorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-cv-bg flex items-center justify-center text-cv-text px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold font-serif mb-3">Editor error</h1>
        <p className="text-cv-text-muted text-sm mb-6">
          Something went wrong loading the editor. Your data is safe.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 bg-cv-accent text-cv-bg font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            Reload editor
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-cv-border text-cv-text rounded-lg hover:border-cv-accent transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
