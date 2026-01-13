import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSurvey, getSurveys } from "../services/surveyApi";

export default function ViewSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function load() {
    try {
      setErr("");
      const data = await getSurveys();
       // sort by id (smallest first)
    data.sort((a, b) => a.id - b.id);
      setSurveys(data);
    } catch (e) {
      setErr(e.message || "Failed to load surveys");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this survey?")) return;

    const res = await deleteSurvey(id);
    if (res.ok) {
      alert("Survey deleted successfully!");
      load();
    } else {
      alert("Failed to delete survey.");
    }
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div
        className="container header-box mt-3"
        style={{
          border: "5px solid #006633",
          boxShadow: "3px 3px 10px rgba(0,0,0,0.5)",
          padding: 20,
          textAlign: "center",
          backgroundColor: "#FFCC33",
          color: "#006633",
          marginTop: 20,
        }}
      >
        <h1>Survey Responses</h1>
      </div>

      <div className="container mt-3">
        {err && <div className="alert alert-danger">{err}</div>}
      </div>

      <div className="container mt-4 mb-5" style={{ overflowX: "auto" }}>
        <table className="table table-striped align-middle">
          <thead className="table-success">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>ZIP</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Survey Date</th>
              <th>Liked Most</th>
              <th>Interest Source</th>
              <th>Recommendation</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {surveys.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.firstName ?? "-"}</td>
                <td>{s.lastName ?? "-"}</td>
                <td>{s.address ?? "-"}</td>
                <td>{s.city ?? "-"}</td>
                <td>{s.state ?? "-"}</td>
                <td>{s.zip ?? "-"}</td>
                <td>{s.phone ?? "-"}</td>
                <td>{s.email ?? "-"}</td>
                <td>{s.dateOfSurvey ?? "-"}</td>
                <td>{Array.isArray(s.likedMost) && s.likedMost.length ? s.likedMost.join(", ") : "-"}</td>
                <td>{s.sourceOfInterest ?? "-"}</td>
                <td>{s.recommend ?? "-"}</td>
                <td>
                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: "#ffcc33", color: "#006633", border: "none" }}
                    onClick={() => navigate(`/survey/${s.id}/edit`)}
                  >
                    ✏️ Edit
                  </button>{" "}
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}

            {!surveys.length && (
              <tr>
                <td colSpan={14} className="text-center py-4">
                  No surveys found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
