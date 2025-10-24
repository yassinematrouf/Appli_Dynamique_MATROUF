# Appli_Dynamique_MATROUF

## Description du projet

Ce projet est une application React dynamique permettant de consulter une liste d'utilisateurs et de visualiser les détails de chaque utilisateur.  
Les données sont récupérées depuis l'API publique : [https://dummyjson.com/users](https://dummyjson.com/users).  

L'application est structurée en plusieurs composants réutilisables et utilise React Router pour gérer la navigation entre la liste et les fiches détaillées des utilisateurs.  

---

## Fonctionnalités réalisées (Niveau 1)

1. **Affichage de la liste des utilisateurs**  
   - Récupération des données depuis l'API avec `fetch` et `useEffect`  
   - Stockage des données dans l'état local avec `useState`  
   - Affichage des informations principales : photo, prénom, nom et email  

2. **Page détail d'un utilisateur**  
   - Cliquer sur un utilisateur dans la liste ouvre sa fiche détaillée  
   - Affichage des informations supplémentaires : âge, ville, université, entreprise  

3. **Composants créés**  
   - `UserList` : gère la récupération et l'affichage de la liste  
   - `UserCard` : affiche les informations principales d'un utilisateur dans la liste  
   - `UserDetail` : affiche toutes les informations détaillées d'un utilisateur  

4. **Navigation avec React Router**  
   - Route `/` → affiche la liste des utilisateurs (`UserList`)  
   - Route `/user/:id` → affiche la fiche détaillée d'un utilisateur (`UserDetail`)  

5. **Gestion de l'état de chargement et des erreurs**  
   - Affichage de "Chargement..." pendant la récupération des données  
   - Gestion des erreurs réseau avec un message d'erreur approprié  

6. **Versionnement Git**  
   - Le projet est versionné sur GitHub avec des commits réguliers  

---

## Installation et utilisation

1. Cloner le projet :

```bash
git clone https://github.com/yassinematrouf/Appli_Dynamique_MATROUF.git

    Installer les dépendances :

cd Appli_Dynamique_MATROUF
npm install

    Lancer le serveur de développement :

npm run dev

    Ouvrir le navigateur sur http://localhost:5173

Architecture du projet

src/
├── components/
│   ├── UserCard.jsx
│   ├── UserList.jsx
│   └── UserDetail.jsx
├── data/
│   └── interactAPI.js
├── App.jsx
├── main.jsx
└── App.css