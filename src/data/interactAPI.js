// interactAPI.js

export const fetchUsers = async () => {
  try {
    const response = await fetch('https://dummyjson.com/users'); // va chercher les utilisateurs
    const data = await response.json();
    return data.users; // retourne seulement le tableau des utilisateurs
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return []; // si erreur, retourne un tableau vide
  }
};
