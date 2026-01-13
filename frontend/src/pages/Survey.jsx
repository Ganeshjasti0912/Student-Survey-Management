import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSurvey } from "../services/surveyApi";

const likeOptions = ["Students", "Location", "Campus", "Atmosphere", "Dorm Rooms", "Sports"];
const interestOptions = ["Friends", "Television", "Internet", "Other"];

export default function Survey() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

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
    likedMost: [],
    sourceOfInterest: "",
    recommend: "",
    comments: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleLikedMost(e) {
    const { value, checked } = e.target;
    setForm((prev) => {
      const set = new Set(prev.likedMost);
      if (checked) set.add(value);
      else set.delete(value);
      return { ...prev, likedMost: Array.from(set) };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");

    try {
      const res = await createSurvey(form);

      if (res.ok) {
        setStatus("survey submitted successfully!");
        setTimeout(() => navigate("/surveys"), 800);
      } else {
        const err = await res.text();
        setStatus("Submission failed: " + err);
      }
    } catch (error) {
      setStatus("Could not connect to backend: " + error.message);
    }
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div
        className="container mt-3"
        style={{
          border: "5px solid #006633",
          boxShadow: "3px 3px 10px rgba(0,0,0,0.5)",
          padding: 20,
          textAlign: "center",
          backgroundColor: "#FFCC33",
          color: "#006633",
        }}
      >
        <h1>CS Department Survey</h1>
      </div>

      <div className="container mt-4">
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">
                First Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                required
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="col">
              <label className="form-label">
                Last Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                required
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Street Address <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              required
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">
                City <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="city"
                className="form-control"
                required
                value={form.city}
                onChange={handleChange}
              />
            </div>

            <div className="col">
              <label className="form-label">
                State <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="state"
                className="form-control"
                required
                value={form.state}
                onChange={handleChange}
              />
            </div>

            <div className="col">
              <label className="form-label">
                ZIP Code <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="zip"
                className="form-control"
                required
                value={form.zip}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Telephone <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Date of Survey <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              name="dateOfSurvey"
              className="form-control"
              required
              value={form.dateOfSurvey}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">What did you like most about the campus?</label>
            {likeOptions.map((opt) => (
              <div className="form-check" key={opt}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={opt}
                  checked={form.likedMost.includes(opt)}
                  onChange={handleLikedMost}
                />
                <label className="form-check-label">{opt}</label>
              </div>
            ))}
          </div>

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

          <div className="mb-3">
            <label className="form-label">Likelihood of Recommending This School</label>
            <select
              name="recommend"
              className="form-select"
              value={form.recommend || ""}
              onChange={handleChange}
            >
              <option value="">-- Select an option --</option>
              <option value="Very Likely">Very Likely</option>
              <option value="Likely">Likely</option>
              <option value="Unlikely">Unlikely</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Comments</label>
            <textarea
              name="comments"
              className="form-control"
              rows="3"
              value={form.comments}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#FFCC33", color: "#006633", borderColor: "#006633" }}
            >
              Submit
            </button>{" "}
            <button type="button" className="btn btn-danger" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>

          <div className="text-center mt-3 fw-bold">{status}</div>
        </form>
      </div>
    </div>
  );
}
