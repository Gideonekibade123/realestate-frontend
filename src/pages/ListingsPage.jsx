import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { API } from "../api";

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    setLoading(true);
    fetch(API.listings)
      .then((r) => r.json())
      .then((data) => { setListings(Array.isArray(data) ? data : data.results || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = listings.filter((l) => {
    const matchSearch = !search ||
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || l.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.filterBar}>
          <h1 style={styles.heading}>
            {category ? category.charAt(0).toUpperCase() + category.slice(1) + " Properties" : "All Listings"}
            <span style={styles.count}> ({filtered.length})</span>
          </h1>
          <div style={styles.filters}>
            <input
              style={styles.input}
              placeholder="Search location or title..."
              value={search}
              onChange={(e) => setSearchParams({ search: e.target.value, category })}
            />
            <select
              style={styles.select}
              value={category}
              onChange={(e) => setSearchParams({ search, category: e.target.value })}
            >
              <option value="">All Categories</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="buy">Buy</option>
              <option value="lease">Lease</option>
            </select>
            {(search || category) && (
              <button style={styles.clearBtn} onClick={() => setSearchParams({})}>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div style={styles.loading}>
            <p>Loading properties...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: "3rem" }}>🏚️</p>
            <p>No properties found</p>
            <button style={styles.clearBtn} onClick={() => setSearchParams({})}>Clear Filters</button>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#0f1117", minHeight: "100vh", paddingTop: "2rem" },
  container: { maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 4rem" },
  filterBar: { marginBottom: "2rem" },
  heading: { fontSize: "1.8rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" },
  count: { color: "#e8c97e", fontSize: "1.2rem" },
  filters: { display: "flex", gap: "12px", flexWrap: "wrap" },
  input: {
    flex: 1, minWidth: "200px", padding: "10px 16px",
    borderRadius: "8px", border: "1px solid #2a2d3a",
    background: "#1a1d27", color: "#fff", outline: "none",
  },
  select: {
    padding: "10px 16px", borderRadius: "8px",
    border: "1px solid #2a2d3a", background: "#1a1d27",
    color: "#fff", outline: "none",
  },
  clearBtn: {
    padding: "10px 16px", borderRadius: "8px",
    border: "1px solid #555", background: "transparent",
    color: "#ccc", cursor: "pointer",
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" },
  loading: { textAlign: "center", padding: "4rem", color: "#666" },
  empty: { textAlign: "center", padding: "4rem", color: "#666" },
};