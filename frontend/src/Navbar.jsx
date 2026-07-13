import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white shadow-sm mb-4">
      <div className="container">
        <span className="navbar-brand text-primary fw-bold">DevNotes</span>
        <div className="d-flex align-items-center">
          <span className="me-3 text-secondary d-none d-sm-inline">Hi, {user.name}</span>
          <button className="btn btn-outline-primary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
