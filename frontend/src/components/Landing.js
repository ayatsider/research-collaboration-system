import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const nav = useNavigate();

  return (
    <div className="landing">
      <div className="bg-shape one"></div>
      <div className="bg-shape two"></div>

      <div className="landing-card">
        <h1>Research Collaboration System</h1>

        <p>
          A modern academic platform to manage research projects,
          publications, and collaboration networks between university researchers.
        </p>

        <div className="button-group">
          <button className="btn primary" onClick={() => nav("/login")}>
            Login
          </button>

          <button className="btn secondary" onClick={() => nav("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
