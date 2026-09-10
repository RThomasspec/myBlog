# Blog API

API REST de blog développée avec **NestJS**, **MongoDB** et **Docker**.

Ce projet est avant tout un **projet d'entraînement au développement backend**. Il permet de mettre en pratique les notions fondamentales nécessaires à la création d'une API : gestion des utilisateurs, création et gestion d'articles, validation des données, pagination, accès à une base de données MongoDB et architecture d'une application NestJS.

## Fonctionnalités

* Création et gestion des utilisateurs
* Création et gestion des articles
* Association d'un article à son auteur
* Récupération d'une liste d'articles
* Pagination des articles
* Tri des résultats
* Validation des données avec **Zod**
* Documentation de l'API avec **Swagger**
* Persistance des données avec **MongoDB**
* Architecture basée sur les modules, controllers, services et repositories
* Environnement de développement entièrement conteneurisé avec **Docker**

## Technologies

* **NestJS**
* **TypeScript**
* **MongoDB**
* **Mongoose**
* **Zod**
* **Swagger / OpenAPI**
* **Docker & Docker Compose**

## Prérequis

Pour utiliser le projet, il suffit d'avoir installé :

* [Docker](https://www.docker.com/)
* Docker Compose (inclus avec les versions récentes de Docker Desktop)

Aucune installation de Node.js, MongoDB ou des dépendances npm n'est nécessaire sur la machine hôte.

## Installation

Cloner le repository :

```bash
git clone <URL_DU_REPOSITORY>
cd api
```

Puis démarrer le projet :

```bash
docker compose up
```

Docker va automatiquement :

1. Construire l'image de l'API à partir du `Dockerfile`
2. Installer les dépendances Node.js
3. Démarrer l'application NestJS
4. Démarrer un conteneur MongoDB
5. Connecter l'API à MongoDB

L'API sera ensuite accessible sur :

```text
http://localhost:3000
```

## Développement

Le projet utilise un volume Docker permettant de synchroniser le code local avec le conteneur.

Ainsi, les modifications effectuées dans `src/` sont prises en compte automatiquement par NestJS grâce au mode `start:dev`.

Pour arrêter les conteneurs :

```bash
docker compose down
```

Pour reconstruire l'image après une modification du `Dockerfile` ou des dépendances :

```bash
docker compose up --build
```

## Documentation Swagger

Une documentation interactive de l'API est disponible avec Swagger :

```text
http://localhost:3000/api
```

Elle permet de consulter les endpoints disponibles et de tester directement les requêtes HTTP.

## Exemple de fonctionnalités

### Utilisateurs

L'API permet notamment de :

```text
POST   /users
GET    /users
GET    /users/:id
PATCH  /users/:id
DELETE /users/:id
```

### Articles

L'API permet notamment de :

```text
POST   /articles
GET    /articles
GET    /articles/:id
PATCH  /articles/:id
DELETE /articles/:id
```

Les articles sont associés à un utilisateur afin d'identifier leur auteur.

## Pagination

La récupération des articles utilise une pagination.

Par exemple :

```http
GET /articles?page=1
```

ou :

```http
GET /articles?page=2
```

Le nombre d'articles par page est défini côté serveur.

Le backend transforme ensuite le numéro de page en paramètres MongoDB `skip` et `limit`.

Exemple :

```text
Page 1 → skip 0
Page 2 → skip 10
Page 3 → skip 20
```

Une réponse paginée peut avoir la forme suivante :

```json
{
  "data": [],
  "meta": {
    "currentPage": 1,
    "totalItemsCount": 47,
    "totalPagesCount": 5,
    "itemsPerPage": 10
  }
}
```

## Architecture

Le projet suit une organisation par fonctionnalités.

Exemple :

```text
src/
├── article/
│   ├── article.controller.ts
│   ├── article.service.ts
│   ├── article.repository.ts
│   ├── article.module.ts
│   ├── dto/
│   └── schemas/
│
├── user/
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.repository.ts
│   ├── user.module.ts
│   ├── dto/
│   └── schemas/
│
├── dto/
├── schemas/
└── app.module.ts
```

Le principe général est :

```text
Client
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MongoDB
```

Les responsabilités sont séparées afin de garder une application organisée et facilement évolutive.

## Validation avec Zod

Les données reçues par l'API sont validées avec **Zod**.

Exemple :

```ts
export const createArticleSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});
```

Zod permet de définir les règles de validation tout en permettant d'inférer automatiquement les types TypeScript.

## Docker

Le projet contient deux services principaux :

```text
┌──────────────────────┐
│       API            │
│      NestJS          │
│      :3000           │
└──────────┬───────────┘
           │
           │ MongoDB
           ↓
┌──────────────────────┐
│      MongoDB         │
│      :27017          │
└──────────────────────┘
```

La connexion entre l'API et MongoDB utilise le nom du service Docker :

```text
mongodb://mongo:27017/blog
```

`mongo` correspond au nom du service défini dans `docker-compose.yml`.

## Commandes utiles

Démarrer le projet :

```bash
docker compose up
```

Démarrer en reconstruisant l'image :

```bash
docker compose up --build
```

Arrêter les conteneurs :

```bash
docker compose down
```

Afficher les logs :

```bash
docker compose logs -f
```

Afficher les conteneurs :

```bash
docker compose ps
```

## Objectif du projet

Ce projet est un **projet d'apprentissage** destiné à mettre en pratique les fondamentaux du développement backend avec NestJS.

Il pourra être progressivement enrichi avec de nouvelles fonctionnalités comme :

* Authentification
* Autorisation et rôles
* Commentaires
* Likes
* Recherche d'articles
* Catégories et tags
* Upload d'images
* Tests unitaires et end-to-end
* Gestion avancée des erreurs
* Déploiement

---

## Licence

Projet personnel à but éducatif.
