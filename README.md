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

## Installation

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

Le script de tests/discover.spec.ts montre que uncompagnon.fr n'effectue AUCUN appel API pour les données relatives aux animaux et aux recherches : cela signifie que les données relatives aux animaux sont déjà intégrées dans le code HTML lorsque la page se charge (SSR : HTML chargé dans le serveur puis envoyé => le navigateur ne fait que de l'affichage, sans qu'aucune requête ne soit nécessaire). Nous avons donc mis en place une simulation de réponse HTTP au niveau de la page plutôt qu'au niveau de l'API. 

**A noter : le script tests/discover.spec.ts a été généré par claude.ai."

- Génération d'une page HTML avec des résultats de chiens mockés.

- Génération d'une page HTML avec des résultats vides mockés.

- Génération d'une page HTML avec des erreurs mockées.

## Les éventuelles difficultés rencontrées 

Nous avons passé beaucoup de temps sur le mocking de requêtes backend, en vain (commit : af9cdaf [30/11/2025]). Nous avons, à l'aide de Claude.ai, généré un script nous permettant d'analyser les endpoints du site uncompagon.fr ; nous avons découvert que le site utilise le SSR (Server-Side Rendering), c'est-à-dire que le serveur intègre directement les données à la page HTML = le client ne fait aucune requête au serveur pour récupérer les données.
Nous avons donc décidé de mocker les résultats de recherche (chiens, vide et erreur) et de vérifier ces mocks-là (**à noter : les fonctions de génération de page HTML dans pages/HtmlMockPage.ts ont été générées par Claude.ai, seule la fonction expectPageLoaded(scenario?: 'dogs' | 'empty' | 'error') a été écrite par nous-mêmes dans ce fichier"").

## Auteurs

* **Emeline PELLAN** _alias_ [@Eme-p2ln](https://github.com/Eme-p2ln)

* **Serine BETTAYEB** _alias_ [@Serine93](https://github.com/Serine93)
