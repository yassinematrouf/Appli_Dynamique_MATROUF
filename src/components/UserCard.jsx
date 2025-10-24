export const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.image} alt={user.firstName} width="100" />
      <h3>{user.firstName} {user.lastName}</h3>
      <p>{user.email}</p>
    </div>
  );
};
