import { useEffect, useState } from "react";
import axios from "axios";
import CreateProject from "./CreateProject";

export default function ProjectsPage({ user }) {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]); // لكل الباحثين

  // جلب المشاريع من backend
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await axios.get("http://localhost:3001/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
    fetchProjects();
  }, []);

  // جلب كل الباحثين من backend
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("http://localhost:3000/users"); // endpoint للباحثين
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    fetchUsers();
  }, []);

  // تحديث قائمة المشاريع بعد إنشاء مشروع جديد
  const handleProjectCreated = (newProject) => {
    setProjects([...projects, newProject]);
  };

  // حذف مشروع
  const handleDeleteProject = async (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/projects/${projectId}`);
      setProjects(projects.filter(p => p._id !== projectId));
      alert("Project deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Projects</h2>

      {/* ==== Create Project Form ==== */}
      <CreateProject 
        user={user} 
        users={users} 
        onProjectCreated={handleProjectCreated} 
      />

      <h3>Existing Projects</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {projects.map((p) => (
          <div key={p._id} className="card" style={{ flex: "1 1 300px", padding: "15px" }}>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <p>
              <strong>Researchers:</strong>{" "}
              {p.researchers.map(id => {
                const user = users.find(u => u._id === id);
                return user ? user.name : id;
              }).join(", ")}
            </p>
            <p>
              <strong>Start:</strong> {new Date(p.startDate).toLocaleDateString()} <br />
              <strong>End:</strong> {new Date(p.endDate).toLocaleDateString()}
            </p>

            <button
              onClick={() => handleDeleteProject(p._id)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
