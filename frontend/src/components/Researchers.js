import { useEffect, useState } from "react";
import axios from "axios";

export default function ResearchersPage() {
  const [researchers, setResearchers] = useState([]);

  useEffect(() => {
    async function fetchResearchers() {
      try {
        const res = await axios.get("http://localhost:3000/users");
        setResearchers(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchResearchers();
  }, []);

  return (
    <div className="researchers-page">
      <h2>Researchers</h2>
      {researchers.length === 0 ? (
        <p>No researchers found.</p>
      ) : (
        <ul>
          {researchers.map(r => (
            <li key={r._id}>{r.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
