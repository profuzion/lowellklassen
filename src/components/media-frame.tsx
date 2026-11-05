import Image from "next/image";

type MediaFrameProps = {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
};

export function MediaFrame({ src, alt, label, priority = false }: MediaFrameProps) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] border border-ayc-line bg-ayc-ink-2">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 28rem, 100vw"
          className="object-contain object-center"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <span className="font-sans text-[11px] font-semibold tracking-[0.2em] text-ayc-muted uppercase">
            {label}
          </span>
          <span aria-hidden className="font-display text-7xl leading-none text-ayc-paper">
            L
          </span>
          <span className="max-w-[14rem] text-sm text-ayc-muted">
            Portrait and social stills go here.
          </span>
          <span className="absolute top-0 left-0 h-full w-0.5 bg-ayc-yellow" />
        </div>
      )}
    </div>
  );
}
