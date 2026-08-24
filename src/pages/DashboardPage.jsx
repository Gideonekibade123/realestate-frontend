import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ListingCard from "../components/ListingCard";
import { API } from "../api";
import { authFetch } from "../authFetch";

export default function DashboardPage() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    authFetch(API.listings, {}, auth)
      .then((r) => r.json())
      .then((data) => {
        const all = Array.isArray(data) ? data : data.results || [];
        setListings(all.filter((l) => l.owner === user.username));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, auth, navigate]);

  const active = listings.filter((l) => !l.is_sold);
  const sold = listings.filter((l) => l.is_sold);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>My Dashboard</h1>
            <p style={styles.sub}>Welcome back, <span style={{ color: "#e8c97e" }}>{user?.username}</span></p>
          </div>
          <Link to="/listings/new" style={styles.addBtn}>+ Add Listing</Link>
        </div>
        <div style={styles.statsRow}>
          {[
            { label: "Total Listings", value: listings.length, color: "#e8c97e" },
            { label: "Active", value: active.length, color: "#4caf82" },
            { label: "Sold", value: sold.length, color: "#e05252" },
          ].map((s) => (
            <div key={s.label} style={styles.statCard}>
              <div style={{ ...styles.statVal, color: s.color }}>{s.value}</div>
              <div style={styles.statLbl}>{s.label}</div>
            </div>
          ))}
        </div>
        <h2 style={styles.sectionTitle}>My Listings</h2>
        {loading ? (
          <p style={{ color: "#666" }}>Loading...</p>
        ) : listings.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: "3rem" }}>🏠</p>
            <p style={{ color: "#666" }}>No listings yet</p>
            <Link to="/listings/new" style={styles.addBtn}>Add First Listing</Link>
          </div>
        ) : (
          <div style={styles.grid}>
            {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#0f1117", minHeight: "100vh", paddingTop: "2rem" },
  container: { maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 4rem" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" },
  heading: { fontSize: "1.8rem", fontWeight: 700, color: "#fff", margin: "0 0 4px" },
  sub: { color: "#666", margin: 0 },
  addBtn: { padding: "10px 20px", background: "#e8c97e", color: "#0f1117", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2.5rem" },
  statCard: { background: "#1a1d27", borderRadius: "12px", padding: "1.5rem", border: "1px solid #2a2d3a", textAlign: "center" },
  statVal: { fontSize: "2.5rem", fontWeight: 800, marginBottom: "4px" },
  statLbl: { color: "#666", fontSize: "0.85rem" },
  sectionTitle: { fontSize: "1.3rem", fontWeight: 600, color: "#fff", marginBottom: "1.5rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" },
  empty: { textAlign: "center", padding: "3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" },
};