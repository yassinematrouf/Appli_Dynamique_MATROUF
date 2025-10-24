import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserList } from "./components/UserList";
import { UserDetail } from "./components/UserDetail";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";

function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={theme}
      style={{
        backgroundColor: theme === "light" ? "#f9f9f9" : "#1e1e1e",
        color: theme === "light" ? "#000" : "#fff",
        minHeight: "100vh",
        transition: "all 0.3s ease",
        padding: "10px"
      }}
    >
      {/* Bouton pour changer le thème */}
      <button
        onClick={toggleTheme}
        style={{
          marginBottom: "20px",
          padding: "8px 12px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          backgroundColor: theme === "light" ? "#007bff" : "#444",
          color: "#fff",
        }}
      >
        {theme === "light" ? "Passer en sombre" : "Passer en clair"}
      </button>

      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppWrapper;
