// src/components/UserList.jsx
import { useState, useEffect, useMemo, useContext } from "react";
import { fetchUsers } from "../data/interactAPI";
import { UserCard } from "./UserCard";
import { ThemeContext } from "../context/ThemeContext";
import { Spinner } from "./Spinner"; // si tu as ce composant

export const UserList = () => {
  const { theme } = useContext(ThemeContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("none"); // "none" | "name" | "age"
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  // Chargement des utilisateurs
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers(); // renvoie un tableau d'utilisateurs
      setUsers(data);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Quand recherche ou tri change, revenir à la page 1
  useEffect(() => {
    setPage(1);
  }, [search, sortType]);

  // Filtre + tri (optimisé avec useMemo)
  const filteredSortedUsers = useMemo(() => {
    if (!users || users.length === 0) return [];

    const term = search.trim().toLowerCase();

    // 1) Filtre
    let result = users.filter((u) => {
      const first = (u.firstName || "").toLowerCase();
      const last = (u.lastName || "").toLowerCase();
      const mail = (u.email || "").toLowerCase();
      if (!term) return true;
      return (
        first.includes(term) ||
        last.includes(term) ||
        mail.includes(term)
      );
    });

    // 2) Tri
    if (sortType === "name") {
      // Tri par nom complet : lastName puis firstName (insensible à la casse)
      result.sort((a, b) => {
        const nameA = ((a.lastName || "") + " " + (a.firstName || "")).toLowerCase();
        const nameB = ((b.lastName || "") + " " + (b.firstName || "")).toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else if (sortType === "age") {
      result.sort((a, b) => (a.age || 0) - (b.age || 0));
    }

    return result;
  }, [users, search, sortType]);

  // Pagination (appliquée APRÈS filtrage+tri)
  const totalItems = filteredSortedUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / usersPerPage));
  // s'assurer que la page courante est valide
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const startIndex = (page - 1) * usersPerPage;
  const currentUsers = filteredSortedUsers.slice(startIndex, startIndex + usersPerPage);

  // Render
  if (loading) {
    // si tu as Spinner.jsx, utilise-le. Sinon, on affiche un spinner inline.
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <Spinner />
        <p style={{ color: theme === "light" ? "#333" : "#ddd" }}>Chargement des utilisateurs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: 60, color: theme === "light" ? "#333" : "#ddd" }}>
        <h2>❌ Impossible de charger les utilisateurs</h2>
        <p>{error}</p>
        <div style={{ marginTop: 12 }}>
          <button
            onClick={() => loadUsers()}
            style={{
              padding: "8px 14px",
              borderRadius: 6,
              border: "none",
              backgroundColor: theme === "light" ? "#007bff" : "#444",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            🔄 Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Liste des utilisateurs</h1>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom, prénom ou email..."
          style={{ padding: 8, width: 300 }}
        />

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="none">Aucun tri</option>
          <option value="name">Trier par nom</option>
          <option value="age">Trier par âge</option>
        </select>

        <div style={{ marginLeft: "auto", color: theme === "light" ? "#333" : "#ddd" }}>
          {totalItems} utilisateur{totalItems > 1 ? "s" : ""}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {currentUsers.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>

      {/* Pagination simple */}
      <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{ padding: "6px 10px", cursor: page === 1 ? "not-allowed" : "pointer" }}
        >
          ◀ Précédent
        </button>

        <span>Page {page} / {totalPages}</span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          style={{ padding: "6px 10px", cursor: page === totalPages ? "not-allowed" : "pointer" }}
        >
          Suivant ▶
        </button>
      </div>
    </div>
  );
};

