import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProjectsPage from "./components/Projects";
import ResearchersPage from "./components/Researchers";
import CollaborationsPage from "./components/CollaborationGraph";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        
<Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/projects" element={<ProjectsPage user={user} />} />
        <Route path="/researchers" element={<ResearchersPage />} />
        <Route path="/collaborations" element={<CollaborationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
