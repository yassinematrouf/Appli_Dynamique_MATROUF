import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById } from "../data/interactAPI";

export const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchUserById(id);
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les détails de l'utilisateur.");
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ← Retour à la liste
      </button>
      <h1>{user.firstName} {user.lastName}</h1>
      <img
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        style={{ width: "120px", borderRadius: "50%" }}
      />
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Âge :</strong> {user.age}</p>
      <p><strong>Ville :</strong> {user.address.city}</p>
      <p><strong>Université :</strong> {user.university}</p>
      <p><strong>Entreprise :</strong> {user.company.name} ({user.company.department})</p>
      <p><strong>Titre :</strong> {user.company.title}</p>
    </div>
  );
};
