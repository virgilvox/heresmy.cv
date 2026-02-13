"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useRef } from "react";

export function ViewCounter({ slug }: { slug: string }) {
  const increment = useMutation(api.profiles.incrementViewCount);
  const counted = useRef(false);

  useEffect(() => {
    if (!counted.current) {
      counted.current = true;
      void increment({ slug });
    }
  }, [slug, increment]);

  return null;
}
