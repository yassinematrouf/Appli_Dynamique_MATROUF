Appli Dynamique MATROUF

Cette application React a été développée dans le but de créer une interface moderne et fluide pour afficher, rechercher et gérer des utilisateurs récupérés depuis une API externe (DummyJSON).

L’application permet d’afficher une liste complète d’utilisateurs avec leurs informations principales comme le nom, le prénom, l’email et la photo de profil. L’utilisateur peut effectuer une recherche dynamique grâce à une barre de recherche qui filtre les résultats en temps réel. Un système de tri permet de classer les utilisateurs par nom ou par âge à l’aide d’un menu déroulant.

Chaque utilisateur est affiché sous forme de carte (UserCard) avec des effets visuels au survol et la possibilité d’ajouter ou de retirer un utilisateur des favoris en cliquant sur une étoile. Ces favoris sont sauvegardés localement via le localStorage, permettant leur persistance même après le rechargement de la page.

L’application intègre également un système de thème clair/sombre, géré par un contexte global (ThemeContext) accessible dans tout le projet. L’utilisateur peut ainsi basculer entre les deux modes grâce à un bouton dédié.

Des optimisations ont été ajoutées pour améliorer les performances et le confort d’utilisation. Le tri et le filtrage sont optimisés grâce au hook useMemo. Des effets de transition et des animations (hover, fade-in) rendent l’expérience plus agréable. Un composant de chargement visuel s’affiche lors de la récupération des données et un message d’erreur stylisé apparaît en cas de problème, avec la possibilité de relancer la requête.

Enfin, l’organisation du code est structurée avec des composants réutilisables (UserCard, UserList), un hook personnalisé (useUsers) pour la gestion des données et un contexte global pour la gestion du thème.

Ce projet met en pratique les concepts fondamentaux de React comme les hooks, les états locaux, les effets, les contextes, la navigation avec React Router, ainsi que la gestion d’événements et d’interactions utilisateurs.
