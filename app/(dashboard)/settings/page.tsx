"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SettingsPage() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-cv-bg text-cv-text">
      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold font-serif">Settings</h1>
          <Link
            href="/editor"
            className="text-sm text-cv-text-muted hover:text-cv-accent transition-colors"
          >
            Back to editor
          </Link>
        </div>

        <div className="bg-cv-surface border border-cv-border rounded-lg p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cv-text-dim mb-4">
            Account
          </h2>
          <Button
            variant="danger"
            onClick={() => {
              void signOut().then(() => router.push("/"));
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
