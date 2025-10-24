// Fonction pour récupérer tous les utilisateurs
export const fetchUsers = async () => {
  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) {
      throw new Error("Erreur réseau : impossible de récupérer les utilisateurs");
    }
    const data = await response.json();
    return data.users; // retourne seulement le tableau des utilisateurs
  } catch (error) {
    console.error(error);
    throw error; // renvoie l'erreur pour qu'elle soit gérée dans le composant
  }
};

// Fonction pour récupérer un utilisateur par ID
export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    if (!response.ok) {
      throw new Error("Erreur réseau : impossible de récupérer l'utilisateur");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
