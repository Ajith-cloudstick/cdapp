import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { Page, PrimaryBtn, BackBtn, RedLine, IconBadge } from "../components/ui";

const FEATURES = [
  {
    icon: "people",
    title: "Curated matches",
    desc: "We match you with people who align with your lifestyle and values — not just proximity.",
  },
  {
    icon: "calendar",
    title: "Real-life meetups",
    desc: "No endless chatting. Just coffee, connection, and good conversation in the real world.",
  },
  {
    icon: "shield",
    title: "Safe & intentional",
    desc: "We prioritize safety, respect, and meaningful intentions at every step.",
  },
];

function FeatureIcon({ name }) {
  if (name === "people")
    return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  if (name === "calendar")
    return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}

export default function Why() {
  const navigate = useNavigate();

  return (
    <Page
      header={<div style={{ paddingBottom: 16 }}><BackBtn onClick={() => navigate(-1)} /></div>}
      action={<PrimaryBtn onClick={() => navigate("/how")}>Continue →</PrimaryBtn>}
    >
      <div style={{ padding: "clamp(24px, 4vw, 64px) 0 clamp(32px, 5vw, 80px)" }}>

        {/* Heading */}
        <h2 style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 800, color: C.text, letterSpacing: "-.035em", lineHeight: 1.05, marginBottom: 6, animation: "fadeUp .4s ease both" }}>
          Why coffee<br />after <span style={{ color: C.red }}>work?</span>
        </h2>
        <RedLine />
        <p style={{ fontSize: "clamp(14px, 1.2vw, 18px)", color: "rgba(27,23,23,.65)", lineHeight: 1.75, marginBottom: "clamp(32px, 5vw, 64px)", maxWidth: 640, animation: "fadeUp .4s ease .06s both" }}>
          We believe real connections happen in real life. Coffee after work is for busy professionals who want to meet someone meaningful — over coffee, after work.
        </p>

        {/* Feature grid — 1 col mobile, 3 col desktop */}
        <div className="feat-grid">
          {FEATURES.map((feat, i) => (
            <div
              key={i}
              style={{
                background: C.card,
                borderRadius: 20,
                padding: "clamp(20px, 3vw, 36px)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                animation: `fadeUp .4s ease ${.08 + i * .1}s both`,
                transition: "transform .2s cubic-bezier(.34,1.2,.64,1), box-shadow .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(154,0,2,.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(154,0,2,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FeatureIcon name={feat.icon} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: "clamp(15px, 1.3vw, 18px)", marginBottom: 6, color: C.text }}>{feat.title}</p>
                <p style={{ color: C.muted, fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.7 }}>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Page>
  );
}
