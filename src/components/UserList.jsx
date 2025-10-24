import { useState, useEffect } from "react";
import { fetchUsers } from "../data/interactAPI";
import { UserCard } from "./UserCard";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // état pour la recherche

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les utilisateurs");
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  // Filtrer les utilisateurs selon le champ de recherche
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Liste des utilisateurs</h1>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom, prénom ou email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
      />

      <div className="user-list">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
