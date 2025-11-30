Feature: Recherche d’une annonce


  Scenario: L’utilisateur sélectionne uniquement la catégorie “Animaux” (Chiens)
    Given l’utilisateur est sur la page de recherche d’annonces
    When l’utilisateur sélectionne la catégorie "Chiens"
    And il valide la recherche
    Then toutes les annonces de la catégorie "Chiens" s’affichent


  Scenario: L’utilisateur choisit un type de chien et ajoute un filtre sur le type d’annonce “Perdu”
    Given l’utilisateur est sur la page de recherche d’annonces
    When l’utilisateur saisit un type de chien précis
    And l’utilisateur applique le filtre "Perdu"
    Then la liste des annonces s’actualise avec uniquement les annonces “Perdu” correspondant à ce type de chien


  Scenario: L’utilisateur recherche une race de chien (ex: Poméranien)
    Given l’utilisateur est sur la page de recherche d’annonces
    When l’utilisateur saisit la race "Poméranien"
    And il ne sélectionne aucune localisation
    And il valide la recherche
    Then des annonces correspondantes s’affichent


  Scenario: L’utilisateur recherche "Dobermann" avec une localisation où aucun chien n’est disponible
    Given l’utilisateur est sur la page de recherche d’annonces
    When l’utilisateur saisit la race "Dobermann"
    And l’utilisateur sélectionne la localisation "Tremblay-en-France"
    And il valide la recherche
    Then un message indique qu’aucun chien ne correspond aux critères dans cette zone


  Scenario: L’utilisateur recherche une race de chien existante
    Given l’utilisateur est sur la page de recherche d’annonces
    When l’utilisateur saisit une race existante sur la plateforme
    And il ne sélectionne aucun autre filtre
    And il valide la recherche
    Then les annonces correspondant à cette race s’affichent correctement avec un labrador retriever



