Feature: Mock Backend Requests pour la fonction de recherche

    Scenario: Le serveur retourne des données d'animaux mockées
        Given la page est en mode mock avec des résultats de chiens
        When l'utilisateur navigue vers la page de recherche
        Then les données mockées doivent être utilisées pour la recherche

    Scenario: Le serveur ne retourne aucun résultat 
        Given la page est en mode mock sans résultats
        When l'utilisateur navigue vers la page de recherche
        Then aucune annonce ne doit s'afficher

    Scenario: Une erreur 500 est simulée sur le serveur
        Given la page est en mode mock avec erreur API
        When l'utilisateur navigue vers la page de recherche
        Then un message d'erreur doit être affiché
