# React-setup-front

Ce dépôt contient le client frontend du projet : une application React en TypeScript créée avec Vite, incluant des pages d'authentification simples (connexion/inscription) qui communiquent avec l'API backend `NodeJS-setup-back`.

## Présentation

- **Framework** : React avec TypeScript
- **Bundler** : Vite (serveur dev rapide et build optimisé)
- **Styles** : CSS local / fichiers CSS simples (voir `src/App.css`, `src/index.css`)
- **État & auth** : contexte léger dans `src/context/AuthContext.tsx` et hooks dans `src/hooks`
- **Client API** : `src/api/client.ts` et `src/api/auth.ts` pour les appels HTTP vers le backend

## Fonctionnalités

- Formulaires de connexion et d'inscription (`src/components/LoginForm.tsx`, `src/components/RegisterForm.tsx`)
- Contexte d'authentification pour stocker le token et les informations utilisateur
- Mécanismes pour appeler des routes protégées (ex. `GET /api/users/me`)
- Exemples de tests avec `vitest` / React Testing Library sous `src/test`

## Démarrage (local)

1. Installer les dépendances :

```
npm install
```

2. Lancer le serveur de développement :

```
npm run dev
```

3. Ouvrir l'application dans le navigateur (Vite affichera l'URL, généralement `http://localhost:5173`).

## Intégration avec le backend

Le frontend attend que l'API backend soit accessible. L'URL de base de l'API est configurée dans `src/api/client.ts` — ajustez-la si nécessaire pour pointer vers votre serveur backend.

URL backend typique en local :

```
http://localhost:3000
```

Si vous lancez les deux services via Docker Compose, assurez-vous que le frontend peut joindre l'adresse exposée par le backend, ou exécutez le frontend localement et pointez-le sur `http://localhost:3000`.

## Scripts utiles

- `npm run dev` — démarrer le serveur Vite en dev
- `npm run build` — construire les fichiers pour la production
- `npm run preview` — prévisualiser localement le build de production
- `npm test` — exécuter les tests (voir `package.json`)

## Flux d'authentification (résumé)

1. L'utilisateur envoie ses identifiants à `POST /api/auth/login` (géré par `src/api/auth.ts`).
2. Le backend renvoie un token JWT d'accès (et éventuellement un refresh token).
3. Le frontend conserve le token en mémoire via `AuthContext` et l'envoie dans l'en-tête `Authorization: Bearer <token>` pour les requêtes protégées.

Pour la production, envisagez d'utiliser des cookies `httpOnly` et sécurisés pour les refresh tokens plutôt que le stockage local.

## Tests

- Les tests unitaires et composants se trouvent sous `src/test`. Lancez-les avec :

```
npm test
```

## Docker (optionnel)

Vous pouvez conteneuriser le frontend ou servir les fichiers construits via un serveur statique. Pour le développement local, exécuter Vite est plus rapide.

Pour construire le bundle de production :

```
npm run build
```

Pour prévisualiser le build de production :

```
npm run preview
```

## Où regarder dans le code

- Entrée de l'application : `src/main.tsx` et `src/App.tsx`
- Client API : `src/api/client.ts` et `src/api/auth.ts`
- Contexte d'auth : `src/context/AuthContext.tsx`
- Composants : `src/components/LoginForm.tsx`, `src/components/RegisterForm.tsx`

---

Ce frontend est conçu pour être utilisé avec le backend `NodeJS-setup-back` afin d'illustrer un flux d'authentification minimal et complet. Ajustez les URL et la configuration d'environnement pour votre déploiement.

```

```
