import Container from "./components/Container";
import { useEffect, useState } from "react";
import Section from "./components/Section";
import { projects } from "./data/projects";

import heroImg from "./assets/hero.jpg";
import AnimatedBackground from "./components/AnimatedBackground";
import ProjectsCarousel from "./components/ProjectsCarousel";
import DecorativeOverlay from "./components/DecorativeOverlay";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);
  const toggleMobile = () => setMobileOpen((v) => !v);

  useEffect(() => {
    const ids = ["home", "projects", "skills", "faq", "contact", "timeline"];

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          )[0];

        if (hit) setActiveSection(hit.target.id);
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // lock scroll quand menu mobile ouvert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // fermer au clavier (ESC)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onNavClick = (id: string) => {
    setActiveSection(id);
    closeMobile();

    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen text-white">
      <AnimatedBackground />
      <DecorativeOverlay />

      {/* MOBILE MENU – FULLSCREEN BLOCK (au-dessus de TOUT) */}
      <div
        className={[
          "md:hidden fixed inset-0 z-[9999]",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* fond FULL opaque */}
        <div
          className={[
            "absolute inset-0 bg-[#07070b] transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />

        {/* contenu (menu) */}
        <div
          className={[
            "absolute inset-0 transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          {/* bloc menu (FULL HEIGHT + FULL WIDTH opaque) */}
          <div className="h-full w-full bg-[#0b0b0f]">
            <div className="p-6 flex flex-col h-full">
              {/* header */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-white/80">Menu</p>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="rounded-lg border border-white/10 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white/90 hover:text-red-500/90 hover:bg-white/10 transition"
                >
                  X
                </button>
              </div>

              {/* items */}
              <div className="mt-6 grid gap-3">
                <MobileNavItem
                  label="Home"
                  id="home"
                  activeSection={activeSection}
                  onNavClick={onNavClick}
                />
                <MobileNavItem
                  label="Projects"
                  id="projects"
                  activeSection={activeSection}
                  onNavClick={onNavClick}
                />
                <MobileNavItem
                  label="Skills"
                  id="skills"
                  activeSection={activeSection}
                  onNavClick={onNavClick}
                />
                <MobileNavItem
                  label="FAQs"
                  id="faq"
                  activeSection={activeSection}
                  onNavClick={onNavClick}
                />
                <MobileNavItem
                  label="Contact"
                  id="contact"
                  activeSection={activeSection}
                  onNavClick={onNavClick}
                />
                <MobileNavItem
                  label="Parcours"
                  id="timeline"
                  activeSection={activeSection}
                  onNavClick={onNavClick}
                />
              </div>

              <div className="mt-auto pt-6 text-xs text-white/40">
                © {new Date().getFullYear()} Valentin
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0b0f]/70 backdrop-blur">
        <Container>
          <div className="relative flex items-center py-10">
            {/* LEFT (logo / vide pour l’instant) */}
            <div className="flex items-center gap-3">{/* logo plus tard */}</div>

            {/* CENTER NAV (desktop) */}
            <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-xl">
              <NavItem
                href="#home"
                label="HOME"
                activeSection={activeSection}
                onNavClick={onNavClick}
              />
              <NavItem
                href="#projects"
                label="PROJECTS"
                activeSection={activeSection}
                onNavClick={onNavClick}
              />
              <NavItem
                href="#skills"
                label="SKILLS"
                activeSection={activeSection}
                onNavClick={onNavClick}
              />
              <NavItem
                href="#faq"
                label="FAQS"
                activeSection={activeSection}
                onNavClick={onNavClick}
              />
              <NavItem
                href="#contact"
                label="CONTACT"
                activeSection={activeSection}
                onNavClick={onNavClick}
              />
              <NavItem
                href="#timeline"
                label="PARCOURS"
                activeSection={activeSection}
                onNavClick={onNavClick}
              />
            </nav>

            {/* RIGHT (mobile button) */}
            <div className="ml-auto md:hidden">
              <button
                type="button"
                onClick={toggleMobile}
                aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileOpen}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition"
              >
                <span className="text-white/70">
                  {mobileOpen ? "Fermer" : "Menu"}
                </span>

                {/* hamburger */}
                <span className="relative h-4 w-5">
                  <span
                    className={[
                      "absolute left-0 top-0 h-[2px] w-5 bg-white/70 transition",
                      mobileOpen ? "translate-y-[7px] rotate-45" : "",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute left-0 top-[7px] h-[2px] w-5 bg-white/70 transition",
                      mobileOpen ? "opacity-0" : "",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute left-0 bottom-0 h-[2px] w-5 bg-white/70 transition",
                      mobileOpen ? "-translate-y-[7px] -rotate-45" : "",
                    ].join(" ")}
                  />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <main>
        {/* marker home */}
        <div id="home" className="h-px scroll-mt-28" />

        <Container>
          <section className="py-12 md:py-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* LEFT: big image card */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-[28px] bg-white/5 blur-2xl" />
                <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl">
                  <img
                    src={heroImg}
                    alt="Hero"
                    className="h-[320px] w-full object-cover md:h-[460px]"
                  />

                  {/* small badge */}
                  <div className="absolute right-4 top-4 rounded-2xl border border-white/15 bg-violet-500/80 px-4 py-3 text-black shadow-lg">
                    <p className="text-center text-xs font-semibold opacity-80">
                      SITE
                    </p>
                    <p className="text-lg font-black leading-none">À la une</p>
                  </div>

                  {/* bottom bar */}
                  <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-black/30 px-5 py-4">
                    <p className="text-xs text-white/70">
                      https://safedisk.dimyx.fr{" "}
                      <span className="text-violet-300">•</span> Designé &
                      Developpé par Valentin MAREK
                    </p>
                    <div className="flex items-center gap-2">
                      <SocialDot />
                      <SocialDot />
                      <SocialDot />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: text & CTA */}
              <div className="relative">
                <div className="absolute -top-10 right-0 h-16 w-16 rotate-12 rounded-2xl border border-white/15 bg-indigo-500/20" />
                <div className="absolute top-24 right-10 h-3 w-3 rounded-full bg-violet-300" />

                <h1
                  className="mt-2 text-3xl font-black tracking-tight md:text-3xl
               bg-gradient-to-b from-blue-400 to-fuchsia-600
               text-transparent bg-clip-text"
                >
                  PORTFOLIO
                </h1>

                <h2 className="mt-1 text-xl font-black tracking-tight md:text-xl">
                  <span className="text-violet-400">React</span> •{" "}
                  <span className="text-white">TypeScript</span> •
                  <span className="text-violet-400"> Tailwind</span>
                </h2>

                <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
                  CREER DES EXPERIENCES
                  <br />
                  WEB{" "}
                  <span
                    className="bg-gradient-to-b from-blue-400 to-fuchsia-600
                 text-transparent bg-clip-text"
                  >
                    PROPRES & EFFICACES
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-white/70 leading-relaxed">
                  Étudiant en BTS CIEL. J&apos;apprends à construire et je
                  construis des projets web concrets (apps
                  React/TypeScript/Next.js/Node.js & WordPress) avec un focus
                  UI/UX propre, structure et logique produit.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavClick("projects");
                    }}
                    className="rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-5 py-3 text-sm font-extrabold text-black hover:bg-violet-400 transition"
                  >
                    VOIR LES PROJETS
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavClick("contact");
                    }}
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
                  >
                    Me contacter
                  </a>
                </div>

                <p className="mt-6 text-base font-black tracking-tight">
                  Mes compétences :
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  <Tag>React</Tag>
                  <Tag>Next.js</Tag>
                  <Tag>Node.js</Tag>
                  <Tag>TypeScript</Tag>
                  <Tag>UI/UX</Tag>
                  <Tag>Tailwind</Tag>
                  <Tag>Cybersécurité</Tag>
                </div>
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <div id="projects" className="h-px scroll-mt-28" />

          {/* Wrapper */}
          <div className="relative my-20 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            {/* Cadre de fond */}
            <div
              className="absolute inset-0
                bg-gradient-to-br
                from-violet-500/10
                via-indigo-500/15
                to-sky-500/12
                border-y border-white/10
                backdrop-blur-xl"
            />

            <div className="relative py-12 md:py-16">
              <Container>
                <Section
                  title="Projects"
                  subtitle="Mes projets principaux (avec résultats concrets)."
                >
                  <ProjectsCarousel projects={projects} />
                </Section>
              </Container>
            </div>
          </div>

          {/* SKILLS */}
          <div id="skills" className="h-px scroll-mt-28" />
          <Section
            title="COMPÉTENCES"
            subtitle="Technologies et savoir-faire que j’utilise dans mes projets."
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-center">
              <SkillCard title="Frontend">
                <SkillItem>React</SkillItem>
                <SkillItem>TypeScript</SkillItem>
                <SkillItem>Tailwind CSS</SkillItem>
                <SkillItem>HTML</SkillItem>
                <SkillItem>CSS</SkillItem>
                <SkillItem>JavaScript</SkillItem>
              </SkillCard>

              <SkillCard title="Backend & Logique">
                <SkillItem>Node.js</SkillItem>
                <SkillItem>APIs REST</SkillItem>
                <SkillItem>Gestion d’état</SkillItem>
                <SkillItem>Logique applicative</SkillItem>
              </SkillCard>

              <SkillCard title="CMS & Web">
                <SkillItem>WordPress (custom)</SkillItem>
                <SkillItem>Thèmes & blocs</SkillItem>
                <SkillItem>Responsive design</SkillItem>
                <SkillItem>SEO</SkillItem>
              </SkillCard>

              <SkillCard title="UI / UX">
                <SkillItem>Design moderne</SkillItem>
                <SkillItem>Hiérarchie visuelle</SkillItem>
                <SkillItem>Micro-interactions</SkillItem>
                <SkillItem>Expérience utilisateur</SkillItem>
              </SkillCard>

              <SkillCard title="Outils">
                <SkillItem>Git / GitHub</SkillItem>
                <SkillItem>VS Code</SkillItem>
                <SkillItem>Figma (bases)</SkillItem>
                <SkillItem>Debug / DevTools</SkillItem>
              </SkillCard>

              <SkillCard title="Cybersécurité (BTS CIEL)">
                <SkillItem>Bases sécurité réseau</SkillItem>
                <SkillItem>Bonnes pratiques</SkillItem>
                <SkillItem>Sensibilisation risques</SkillItem>
                <SkillItem>Approche méthodique</SkillItem>
              </SkillCard>
            </div>
          </Section>

          {/* FAQ */}
          <div id="faq" className="h-px scroll-mt-28" />

          <div className="relative mt-20 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div
              className="absolute inset-0
      bg-gradient-to-br
      from-sky-500/30
      via-indigo-500/15
      to-fuchsia-500/40
      border-y border-white/10
      backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
            />

            <div className="relative">
              <Container>
                <Section title="FAQs" subtitle="Pour un recruteur.">
                  <div className="grid gap-3 md:grid-cols-2">
                    <Faq
                      q="Tu cherches quoi ?"
                      a="Une alternance / formation Bachelor Full-Stack, et des projets concrets pour progresser."
                    />
                    <Faq
                      q="Ton point fort ?"
                      a="Ma motivation, les projets réels, sens du détail UI, et approche “produit”."
                    />
                  </div>
                </Section>
              </Container>
            </div>
          </div>

          {/* FULL WIDTH DIVIDER */}
          <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
            <div className="absolute inset-0 border-y border-white/10" />

            <div
              className="absolute inset-0
      bg-[radial-gradient(900px_260px_at_20%_50%,rgba(59,130,246,0.18),transparent_65%),radial-gradient(900px_260px_at_80%_50%,rgba(168,85,247,0.18),transparent_65%),linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(0,0,0,0.12))]
      backdrop-blur-xl"
            />

            <div className="absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
              <div className="absolute -inset-[60%] rotate-12 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.14)_0px,rgba(255,255,255,0.14)_1px,transparent_1px,transparent_16px)]" />
            </div>

            <div className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 h-28 w-28 rounded-full bg-sky-400/20 blur-2xl" />
            <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-2xl" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-[32px] rotate-12 border border-white/10 bg-white/5 blur-[0px]" />

            <div className="relative py-10">
              <Container>
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <span
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold tracking-[0.22em]
            text-white/70 backdrop-blur-xl"
                  >
                    PORTFOLIO
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </div>
              </Container>
            </div>
          </div>

          {/* CONTACT */}
          <div id="contact" className="h-px scroll-mt-28" />

          <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div
              className="absolute inset-0
      bg-gradient-to-br
      from-sky-500/30
      via-indigo-500/15
      to-fuchsia-500/40
      border-y border-white/10
      backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
            />

            <div className="relative">
              <Container>
                <Section title="Contact" subtitle="Simple et direct.">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="grid gap-3 md:grid-cols-2 text-sm">
                      <ContactRow label="Email" value="flowitfb@gmail.com" />
                      <ContactRow label="Tél" value="06 62 73 77 10" />
                    </div>
                  </div>
                </Section>
              </Container>
            </div>
          </div>

          {/* TIMELINE */}
          <div id="timeline" className="h-px scroll-mt-28" />
          <Section title="Parcours" subtitle="Mon parcours scolaire + projets clés.">
            <Timeline />
          </Section>

          <footer className="py-10 text-center text-xs text-white/50">
            © {new Date().getFullYear()} Valentin — Portfolio
          </footer>
        </Container>
      </main>
    </div>
  );
}

