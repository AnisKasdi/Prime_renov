# Prime Rénov — Site vitrine & panneau d'administration

Site web complet d'un cabinet d'architecture, développé avec Next.js 16 (App Router), React 19, Prisma ORM et SQLite. Comprend une page publique avec portfolio et un panneau d'administration sécurisé par JWT.

---

## Sommaire

1. [Présentation](#1-présentation)
2. [Stack technique](#2-stack-technique)
3. [Architecture du projet](#3-architecture-du-projet)
4. [Base de données](#4-base-de-données)
5. [Authentification & sécurité](#5-authentification--sécurité)
6. [Composants publics](#6-composants-publics)
7. [Panneau d'administration](#7-panneau-dadministration)
8. [Server Actions](#8-server-actions)
9. [Variables d'environnement](#9-variables-denvironnement)
10. [Installation & démarrage](#10-installation--démarrage)
11. [Scripts disponibles](#11-scripts-disponibles)

---

## 1. Présentation

**Prime Rénov** est le site vitrine d'un cabinet d'architecture. Il expose :

- Une **page publique** (`/`) organisée en 9 sections : navigation, hero, à propos, projets, services, témoignages, demande de devis (3 étapes), contact, footer.
- Un **panneau d'administration** (`/admin`) protégé par mot de passe, permettant de gérer les projets (ajout avec upload d'image, suppression) et les témoignages (ajout, suppression).

Les données affichées sur la page publique sont lues en temps réel depuis la base de données (`revalidate = 0`), ce qui signifie que toute modification en admin est immédiatement visible côté public.

---

## 2. Stack technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Framework | Next.js (App Router) | 16.2.4 |
| UI | React / React DOM | 19.2.4 |
| Langage | TypeScript | ^5 |
| ORM | Prisma Client | ^5.22.0 |
| Base de données | SQLite | — |
| Auth (tokens) | jose (JWT HS256) | ^6.2.3 |
| Styles | CSS personnalisé (1 593 lignes) | — |
| Runtime | Node.js | ≥ 18 |

---

## 3. Architecture du projet

```
mk_projet/
├── prisma/
│   ├── schema.prisma          # Schéma Prisma (SQLite, modèles Project & Testimonial)
│   ├── seed.ts                # Données initiales (6 projets, 4 témoignages)
│   └── dev.db                 # Base SQLite locale (ignorée en prod)
├── public/
│   └── projects/              # Images uploadées via l'admin
├── src/
│   ├── actions/
│   │   ├── auth.ts            # Server Actions : login, logout
│   │   ├── projects.ts        # Server Actions : addProject, deleteProject
│   │   └── testimonials.ts    # Server Actions : addTestimonial, deleteTestimonial
│   ├── app/
│   │   ├── layout.tsx         # Layout racine (police, métadonnées HTML)
│   │   ├── page.tsx           # Page publique principale (/)
│   │   ├── globals.css        # Tout le CSS (variables, animations, responsive)
│   │   └── admin/
│   │       ├── login/page.tsx             # Page de connexion admin
│   │       └── (protected)/               # Route group — layout avec sidebar
│   │           ├── layout.tsx             # Layout admin (sidebar + contenu)
│   │           ├── page.tsx               # Dashboard (stats + projets récents)
│   │           ├── projects/page.tsx      # Gestion des projets
│   │           └── testimonials/page.tsx  # Gestion des témoignages
│   ├── components/
│   │   ├── Navbar.tsx          # Barre de navigation fixe avec scroll detection
│   │   ├── Hero.tsx            # Section hero plein écran
│   │   ├── About.tsx           # Section à propos avec statistiques
│   │   ├── Projects.tsx        # Grille de projets avec filtre et drawer
│   │   ├── Services.tsx        # 3 cartes de services
│   │   ├── Testimonials.tsx    # Carrousel draggable de témoignages
│   │   ├── DevisForm.tsx       # Formulaire devis en 3 étapes
│   │   ├── Contact.tsx         # Formulaire de contact
│   │   ├── FloatingDevis.tsx   # Bouton flottant devis (apparaît au scroll)
│   │   ├── Footer.tsx          # Pied de page
│   │   ├── GlobalReveal.tsx    # IntersectionObserver pour animations au scroll
│   │   ├── AdminSidebar.tsx    # Sidebar de navigation du panneau admin
│   │   └── DeleteButton.tsx    # Bouton de suppression avec confirmation par mot de passe
│   ├── lib/
│   │   ├── prisma.ts           # Singleton Prisma (évite la multiplication de connexions)
│   │   └── session.ts          # Création / vérification / suppression de session JWT
│   └── proxy.ts                # Middleware Next.js (protection des routes /admin)
├── .env.local                  # Variables d'environnement locales (jamais commité)
├── next.config.ts
├── tsconfig.json
└── package.json
```

### Flux de données — page publique

```
Requête navigateur
  → proxy.ts (middleware, pas de session requise)
    → app/page.tsx (Server Component async)
      → prisma.project.findMany() + prisma.testimonial.findMany()
        → SQLite (dev.db)
          → Rendu HTML côté serveur → envoyé au navigateur
```

### Flux de données — panneau admin

```
Requête navigateur (/admin/*)
  → proxy.ts
    → cookie admin_session présent ? → verifySession() (JWT)
      → invalide : redirect /admin/login
      → valide : app/admin/(protected)/... (Server Component)
          → prisma.* queries → SQLite → rendu HTML
```

### Flux d'ajout d'un projet

```
Admin remplit le formulaire
  → form action={addProject} (Server Action)
    → imageFile : ArrayBuffer → Buffer → writeFile(public/projects/*)
    → prisma.project.create()
    → revalidatePath("/") + revalidatePath("/admin/projects")
      → pages reconstruites avec les nouvelles données
```

---

## 4. Base de données

Fichier : `prisma/schema.prisma`

### Modèle `Project`

| Champ | Type | Par défaut | Description |
|-------|------|-----------|-------------|
| `id` | Int PK | auto-increment | Identifiant |
| `name` | String | — | Titre du projet |
| `cat` | String | — | Catégorie affichée (ex : « Résidentiel ») |
| `catFilter` | String | — | Slug pour le filtre (ex : `residentiel`) |
| `year` | String | — | Année de livraison |
| `image` | String | — | Chemin relatif vers l'image (`/projects/…`) |
| `client` | String | `"Privé"` | Nom du client |
| `surface` | String | `"Non spécifié"` | Surface du projet |
| `location` | String | `"France"` | Localisation |
| `status` | String | `"Livré"` | Statut (`Livré` ou `En cours`) |
| `desc` | String | texte par défaut | Description longue |

### Modèle `Testimonial`

| Champ | Type | Par défaut | Description |
|-------|------|-----------|-------------|
| `id` | Int PK | auto-increment | Identifiant |
| `name` | String | — | Nom du client |
| `role` | String | — | Rôle / description du projet |
| `text` | String | — | Texte du témoignage |
| `rating` | Int | `5` | Note de 1 à 5 |
| `avatar` | String | — | Initiales (ex : `"ML"`) |

### Commandes Prisma utiles

```bash
npx prisma migrate dev --name init   # Créer et appliquer la migration initiale
npx prisma db seed                   # Peupler avec les données de démonstration
npx prisma studio                    # Ouvrir l'interface visuelle de la BDD
npx prisma migrate deploy            # Appliquer les migrations en production
```

---

## 5. Authentification & sécurité

### Flux de connexion

1. L'administrateur visite `/admin/login` et saisit son mot de passe.
2. Le formulaire appelle la Server Action `login()` (`src/actions/auth.ts`).
3. `login()` compare le mot de passe à `process.env.ADMIN_PASSWORD`.
4. En cas de succès : `createSession()` génère un JWT signé HS256 (expiration 7 jours) et le place dans un cookie HTTP-only, puis redirige vers `/admin`.
5. En cas d'échec : retourne `{ error: 'Mot de passe incorrect' }` affiché dans le formulaire.

### Protection des routes (Middleware)

Le fichier `src/proxy.ts` (à renommer en `src/middleware.ts`) intercepte toutes les requêtes vers `/admin/*` (sauf `/admin/login`). Il lit le cookie `admin_session`, appelle `verifySession()`, et redirige vers `/admin/login` si le JWT est absent ou invalide.

Le matcher exclut automatiquement les fichiers statiques, les images et le répertoire `/projects/`.

### Mesures de sécurité en place

| Mesure | Implémentation |
|--------|---------------|
| Cookie HTTP-only | Inaccessible depuis JavaScript (protection XSS) |
| Flag `Secure` | Activé uniquement en `NODE_ENV=production` (HTTPS uniquement) |
| `SameSite: lax` | Protection CSRF |
| Expiration JWT 7 jours | Sessions limitées dans le temps |
| Double confirmation de mot de passe | Requise avant toute suppression |
| Sanitisation des noms de fichiers | Alphanumériques + underscore uniquement, 40 caractères max |
| Horodatage des noms de fichiers | Évite les collisions et l'écrasement |

---

## 6. Composants publics

| Composant | Type | Fonctionnalités clés |
|-----------|------|---------------------|
| `Navbar` | Client | Navigation fixe, scroll detection, menu mobile burger |
| `Hero` | Server | Section plein écran avec CTA |
| `About` | Server | Texte + grille de statistiques |
| `Projects` | Client | Grille 3 colonnes, filtre par catégorie, drawer de détail |
| `Services` | Server | 3 cartes services avec hover |
| `Testimonials` | Client | Carrousel draggable (souris + tactile), notation par étoiles |
| `DevisForm` | Client | 3 étapes : type projet → détails → coordonnées |
| `Contact` | Client | Formulaire nom/email/message |
| `FloatingDevis` | Client | Bouton flottant visible après 400px de scroll |
| `Footer` | Server | Logo, copyright, liens |
| `GlobalReveal` | Client | IntersectionObserver : ajoute `.visible` aux éléments `.reveal` |

### Système d'animations au scroll

`GlobalReveal` observe tous les éléments avec la classe `reveal`. Quand ils entrent dans le viewport, la classe `visible` est ajoutée, déclenchant les animations CSS `fadeUp` / `fadeIn` définies dans `globals.css`. Les classes `reveal-d1` à `reveal-d4` permettent des délais progressifs.

---

## 7. Panneau d'administration

Accessible uniquement aux sessions JWT valides.

| Route | Contenu |
|-------|---------|
| `/admin` | Dashboard : compteurs projets/témoignages, 4 derniers projets |
| `/admin/projects` | Liste des projets + formulaire d'ajout (avec upload image) |
| `/admin/testimonials` | Liste des témoignages + formulaire d'ajout |

Toutes les pages admin héritent du layout `(protected)` qui inclut la sidebar (`AdminSidebar`).

La suppression d'un projet ou témoignage passe par `DeleteButton`, qui demande à nouveau le mot de passe admin avant d'exécuter la Server Action.

---

## 8. Server Actions

### `src/actions/auth.ts`

```typescript
login(prevState, formData)   // Crée session JWT, redirige vers /admin
logout()                     // Supprime le cookie, redirige vers /admin/login
```

### `src/actions/projects.ts`

```typescript
addProject(formData)                    // Upload image + création en BDD
deleteProject(id, prevState, formData)  // Vérifie mot de passe + suppression BDD
```

### `src/actions/testimonials.ts`

```typescript
addTestimonial(formData)                    // Création en BDD
deleteTestimonial(id, prevState, formData)  // Vérifie mot de passe + suppression BDD
```

Toutes les actions appellent `revalidatePath()` après modification pour invalider le cache des pages concernées.

---

## 9. Variables d'environnement

Créer un fichier `.env.local` à la racine (jamais commité) :

```env
# Mot de passe de connexion au panneau admin
ADMIN_PASSWORD=votre_mot_de_passe_fort

# Clé secrète pour signer les JWT (minimum 32 caractères aléatoires)
SESSION_SECRET=votre_cle_secrete_tres_longue_et_aleatoire
```

**Ne pas utiliser les valeurs de développement en production.**

---

## 10. Installation & démarrage

```bash
# 1. Cloner et installer les dépendances
git clone <repo>
cd mk_projet
npm install

# 2. Configurer les variables d'environnement
cp .env.local.example .env.local   # puis éditer le fichier

# 3. Créer la base de données et appliquer le schéma
npx prisma migrate dev --name init

# 4. (Optionnel) Peupler avec les données de démonstration
npx prisma db seed

# 5. Démarrer le serveur de développement
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).  
Le panneau admin est sur [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 11. Scripts disponibles

```bash
npm run dev      # Serveur de développement (hot reload)
npm run build    # Build de production
npm run start    # Démarrer le serveur de production (après build)
```
