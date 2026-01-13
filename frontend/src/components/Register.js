import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // registerUser تستخدم fetch وترجع JSON مباشر
      const res = await registerUser({ name, email, password });

      alert(res.message); // ✅ بدون res.data
      navigate("/login"); // تحويل لصفحة تسجيل الدخول
    } catch (err) {
  console.log("ERROR FULL:", err);
  console.log("RESPONSE:", err.response);
  alert("This email is already registered.");
}

  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: "80px auto", padding: "20px" }}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ marginBottom: "15px", width: "100%", padding: "8px" }}
      />

      <button
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "10px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Register
      </button>
    </div>
  );
}
