# Thème 1 — Gestion d’événements : Application permettant de créer, administrer et consulter des événements

    Les utilisateurs peuvent consulter les événements et gérer leurs inscriptions.
    Les administrateurs créent, modifient et suppriment les événements et leurs paramètres.

### Étapes d'installation et de lancement

1.  **Cloner le repository**
    git clone https://github.com/UnlimitedPM/ProjetDevWebGroupeM.git

2.  **Lancer la base de données**
    Ouvrez un terminal à la racine du projet et lancez Docker.

    docker-compose up -d

    *La première fois, cette commande peut prendre quelques minutes pour télécharger l'image de PostgreSQL.*

3.  **Installer les dépendances du Backend**
    Ouvrez un **nouveau terminal** et naviguez dans le dossier du backend.

    npm install

4.  **Peupler la base de données (seeding)**
    Cette commande va créer les tables et les remplir avec des données de test (un admin, un utilisateur, des événements, etc.).
    
    npm run db:seed

5.  **Lancer le serveur Backend**
    Une fois le seeding terminé, lancez le serveur.
    
    npm run dev
    
    *Le backend est maintenant accessible sur `http://localhost:3000`.*

6.  **Installer les dépendances du Frontend**
    Ouvrez un **troisième terminal** et naviguez dans le dossier du frontend.
    
    npm install

7.  **Lancer l'application Frontend**

    npm run dev

    *L'application est maintenant accessible dans votre navigateur sur `http://localhost:5173` (ou un port similaire).*

### Identifiants de test

-   **Administrateur**
    -   Email: `admin@example.com`
    -   Mot de passe: `Password123!`
-   **Utilisateur Standard**
    -   Email: `john.doe@example.com`
    -   Mot de passe: `Password123!`

---


## API

    Doit suivre une logique RESTful claire et cohérente.
    Minimum trois entités (hors User et tables de relation).

## Sécurité

    Deux rôles minimum : User et Admin (ou équivalent).
    Les droits doivent être réellement appliqués :
        Un utilisateur n’accède qu’à ses propres données ou aux éléments publics.
        Un administrateur possède des actions supplémentaires.

Pas de fuites de données et pas de possibilité de modifier des données qui ne nous appartiennent pas.

## Front (React)

    Minimum un composant générique réutilisable, par exemple :
        composant de tableau,
        gestion de listes,
        form builder,
        modale de confirmation,
        pagination ou recherche.
    Interface adaptée selon le rôle (certaines actions réservées aux administrateurs).

## Contraintes de groupe

    Trois personnes maximum par groupe.
    Chacun doit avoir travaillé sur le front et sur le back.
    Utilisation obligatoire de Git avec commits individuels visibles.
        Pas d’upload via l’interface GitHub.
        Si un étudiant n’a aucun commit, la note est de 0.
        Un projet hors-sujet (ex: uniquement HTML/CSS) est non validé.
    Les excuses liées au pair-programming, visio ou autres ne seront pas acceptées.

## Rendu obligatoire

    Lien vers un repository public (GitHub, GitLab, etc.).
    Procédure complète de lancement du projet dans le README.
    Vidéo de démonstration incluant (lien publique type drive, youtube, ...) :
        parcours utilisateur,
        parcours administrateur,
        restrictions d’accès,
        utilisation du composant générique.