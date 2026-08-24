import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API } from "../api";
import { authFetch } from "../authFetch";

export default function ChangePasswordPage() {
  const auth = useAuth();
  const { logout } = auth;
  const navigate = useNavigate();
  const [form, setForm] = useState({ old_password: "", new_password: "", confirm_password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.new_password !== form.confirm_password) {
      setError("New passwords do not match");
      return;
    }

    if (form.new_password.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await authFetch(`${API.changePassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          old_password: form.old_password,
          new_password: form.new_password,
        }),
      }, auth);

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Failed to change password");

      setSuccess("Password changed successfully! Please log in again.");
      setForm({ old_password: "", new_password: "", confirm_password: "" });

      // Log out after password change for security
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [form, auth, logout, navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Change Password</h1>
        <p style={styles.sub}>Update your EstateHub account password</p>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Current Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Your current password"
            value={form.old_password}
            onChange={(e) => setForm({ ...form, old_password: e.target.value })}
            required
          />

          <label style={styles.label}>New Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="New password (min 8 characters)"
            value={form.new_password}
            onChange={(e) => setForm({ ...form, new_password: e.target.value })}
            required
          />

          <label style={styles.label}>Confirm New Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Confirm new password"
            value={form.confirm_password}
            onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
            required
          />

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>

          <button
            type="button"
            style={styles.cancelBtn}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#0f1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" },
  card: { background: "#1a1d27", borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "420px", border: "1px solid #2a2d3a" },
  heading: { fontSize: "1.8rem", fontWeight: 700, color: "#fff", margin: "0 0 6px" },
  sub: { color: "#666", marginBottom: "1.5rem" },
  error: { background: "rgba(224,82,82,0.1)", border: "1px solid #e05252", color: "#e05252", padding: "10px 14px", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.9rem" },
  success: { background: "rgba(76,175,130,0.1)", border: "1px solid #4caf82", color: "#4caf82", padding: "10px 14px", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.9rem" },
  form: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "0.8rem", color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "8px" },
  input: { padding: "12px 16px", borderRadius: "8px", border: "1px solid #2a2d3a", background: "#0f1117", color: "#fff", fontSize: "0.95rem", outline: "none" },
  btn: { marginTop: "1rem", padding: "14px", background: "#e8c97e", color: "#0f1117", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "1rem", cursor: "pointer" },
  cancelBtn: { marginTop: "0.5rem", padding: "14px", background: "transparent", color: "#888", border: "1px solid #2a2d3a", borderRadius: "8px", fontWeight: 600, fontSize: "1rem", cursor: "pointer" },
};