import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const [isFavorite, setIsFavorite] = useState(false);

  // Vérifier si l'utilisateur est déjà dans les favoris
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(user.id));
  }, [user.id]);

  // Ajouter ou retirer des favoris
  const toggleFavorite = (e) => {
    e.stopPropagation(); // empêcher la navigation
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (favorites.includes(user.id)) {
      updatedFavorites = favorites.filter((id) => id !== user.id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, user.id];
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div
      onClick={() => navigate(`/user/${user.id}`)}
      style={{
        border: "1px solid",
        borderColor: theme === "light" ? "#ddd" : "#444",
        borderRadius: "8px",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        position: "relative",
        transition: "transform 0.2s, opacity 0.3s",
        opacity: 0,
        animation: "fadeIn 0.5s forwards",
        backgroundColor: theme === "light" ? "#fff" : "#2e2e2e",
        color: theme === "light" ? "#000" : "#fff",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Étoile favoris */}
      <div
        onClick={toggleFavorite}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "20px",
          color: isFavorite ? "gold" : "#ccc",
        }}
      >
        ★
      </div>

      {/* Photo utilisateur */}
      <img
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        style={{ width: "60px", height: "60px", borderRadius: "50%" }}
      />

      {/* Infos utilisateur */}
      <div>
        <h3 style={{ margin: "0" }}>{user.firstName} {user.lastName}</h3>
        <p style={{ margin: "0" }}>{user.email}</p>
      </div>

      {/* Animation CSS fade-in */}
      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
