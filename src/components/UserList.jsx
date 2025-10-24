import { useState, useEffect } from "react";
import { fetchUsers } from "../data/interactAPI";
import { UserCard } from "./UserCard";
import { Spinner } from "./Spinner";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les utilisateurs. Vérifiez votre connexion.");
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  // Recherche
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tri
  const sortedUsers = [...filteredUsers];
  if (sortOption === "name") {
    sortedUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (sortOption === "age") {
    sortedUsers.sort((a, b) => a.age - b.age);
  }

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  return (
    <div>
      <h1>Liste des utilisateurs</h1>

      {/* Recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom, prénom ou email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "60%" }}
      />

      {/* Tri */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", marginLeft: "10px" }}
      >
        <option value="">Trier par...</option>
        <option value="name">Nom (A → Z)</option>
        <option value="age">Âge (croissant)</option>
      </select>

      {/* Liste */}
      <div className="user-list">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: number === currentPage ? "#007bff" : "#f0f0f0",
              color: number === currentPage ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};
