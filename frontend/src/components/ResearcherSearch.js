import { useState } from "react";
import axios from "axios";

export default function ResearcherSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/researchers?search=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching researchers");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Researchers</h2>
      <input
        type="text"
        placeholder="Enter researcher name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "250px", marginRight: "10px" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px" }}>Search</button>

      <ul style={{ marginTop: "20px" }}>
        {results.map((res) => (
          <li
            key={res._id}
            style={{
              padding: "10px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseEnter={e => e.target.style.background = "#f0f0f0"}
            onMouseLeave={e => e.target.style.background = "transparent"}
          >
            {res.name} ({res.department})
          </li>
        ))}
      </ul>
    </div>
  );
}