/* --- NAV item (desktop) --- */
function NavItem({
  href,
  label,
  activeSection,
  onNavClick,
}: {
  href: string;
  label: string;
  activeSection: string;
  onNavClick: (id: string) => void;
}) {
  const id = href.replace("#", "");
  const active = activeSection === id;

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onNavClick(id);
      }}
      className={[
        "relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer",
        active
          ? "text-violet-200 bg-violet-500/15 shadow-[0_0_16px_rgba(139,92,246,0.45)]"
          : "text-white/70 hover:text-violet-200 hover:bg-white/5",
      ].join(" ")}
    >
      {label}

      <span
        className={[
          "pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] rounded-full transition-all duration-300",
          active ? "w-7 bg-violet-400" : "w-0 bg-transparent",
        ].join(" ")}
      />
    </a>
  );
}

/* --- NAV item (mobile panel) --- */
function MobileNavItem({
  label,
  id,
  activeSection,
  onNavClick,
}: {
  label: string;
  id: string;
  activeSection: string;
  onNavClick: (id: string) => void;
}) {
  const active = activeSection === id;

  return (
    <button
      type="button"
      onClick={() => onNavClick(id)}
      className={[
        "w-full text-left rounded-2xl border px-4 py-4 transition",
        active
          ? "border-violet-400/40 bg-violet-500/95 text-violet-100 shadow-[0_0_18px_rgba(139,92,246,0.35)]"
          : "border-white/10 bg-black/95 text-white/80 hover:bg-violet-500/30",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold uppercase">{label}</span>
        <span
          className={[
            "h-2.5 w-2.5 rounded-full transition",
            active ? "bg-violet-400" : "bg-white/20",
          ].join(" ")}
        />
      </div>
    </button>
  );
}

function SocialDot() {
  return <span className="h-2.5 w-2.5 rounded-full bg-violet-300/80" />;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div
      className="rounded-2xl
        border border-purple-400/80
        bg-gradient-to-br
        from-fuchsia-400/15
        via-white/10
        to-sky-400/25
        backdrop-blur-xl
        p-5"
    >
      <p className="font-semibold">{q}</p>
      <p className="mt-2 text-sm text-white/70">{a}</p>
    </div>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        rounded-2xl
        border border-violet-400/80
        bg-gradient-to-br
        from-violet-500/15
        via-indigo-500/10
        to-sky-500/15
        backdrop-blur-xl
        p-5
      "
    >
      <p className="text-xs text-white/60">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function SkillCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-gradient-to-br
        from-violet-500/15
        via-indigo-500/10
        to-sky-500/15
        backdrop-blur-xl
        p-6
      "
    >
      <h3 className="text-lg font-black tracking-tight mb-4 text-white/90">
        {title}
      </h3>
      <div className="justify-center flex flex-wrap gap-2 ">{children}</div>
    </div>
  );
}

function SkillItem({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/90">
      {children}
    </span>
  );
}

function Timeline() {
  const items = [
    {
      date: "2024",
      title: "Baccalauréat Général (SVT, SES)",
      desc: "Bac général, spécialité SVT et SES.",
      tags: ["SVT", "SES", "Maths", "Anglais"],
    },
    {
      date: "2024 — 2026",
      title: "BTS CIEL (Cybersécurité, Informatique & Réseaux)",
      desc: "Formation orientée réseaux, systèmes, cybersécurité + projets techniques. Objectif : devenir développeur full-stack orienté produit/UI.",
      tags: ["Réseaux", "Cybersécurité", "Projets", "Méthode"],
    },
    {
      date: "2025",
      title: "Stage / Projets Web (WordPress & HTML/CSS/JS)",
      desc: "Réalisation de sites concrets : SafeDisk, Le Frank, J’ai Piscine Avec Simone. Focus : UI propre, responsive, contenu, structure, respect des demandes du client et livrable pro.",
      tags: ["WordPress", "UI/UX", "Responsive", "Client"],
    },
    {
      date: "2025 — 2026",
      title: "Montée en compétences Front (React / TypeScript / Tailwind)",
      desc: "Création de ce portfolio + projets React. Structuration du code, composants réutilisables, design premium, animations légères.",
      tags: ["React", "TypeScript", "Tailwind", "Portfolio"],
    },
    {
      date: "Objectif 2026",
      title: "Bachelor Développeur Full-Stack",
      desc: "Approfondir Next.js, backend (Node.js), APIs, base de données, déploiement. Construire des apps complètes et monétisables.",
      tags: ["Next.js", "Node.js", "API", "DB"],
    },
  ];

  return (
    <div className="relative">
      <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />
      <div className="space-y-5">
        {items.map((it) => (
          <div key={it.title} className="relative pl-10">
            <div className="absolute left-0 top-4 h-6 w-6 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl grid place-items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-500" />
            </div>

            <div
              className="rounded-2xl border border-white/10
              bg-gradient-to-br from-violet-500/15 via-indigo-500/10 to-sky-500/15
              backdrop-blur-xl p-6"
            >
              <p className="text-xs text-white/60">{it.date}</p>
              <h3 className="mt-2 text-lg md:text-xl font-black tracking-tight">
                {it.title}
              </h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {it.desc}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {it.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
