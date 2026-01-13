import { useState } from "react";
import axios from "axios";

export default function ResearcherSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null); // نعرض مستخدم واحد فقط
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setError("");
      setResult(null);

      // 1️⃣ البحث عن الاسم أولاً
      const res1 = await axios.get(`http://localhost:3000/users?search=${query}`);
      const users = Array.isArray(res1.data) ? res1.data : [];

      if (users.length === 0) {
        setError("No researcher found with this name");
        return;
      }

      // 2️⃣ استخدم أول ID موجود لجلب البيانات النهائية
      const userId = users[0]._id; // ممكن تعديل لاحقاً لاختيار أكثر من مستخدم بنفس الاسم
      const res2 = await axios.get(`http://localhost:3000/researchers/${userId}`);
      setResult(res2.data);

    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Error fetching researcher");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Researchers by Name</h2>

      <input
        type="text"
        placeholder="Enter researcher name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "250px", marginRight: "10px" }}
      />

      <button onClick={handleSearch} style={{ padding: "10px" }}>Search</button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Email:</strong> {result.email}</p>
          <p><strong>ID:</strong> {result._id}</p>
        </div>
      )}
    </div>
  );
}
