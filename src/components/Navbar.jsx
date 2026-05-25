import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🏠 EstateHub</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/listings" style={styles.link}>Listings</Link>
        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/listings/new" style={styles.btnLink}>+ Add Listing</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.btnLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 2rem", height: "64px", background: "#0f1117",
    position: "sticky", top: 0, zIndex: 100,
    boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
  },
  logo: {
    fontSize: "1.4rem", fontWeight: 700, color: "#e8c97e",
    textDecoration: "none", letterSpacing: "-0.5px",
  },
  links: { display: "flex", alignItems: "center", gap: "1.5rem" },
  link: { color: "#ccc", textDecoration: "none", fontSize: "0.95rem" },
  btnLink: {
    background: "#e8c97e", color: "#0f1117", padding: "6px 16px",
    borderRadius: "6px", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem",
  },
  logoutBtn: {
    background: "transparent", border: "1px solid #555",
    color: "#ccc", padding: "6px 14px", borderRadius: "6px",
    cursor: "pointer", fontSize: "0.9rem",
  },
};