import type { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 hover:-translate-y-0.5">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-white/70">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-3 py-1 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-4">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            className="text-sm underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
