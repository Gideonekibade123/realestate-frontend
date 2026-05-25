import { Link } from "react-router-dom";
import { API } from "../api";

const CATEGORY_COLORS = {
  sale: "#4caf82", rent: "#5b9bd5", buy: "#e8c97e", lease: "#c97eb0",
};

export default function ListingCard({ listing }) {
  const firstImage = listing.images?.[0]?.image
    ? API.mediaURL(listing.images[0].image)
    : null;

  return (
    <Link to={`/listings/${listing.id}`} style={styles.card}>
      <div style={styles.imgWrapper}>
        {firstImage ? (
          <img src={firstImage} alt={listing.title} style={styles.img} />
        ) : (
          <div style={styles.noImg}>🏠</div>
        )}
        <span style={{ ...styles.badge, background: CATEGORY_COLORS[listing.category] || "#888" }}>
          {listing.category?.toUpperCase()}
        </span>
        {listing.is_sold && <span style={styles.soldBadge}>SOLD</span>}
      </div>
      <div style={styles.body}>
        <h3 style={styles.title}>{listing.title}</h3>
        <p style={styles.location}>📍 {listing.location}</p>
        <p style={styles.price}>₦{parseFloat(listing.price).toLocaleString()}</p>
        <div style={styles.footer}>
          <span style={styles.owner}>👤 {listing.seller_name}</span>
          <span style={styles.date}>{new Date(listing.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    background: "#1a1d27", borderRadius: "12px", overflow: "hidden",
    textDecoration: "none", color: "inherit",
    border: "1px solid #2a2d3a", display: "block",
  },
  imgWrapper: { position: "relative", height: "200px", background: "#111" },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  noImg: {
    width: "100%", height: "100%", display: "flex",
    alignItems: "center", justifyContent: "center",
    fontSize: "3rem", background: "#0f1117",
  },
  badge: {
    position: "absolute", top: "12px", left: "12px",
    padding: "3px 10px", borderRadius: "20px", fontSize: "11px",
    fontWeight: 700, color: "#0f1117",
  },
  soldBadge: {
    position: "absolute", top: "12px", right: "12px",
    background: "#e05252", padding: "3px 10px", borderRadius: "20px",
    fontSize: "11px", fontWeight: 700, color: "#fff",
  },
  body: { padding: "1rem" },
  title: { margin: "0 0 6px", fontSize: "1rem", fontWeight: 600, color: "#f0f0f0" },
  location: { margin: "0 0 8px", fontSize: "0.85rem", color: "#888" },
  price: { margin: "0 0 12px", fontSize: "1.2rem", fontWeight: 700, color: "#e8c97e" },
  footer: { display: "flex", justifyContent: "space-between" },
  owner: { fontSize: "0.8rem", color: "#666" },
  date: { fontSize: "0.8rem", color: "#555" },
};