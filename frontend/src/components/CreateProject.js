import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateProject({ user, onProjectCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [researchers, setResearchers] = useState([]);
  const [selectedResearchers, setSelectedResearchers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // جلب الباحثين من Users backend
  useEffect(() => {
    async function fetchResearchers() {
      try {
        const res = await axios.get("http://localhost:3000/users"); // جلب كل الباحثين
        setResearchers(res.data);
      } catch (err) {
        console.error("Error fetching researchers:", err);
      }
    }
    fetchResearchers();
  }, []);

  // إنشاء مشروع جديد
  const handleCreateProject = async () => {
    if (!title || !description || selectedResearchers.length === 0 || !startDate || !endDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/projects", {
        title,
        description,
        researchers: selectedResearchers,
        startDate,
        endDate
      });

      alert("Project created successfully!");
      onProjectCreated(res.data.project); // تحديث قائمة المشاريع في الصفحة الرئيسية

      // إعادة تعيين الحقول
      setTitle("");
      setDescription("");
      setSelectedResearchers([]);
      setStartDate("");
      setEndDate("");
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  };

  return (
    <div className="card" style={{ marginBottom: "20px", padding: "20px" }}>
      <h3>Create New Project</h3>

      <input
        placeholder="Project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
      />

      <textarea
        placeholder="Project description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
      />

      <label>Select Researchers:</label>
      <select
        multiple
        value={selectedResearchers}
        onChange={(e) =>
          setSelectedResearchers(Array.from(e.target.selectedOptions, option => option.value))
        }
        style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
      >
        {researchers.map((r) => (
          <option key={r._id} value={r._id}>{r.name}</option>
        ))}
      </select>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{ marginBottom: "10px", width: "48%", padding: "8px", marginRight: "4%" }}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={{ marginBottom: "10px", width: "48%", padding: "8px" }}
      />

      <button onClick={handleCreateProject} style={{ padding: "10px 20px" }}>
        Create Project
      </button>
    </div>
  );
}
