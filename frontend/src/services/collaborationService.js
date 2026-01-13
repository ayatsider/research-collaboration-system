const BASE_URL = "http://localhost:5003";

export async function getGraphData() {
  const res = await fetch(`${BASE_URL}/graph`);
  return res.json();
}
