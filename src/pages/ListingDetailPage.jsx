import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../api";
import { useAuth } from "../context/AuthContext";

const CATEGORY_COLORS = {
  sale: "#4caf82", rent: "#5b9bd5", buy: "#e8c97e", lease: "#c97eb0",
};

export default function ListingDetailPage() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // --- Chat state ---
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch(API.listingDetail(id))
      .then((r) => r.json())
      .then((data) => { setListing(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  // Fetch messages when chat opens, then poll every 4s
  useEffect(() => {
    if (!chatOpen) return;
    const fetchMessages = () => {
      fetch(`${API.listingDetail(id)}messages/`, {
        headers: { Authorization: `Token ${token}` },
      })
        .then((r) => r.json())
        .then((data) => setMessages(Array.isArray(data) ? data : []))
        .catch(() => {});
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, [chatOpen, id, token]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`${API.listingDetail(id)}messages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ content: newMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch {
      // silently ignore for now
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this listing?")) return;
    setDeleting(true);
    await fetch(API.listingDetail(id), {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    });
    navigate("/listings");
  };

  if (loading) return <div style={styles.center}><p style={{ color: "#666" }}>Loading...</p></div>;
  if (!listing) return <div style={styles.center}><p style={{ color: "#666" }}>Listing not found</p></div>;

  const images = listing.images || [];
  const isOwner = user && user.username === listing.owner;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <Link to="/listings" style={styles.back}>← Back to Listings</Link>
        <div style={styles.layout}>
          <div style={styles.imageSection}>
            <div style={styles.mainImgWrapper}>
              {images.length > 0 ? (
                <img src={API.mediaURL(images[activeImg]?.image)} alt={listing.title} style={styles.mainImg} />
              ) : (
                <div style={styles.noImg}>🏠</div>
              )}
              <span style={{ ...styles.badge, background: CATEGORY_COLORS[listing.category] || "#888" }}>
                {listing.category?.toUpperCase()}
              </span>
              {listing.is_sold && <span style={styles.soldBadge}>SOLD</span>}
            </div>
            {images.length > 1 && (
              <div style={styles.thumbRow}>
                {images.map((img, i) => (
                  <img key={img.id} src={API.mediaURL(img.image)} alt=""
                    style={{ ...styles.thumb, ...(i === activeImg ? styles.thumbActive : {}) }}
                    onClick={() => setActiveImg(i)} />
                ))}
              </div>
            )}
          </div>

          <div style={styles.details}>
            <h1 style={styles.title}>{listing.title}</h1>
            <p style={styles.price}>₦{parseFloat(listing.price).toLocaleString()}</p>
            <p style={styles.location}>📍 {listing.location}</p>
            <div style={styles.divider} />
            <p style={styles.label}>Description</p>
            <p style={styles.description}>{listing.description}</p>
            <div style={styles.divider} />
            <div style={styles.metaRow}>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Seller</span>
                <span style={styles.metaValue}>👤 {listing.seller_name}</span>
              </div>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Phone</span>
                <a href={`tel:${listing.phone}`} style={styles.phone}>📞 {listing.phone}</a>
              </div>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Listed</span>
                <span style={styles.metaValue}>{new Date(listing.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div style={styles.divider} />
            <a href={`tel:${listing.phone}`} style={styles.contactBtn}>📞 Contact Seller</a>

            {!isOwner && user && (
              <button onClick={() => setChatOpen(true)} style={styles.chatBtn}>
                💬 Chat with Seller
              </button>
            )}

            {isOwner && (
              <div style={styles.ownerActions}>
                <Link to={`/listings/${id}/edit`} style={styles.editBtn}>Edit Listing</Link>
                <button onClick={handleDelete} disabled={deleting} style={styles.deleteBtn}>
                  {deleting ? "Deleting..." : "Delete Listing"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Chat Modal --- */}
      {chatOpen && (
        <div style={styles.modalOverlay} onClick={() => setChatOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <span>Chat with {listing.seller_name}</span>
              <button onClick={() => setChatOpen(false)} style={styles.closeBtn}>✕</button>
            </div>
            <div style={styles.messageList}>
              {messages.length === 0 && (
                <p style={{ color: "#666", textAlign: "center" }}>No messages yet. Say hello!</p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    ...styles.messageBubble,
                    ...(msg.sender_name === user.username ? styles.myMessage : styles.theirMessage),
                  }}
                >
                  <p style={{ margin: 0 }}>{msg.content}</p>
                  <span style={styles.msgTime}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} style={styles.chatInputRow}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                style={styles.chatInput}
              />
              <button type="submit" disabled={sending} style={styles.sendBtn}>
                {sending ? "..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { background: "#0f1117", minHeight: "100vh", paddingTop: "2rem" },
  container: { maxWidth: "1100px", margin: "0 auto", padding: "0 2rem 4rem" },
  center: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" },
  back: { color: "#e8c97e", textDecoration: "none", fontSize: "0.9rem", display: "inline-block", marginBottom: "1.5rem" },
  layout: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" },
  imageSection: {},
  mainImgWrapper: { position: "relative", borderRadius: "12px", overflow: "hidden", height: "380px", background: "#1a1d27" },
  mainImg: { width: "100%", height: "100%", objectFit: "cover" },
  noImg: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" },
  badge: { position: "absolute", top: "12px", left: "12px", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, color: "#0f1117" },
  soldBadge: { position: "absolute", top: "12px", right: "12px", background: "#e05252", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, color: "#fff" },
  thumbRow: { display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" },
  thumb: { width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px", cursor: "pointer", border: "2px solid transparent", opacity: 0.7 },
  thumbActive: { border: "2px solid #e8c97e", opacity: 1 },
  details: { display: "flex", flexDirection: "column" },
  title: { fontSize: "1.8rem", fontWeight: 700, color: "#fff", margin: "0 0 8px" },
  price: { fontSize: "2rem", fontWeight: 800, color: "#e8c97e", margin: "0 0 8px" },
  location: { color: "#888", margin: "0 0 16px" },
  divider: { height: "1px", background: "#2a2d3a", margin: "1rem 0" },
  label: { fontSize: "0.8rem", fontWeight: 600, color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" },
  description: { color: "#bbb", lineHeight: 1.7, margin: 0 },
  metaRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" },
  metaItem: { display: "flex", flexDirection: "column", gap: "4px" },
  metaLabel: { fontSize: "0.75rem", color: "#555", textTransform: "uppercase" },
  metaValue: { color: "#ccc", fontSize: "0.9rem" },
  phone: { color: "#4caf82", fontSize: "0.9rem", textDecoration: "none" },
  contactBtn: { display: "block", textAlign: "center", padding: "14px", background: "#e8c97e", color: "#0f1117", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", marginTop: "1rem" },
  chatBtn: { display: "block", width: "100%", textAlign: "center", padding: "14px", background: "#1a1d27", color: "#e8c97e", border: "1px solid #e8c97e", borderRadius: "8px", fontWeight: 700, fontSize: "1rem", marginTop: "0.75rem", cursor: "pointer" },
  ownerActions: { display: "flex", gap: "12px", marginTop: "12px" },
  editBtn: { flex: 1, textAlign: "center", padding: "12px", background: "#1a1d27", color: "#fff", borderRadius: "8px", border: "1px solid #2a2d3a", textDecoration: "none", fontWeight: 600 },
  deleteBtn: { flex: 1, padding: "12px", background: "transparent", color: "#e05252", borderRadius: "8px", border: "1px solid #e05252", cursor: "pointer", fontWeight: 600 },

  // Chat modal styles
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#1a1d27", width: "420px", maxWidth: "90vw", height: "560px", borderRadius: "12px", display: "flex", flexDirection: "column", overflow: "hidden" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid #2a2d3a", color: "#fff", fontWeight: 700 },
  closeBtn: { background: "none", border: "none", color: "#888", fontSize: "1.2rem", cursor: "pointer" },
  messageList: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" },
  messageBubble: { maxWidth: "75%", padding: "10px 14px", borderRadius: "12px", fontSize: "0.9rem" },
  myMessage: { alignSelf: "flex-end", background: "#e8c97e", color: "#0f1117" },
  theirMessage: { alignSelf: "flex-start", background: "#2a2d3a", color: "#fff" },
  msgTime: { display: "block", fontSize: "0.7rem", opacity: 0.6, marginTop: "4px" },
  chatInputRow: { display: "flex", gap: "8px", padding: "12px", borderTop: "1px solid #2a2d3a" },
  chatInput: { flex: 1, padding: "10px 12px", borderRadius: "8px", border: "1px solid #2a2d3a", background: "#0f1117", color: "#fff" },
  sendBtn: { padding: "10px 16px", borderRadius: "8px", border: "none", background: "#e8c97e", color: "#0f1117", fontWeight: 700, cursor: "pointer" },
};