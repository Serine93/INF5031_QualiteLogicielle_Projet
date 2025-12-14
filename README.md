# Projet - Automatisation E2E avec PLaywright, POM et Gherkin

Ce projet est un travail issu de la 5ème année en qualité logicielle. 

## Objectifs

- Mettre en pratique l’ensemble des notions vues en TP :
    - Automatisation E2E avec Playwright
    - Modèle Page Object Model (POM)
    - Rédaction de scénarios en BDD / Gherkin (avec @cucumber/cucumber ou playwright-bdd )
    - Utilisation de mocks
- Concevoir une suite de tests complète et maintenable sur un site web réel.

## Choix du site

Nous avons choisi le site : [Un compagnon](https://www.uncompagnon.fr/) car il s'agit d'un site avec une connexion simple, recherche, ajout panier, ...

### Installation

Pour installer les dépendances du programme il faut : 

Executez la commande ``npm install --save-dev @cucumber/cucumber@10`` 

puis ``npx playwright install``

Pour exécuter le programme il faut :

``npx cucumber-js``

## Les scénarios testés 

### Scénarios — Recherche d’une annonce

- L’utilisateur sélectionne uniquement la catégorie “Animaux” dans le menu sans saisir de race ni de localisation, et obtient toutes les annonces disponibles.

- L’utilisateur recherche une race de chien inexistante sur la plateforme (ex. “Poméranien”) et obtient un message indiquant qu’aucune annonce ne correspond à sa recherche.

- L’utilisateur recherche la race “Doberman” avec une localisation “Tremblay-en-France (25 km)” et le site lui indique qu’aucun chien ne correspond à ces critères dans cette zone.

- L’utilisateur saisit une race de chien existante sur la plateforme et le site affiche correctement toutes les annonces correspondantes.

- L’utilisateur choisit un type de chien précis puis ajoute un filtre supplémentaire sur le type d’annonce “Perdu”, et la liste s’actualise en conséquence.

### Scénarios — Mock Backend Requests pour la fonction de recherche

- Le serveur retourne des données d'animaux mockées, cela valide que l'application traite correctement les réponses valides du serveur et affiche les données mockées sans erreur.

- Le serveur ne retourne aucun résultat, cela vérifie que l'application gère correctement l'absence de résultats et affiche un message approprié à l'utilisateur.

- Une erreur 500 est simulée sur le serveur, cela contrôle que l'application gère les erreurs serveur de manière robuste et affiche un message d'erreur convenable à l'utilisateur.

## Les eventuelles difficultés rencontrées 

Le mocking des requêtes backend a sûrement été la partie la plus difficile car on travaille avec des données simulées et pas le "réel".

## Auteurs

* **Emeline PELLAN** _alias_ [@Eme-p2ln](https://github.com/Eme-p2ln)

* **Serine BETTAYEB** _alias_ [@Serine93](https://github.com/Serine93)
