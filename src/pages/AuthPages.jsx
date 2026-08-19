// // import { useState, useCallback } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import { API } from "../api";

// // export function LoginPage() {
// //   const { login } = useAuth();
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = useCallback(async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const res = await fetch(API.login, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(form),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.detail || "Invalid credentials");
// //       login({ username: data.user.username, email: data.user.email }, data.access);
// //       navigate("/dashboard");
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [form, login, navigate]);

// //   return (
// //     <div style={styles.page}>
// //       <div style={styles.card}>
// //         <h1 style={styles.heading}>Welcome Back</h1>
// //         <p style={styles.sub}>Sign in to your EstateHub account</p>
// //         {error && <div style={styles.error}>{error}</div>}
// //         <form onSubmit={handleSubmit} style={styles.form}>
// //           <label style={styles.label}>Email</label>
// //           <input style={styles.input} type="email" placeholder="Your email"
// //             value={form.email}
// //             onChange={(e) => setForm({ ...form, email: e.target.value })} required />
// //           <label style={styles.label}>Password</label>
// //           <input style={styles.input} type="password" placeholder="Your password"
// //             value={form.password}
// //             onChange={(e) => setForm({ ...form, password: e.target.value })} required />
// //           <div style={{ textAlign: "right", marginTop: "4px" }}>
// //             <Link to="/forgot-password" style={styles.forgotLink}>Forgot Password?</Link>
// //           </div>
// //           <button type="submit" style={styles.btn} disabled={loading}>
// //             {loading ? "Signing in..." : "Sign In"}
// //           </button>
// //         </form>
// //         <p style={styles.footer}>
// //           Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export function RegisterPage() {
// //   const { login } = useAuth();
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = useCallback(async (e) => {
// //     e.preventDefault();
// //     if (form.password !== form.password2) {
// //       setError("Passwords do not match");
// //       return;
// //     }
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const res = await fetch(API.register, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           username: form.username,
// //           email: form.email,
// //           password: form.password,
// //         }),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(JSON.stringify(data));
// //       login({ username: data.user.username, email: data.user.email }, data.access);
// //       navigate("/dashboard");
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [form, login, navigate]);

// //   return (
// //     <div style={styles.page}>
// //       <div style={styles.card}>
// //         <h1 style={styles.heading}>Create Account</h1>
// //         <p style={styles.sub}>Join EstateHub today — it's free</p>
// //         {error && <div style={styles.error}>{error}</div>}
// //         <form onSubmit={handleSubmit} style={styles.form}>
// //           <label style={styles.label}>Username</label>
// //           <input style={styles.input} placeholder="Choose a username" value={form.username}
// //             onChange={(e) => setForm({ ...form, username: e.target.value })} required />
// //           <label style={styles.label}>Email</label>
// //           <input style={styles.input} type="email" placeholder="Your email" value={form.email}
// //             onChange={(e) => setForm({ ...form, email: e.target.value })} required />
// //           <label style={styles.label}>Password</label>
// //           <input style={styles.input} type="password" placeholder="Create a password" value={form.password}
// //             onChange={(e) => setForm({ ...form, password: e.target.value })} required />
// //           <label style={styles.label}>Confirm Password</label>
// //           <input style={styles.input} type="password" placeholder="Confirm password" value={form.password2}
// //             onChange={(e) => setForm({ ...form, password2: e.target.value })} required />
// //           <button type="submit" style={styles.btn} disabled={loading}>
// //             {loading ? "Creating account..." : "Create Account"}
// //           </button>
// //         </form>
// //         <p style={styles.footer}>
// //           Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   page: { background: "#0f1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" },
// //   card: { background: "#1a1d27", borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "420px", border: "1px solid #2a2d3a" },
// //   heading: { fontSize: "1.8rem", fontWeight: 700, color: "#fff", margin: "0 0 6px" },
// //   sub: { color: "#666", marginBottom: "1.5rem" },
// //   error: { background: "rgba(224,82,82,0.1)", border: "1px solid #e05252", color: "#e05252", padding: "10px 14px", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.9rem" },
// //   form: { display: "flex", flexDirection: "column", gap: "6px" },
// //   label: { fontSize: "0.8rem", color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "8px" },
// //   input: { padding: "12px 16px", borderRadius: "8px", border: "1px solid #2a2d3a", background: "#0f1117", color: "#fff", fontSize: "0.95rem", outline: "none" },
// //   btn: { marginTop: "1rem", padding: "14px", background: "#e8c97e", color: "#0f1117", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "1rem", cursor: "pointer" },
// //   footer: { textAlign: "center", marginTop: "1.5rem", color: "#666", fontSize: "0.9rem" },
// //   link: { color: "#e8c97e", textDecoration: "none" },
// //   forgotLink: { color: "#e8c97e", fontSize: "0.85rem", textDecoration: "none" },
// // };

// import { useState, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { API } from "../api";

// export function RegisterPage() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [registered, setRegistered] = useState(false);

//   const handleSubmit = useCallback(async (e) => {
//     e.preventDefault();
//     if (form.password !== form.password2) {
//       setError("Passwords do not match");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(API.register, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: form.username,
//           email: form.email,
//           password: form.password,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(JSON.stringify(data));
//       setRegistered(true);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [form]);

//   if (registered) {
//     return (
//       <div style={styles.page}>
//         <div style={styles.card}>
//           <h1 style={styles.heading}>Check Your Email</h1>
//           <p style={styles.sub}>
//             We've sent a verification link to <strong>{form.email}</strong>.
//             Click the link in that email to activate your account before signing in.
//           </p>
//           <Link to="/login" style={styles.link}>Back to Sign In</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h1 style={styles.heading}>Create Account</h1>
//         <p style={styles.sub}>Join EstateHub today — it's free</p>
//         {error && <div style={styles.error}>{error}</div>}
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <label style={styles.label}>Username</label>
//           <input style={styles.input} placeholder="Choose a username" value={form.username}
//             onChange={(e) => setForm({ ...form, username: e.target.value })} required />
//           <label style={styles.label}>Email</label>
//           <input style={styles.input} type="email" placeholder="Your email" value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })} required />
//           <label style={styles.label}>Password</label>
//           <input style={styles.input} type="password" placeholder="Create a password" value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })} required />
//           <label style={styles.label}>Confirm Password</label>
//           <input style={styles.input} type="password" placeholder="Confirm password" value={form.password2}
//             onChange={(e) => setForm({ ...form, password2: e.target.value })} required />
//           <button type="submit" style={styles.btn} disabled={loading}>
//             {loading ? "Creating account..." : "Create Account"}
//           </button>
//         </form>
//         <p style={styles.footer}>
//           Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
//         </p>
//       </div>
//     </div>
//   );
// }





import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API } from "../api";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Invalid credentials");
      login({ username: data.user.username, email: data.user.email }, data.access);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [form, login, navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome Back</h1>
        <p style={styles.sub}>Sign in to your EstateHub account</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} type="email" placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" placeholder="Your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <div style={{ textAlign: "right", marginTop: "4px" }}>
            <Link to="/forgot-password" style={styles.forgotLink}>Forgot Password?</Link>
          </div>
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p style={styles.footer}>
          Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));
      setRegistered(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [form]);

  if (registered) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Check Your Email</h1>
          <p style={styles.sub}>
            We've sent a verification link to <strong>{form.email}</strong>.
            Click the link in that email to activate your account before signing in.
          </p>
          <Link to="/login" style={styles.link}>Back to Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Create Account</h1>
        <p style={styles.sub}>Join EstateHub today — it's free</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Username</label>
          <input style={styles.input} placeholder="Choose a username" value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <label style={styles.label}>Email</label>
          <input style={styles.input} type="email" placeholder="Your email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" placeholder="Create a password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <label style={styles.label}>Confirm Password</label>
          <input style={styles.input} type="password" placeholder="Confirm password" value={form.password2}
            onChange={(e) => setForm({ ...form, password2: e.target.value })} required />
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
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
  form: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "0.8rem", color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "8px" },
  input: { padding: "12px 16px", borderRadius: "8px", border: "1px solid #2a2d3a", background: "#0f1117", color: "#fff", fontSize: "0.95rem", outline: "none" },
  btn: { marginTop: "1rem", padding: "14px", background: "#e8c97e", color: "#0f1117", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "1rem", cursor: "pointer" },
  footer: { textAlign: "center", marginTop: "1.5rem", color: "#666", fontSize: "0.9rem" },
  link: { color: "#e8c97e", textDecoration: "none" },
  forgotLink: { color: "#e8c97e", fontSize: "0.85rem", textDecoration: "none" },
};