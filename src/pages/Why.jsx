import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { Page, PrimaryBtn, BackBtn, RedLine, IconBadge } from "../components/ui";

const FEATURES = [
  {
    icon: "people",
    title: "Curated matches",
    desc: "We match you with people who align with your lifestyle and values.",
  },
  {
    icon: "shield",
    title: "Zero fake profile",
    desc: "Every profile is verified to ensure you connect with real, genuine people.",
  },
  {
    icon: "hands-heart",
    title: "Safe & intentional",
    desc: "We prioritize safety, respect, and meaningful intentions.",
  },
];

function FeatureIcon({ name }) {
  if (name === "people")
    return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  if (name === "shield")
    return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C10.343 2 9 3.343 9 5c0 2.5 3 5.5 3 5.5S15 7.5 15 5c0-1.657-1.343-3-3-3z"/>
      <path d="M5 13H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2"/>
      <path d="M19 13h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2"/>
      <path d="M5 14l2-1h4l4 1 4 1v3l-4 1H9l-4-1v-3z"/>
    </svg>
  );
}

export default function Why() {
  const navigate = useNavigate();

  return (
    <Page
      header={<div style={{ paddingBottom: 16 }}><BackBtn onClick={() => navigate(-1)} /></div>}
      action={<PrimaryBtn onClick={() => navigate("/how")}>Okay, got it</PrimaryBtn>}
    >
      <div style={{ padding: "clamp(24px, 4vw, 64px) 0 clamp(32px, 5vw, 80px)" }}>

        {/* Heading */}
        <h2 style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 800, color: C.text, letterSpacing: "-.035em", lineHeight: 1.05, marginBottom: 6, animation: "fadeUp .4s ease both" }}>
          Why coffee<br />after <span style={{ color: C.red }}>work?</span>
        </h2>
        <RedLine />
        <p style={{ fontSize: "clamp(14px, 1.2vw, 18px)", color: "rgba(27,23,23,.65)", lineHeight: 1.75, marginBottom: "clamp(32px, 5vw, 64px)", maxWidth: 640, animation: "fadeUp .4s ease .06s both" }}>
        We believe real connections happen in real life. Coffee after work is for busy professionals who want to meet someone meaningful-over coffee, after work.</p>

        {/* Feature list — icon left, text right */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 4vw, 36px)" }}>
          {FEATURES.map((feat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "clamp(16px, 3vw, 28px)",
                animation: `fadeUp .4s ease ${.08 + i * .1}s both`,
              }}
            >
              <div style={{ flexShrink: 0, width: 64, height: 64, borderRadius: "50%", background: "rgba(154,0,2,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FeatureIcon name={feat.icon} />
              </div>
              <div style={{ paddingTop: 6 }}>
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
