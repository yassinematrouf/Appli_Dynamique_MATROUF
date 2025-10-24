import { useState, useEffect } from "react";
import { fetchUsers } from "../data/interactAPI";
import { UserCard } from "./UserCard";

export const UserList = () => {
  const [users, setUsers] = useState([]); // ici on stocke les utilisateurs
  const [loading, setLoading] = useState(true); // état de chargement
  const [error, setError] = useState(null); // état d'erreur

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Impossible de charger les utilisateurs");
        setLoading(false);
      });
  }, []); // [] signifie qu'on exécute ça une seule fois au début

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <div className="user-list">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
