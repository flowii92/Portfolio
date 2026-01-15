import { useMemo, useRef, useState } from "react";
import type { Project } from "../data/projects";

export default function ProjectsCarousel({
  projects,
}: {
  projects: Project[];
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;

    const width = el.clientWidth;
    const next = Math.max(0, Math.min(activeIndex + dir, projects.length - 1));

    el.scrollTo({ left: width * next, behavior: "smooth" });
    setActiveIndex(next);
  };

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(index);
  };

  const dots = useMemo(() => projects.map((_, i) => i), [projects]);

  return (
    <div className="relative">
      <div className="rounded-[28px] border border-white/10 bg-gradient-to-br
      from-sky-500/30
      via-indigo-500/15
      to-fuchsia-500/40
      border-y border-white/10
      backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div>
            <span className="text-white">MES PROJETS</span>
          </div>

          <div className="flex items-center gap-2">
            <ArrowBtn onClick={() => scrollByCard(-1)} label="Précédent" />
            <ArrowBtn onClick={() => scrollByCard(1)} label="Suivant" />
          </div>
        </div>

        {/* Scroller */}
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {projects.map((p) => (
            <div key={p.title} className="min-w-full snap-start p-5 md:p-7">
              <BigProjectSlide project={p} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 border-t border-white/10 px-5 py-4">
          {dots.map((i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArrowBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
    >
      {label === "Précédent" ? "←" : "→"}
    </button>
  );
}

function BigProjectSlide({ project }: { project: Project }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center">
      <a
        href={project.links[0]?.href}
        target="_blank"
        rel="noreferrer"
        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-black/30 cursor-pointer"
      >
        <img
          src={project.image}
          alt={`Aperçu ${project.title}`}
          className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* bottom bar */}
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/40 px-4 py-3">
          <p className="text-xs text-white/60">Preview</p>
          <p className="text-sm font-semibold">{project.title}</p>
        </div>
      </a>

      {/* zone texte */}
      <div>
        <p className="text-xs text-white/60">Projet</p>
        <h3 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-4 text-white/70 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-black px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              {l.label}
            </a>
          ))}

          <a
            href="#contact"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            Me contacter
          </a>
        </div>
      </div>
    </div>
  );
}
