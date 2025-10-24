import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserList } from "./components/UserList";
import { UserDetail } from "./components/UserDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
