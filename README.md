# Auto Store

Application Full-Stack de gestion et présentation d'un catalogue
de véhicules.

Le projet comprend une interface publique et des fonctionnalités
d'administration permettant de gérer les véhicules, leurs
caractéristiques et leur contenu multimédia.

## Demo

Production:
[https://dm-autostore.com](https://www.dm-autostore.com/)

## Fonctionnalités

- Catalogue de véhicules
- Pages détaillées
- Recherche et filtrage
- Administration du catalogue
- Authentification
- Gestion des utilisateurs administratifs
- Upload et gestion d'images
- Validation des données
- Persistence PostgreSQL
- Seed de données

## Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Radix UI
- Framer Motion

### Backend / Data

- Next.js Server APIs
- Prisma
- PostgreSQL
- NextAuth
- Zod

### Infrastructure

- Docker Compose
- Cloudinary
- Vercel

## Développement local

```bash
pnpm install
```
Configurer les variables d'environnement puis :

```
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

## Qualité
Commandes disponibles :

```
pnpm lint
pnpm type-check
```

## Objectifs techniques

Ce projet me permet notamment de travailler sur :

- Full-Stack development avec Next.js
- Authentification
- Modélisation relationnelle
- ORM Prisma
- Validation des entrées
- Gestion de fichiers/images
- UI réutilisable
- Déploiement cloud


**Description :**

> Full-stack vehicle catalog and admin platform built with Next.js, Prisma and PostgreSQL.

Topics :

```text
nextjs
typescript
react
prisma
postgresql
fullstack
tailwindcss
nextauth
```
