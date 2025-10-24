import { useNavigate } from "react-router-dom";

export const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${user.id}`); // redirige vers la page détail
  };

  return (
    <div className="user-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={user.image} alt={user.firstName} width="100" />
      <h3>{user.firstName} {user.lastName}</h3>
      <p>{user.email}</p>
    </div>
  );
};
