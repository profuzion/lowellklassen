import Image from "next/image";

import { ProjectDialog } from "@/components/home/project-dialog";
import { projects, type Project } from "@/content/home";

function Shot({ project }: { project: Project }) {
  if (project.frame === "split" && "mark" in project) {
    return (
      <div className="lk-shot">
        <div className="lk-sky-mark">
          <img src={project.mark} alt={project.markAlt} />
        </div>
        <div className="lk-shot-photo">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 899px) 100vw, 46vw"
          />
        </div>
      </div>
    );
  }

  const wide = project.frame === "wide";
  return (
    <div className={wide ? "lk-shot lk-shot-wide" : "lk-shot lk-shot-portrait"}>
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        priority={wide}
        sizes={wide ? "(max-width: 899px) 100vw, 92vw" : "(max-width: 899px) 100vw, 40vw"}
      />
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section className="lk-section" id="work" aria-labelledby="work-title">
      <div className="lk-grid lk-work-head">
        <h2 id="work-title" className="lk-display">
          The work makes the case.
        </h2>
        <p>
          Three recent jobs: the names, the marks, and the sites.
        </p>
        <a className="lk-textlink lk-work-more" href="/selected-work">
          Read the case studies
        </a>
      </div>
      <div className="lk-projects">
        {projects.map((project) => (
          <article className="lk-project" key={project.slug}>
            <Shot project={project} />
            <div className="lk-caption">
              <h3>{project.name}</h3>
              <p className="lk-meta">
                {project.disciplines.join(" · ")} · {project.credit}
              </p>
              <p>{project.summary}</p>
              <div className="lk-caption-links">
                <ProjectDialog project={project} />
                <a href={project.href} target="_blank" rel="noreferrer">
                  {project.hrefLabel}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
