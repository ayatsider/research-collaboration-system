const USER_SERVICE_URL = "http://localhost:3000";
const PROJECT_SERVICE_URL = "http://localhost:3001";

// const COLLAB_SERVICE_URL = "http://localhost:5003"; // Collaboration Service (غير جاهز)

const researcherId = "R1"; // ممكن تغيّريه حسب بياناتك

// ----------------------------------------------------
// Fetch بيانات الباحث
async function fetchResearcher(id) {
  try {
    const res = await fetch(`${USER_SERVICE_URL}/users/${id}`);
    if (!res.ok) throw new Error("Failed to fetch researcher");
    const data = await res.json();
    document.getElementById("researcher-profile").innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById("researcher-profile").innerText = "User Service not ready or error!";
    console.error(err);
  }
}

// Fetch Projects الخاصة بالباحث
async function fetchProjects(userId) {
  try {
    const res = await fetch(`${PROJECT_SERVICE_URL}/projects?user=${userId}`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    const data = await res.json();
    document.getElementById("projects").innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById("projects").innerText = "Project Service not ready or error!";
    console.error(err);
  }
}

// Placeholder لـ Collaborators لحد ما تكون الخدمة جاهزة
function loadCollaboratorsPlaceholder() {
  document.getElementById("collaborators-graph").innerText =
    "Collaboration Service not ready yet. Will show graph here.";
}

// ----------------------------------------------------
// Load all data
function loadDashboard() {
  fetchResearcher(researcherId);
  fetchProjects(researcherId);
  loadCollaboratorsPlaceholder();
}

// Run on page load
window.onload = loadDashboard;
