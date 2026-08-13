import safediskImg from "../assets/hero.jpg";
import simoneImg from "../assets/simone.jpg";
import lefrankImg from "../assets/lefrank.jpg";
import compteurImg from "../assets/compteur.jpg";
import iotImg from "../assets/iot.jpg";
import infraImg from "../assets/infra.jpg";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
  image: string;
};

export const projects: Project[] = [
  {
    title: "Supervision / IoT",
    description:
      "Architecture globale pour la collecte et la remontée de données de capteurs en temps réel. Développement d'une API PHP pour la réception des métriques, stockage sécurisé sur base MariaDB et création d'un système d'alerte automatisé lors du franchissement de seuils critiques. Focus sur la fiabilité du réseau local et la sécurisation des flux de données.",
    tags: ["Linux", "MariaDB", "Cybersécurité"],
    links: [{ label: "Indisponible", href: "" }],
    image: iotImg,
  },
  {
    title: "Lab Infrastructure & Automatisation",
    description:
      "Conception et déploiement automatisé d'un environnement réseau hybride (Linux / Windows Server). Mise en place d'un domaine Active Directory (GPO, gestion des accès), d'un serveur Web/Database et d'outils d'administration. Intégration de scripts Bash et PowerShell pour l'automatisation des tâches récurrentes (sauvegardes, création d'utilisateurs, mises à jour) et la sécurisation des accès.",
    tags: ["Linux", "Script Python / Bash", "AD"],
    links: [{ label: "Indisponible", href: "" }],
    image: infraImg,
  },
  {
    title: "SafeDisk",
    description:
      "Intégration, sécurisation de l'hébergement et optimisation des performances applicatives.",
    tags: ["WordPress", "UI/UX", "Sécurité"],
    links: [{ label: "Voir le site", href: "https://restoredata.fr" }],
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
      "Site haut de gamme (restaurant). Travail sur intégration, UI premium, animations et responsive (J'ai fait le développement pas le design).",
    tags: ["WordPress", "JavaScript", "Responsive"],
    links: [{ label: "Voir le site", href: "https://restaurantlefrank.fr" }],
    image: lefrankImg,
  },
  {
    title: "Appli Compteur",
    description: "Mini projet React/TypeScript, compteur avec meilleur score",
    tags: ["React", "TypeScript", "Responsive"],
    links: [
      {
        label: "Voir le site",
        href: "https://compteur-react-topaz.vercel.app",
      },
    ],
    image: compteurImg,
  },
];
