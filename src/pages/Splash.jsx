import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { SplashHeart } from "../components/Heart";
import { PrimaryBtn } from "../components/ui";

export default function Splash() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("bloom");

  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase("rise"),   1280),
      setTimeout(() => setPhase("reveal"), 1820),
      setTimeout(() => setPhase("ready"),  2240),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  const risen    = ["rise","reveal","ready"].includes(phase);
  const revealed = ["reveal","ready"].includes(phase);
  const ready    = phase === "ready";

  return (
    <div style={{ position:"fixed", inset:0, background:C.bg, fontFamily:F, overflow:"hidden" }}>
      <div style={{
        position:"absolute", left:"50%",
        top: risen ? "30%" : "50%",
        transform:`translate(-50%,-50%) scale(${risen ? 0.9 : 1})`,
        transition:"top .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)",
        zIndex:2,
      }}>
        <SplashHeart />
      </div>

      <div style={{
        position:"absolute", top:"calc(35% + 70px)",
        left:0, right:0, padding:"0 36px", textAlign:"left",
        zIndex:2, pointerEvents:"none",
      }}>
        <div style={{ overflow:"hidden", marginBottom:4 }}>
          <h1 style={{
            fontSize:38, fontWeight:600, color:C.text,
            letterSpacing:"-.03em", lineHeight:1.05,
            transform: !revealed ? "translateY(110%)" : undefined,
            animation: revealed ? "fadeUp .48s cubic-bezier(.16,1,.3,1) both" : "none",
          }}>Coffee</h1>
        </div>
        <div style={{ overflow:"hidden", marginBottom:22 }}>
          <h1 style={{
            fontSize:38, fontWeight:600, color:C.text,
            letterSpacing:"-.03em", lineHeight:1.05,
            transform: !revealed ? "translateY(110%)" : undefined,
            animation: revealed ? "fadeUp .48s cubic-bezier(.16,1,.3,1) .12s both" : "none",
          }}>after <span style={{ color:C.red }}>work.</span></h1>
        </div>
        <p style={{
          fontSize:15, color:C.muted, lineHeight:1.55, fontWeight:400,
          opacity: revealed ? 1 : 0,
          animation: revealed ? "fadeUp .4s ease .25s both" : "none",
        }}>
          Meet someone worth<br/>unwinding for.
        </p>
      </div>

      <div style={{
        position:"absolute", left:0, right:0,
        bottom:"max(40px, calc(env(safe-area-inset-bottom, 0px) + 40px))",
        padding:"0 24px", zIndex:2,
        opacity: ready ? 1 : 0,
        transform: ready ? "none" : "translateY(18px)",
        transition:"opacity .45s ease, transform .45s ease",
        pointerEvents: ready ? "auto" : "none",
      }}>
        <PrimaryBtn onClick={() => navigate("/why")}>Join the waitlist</PrimaryBtn>
      </div>
    </div>
  );
}
