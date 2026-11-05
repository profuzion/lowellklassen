import Link from "next/link";
import type { ReactNode } from "react";

type BrandButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "editorial";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function BrandButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
  onClick,
}: BrandButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2.5 font-sans text-sm font-semibold tracking-[-0.005em] transition-all duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)] disabled:pointer-events-none disabled:opacity-60";
  const sizes = {
    md: "px-6 py-3.5",
    lg: "px-8 py-[18px] text-[15px]",
  };
  const variants = {
    primary:
      "rounded-full bg-ayc-yellow text-[#171717] hover:bg-[#FFD35C] hover:shadow-[0_12px_34px_-8px_rgba(255,200,44,0.55)]",
    ghost:
      "rounded-full bg-transparent text-ayc-paper shadow-[inset_0_0_0_1.5px_rgba(199,199,199,0.28)] hover:text-ayc-yellow hover:shadow-[inset_0_0_0_1.5px_var(--ayc-yellow)]",
    editorial:
      "rounded-none border border-ayc-line bg-transparent px-0 py-3 text-ayc-paper uppercase tracking-[0.12em] hover:border-ayc-yellow hover:bg-ayc-yellow hover:text-ayc-black",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const arrow =
    variant === "ghost" ? null : (
      <svg
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
        {arrow}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
      {arrow}
    </button>
  );
}
