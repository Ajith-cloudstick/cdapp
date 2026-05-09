import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { listPromo } from "../utils/api";
import { C, F } from "../utils/tokens";

const PAGE_SIZE = 50;

function fmtDate(s) {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminUsers() {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const load = useCallback(async (p) => {
    setLoading(true);
    setErr("");
    try {
      const data = await listPromo({ page: p, page_size: PAGE_SIZE });
      setUsers(Array.isArray(data?.users) ? data.users : []);
      setTotal(typeof data?.total === "number" ? data.total : 0);
    } catch (e) {
      setErr(e.message || "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(page); }, [load, page]);

  const logout = () => {
    sessionStorage.removeItem("caw_admin_auth");
    localStorage.removeItem("caw_admin_auth");
    nav("/admi/coffe/true", { replace: true });
  };

  const startIdx = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endIdx = Math.min(page * PAGE_SIZE, total);

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      fontFamily: F,
      padding: "24px 20px 60px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text }}>
              Users
            </h1>
            <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>
              {loading ? "Loading…" : `${total} total · showing ${startIdx}–${endIdx}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => load(page)} style={btnGhost} disabled={loading}>
              Refresh
            </button>
            <button onClick={logout} style={btnGhost}>Logout</button>
          </div>
        </div>

        {err && (
          <div style={{
            background: "#FDECEC",
            color: C.red,
            border: `1px solid ${C.red}33`,
            padding: "10px 14px",
            borderRadius: 10,
            fontSize: 14,
            marginBottom: 16,
          }}>{err}</div>
        )}

        {/* Table */}
        <div style={{
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
              minWidth: 900,
            }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  <th style={th}>ID</th>
                  <th style={th}>Name</th>
                  <th style={th}>Email</th>
                  <th style={th}>Company</th>
                  <th style={th}>Phone</th>
                  <th style={th}>Referral ID</th>
                  <th style={th}>Referrals</th>
                  <th style={th}>Created</th>
                </tr>
              </thead>
              <tbody>
                {!loading && users.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{
                      padding: 32,
                      textAlign: "center",
                      color: C.muted,
                    }}>
                      No users found
                    </td>
                  </tr>
                )}
                {users.map((u) => (
                  <tr key={u.id} style={{ borderTop: `1px solid ${C.border}` }}>
                    <td style={td}>#{u.id}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{u.name || "—"}</td>
                    <td style={td}>{u.email || "—"}</td>
                    <td style={td}>{u.company || "—"}</td>
                    <td style={td}>{u.phone_number || "—"}</td>
                    <td style={td}>
                      {u.referral_id ? (
                        <code style={{
                          background: C.bg,
                          padding: "2px 8px",
                          borderRadius: 6,
                          fontSize: 12.5,
                        }}>{u.referral_id}</code>
                      ) : "—"}
                    </td>
                    <td style={td}>
                      <span style={{
                        display: "inline-block",
                        minWidth: 28,
                        textAlign: "center",
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: (u.referral_count ?? 0) > 0 ? "#E8F0E5" : C.bg,
                        color: (u.referral_count ?? 0) > 0 ? "#2E5D24" : C.muted,
                        fontWeight: 600,
                        fontSize: 12.5,
                      }}>{u.referral_count ?? 0}</span>
                    </td>
                    <td style={{ ...td, color: C.muted, whiteSpace: "nowrap" }}>
                      {fmtDate(u.created_at)}
                    </td>
                  </tr>
                ))}
                {loading && users.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{
                      padding: 32,
                      textAlign: "center",
                      color: C.muted,
                    }}>Loading users…</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 16,
          gap: 12,
          flexWrap: "wrap",
        }}>
          <div style={{ fontSize: 13, color: C.muted }}>
            Page {page} of {totalPages}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setPage(1)}
              disabled={loading || page <= 1}
              style={pgBtn(page <= 1)}
            >« First</button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={loading || page <= 1}
              style={pgBtn(page <= 1)}
            >‹ Prev</button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={loading || page >= totalPages}
              style={pgBtn(page >= totalPages)}
            >Next ›</button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={loading || page >= totalPages}
              style={pgBtn(page >= totalPages)}
            >Last »</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "12px 14px",
  fontSize: 12,
  fontWeight: 700,
  color: C.muted,
  textTransform: "uppercase",
  letterSpacing: 0.4,
  whiteSpace: "nowrap",
};

const td = {
  padding: "12px 14px",
  color: C.text,
  verticalAlign: "middle",
};

const btnGhost = {
  padding: "8px 14px",
  fontSize: 13,
  fontWeight: 600,
  background: C.white,
  color: C.text,
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  cursor: "pointer",
  fontFamily: F,
};

const pgBtn = (disabled) => ({
  padding: "8px 12px",
  fontSize: 13,
  fontWeight: 600,
  background: C.white,
  color: disabled ? C.muted : C.text,
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.6 : 1,
  fontFamily: F,
});
