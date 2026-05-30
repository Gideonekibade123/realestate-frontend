import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { API } from "../api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(API.forgotPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // ✅ Handle Render cold start returning HTML instead of JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server is waking up, please wait 30 seconds and try again.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Something went wrong");

      setSuccess(data.message || "If this email exists, a reset link has been sent.");
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Forgot Password</h1>
        <p style={styles.sub}>Enter your email and we'll send you a reset link</p>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p style={styles.footer}>
          Remember your password? <Link to="/login" style={styles.link}>Sign in</Link>
        </p>
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
  footer: { textAlign: "center", marginTop: "1.5rem", color: "#666", fontSize: "0.9rem" },
  link: { color: "#e8c97e", textDecoration: "none" },
};