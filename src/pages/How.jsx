import { useNavigate } from "react-router-dom";
import { C } from "../utils/tokens";
import { Page, PrimaryBtn, BackBtn, RedLine } from "../components/ui";

const STEPS = [
  { n: "01", title: "Join the waitlist", desc: "Sign up and secure your spot on the list. " },
  { n: "02", title: "Get early access", desc: "We'll notify you when you're in." },
  { n: "03", title: "Get matched", desc: "We'll connect you with someone special based on your preferences and values." },
  { n: "04", title: "Meet after work", desc: "Grab coffee. Make connection." },
];

export default function How() {
  const navigate = useNavigate();

  return (
    <Page
      header={<div style={{ paddingBottom: 16 }}><BackBtn onClick={() => navigate(-1)} /></div>}
      action={<PrimaryBtn onClick={() => navigate("/done")}>Let's go</PrimaryBtn>}
    >
      <div style={{ padding: "clamp(24px, 4vw, 64px) 0 clamp(32px, 5vw, 80px)" }}>

        <h2 style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 800, color: C.text, letterSpacing: "-.035em", lineHeight: 1.05, marginBottom: 6, animation: "fadeUp .4s ease both" }}>
          How it works
        </h2>
        <RedLine />


        {/* Step grid — 1 col mobile, 2 col desktop */}
        <div className="step-grid">
          {STEPS.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 20,
                padding: "clamp(20px, 2.5vw, 32px) 0",
                borderBottom: `1px solid ${C.border}`,
                animation: `fadeUp .4s ease ${.08 + i * .09}s both`,
              }}
            >
              <div style={{ flexShrink: 0, paddingTop: 4 }}>
                <span style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 900, color: "rgba(154,0,2,.15)", letterSpacing: "-.04em", lineHeight: 1 }}>{step.n}</span>
              </div>
              <div style={{ paddingTop: 6 }}>
                <p style={{ fontWeight: 700, fontSize: "clamp(15px, 1.4vw, 20px)", marginBottom: 6, color: C.text }}>{step.title}</p>
                <p style={{ color: C.muted, fontSize: "clamp(13px, 1.1vw, 15px)", lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Page>
  );
}
