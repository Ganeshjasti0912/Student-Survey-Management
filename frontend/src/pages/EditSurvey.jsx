import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSurveyById, updateSurvey } from "../services/surveyApi";

export default function EditSurvey() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // keep same field names you already use in Survey.jsx
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    dateOfSurvey: "",
    likedMost: [],            // checkbox array
    sourceOfInterest: "",     // radio
    recommend: "",            // select
  });

  const likedMostOptions = ["Students", "Location", "Campus", "Atmosphere", "Dorm Rooms", "Sports"];
  const interestOptions = ["Friends", "Television", "Internet", "Other"];

  // LOAD existing survey
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getSurveyById(id);

        const likedArr =
          typeof data.likedMost === "string" && data.likedMost.trim().length > 0
            ? data.likedMost.split(",").map((x) => x.trim()).filter(Boolean)
            : Array.isArray(data.likedMost)
            ? data.likedMost
            : [];

        setForm({
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          address: data.address ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          zip: data.zip ?? "",
          phone: data.phone ?? "",
          email: data.email ?? "",
          dateOfSurvey: data.dateOfSurvey ?? "",
          likedMost: likedArr,
          sourceOfInterest: data.sourceOfInterest ?? "",
          recommend: data.recommend ?? "",
        });
      } catch (e) {
        console.error(e);
        setStatus("Failed to load survey.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleLikedMostChange(e) {
    const { value, checked } = e.target;
    setForm((prev) => {
      const next = checked
        ? [...prev.likedMost, value]
        : prev.likedMost.filter((x) => x !== value);
      return { ...prev, likedMost: next };
    });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setStatus("");

    // send likedMost as string like "Students, Campus" (same as your HTML)
    const payload = {
      ...form
    //   likedMost: form.likedMost.join(", "),
    };

    try {
      setLoading(true);
      const res = await updateSurvey(id, payload);
      if (res.ok) {
        setStatus("Survey updated successfully!");
        setTimeout(() => navigate("/surveys"), 700);
      } else {
        const txt = await res.text();
        setStatus("Update failed: " + (txt || "Unknown error"));
      }
    } catch (e) {
      console.error(e);
      setStatus("Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: 40 }}>
      <div className="container">
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
          <h1 className="m-0">CS Department Survey</h1>
          {/* <div className="mt-2">Editing ID: {id}</div> */}
        </div>

        <div className="mt-4">
          {loading && <div className="alert alert-info">Loading...</div>}
          {status && (
            <div className={`alert ${status.startsWith("✅") ? "alert-success" : status.startsWith("⚠️") ? "alert-warning" : "alert-danger"}`}>
              {status}
            </div>
          )}

          <form onSubmit={handleUpdate}>
            {/* First/Last */}
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">First Name *</label>
                <input className="form-control" name="firstName" value={form.firstName} onChange={handleChange} required />
              </div>
              <div className="col">
                <label className="form-label">Last Name *</label>
                <input className="form-control" name="lastName" value={form.lastName} onChange={handleChange} required />
              </div>
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label">Street Address *</label>
              <input className="form-control" name="address" value={form.address} onChange={handleChange} required />
            </div>

            {/* City/State/Zip */}
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">City *</label>
                <input className="form-control" name="city" value={form.city} onChange={handleChange} required />
              </div>
              <div className="col">
                <label className="form-label">State *</label>
                <input className="form-control" name="state" value={form.state} onChange={handleChange} required />
              </div>
              <div className="col">
                <label className="form-label">ZIP *</label>
                <input className="form-control" name="zip" value={form.zip} onChange={handleChange} required />
              </div>
            </div>

            {/* Phone/Email/Date */}
            <div className="mb-3">
              <label className="form-label">Telephone *</label>
              <input className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Survey *</label>
              <input className="form-control" type="date" name="dateOfSurvey" value={form.dateOfSurvey} onChange={handleChange} required />
            </div>

            {/* likedMost */}
            <div className="mb-3">
              <label className="form-label">What did you like most about the campus?</label>
              {likedMostOptions.map((opt) => (
                <div className="form-check" key={opt}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={opt}
                    checked={form.likedMost.includes(opt)}
                    onChange={handleLikedMostChange}
                  />
                  <label className="form-check-label">{opt}</label>
                </div>
              ))}
            </div>

            {/* interest */}
            <div className="mb-3">
              <label className="form-label">How did you become interested in the university?</label>
              {interestOptions.map((opt) => (
                <div className="form-check" key={opt}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sourceOfInterest"
                    value={opt}
                    checked={form.sourceOfInterest === opt}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{opt}</label>
                </div>
              ))}
            </div>

            {/* recommend */}
            <div className="mb-4">
              <label className="form-label">Likelihood of Recommending This School</label>
              <select className="form-select" name="recommend" value={form.recommend} onChange={handleChange}>
                <option value="">-- Select an option --</option>
                <option value="Very Likely">Very Likely</option>
                <option value="Likely">Likely</option>
                <option value="Unlikely">Unlikely</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn me-2"
                style={{ backgroundColor: "#FFCC33", color: "#006633", borderColor: "#006633", fontWeight: 600 }}
                disabled={loading}
              >
                Update
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/surveys")}
                disabled={loading}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
