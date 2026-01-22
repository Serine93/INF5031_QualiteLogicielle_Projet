Feature: Mock page HTML simulant la réponse à une recherche

    Scenario: La page HTML mockée retourne des résultats de chiens
        Given la page est en mode mock avec des résultats de chiens
        When l'utilisateur navigue vers la page de recherche
        Then une liste de chiens doit s'afficher

    Scenario: La page HTML mockée retourne un résultat vide
        Given la page est en mode mock sans résultat
        When l'utilisateur navigue vers la page de recherche
        Then aucune annonce ne doit s'afficher

    Scenario: La page HTML mockée retourne une erreur
        Given la page est en mode mock avec erreur API
        When l'utilisateur navigue vers la page de recherche
        When un message d'erreur doit s'afficher
