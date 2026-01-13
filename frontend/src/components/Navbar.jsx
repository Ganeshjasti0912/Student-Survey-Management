import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#FFCC33" }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" style={{ color: "#006633" }}>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/survey" style={{ color: "#006633" }}>
                Survey
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/surveys" style={{ color: "#006633" }}>
                View Surveys
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
