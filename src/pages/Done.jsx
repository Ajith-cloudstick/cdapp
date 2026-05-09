import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { Label } from "../components/ui";
import { Heart, CoffeeCup, FloatingHearts } from "../components/Heart";
import { I } from "../components/icons";
import { useApp } from "../context/AppContext";
import { useCountUp } from "../hooks/useCountUp";

const PX = "clamp(24px, 5vw, 80px)";

export default function Done() {
  const navigate = useNavigate();
  const { name, spot } = useApp();
  const animSpot = useCountUp(spot, 1600);

  return (
    <div style={{ minHeight: "100svh", background: C.bg, fontFamily: F, position: "relative" }}>
      <FloatingHearts />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `clamp(36px, 5vw, 72px) ${PX}`, position: "relative", zIndex: 1, animation: "slideR .45s cubic-bezier(.16,1,.3,1) both" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(32px, 4vw, 56px)" }}>
          <div>
            <p style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 800, color: C.text, letterSpacing: "-.03em", lineHeight: 1.1 }}>coffee</p>
            <p style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 800, color: C.text, letterSpacing: "-.03em", lineHeight: 1.1 }}>after work</p>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.card, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .5s cubic-bezier(.34,1.56,.64,1) .2s both" }}>
            <Heart sz={3} gap={1} />
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: "clamp(28px, 4vw, 48px)", animation: "fadeUp .4s ease .05s both" }}>
          <p style={{ fontSize: "clamp(30px, 5vw, 64px)", fontWeight: 800, color: C.text, letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: 8 }}>You're on the list.</p>
          <p style={{ fontSize: "clamp(14px, 1.2vw, 18px)", color: C.muted }}>Good things take time{name ? `, ${name}` : ""}.</p>
        </div>

        {/* Cards grid — 1 col mobile, 2 col desktop */}
        <div className="done-grid">

          {/* Spot — spans full width on desktop */}
          <div className="done-spot card-lift" style={{ background: C.card, borderRadius: 20, padding: "clamp(20px, 3vw, 36px)", animation: "fadeUp .4s ease .12s both" }}>
            <Label>Your Spot</Label>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 800, color: C.red, lineHeight: 1, letterSpacing: "-.05em" }}>{animSpot.toLocaleString()}</p>
                <p style={{ fontSize: "clamp(13px, 1vw, 16px)", color: C.muted, marginTop: 8 }}>people ahead of you</p>
              </div>
              <div style={{ opacity: .6, marginBottom: 4 }}>
                <CoffeeCup sz={8} gap={1.5} />
              </div>
            </div>
          </div>

          {/* Share */}
          <div
            className="card-click"
            style={{ background: C.card, borderRadius: 20, padding: "clamp(20px, 2.5vw, 32px)", display: "flex", justifyContent: "space-between", alignItems: "center", animation: "fadeUp .4s ease .18s both" }}
          >
            <div>
              <Label>Share & Move Up</Label>
              <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: C.text, lineHeight: 1.6, marginTop: 4 }}>Invite friends to move up the list together.</p>
            </div>
            <button
              onClick={() => navigator.share?.({ title: "coffee after work", url: window.location.href })}
              style={{ width: 44, height: 44, borderRadius: "50%", background: C.white, border: `1px solid ${C.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .15s", flexShrink: 0, marginLeft: 16 }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1) rotate(-8deg)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              {I.share}
            </button>
          </div>

          {/* Updates */}
          <div
            className="card-click"
            style={{ background: C.card, borderRadius: 20, padding: "clamp(20px, 2.5vw, 32px)", display: "flex", justifyContent: "space-between", alignItems: "center", animation: "fadeUp .4s ease .24s both" }}
            onClick={() => navigate("/why")}
          >
            <div>
              <Label>Updates</Label>
              <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: C.text, lineHeight: 1.6, marginTop: 4 }}>We're building something worth the wait.</p>
            </div>
            <div style={{ marginLeft: 16, flexShrink: 0 }}>{I.arrow}</div>
          </div>

        </div>
      </div>
    </div>
  );
}
