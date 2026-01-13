import { useEffect, useState } from "react";
import axios from "axios";

export default function CollaborationsPage() {
  const [collaborations, setCollaborations] = useState([]);

  useEffect(() => {
    async function fetchCollaborations() {
      try {
        const res = await axios.get("http://localhost:3001/projects");
        // استخراج الباحثين المتعاونين من المشاريع
        const pairs = [];
        res.data.forEach(project => {
          const r = project.researchers;
          if (r.length > 1) {
            pairs.push(r.join(" & "));
          }
        });
        setCollaborations(pairs);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCollaborations();
  }, []);

  return (
    <div className="collaborations-page">
      <h2>Collaborations</h2>
      {collaborations.length === 0 ? (
        <p>No collaborations yet.</p>
      ) : (
        <ul>
          {collaborations.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
