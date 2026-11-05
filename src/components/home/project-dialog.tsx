"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import type { Project } from "@/content/home";

export function ProjectDialog({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const secondary = "secondary" in project ? project.secondary : undefined;
  const mark = "mark" in project ? project.mark : undefined;

  useEffect(() => {
    if (!open) return;
    const root = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root?.querySelector<HTMLElement>("button")?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !root) return;
      const nodes = [
        ...root.querySelectorAll<HTMLElement>("a, button"),
      ];
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
      >
        View the project
      </button>
      {open ? (
        <div
          className="lk-dialog-back"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            className="lk-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="lk-dialog-top">
              <div>
                <p className="lk-meta">{project.disciplines.join(" · ")}</p>
                <h2 id={titleId}>{project.name}</h2>
              </div>
              <button
                type="button"
                className="lk-dialog-close"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="lk-dialog-figure">
              {mark ? (
                <div className="lk-sky-mark">
                  <img src={mark} alt={"markAlt" in project ? project.markAlt : ""} />
                </div>
              ) : null}
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={project.width}
                height={project.height}
                sizes="(max-width: 900px) 100vw, 860px"
              />
              {secondary ? (
                <Image
                  src={secondary.src}
                  alt={secondary.alt}
                  width={secondary.width}
                  height={secondary.height}
                  sizes="(max-width: 900px) 70vw, 420px"
                />
              ) : null}
            </div>
            <div className="lk-dialog-copy">
              <p className="lk-meta">{project.credit}</p>
              {project.detail.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                <a className="lk-textlink" href={project.href} target="_blank" rel="noreferrer">
                  {project.hrefLabel}
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
