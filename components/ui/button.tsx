import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          size === "sm" && "px-3 py-1.5 text-xs rounded-md",
          size === "md" && "px-4 py-2 text-sm rounded-lg",
          size === "lg" && "px-6 py-3 text-base rounded-lg",
          variant === "primary" &&
            "bg-cv-accent text-cv-bg hover:opacity-90",
          variant === "secondary" &&
            "bg-transparent border border-cv-border text-cv-text hover:border-cv-accent hover:text-cv-accent",
          variant === "ghost" &&
            "bg-transparent text-cv-text-muted hover:text-cv-text hover:bg-cv-surface",
          variant === "danger" &&
            "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
