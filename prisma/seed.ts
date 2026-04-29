import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialProjects = [
  {
    name: "Villa Cassini", cat: "Résidentiel", year: "2023", catFilter: "residentiel", image: "/projects/villa_cassini.png",
    client: "Privé", surface: "240 m²", location: "Cannes", status: "Livré",
    desc: "Cette villa contemporaine s'intègre parfaitement dans son environnement méditerranéen grâce à ses larges baies vitrées et ses matériaux bruts."
  },
  {
    name: "Immeuble Arc", cat: "Commercial", year: "2022", catFilter: "commercial", image: "/projects/immeuble_arc.png",
    client: "Groupe Immobilier Arc", surface: "1200 m²", location: "Paris", status: "Livré",
    desc: "Un immeuble de bureaux innovant conçu pour maximiser la lumière naturelle et favoriser le bien-être au travail."
  },
  {
    name: "Maison Blanc", cat: "Résidentiel", year: "2024", catFilter: "residentiel", image: "/projects/maison_blanc.png",
    client: "Famille Blanc", surface: "180 m²", location: "Bordeaux", status: "En cours",
    desc: "Une rénovation complète d'une échoppe bordelaise avec la création d'une extension résolument moderne."
  },
  {
    name: "Centre Lumière", cat: "Urbanisme", year: "2021", catFilter: "urbanisme", image: "/projects/centre_lumiere.png",
    client: "Ville de Lyon", surface: "5000 m²", location: "Lyon", status: "Livré",
    desc: "Réaménagement urbain d'une place publique incluant un espace culturel et paysager."
  },
  {
    name: "Studio K", cat: "Rénovation", year: "2023", catFilter: "renovation", image: "/projects/studio_k.png",
    client: "Privé", surface: "45 m²", location: "Paris", status: "Livré",
    desc: "Optimisation d'un petit espace parisien pour créer un studio fonctionnel et luxueux."
  },
  {
    name: "Tour Émeraude", cat: "Commercial", year: "2022", catFilter: "commercial", image: "/projects/tour_emeraude.png",
    client: "Emeraude Invest", surface: "8500 m²", location: "La Défense", status: "Livré",
    desc: "Une tour éco-conçue visant les plus hautes certifications environnementales."
  }
];

const initialTestimonials = [
  { name: "Marie Leconte", role: "Projet résidentiel — Paris, 2023", avatar: "ML", rating: 5, text: "Prime Rénov a transformé notre maison en une véritable œuvre d'art habitable. Chaque détail a été pensé avec une précision remarquable. Un résultat qui dépasse toutes nos attentes." },
  { name: "Thomas Bernard", role: "Rénovation — Lyon, 2022", avatar: "TB", rating: 5, text: "Un travail d'une précision remarquable. L'équipe a su comprendre notre vision et la traduire en espaces fonctionnels et beaux. Nous recommandons Prime Rénov sans hésitation." },
  { name: "Société Viricel", role: "Architecture commerciale — Bordeaux, 2021", avatar: "SV", rating: 4, text: "Notre nouveau siège social dépasse toutes nos espérances. Un espace moderne, lumineux, qui reflète parfaitement les valeurs de notre entreprise. Un partenariat excellent du début à la fin." },
  { name: "Philippe & Renée Morin", role: "Villa résidentielle — Aix-en-Provence, 2023", avatar: "PM", rating: 5, text: "Jean-Marie et son équipe ont une sensibilité unique pour créer des espaces qui s'inscrivent naturellement dans leur contexte. Notre villa s'intègre parfaitement au paysage provençal." }
];

async function main() {
  console.log('Start seeding...');

  // Seed Projects
  for (const p of initialProjects) {
    await prisma.project.create({ data: p });
  }

  // Seed Testimonials
  for (const t of initialTestimonials) {
    await prisma.testimonial.create({ data: t });
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
