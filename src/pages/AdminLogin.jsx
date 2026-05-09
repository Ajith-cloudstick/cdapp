import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";

const ADMIN_EMAIL = "ajith@cloudstick.io";
const ADMIN_PASSWORD = "noicebudvs102";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErr("Email and password are required");
      return;
    }
    const emailNorm = email.trim().toLowerCase();
    if (emailNorm !== ADMIN_EMAIL.toLowerCase() || password !== ADMIN_PASSWORD) {
      setErr("Invalid email or password");
      return;
    }
    sessionStorage.setItem("caw_admin_auth", "1");
    localStorage.setItem("caw_admin_auth", "1");
    nav("/admi/coffe/true/users", { replace: true });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      fontFamily: F,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}>
      <form
        onSubmit={submit}
        style={{
          width: "100%",
          maxWidth: 400,
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        }}
      >
        <h1 style={{
          fontSize: 24,
          fontWeight: 800,
          color: C.text,
          marginBottom: 6,
        }}>Admin Login</h1>
        <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>
          Coffee After Work — Admin
        </p>

        <label style={lbl}>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErr(""); }}
          placeholder="admin@example.com"
          style={inp}
          autoFocus
        />

        <label style={lbl}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setErr(""); }}
          placeholder="••••••••"
          style={inp}
        />

        {err && (
          <div style={{
            color: C.red,
            fontSize: 13,
            marginTop: 4,
            marginBottom: 12,
          }}>{err}</div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px 16px",
            background: C.red,
            color: C.white,
            fontSize: 15,
            fontWeight: 700,
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

const lbl = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: C.text,
  marginBottom: 6,
  marginTop: 12,
};

const inp = {
  width: "100%",
  padding: "12px 14px",
  fontSize: 15,
  border: `1px solid ${C.border}`,
  borderRadius: 10,
  background: C.bg,
  color: C.text,
  outline: "none",
  fontFamily: F,
};
