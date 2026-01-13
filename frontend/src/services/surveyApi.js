const API_URL = "http://localhost:8086/api/surveys";

export async function getSurveys() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getSurveyById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function createSurvey(payload) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res;
}

export async function updateSurvey(id, payload) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res;
}

export async function deleteSurvey(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res;
}
