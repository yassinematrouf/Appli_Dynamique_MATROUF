import { useState, useEffect } from "react";
import { fetchUsers } from "../data/interactAPI";
import { UserCard } from "./UserCard";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

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

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers];
  if (sortOption === "name") {
    sortedUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (sortOption === "age") {
    sortedUsers.sort((a, b) => a.age - b.age);
  }

  return (
    <div>
      <h1>Liste des utilisateurs</h1>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom, prénom ou email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "60%" }}
      />

      {/* Menu tri */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", marginLeft: "10px" }}
      >
        <option value="">Trier par...</option>
        <option value="name">Nom (A → Z)</option>
        <option value="age">Âge (croissant)</option>
      </select>

      <div className="user-list">
        {sortedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
