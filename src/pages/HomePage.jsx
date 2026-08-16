import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { API } from "../api";

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API.listings)
      .then((r) => r.json())
      .then((data) => { setListings(Array.isArray(data) ? data : data.results || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    navigate(`/listings?search=${search}&category=${category}`);
  }, [search, category, navigate]);

  const featured = listings.filter((l) => !l.is_sold).slice(0, 6);

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.heroSub}>Find Your Perfect Place here</p>
          <h1 style={styles.heroTitle}>Discover Premium<br />Real Estate</h1>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input style={styles.searchInput} placeholder="Search by location or title..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
            <select style={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="buy">Buy</option>
              <option value="lease">Lease</option>
            </select>
            <button type="submit" style={styles.searchBtn}>Search</button>
          </form>
        </div>
      </section>

      <section style={styles.stats}>
        {[
          { label: "Properties Listed", value: listings.length + "+" },
          { label: "Available Now", value: listings.filter(l => !l.is_sold).length + "+" },
          { label: "Categories", value: "4" },
          { label: "Happy Clients", value: "200+" },
        ].map((s) => (
          <div key={s.label} style={styles.statCard}>
            <div style={styles.statVal}>{s.value}</div>
            <div style={styles.statLbl}>{s.label}</div>
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Browse by Category</h2>
        <div style={styles.catGrid}>
          {[
            { key: "sale", label: "For Sale", icon: "🏷️", color: "#4caf82" },
            { key: "rent", label: "For Rent", icon: "🔑", color: "#5b9bd5" },
            { key: "buy", label: "Buy", icon: "🏠", color: "#e8c97e" },
            { key: "lease", label: "Lease", icon: "📋", color: "#c97eb0" },
          ].map((cat) => (
            <Link key={cat.key} to={`/listings?category=${cat.key}`}
              style={{ ...styles.catCard, borderColor: cat.color }}>
              <span style={styles.catIcon}>{cat.icon}</span>
              <span style={{ ...styles.catLabel, color: cat.color }}>{cat.label}</span>
              <span style={styles.catCount}>{listings.filter(l => l.category === cat.key).length} properties</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Featured Listings</h2>
          <Link to="/listings" style={styles.viewAll}>View All →</Link>
        </div>
        {loading ? (
          <p style={styles.loading}>Loading listings...</p>
        ) : (
          <div style={styles.grid}>
            {featured.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </section>

      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Have a Property to List?</h2>
        <p style={styles.ctaText}>Join thousands of sellers and landlords on EstateHub</p>
        <Link to="/register" style={styles.ctaBtn}>Get Started Free</Link>
      </section>
    </div>
  );
}

const styles = {
  page: { background: "#0f1117", minHeight: "100vh", color: "#f0f0f0" },
  hero: {
    minHeight: "90vh", background: "linear-gradient(135deg, #0f1117 0%, #1a2035 50%, #0f1117 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  heroContent: { textAlign: "center", padding: "2rem", maxWidth: "700px" },
  heroSub: { color: "#e8c97e", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1rem" },
  heroTitle: { fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "2rem", color: "#fff" },
  searchForm: { display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" },
  searchInput: { flex: "1", minWidth: "200px", padding: "14px 18px", borderRadius: "8px", border: "1px solid #2a2d3a", background: "#1a1d27", color: "#fff", fontSize: "0.95rem", outline: "none" },
  select: { padding: "14px 18px", borderRadius: "8px", border: "1px solid #2a2d3a", background: "#1a1d27", color: "#fff", fontSize: "0.95rem", outline: "none" },
  searchBtn: { padding: "14px 28px", background: "#e8c97e", color: "#0f1117", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" },
  stats: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", background: "#0f1117", borderTop: "1px solid #2a2d3a", borderBottom: "1px solid #2a2d3a" },
  statCard: { background: "#0f1117", padding: "2rem", textAlign: "center" },
  statVal: { fontSize: "2rem", fontWeight: 800, color: "#e8c97e", marginBottom: "4px" },
  statLbl: { fontSize: "0.85rem", color: "#666" },
  section: { maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" },
  sectionTitle: { fontSize: "1.8rem", fontWeight: 700, color: "#fff", margin: 0 },
  viewAll: { color: "#e8c97e", textDecoration: "none", fontSize: "0.9rem" },
  catGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" },
  catCard: { display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 1rem", borderRadius: "12px", border: "1px solid", background: "#1a1d27", textDecoration: "none", gap: "8px" },
  catIcon: { fontSize: "2rem" },
  catLabel: { fontWeight: 700, fontSize: "1rem" },
  catCount: { fontSize: "0.8rem", color: "#666" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" },
  loading: { color: "#666", textAlign: "center", padding: "2rem" },
  cta: { background: "linear-gradient(135deg, #1a2035, #0f1117)", padding: "5rem 2rem", textAlign: "center", borderTop: "1px solid #2a2d3a" },
  ctaTitle: { fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" },
  ctaText: { color: "#888", marginBottom: "2rem" },
  ctaBtn: { display: "inline-block", padding: "14px 32px", background: "#e8c97e", color: "#0f1117", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem" },
};