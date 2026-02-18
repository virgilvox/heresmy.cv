"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up @convex-dev/auth Password reset flow once an email provider is configured
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cv-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold font-serif text-cv-text">
            heresmy<span className="text-cv-accent">.</span>cv
          </Link>
          <p className="text-cv-text-muted text-sm mt-2">Reset your password</p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-cv-text-muted">
              If an account exists for <strong className="text-cv-text">{email}</strong>, you&apos;ll receive a password reset link shortly.
            </p>
            <Link
              href="/login"
              className="inline-block text-sm text-cv-accent hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
            <p className="text-center text-sm text-cv-text-muted">
              <Link href="/login" className="text-cv-accent hover:underline">
                Back to sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
