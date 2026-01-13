import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard({ user }) {
  const nav = useNavigate();
  const [totalProjects, setTotalProjects] = useState(0);

  // Redirect إذا ما في user
  useEffect(() => {
    if (!user) nav("/login");
  }, [user, nav]);

  // جلب عدد المشاريع
  useEffect(() => {
    async function fetchProjectsCount() {
      try {
        const res = await axios.get("http://localhost:3001/projects/count");
        setTotalProjects(res.data.totalProjects);
      } catch (err) {
        console.error("Error fetching project count:", err);
      }
    }
    fetchProjectsCount();
  }, []);

  if (!user) return <p>Redirecting to login...</p>;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">ResearchPro</div>
        <nav>
          <ul>
            <li onClick={() => nav("/projects")}>Projects</li>
            <li onClick={() => nav("/researchers")}>Researchers</li>
            <li onClick={() => nav("/collaborations")}>Collaborations</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <h1>Welcome back, {user.name} 👋</h1>

        <div className="cards">
          <div className="card">
            <h3>Total Projects</h3>
            <p>{totalProjects}</p>
          </div>

          <div className="card">
            <h3>Collaborators</h3>
            <p>—</p>
          </div>
        </div>
      </main>
    </div>
  );
}
