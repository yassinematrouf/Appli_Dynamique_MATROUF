import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUsers } from "../data/interactAPI";

export const UserDetail = () => {
  const { id } = useParams(); // récupère l'id depuis l'URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then((users) => {
        const foundUser = users.find((u) => u.id === parseInt(id));
        if (!foundUser) setError("Utilisateur introuvable");
        else setUser(foundUser);
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger les utilisateurs");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <img src={user.image} alt={user.firstName} width="150" />
      <p>Email : {user.email}</p>
      <p>Age : {user.age}</p>
      <p>Ville : {user.address.city}</p>
      <p>Université : {user.university}</p>
      <p>Entreprise : {user.company.name}</p>
    </div>
  );
};
