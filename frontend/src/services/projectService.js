const BASE_URL = "http://localhost:3001";

// Create Project (with Publications)
export async function createProject(data) {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Get all projects
export async function getAllProjects() {
  const res = await fetch(`${BASE_URL}/projects`);
  return res.json();
}

// Delete project
export async function deleteProject(id) {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
