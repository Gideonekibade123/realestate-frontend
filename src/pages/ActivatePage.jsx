import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "../api";

export default function ActivatePage() {
  const { uidb64, token } = useParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(API.activateAccount(uidb64, token))
      .then(async (r) => {
        const data = await r.json();
        if (r.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
        setMessage(data.detail);
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      });
  }, [uidb64, token]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {status === "loading" && (
          <>
            <p style={styles.icon}>⏳</p>
            <h1 style={styles.heading}>Activating your account...</h1>
          </>
        )}
        {status === "success" && (
          <>
            <p style={styles.icon}>✅</p>
            <h1 style={styles.heading}>Account Activated!</h1>
            <p style={styles.message}>{message}</p>
            <Link to="/login" style={styles.btn}>Sign In Now</Link>
          </>
        )}
        {status === "error" && (
          <>
            <p style={styles.icon}>❌</p>
            <h1 style={styles.heading}>Activation Failed</h1>
            <p style={styles.message}>{message}</p>
            <Link to="/register" style={styles.btn}>Register Again</Link>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#0f1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" },
  card: { background: "#1a1d27", borderRadius: "16px", padding: "3rem", width: "100%", maxWidth: "420px", border: "1px solid #2a2d3a", textAlign: "center" },
  icon: { fontSize: "3rem", marginBottom: "1rem" },
  heading: { fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" },
  message: { color: "#888", marginBottom: "2rem", lineHeight: 1.6 },
  btn: { display: "inline-block", padding: "12px 32px", background: "#e8c97e", color: "#0f1117", borderRadius: "8px", textDecoration: "none", fontWeight: 700 },
};