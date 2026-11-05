export function Kicker({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={`font-sans text-[clamp(10px,0.78vw,12px)] font-semibold tracking-[0.28em] text-ayc-yellow uppercase ${className}`}
    >
      {children}
    </p>
  );
}
