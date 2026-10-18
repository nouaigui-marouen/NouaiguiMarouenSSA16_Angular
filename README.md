# EventHub

Application Angular 21 standalone réalisée dans le cadre du mini-projet (étude de cas individuelle).
Elle permet à une association étudiante de présenter ses activités (ateliers, conférences, rencontres,
compétitions) : consulter la liste des événements, filtrer par catégorie, afficher le détail d'un
événement et gérer une sélection de favoris.

Le projet fonctionne uniquement côté client : les données sont définies dans le code TypeScript,
sans API, base de données ni authentification.

**Auteur :** Marouen Nouaigui

## Versions utilisées

- Angular CLI : 21.2.27
- Angular : 21
- Node.js : 24.22.0
- npm : 11.19.1

## Installation et lancement

```bash
git clone https://github.com/nouaigui-marouen/NouaiguiMarouenSSA16_Angular.git
cd NouaiguiMarouenSSA16_Angular
npm install
ng serve -o
```

L'application s'ouvre sur http://localhost:4200 (redirection automatique vers `/events`).

## Structure des composants

```
src/app/
├── app.ts / app.html            Composant racine : Header + <router-outlet>
├── app.routes.ts                Configuration des routes
├── app.config.ts                provideRouter(routes)
├── models/
│   └── event-item.ts            Interface EventItem
├── components/
│   ├── header/                  Header
│   └── event-card/              EventCard
└── pages/
    ├── event-list/              EventList (+ tableau EVENTS)
    ├── event-details/           EventDetails
    ├── about/                   About (chargée en lazy loading)
    └── not-found/               NotFound
```

## Rôle des composants

- **Header** : affiche le titre de l'application et le menu de navigation (routerLink et routerLinkActive).
- **EventList** : définit les événements, les stocke dans un Signal, gère les favoris, le compteur et le filtre par catégorie.
- **EventCard** : présente un événement reçu avec input(), signale le clic sur le bouton favori au parent avec output(), et propose un lien vers le détail.
- **EventDetails** : récupère l'identifiant de la route avec ActivatedRoute et affiche l'événement correspondant, ou un message s'il n'existe pas.
- **About** : page de présentation de l'application, chargée en lazy loading avec loadComponent().
- **NotFound** : page affichée pour toute URL inconnue (route `**`).

## Routes

| Route | Composant | Remarque |
|---|---|---|
| `''` | — | Redirection vers `/events` |
| `/events` | EventList | Liste des événements |
| `/events/:id` | EventDetails | Route paramétrée |
| `/about` | About | Lazy loading avec `loadComponent()` |
| `**` | NotFound | Page introuvable |

## Fonctionnalités réalisées

- Jeu de données de 7 événements, 4 catégories et 2 événements gratuits.
- Signals : `signal()` pour la liste, les favoris et la catégorie sélectionnée, `computed()` pour le compteur de favoris et la liste filtrée, modifications avec `set()` et `update()`.
- Data binding : interpolation, property binding (`[src]`, `[class.active]`, `[routerLink]`) et event binding (`(click)`).
- Control flow : `@for` avec `track event.id`, `@empty` (« Aucun événement disponible »), `@if` / `@else`.
- Pipes : `uppercase`, `date` et `currency`.
- Communication parent/enfant : `input()` et `output()` entre EventList et EventCard.
- Favoris : ajout et retrait, compteur, état visuel différent (`[class.active]` et `@if/@else`).
- Filtre par catégorie : Tous / Atelier / Conférence / Rencontre / Compétition.
- Routage : `provideRouter()`, `<router-outlet>`, `routerLink`, `routerLinkActive`, route paramétrée, redirection et page introuvable.
- Lazy loading de la page About avec `loadComponent()`.
- Mise en page responsive, utilisable sur ordinateur et sur téléphone.
- Un bouton « Vider la liste (test) » permet de vérifier l'affichage du message `@empty`.

## Tests manuels

| Cas testé | Résultat |
|---|---|
| Affichage initial | OK |
| Filtre par catégorie | OK |
| Liste vide | OK |
| Ajout et retrait des favoris | OK |
| Navigation vers un détail | OK |
| Identifiant inexistant (`/events/99`) | OK |
| Lien actif | OK |
| URL inconnue | OK |
| Chargement différé de `/about` (onglet Network) | OK |

## Captures d'écran

### Liste des événements (ordinateur)
![Liste des événements](docs/screenshots/liste-desktop.png)

### Détail d'un événement
![Détail d'un événement](docs/screenshots/detail-evenement.png)

### Affichage sur téléphone
![Vue mobile](docs/screenshots/vue-mobile.png)

### Lazy loading de la page About
![Lazy loading About](docs/screenshots/lazy-loading-about.png)
