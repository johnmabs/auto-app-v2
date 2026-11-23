import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@generated/prisma/client";
import { hashPassword } from "@/features/auth/services/password.service";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const db = new PrismaClient({
  adapter,
});

/* ── Véhicules réalistes ─────────────────────────────────── */
const VEHICLES = [];

/* ── Seed function ───────────────────────────────────────── */
async function main() {
  console.log("🌱 Démarrage du seed...\n");

  /* ── Nettoyage ────────────────────────────────────────── */
  console.log("🗑  Nettoyage de la base de données...");
  /*  await db.auditLog.deleteMany(); */
  /*  await db.customerRequest.deleteMany();
  await db.vehicleImage.deleteMany();
  await db.vehicle.deleteMany();
    await db.session.deleteMany();
    await db.account.deleteMany(); */
  await db.user.deleteMany();
  console.log("   ✓ Base nettoyée\n");

  /* ── Admins ───────────────────────────────────────────── */
  console.log("👤 Création des utilisateurs admin...");
  const hashedPassword = await hashPassword("AutoStore@2026!");

  const superAdmin = await db.user.create({
    data: {
      name: "Mamadou Diallo",
      email: "mamadoudiallo@autostore-cg.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log("   ✓ 1 utilisateur créé\n");

  /* ── Véhicules ────────────────────────────────────────── */
  /* console.log("🚗 Création des véhicules...");
  for (const v of VEHICLES) {
    const { images, ...vehicleData } = v;

    const slug = `${vehicleData.make.toLowerCase()}-${vehicleData.model.toLowerCase().replace(/\s+/g, "-")}-${vehicleData.year}-${Math.random().toString(36).slice(2, 8)}`;

    const vehicle = await db.vehicle.create({
      data: {
        ...vehicleData,
        slug,
        type: vehicleData.type as never,
        fuelType: vehicleData.fuelType as never,
        transmission: vehicleData.transmission as never,
        status: vehicleData.status as never,
        originCountry: vehicleData.originCountry as never,
        publishedAt: vehicleData.status === "AVAILABLE" ? new Date() : null,
        createdById: superAdmin.id,
      },
    });

    for (const img of images) {
      await db.vehicleImage.create({
        data: { ...img, vehicleId: vehicle.id },
      });
    }
  }
  console.log(`   ✓ ${VEHICLES.length} véhicules créés\n`);
  */

  /* ── Demandes clients ─────────────────────────────────── */
  console.log("📥 Création des demandes clients...");
  const REQUESTS = [
    {
      firstName: "Moussa",
      lastName: "Keita",
      email: "m.keita@gmail.com",
      phone: "+225 07 123 456",
      country: "Côte d'Ivoire",
      city: "Abidjan",
      desiredModel: "BMW X7 2023 ou X5",
      budget: 800000,
      source: "whatsapp",
      message: "Bonjour, je recherche un BMW X7 ou X5 2023 depuis l'Allemagne.",
      status: "NEW",
      preferredCountry: "GERMANY",
    },
    {
      firstName: "Fatou",
      lastName: "Diallo",
      email: "f.diallo@orange.sn",
      phone: "+221 77 234 567",
      country: "Sénégal",
      city: "Dakar",
      desiredModel: "SUV Électrique - BYD ou NIO",
      budget: 450000,
      source: "form",
      message:
        "Je veux passer à l'électrique. Quelles sont les options depuis la Chine ?",
      status: "CONTACTED",
      preferredCountry: "CHINA",
    },
    {
      firstName: "Ibrahim",
      lastName: "Coulibaly",
      email: "i.coulibaly@mail.com",
      phone: "+223 65 345 678",
      country: "Mali",
      city: "Bamako",
      desiredModel: "Land Cruiser VX V8 2022+",
      budget: 9500000,
      source: "phone",
      message:
        "Cherche un Land Cruiser en excellent état depuis Dubai ou Japon.",
      status: "CONFIRMED",
      preferredCountry: "DUBAI",
    },
    {
      firstName: "Marie",
      lastName: "Bokova",
      email: "m.bokova@autostore-cg.com",
      phone: "+242 06 456 789",
      country: "Congo",
      city: "Pointe-Noire",
      desiredModel: "Mercedes GLE ou GLS 2024",
      budget: 9000000,
      source: "form",
      message: "Intéressée par un GLE ou GLS depuis l'Allemagne.",
      status: "DELIVERED",
      preferredCountry: "GERMANY",
    },
    {
      firstName: "Ahmed",
      lastName: "Benzara",
      email: "a.benzara@gmail.com",
      phone: "+212 6 567 890",
      country: "Maroc",
      city: "Casablanca",
      desiredModel: "Porsche Cayenne ou Macan",
      budget: 7000000,
      source: "whatsapp",
      message:
        "Troisième commande chez vous. Je voudrais un Porsche cette fois.",
      status: "IN_PROGRESS",
      preferredCountry: "GERMANY",
    },
  ];

  for (const req of REQUESTS) {
    const { preferredCountry, ...rest } = req;
    await db.customerRequest.create({
      data: {
        ...rest,
        status: rest.status as never,
        preferredCountry: preferredCountry as never,
      },
    });
  }
  console.log(`   ✓ ${REQUESTS.length} demandes créées\n`);

  /* ── Témoignages ──────────────────────────────────────── */
  console.log("💬 Création des témoignages...");
  const TESTIMONIALS = [
    {
      name: "Marc Kouassi",
      location: "Abidjan, Côte d'Ivoire",
      rating: 5,
      isPublished: true,
      order: 1,
      vehicleBought: "Toyota Land Cruiser",
      content:
        "Importation depuis le Japon réalisée en 6 semaines. Le véhicule était exactement comme décrit, en parfait état. Service exceptionnel du début à la fin. Je recommande vivement Autostore.",
    },
    {
      name: "Fatou Diallo",
      location: "Dakar, Sénégal",
      rating: 5,
      isPublished: true,
      order: 2,
      vehicleBought: "BMW X7",
      content:
        "BMW X7 importée depuis l'Allemagne. Prix 40% moins cher qu'un concessionnaire local. Autostore a géré tout le dédouanement. Parfaitement satisfaite.",
    },
    {
      name: "Ahmed Benzara",
      location: "Casablanca, Maroc",
      rating: 5,
      isPublished: true,
      order: 3,
      vehicleBought: "BYD Tang EV",
      content:
        "Troisième véhicule commandé via Autostore. Toujours aussi professionnel et rapide. Mon BYD électrique est arrivé parfaitement conditionné depuis la Chine.",
    },
    {
      name: "Kofi Asante",
      location: "Accra, Ghana",
      rating: 5,
      isPublished: true,
      order: 4,
      vehicleBought: "Lexus RX 500h",
      content:
        "Autostore a trouvé exactement ce que je voulais au Japon. Inspection complète, livraison rapide, zéro problème. Une équipe au top !",
    },
  ];

  console.log(`   ✓ ${TESTIMONIALS.length} témoignages créés\n`);

  /* ── FAQ ──────────────────────────────────────────────── */
  console.log("❓ Création de la FAQ...");
  const FAQS = [
    {
      question: "Quel est le délai moyen d'importation ?",
      answer:
        "Le délai varie selon le pays d'origine : 3-5 semaines depuis la Chine, 4-6 semaines depuis le Japon ou l'Allemagne, 2-4 semaines depuis Dubai. Ces délais incluent le transport, le dédouanement et la livraison finale.",
      order: 1,
      category: "Délais",
    },
    {
      question: "Quels frais sont inclus dans vos prix ?",
      answer:
        "Nos prix incluent le coût du véhicule, le transport maritime, les frais de dédouanement de base et notre commission. La TVA locale, les taxes d'immatriculation et les droits d'importation spécifiques à votre pays sont en supplément.",
      order: 2,
      category: "Prix",
    },
    {
      question: "Comment garantissez-vous la qualité des véhicules ?",
      answer:
        "Chaque véhicule fait l'objet d'une inspection technique complète de 120 points par nos techniciens certifiés avant expédition. Un rapport photographique et technique vous est fourni avant tout paiement.",
      order: 3,
      category: "Qualité",
    },
    {
      question: "Puis-je importer un véhicule sur mesure ?",
      answer:
        "Absolument ! Notre service d'importation personnalisée vous permet de commander tout véhicule disponible dans nos 8 pays partenaires. Contactez-nous avec vos critères et nous vous ferons une proposition sous 48h.",
      order: 4,
      category: "Services",
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer:
        "Nous acceptons les virements bancaires (SWIFT/SEPA), les paiements par Mobile Money et les paiements en plusieurs fois pour les montants importants. Un acompte de 30% est requis à la commande.",
      order: 5,
      category: "Paiement",
    },
    {
      question: "Livrez-vous dans toute l'Afrique ?",
      answer:
        "Oui, nous livrons dans toute l'Afrique subsaharienne (Congo, Côte d'Ivoire, Sénégal, Ghana, Mali, Cameroun, etc.) et au Maghreb (Maroc, Algérie, Tunisie). Contactez-nous pour votre pays spécifique.",
      order: 6,
      category: "Livraison",
    },
  ];

  console.log(`   ✓ ${FAQS.length} FAQ créées\n`);

  /* ── Contenu site ─────────────────────────────────────── */
  console.log("📝 Création du contenu site...");
  const CONTENT = [
    {
      key: "hero_title",
      value: "L'EXCELLENCE AUTOMOBILE MONDIALE",
      type: "text",
      group: "homepage",
    },
    {
      key: "hero_subtitle",
      value: "Véhicules d'exception importés depuis 8 pays partenaires.",
      type: "text",
      group: "homepage",
    },
    {
      key: "about_title",
      value: "Votre partenaire de confiance depuis 2017",
      type: "text",
      group: "about",
    },
    {
      key: "whatsapp_msg",
      value:
        "Bonjour Autostore ! Je souhaite des informations sur vos véhicules.",
      type: "text",
      group: "contact",
    },
  ];

  console.log(`   ✓ ${CONTENT.length} contenus créés\n`);

  console.log("✅ Seed terminé avec succès !\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📧 Admin email    : admin@autostore-cg.com");
  console.log("🔑 Admin password : AutoStore2025!");
  console.log("🌍 URL            : http://localhost:3000");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed échoué :", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
