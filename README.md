# Auto Store

**Full-stack vehicle catalog and administration platform built with Next.js, TypeScript, Prisma and PostgreSQL.**

Auto Store est une application web destinée à la **présentation et à la gestion d’un catalogue de véhicules**, avec une interface publique et un espace d’administration permettant de gérer les données métier associées aux véhicules.

Le projet illustre la conception d’une application **Full-Stack avec Next.js**, de l’interface utilisateur jusqu’à la persistence des données, l’authentification, la validation et la gestion des médias.

> 🚧 Projet en évolution continue.

---

## 🎯 Objectif

L’application vise à centraliser la gestion d’un catalogue de véhicules destinés à la vente ou à l’importation.

Elle permet notamment de gérer :

* les véhicules ;
* leurs caractéristiques techniques ;
* les prix ;
* le kilométrage ;
* les photographies ;
* leur publication sur le catalogue ;
* l’accès aux fonctions d’administration.

---

## ✨ Fonctionnalités principales

### Catalogue public

* affichage des véhicules disponibles ;
* consultation des fiches détaillées ;
* présentation des caractéristiques techniques ;
* affichage des prix et informations principales ;
* interface responsive adaptée aux différents écrans.

### Back-office

* création de véhicules ;
* modification des informations ;
* suppression ;
* gestion des images ;
* gestion des caractéristiques techniques ;
* gestion du statut de publication.

### Authentification

* accès sécurisé à l’administration ;
* authentification des utilisateurs ;
* contrôle des fonctionnalités réservées.

### Gestion des médias

Les photographies des véhicules sont gérées via un service de stockage externe afin d’éviter de stocker directement les fichiers dans l’application.

---

## 🛠 Stack technique

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Radix UI
* Framer Motion

### Backend

* Next.js Server APIs / Server-side features
* Prisma ORM
* Zod
* NextAuth

### Base de données

* PostgreSQL

### Médias

* Cloudinary

### Infrastructure

* Docker Compose
* Vercel

---

## 🏗 Architecture générale

```text
Browser
   │
   ▼
Next.js
   │
   ├── Public UI
   ├── Admin UI
   ├── Authentication
   ├── Server-side logic
   └── API / Server Actions
            │
            ▼
          Prisma
            │
            ▼
       PostgreSQL

Images
   │
   ▼
Cloudinary
```

Cette architecture permet de conserver le frontend et une partie importante de la logique applicative dans le même projet tout en externalisant la persistence et le stockage des médias.

---

## 📁 Structure du projet

```text
.
├── app/
├── components/
├── lib/
├── prisma/
├── public/
├── styles/
├── types/
├── utils/
└── ...
```

La structure exacte peut évoluer avec le projet, mais les responsabilités sont séparées entre :

* pages et routes ;
* composants UI ;
* logique applicative ;
* accès aux données ;
* validation ;
* authentification ;
* utilitaires.

---

## 🗄 Modèle de données

La persistence est gérée avec **Prisma ORM** et PostgreSQL.

Le schéma couvre notamment les données liées :

* aux véhicules ;
* aux utilisateurs ;
* aux informations administratives ;
* aux médias et références associées.

Après modification du schéma Prisma :

```bash
pnpm prisma generate
```

Pour appliquer les migrations :

```bash
pnpm prisma migrate dev
```

---

## 🔐 Authentification

L’espace d’administration est protégé par un système d’authentification basé sur **NextAuth**.

Les mots de passe et informations sensibles sont traités avec des mécanismes adaptés côté serveur.

Les fonctions d’administration ne sont pas accessibles aux utilisateurs non autorisés.

---

## ✅ Validation

Les données entrantes sont validées avec **Zod**.

Cela permet notamment de :

* vérifier les formulaires ;
* protéger les opérations côté serveur ;
* conserver des données cohérentes ;
* centraliser certaines règles de validation.

---

## 🖼 Gestion des images

Les images des véhicules sont stockées sur **Cloudinary**.

Cela permet de :

* externaliser le stockage ;
* utiliser des URLs optimisées ;
* simplifier le déploiement ;
* éviter le stockage local des fichiers dans l’application.

---

## 🚀 Installation locale

### 1. Cloner le repository

```bash
git clone https://github.com/johnmabs/auto-app-v2.git
cd auto-app-v2
```

### 2. Installer les dépendances

```bash
pnpm install
```

### 3. Configurer les variables d’environnement

Créer un fichier :

```text
.env.local
```

Les variables nécessaires dépendent notamment de :

* PostgreSQL ;
* NextAuth ;
* Cloudinary.

Exemple :

```env
DATABASE_URL=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Ne jamais versionner les vraies valeurs de production.

---

## 🗄 Initialiser la base de données

Générer le client Prisma :

```bash
pnpm prisma generate
```

Appliquer les migrations :

```bash
pnpm prisma migrate dev
```

Si un script de seed est disponible :

```bash
pnpm prisma db seed
```

---

## ▶️ Lancer l’application

```bash
pnpm dev
```

Puis ouvrir :

```text
http://localhost:3000
```

---

## 🧪 Qualité du code

Le projet fournit des commandes permettant notamment de vérifier la qualité du code.

### Lint

```bash
pnpm lint
```

### Vérification TypeScript

```bash
pnpm type-check
```

### Build de production

```bash
pnpm build
```

---

## 🌐 Déploiement

L’application peut être déployée sur **Vercel**.

Le déploiement nécessite notamment la configuration des variables d’environnement correspondant :

* à la base PostgreSQL ;
* à l’authentification ;
* à Cloudinary.

---

## 🧠 Sujets d’ingénierie travaillés

Ce projet me permet notamment d’approfondir :

* développement Full-Stack avec Next.js ;
* TypeScript ;
* architecture par composants ;
* rendu serveur et client ;
* authentification ;
* gestion des rôles et accès ;
* modélisation relationnelle ;
* Prisma ORM ;
* PostgreSQL ;
* validation des données ;
* gestion de fichiers et médias ;
* déploiement cloud ;
* responsive design.

---

## 📈 Améliorations possibles

Les prochaines évolutions peuvent inclure :

* amélioration de la recherche et des filtres ;
* optimisation des performances ;
* amélioration du back-office ;
* tests automatisés ;
* observabilité ;
* gestion avancée des permissions ;
* audit des opérations administratives ;
* amélioration SEO ;
* optimisation des images.

---

## 👨‍💻 Auteur

**John Mabiala**

Full-Stack Developer
Next.js • Symfony • PostgreSQL • Docker

* [GitHub](https://github.com/johnmabs)
* [LinkedIn](https://linkedin.com/in/john-mabiala)

---

## 📌 Portfolio

Ce repository fait partie de mon portfolio et illustre ma capacité à développer une application **Full-Stack moderne avec Next.js**, depuis l’interface et l’authentification jusqu’à la persistence PostgreSQL et au déploiement.
