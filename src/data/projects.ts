import safediskImg from "../assets/hero.jpg";
import simoneImg from "../assets/simone.jpg";
import lefrankImg from "../assets/lefrank.jpg";
import compteurImg from "../assets/compteur.jpg"

export type Project = {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
  image: string;
};

export const projects: Project[] = [
  {
    title: "SafeDisk",
    description:
      "Site vitrine pour un service de récupération de données. Travail sur UI, structure et crédibilité.",
    tags: ["WordPress", "UI/UX", "Sécurité"],
    links: [{ label: "Voir le site", href: "https://safedisk.dimyx.fr" }],
    image: safediskImg,
  },
  {
    title: "J’ai Piscine Avec Simone",
    description:
      "Site média orienté contenu. Mise en page, lisibilité et adaptation au public.",
    tags: ["WordPress", "Content", "Responsive"],
    links: [
      { label: "Voir le site", href: "https://jaipiscineavecsimone.com" },
    ],
    image: simoneImg,
  },
  {
    title: "Restaurant Le Frank",
    description:
      "Site haut de gamme (restaurant). Travail sur intégration, UI premium, animations et responsive (J'ai fais le développement pas le design).",
    tags: ["WordPress", "JavaScript", "Responsive"],
    links: [{ label: "Voir le site", href: "https://restaurantlefrank.fr" }],
    image: lefrankImg,
  },
  {
    title: "Appli Compteur",
    description:
      "Mini projet React/TypeScript, compteur avec meilleur score",
    tags: ["React", "TypeScript", "Responsive"],
    links: [{ label: "Voir le site", href: "https://compteur-react-topaz.vercel.app" }],
    image: compteurImg,
  },
];
