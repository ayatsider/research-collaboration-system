import Projects from "./Projects";
import Researchers from "./Researchers";
import CollaborationGraph from "./CollaborationGraph";

export default function VisitorDashboard() {
  return (
    <div className="dashboard">
      <main className="main-content">
        <h1>Public Research Overview</h1>

        <div className="cards">
          <Projects />
          <Researchers />
          <CollaborationGraph />
        </div>
      </main>
    </div>
  );
}
