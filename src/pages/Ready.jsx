import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { Page, PrimaryBtn, BackBtn } from "../components/ui";
import { Heart } from "../components/Heart";
import { I } from "../components/icons";

const PLEDGES = [
  "I'm genuinely looking to meet someone",
  "I'll show up if we're matched",
  "I want something real, not just a swipe",
];

export default function Ready() {
  const navigate = useNavigate();

  return (
    <Page
      header={<div style={{ paddingBottom: 16 }}><BackBtn onClick={() => navigate(-1)} /></div>}
      action={
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <PrimaryBtn onClick={() => navigate("/signup")}>Continue →</PrimaryBtn>
          <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", color: C.muted, fontFamily: F, fontSize: 14, fontWeight: 500, cursor: "pointer", padding: "10px 0", textAlign: "center" }}>Cancel</button>
        </div>
      }
    >
      {/* Centered content with max-width for comfortable reading on all screens */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "clamp(24px, 4vw, 72px) 0 clamp(32px, 5vw, 80px)" }}>

        <div style={{ marginBottom: 28, animation: "fadeUp .4s ease both" }}>
          <Heart sz={5} gap={1.5} />
        </div>

        <h2 style={{ fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 800, color: C.text, letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: 12, animation: "fadeUp .4s ease .08s both" }}>
          Ready to meet<br />someone great?
        </h2>
        <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: C.muted, lineHeight: 1.75, marginBottom: 40, animation: "fadeUp .4s ease .14s both" }}>
          We only welcome real people with genuine intentions. A few things we ask of everyone on the list.
        </p>

        <div style={{ animation: "fadeUp .4s ease .2s both" }}>
          {PLEDGES.map((t, i, arr) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 16, padding: "clamp(14px, 1.5vw, 20px) 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}
            >
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(154,0,2,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {I.check}
              </div>
              <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: C.text, fontWeight: 500 }}>{t}</p>
            </div>
          ))}
        </div>

      </div>
    </Page>
  );
}
