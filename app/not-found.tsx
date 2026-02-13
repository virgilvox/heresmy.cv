import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cv-bg flex items-center justify-center text-cv-text">
      <div className="text-center">
        <h1 className="text-6xl font-bold font-serif mb-4">404</h1>
        <p className="text-cv-text-muted mb-6">This page doesn&apos;t exist yet.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cv-accent text-cv-bg font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          Go home
        </Link>
        <p className="mt-8 text-sm text-cv-text-dim">
          Want this URL?{" "}
          <Link href="/signup" className="text-cv-accent hover:underline">
            Create your page
          </Link>
        </p>
      </div>
    </div>
  );
}
