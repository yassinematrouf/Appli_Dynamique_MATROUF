import { useNavigate } from "react-router-dom";

export const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/user/${user.id}`)}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        style={{ width: "60px", height: "60px", borderRadius: "50%" }}
      />
      <div>
        <h3 style={{ margin: "0" }}>{user.firstName} {user.lastName}</h3>
        <p style={{ margin: "0" }}>{user.email}</p>
      </div>
    </div>
  );
};
