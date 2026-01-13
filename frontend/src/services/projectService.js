const BASE_URL = "http://localhost:3001";

export async function getAllProjects() {
  const res = await fetch(`${BASE_URL}/projects`);
  return res.json();
}

export async function createProject({ title, description, researchers, startDate, endDate }) {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, researchers, startDate, endDate })
  });
  return res.json();
}

// ✅ إضافة دالة حذف المشروع
export async function deleteProject(projectId) {
  const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
    method: "DELETE"
  });
  return res.json();
}
