import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API } from "../api";
import { authFetch } from "../authFetch";

export default function ListingFormPage() {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "", description: "", price: "",
    category: "sale", location: "", phone: "",
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      fetch(API.listingDetail(id))
        .then((r) => r.json())
        .then((data) => {
          setForm({
            title: data.title, description: data.description,
            price: data.price, category: data.category,
            location: data.location, phone: data.phone,
          });
          setExistingImages(data.images || []);
        });
    }
  }, [id, isEdit]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setNewImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const url = isEdit ? API.listingDetail(id) : API.listings;
      const method = isEdit ? "PUT" : "POST";

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      newImages.forEach((file) => formData.append("images", file));

      const res = await authFetch(url, {
        method,
        body: formData,
      }, auth);
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      navigate(`/listings/${data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [form, newImages, auth, id, isEdit, navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>{isEdit ? "Edit Listing" : "Add New Listing"}</h1>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Title *</label>
              <input style={styles.input} placeholder="e.g. 3 Bedroom Duplex"
                value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Category *</label>
              <select style={styles.input} value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
                <option value="buy">Buy</option>
                <option value="lease">Lease</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Price (₦) *</label>
              <input style={styles.input} type="number" placeholder="e.g. 5000000"
                value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Phone *</label>
              <input style={styles.input} placeholder="e.g. +2348012345678"
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </div>
            <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Location *</label>
              <input style={styles.input} placeholder="e.g. Lekki Phase 1, Lagos"
                value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            </div>
            <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Description *</label>
              <textarea style={{ ...styles.input, height: "140px", resize: "vertical" }}
                placeholder="Describe the property..."
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </div>
            <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Property Images</label>
              <input
                style={styles.input}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              {isEdit && existingImages.length > 0 && (
                <div style={styles.imageRow}>
                  {existingImages.map((img) => (
                    <img key={img.id} src={API.mediaURL(img.image)} alt="" style={styles.thumb} />
                  ))}
                </div>
              )}
              {previews.length > 0 && (
                <div style={styles.imageRow}>
                  {previews.map((src, i) => (
                    <img key={i} src={src} alt="" style={styles.thumb} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div style={styles.actions}>
            <button type="button" onClick={() => navigate(-1)} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Listing" : "Publish Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#0f1117", minHeight: "100vh", paddingTop: "2rem" },
  container: { maxWidth: "800px", margin: "0 auto", padding: "0 2rem 4rem" },
  heading: { fontSize: "1.8rem", fontWeight: 700, color: "#fff", marginBottom: "2rem" },
  error: { background: "rgba(224,82,82,0.1)", border: "1px solid #e05252", color: "#e05252", padding: "12px 16px", borderRadius: "8px", marginBottom: "1.5rem" },
  form: {},
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "0.8rem", color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" },
  input: { padding: "12px 16px", borderRadius: "8px", border: "1px solid #2a2d3a", background: "#1a1d27", color: "#fff", fontSize: "0.95rem", outline: "none", width: "100%" },
  imageRow: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" },
  thumb: { width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid #2a2d3a" },
  actions: { display: "flex", gap: "12px", marginTop: "2rem", justifyContent: "flex-end" },
  cancelBtn: { padding: "12px 24px", background: "transparent", border: "1px solid #2a2d3a", color: "#ccc", borderRadius: "8px", cursor: "pointer", fontWeight: 600 },
  submitBtn: { padding: "12px 32px", background: "#e8c97e", color: "#0f1117", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "1rem" },
};