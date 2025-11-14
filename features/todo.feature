Feature: Recherche d’une annonce
  Afin de retrouver facilement une annonce
  En tant qu’utilisateur
  Je veux pouvoir effectuer une recherche selon différents critères

  Scenario: L’utilisateur sélectionne uniquement la catégorie “Animaux” et obtient toutes les annonces disponibles
    Given l’utilisateur est sur la page de recherche d’annonces
    When l’utilisateur sélectionne la catégorie "Animaux"
    And il ne saisit ni race ni localisation
    Then toutes les annonces de la catégorie "Animaux" s’affichent

  Scenario: L’utilisateur recherche une race de chien inexistante
    Given l’utilisateur est sur la page de recherche d’annonces
    When l’utilisateur saisit la race "Poméranien"
    And il ne sélectionne aucune localisation
    Then un message indique qu’aucune annonce ne correspond à la recherche

  Scenario: L’utilisateur recherche "Doberman" avec une localisation où aucun chien n’est disponible
    Given l’utilisateur est sur la page de recherche d’annonces
    When l’utilisateur saisit la race "Doberman"
    And l’utilisateur sélectionne la localisation "Tremblay-en-France (25 km)"
    Then un message indique qu’aucun chien ne correspond aux critères dans cette zone

  Scenario: L’utilisateur recherche une race de chien existante
    Given l’utilisateur est sur la page de recherche d’annonces
    When l’utilisateur saisit une race existante sur la plateforme
    And il ne sélectionne aucun autre filtre
    Then les annonces correspondant à cette race s’affichent correctement

  Scenario: L’utilisateur choisit un type de chien et ajoute un filtre sur le type d’annonce “Perdu”
    Given l’utilisateur est sur la page de recherche d’annonces
    When l’utilisateur saisit un type de chien précis
    And l’utilisateur applique le filtre "Perdu"
    Then la liste des annonces s’actualise avec uniquement les annonces “Perdu” correspondant à ce type de chien

  Scenario: Une erreur interne 500 est générée
    Given 
    When 
    Then 
    And 
