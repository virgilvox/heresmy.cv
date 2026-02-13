import Link from "next/link";

export function CtaSection() {
  return (
    <section className="text-center py-20 px-6 border-t border-cv-border">
      <p className="text-cv-text-dim text-[13px] mb-2 tracking-widest uppercase">
        Free forever for individuals
      </p>
      <h2 className="text-[32px] font-serif mb-6">
        Your next opportunity starts with a link.
      </h2>
      <Link
        href="/signup"
        className="inline-block bg-cv-accent text-cv-bg px-8 py-3.5 text-[15px] font-bold rounded-lg hover:opacity-90 transition-opacity"
      >
        Create your page
      </Link>
    </section>
  );
}
