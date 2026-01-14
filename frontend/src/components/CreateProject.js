import { useState, useEffect } from "react";
import { createProject, getAllProjects } from "../services/projectService";

export default function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [researchers, setResearchers] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [publications, setPublications] = useState([
    { title: "", journal: "", year: "", abstract: "" },
  ]);

  const [projects, setProjects] = useState([]); // لإظهار المشاريع

  // جلب المشاريع عند تحميل الصفحة
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getAllProjects();
    setProjects(data);
  };

  const addPublication = () => {
    setPublications([
      ...publications,
      { title: "", journal: "", year: "", abstract: "" },
    ]);
  };

  const handlePublicationChange = (index, field, value) => {
    const updated = [...publications];
    updated[index][field] = value;
    setPublications(updated);
  };

  const handleSubmit = async () => {
    if (!title || !description) return alert("Title and description required");

    await createProject({
      title,
      description,
      researchers: researchers.split(",").map((r) => r.trim()),
      startDate,
      endDate,
      publications: publications.filter((p) => p.title.trim() !== ""),
    });

    alert("Project created successfully");
    
    // إعادة تحميل المشاريع بعد الإضافة
    fetchProjects();

    // إعادة تهيئة الفورم
    setTitle("");
    setDescription("");
    setResearchers("");
    setStartDate("");
    setEndDate("");
    setPublications([{ title: "", journal: "", year: "", abstract: "" }]);
  };

  return (
    <div>
      <h2>Create Research Project</h2>

      <input
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="Researchers (comma separated)"
        value={researchers}
        onChange={(e) => setResearchers(e.target.value)}
      />

      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <h3>Publications</h3>

      {publications.map((pub, i) => (
        <div key={i} style={{ border: "1px solid #ccc", marginBottom: 10 }}>
          <input
            placeholder="Publication Title"
            value={pub.title}
            onChange={(e) =>
              handlePublicationChange(i, "title", e.target.value)
            }
          />
          <input
            placeholder="Journal"
            value={pub.journal}
            onChange={(e) =>
              handlePublicationChange(i, "journal", e.target.value)
            }
          />
          <input
            placeholder="Year"
            value={pub.year}
            onChange={(e) =>
              handlePublicationChange(i, "year", e.target.value)
            }
          />
          <textarea
            placeholder="Abstract"
            value={pub.abstract}
            onChange={(e) =>
              handlePublicationChange(i, "abstract", e.target.value)
            }
          />
        </div>
      ))}

      <button onClick={addPublication}>Add Another Publication</button>
      <br />
      <br />
      <button onClick={handleSubmit}>Create Project</button>

      <hr />
      <h2>Existing Projects</h2>

      {projects.length === 0 && <p>No projects found.</p>}

      {projects.map((proj) => (
        <div
          key={proj._id}
          style={{ border: "1px solid #000", marginBottom: 15, padding: 10 }}
        >
          <h3>{proj.title}</h3>
          <p><strong>Description:</strong> {proj.description}</p>
          <p><strong>Researchers:</strong> {proj.researchers.join(", ")}</p>
          <p>
            <strong>Start Date:</strong>{" "}
            {proj.startDate ? new Date(proj.startDate).toLocaleDateString() : "-"}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {proj.endDate ? new Date(proj.endDate).toLocaleDateString() : "-"}
          </p>

          {proj.publications && proj.publications.length > 0 && (
            <>
              <h4>Publications:</h4>
              <ul>
                {proj.publications.map((pub, i) => (
                  <li key={i}>
                    <strong>{pub.title}</strong> ({pub.year}) - {pub.journal}
                    {pub.abstract && <p>{pub.abstract}</p>}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
