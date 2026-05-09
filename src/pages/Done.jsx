import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { Label } from "../components/ui";
import { Heart, FloatingHearts } from "../components/Heart";
import heroPng from "../assets/hero.png";
import { I } from "../components/icons";
import { useApp } from "../context/AppContext";
import { useCountUp } from "../hooks/useCountUp";

const PX = "clamp(24px, 5vw, 80px)";

export default function Done() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, spot, setSpot, referralId } = useApp();
  const [countErr, setCountErr] = useState(null);

  // sessionStorage is the source of truth — location.state can be lost in the
  // redirect chain triggered by markAsJoined. Read once on mount.
  const isFromRegistration = useRef(
    location.state?.fromRegistration || sessionStorage.getItem("caw_just_registered") === "1"
  );
  // Capture the real backend count from the POST response before any animation.
  const realCountRef = useRef(spot);
  const [displayValue, setDisplayValue] = useState(() => {
    if (spot == null) return null;
    return isFromRegistration.current && spot > 5 ? spot - 5 : spot;
  });
  const animSpot = useCountUp(displayValue ?? 0, 350);

  useEffect(() => {
    let ws;
    let reconnectTimer;
    const incrementTimers = [];
    let isMounted = true;
    let firstMessage = true;

    const connectWS = () => {
      ws = new WebSocket("wss://coffeedate.vandana.cloud/api/v1/promo/ws/count");

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const count = data?.count ?? data?.total ?? null;
          if (count != null && isMounted) {
            if (firstMessage) {
              firstMessage = false;
              setSpot(count);
            }
            setDisplayValue(count);
            setCountErr(null);
          }
        } catch { }
      };

      ws.onerror = () => { if (isMounted) setCountErr(true); };

      ws.onclose = () => {
        if (isMounted) reconnectTimer = setTimeout(connectWS, 5000);
      };
    };

    if (isFromRegistration.current && realCountRef.current != null) {
      // Consume the one-time flag so a refresh shows the exact backend count.
      sessionStorage.removeItem("caw_just_registered");

      navigator.vibrate?.([60, 40, 120]);

      const target = realCountRef.current;
      const start = target > 5 ? target - 5 : 0;
      setDisplayValue(start);

      // Uneven increments feel organic — like other users joining live.
      // e.g. target 16: 11 → 13 → 15 → 16 over ~2.4s after a 600ms beat.
      const steps = [
        { at: 600,  delta: 2 },
        { at: 1500, delta: 2 },
        { at: 2400, delta: 1 },
      ];
      let acc = start;
      steps.forEach(({ at, delta }) => {
        incrementTimers.push(setTimeout(() => {
          if (!isMounted) return;
          acc = Math.min(acc + delta, target);
          setDisplayValue(acc);
        }, at));
      });
      // Land exactly on target, then connect WS for live updates.
      incrementTimers.push(setTimeout(() => {
        if (!isMounted) return;
        setDisplayValue(target);
        connectWS();
      }, 2800));
    } else {
      // Refresh or direct landing — show real count immediately via WS.
      connectWS();
    }

    return () => {
      isMounted = false;
      clearTimeout(reconnectTimer);
      incrementTimers.forEach(clearTimeout);
      ws?.close();
    };
  }, [setSpot]);

  return (
    <div style={{ minHeight: "100svh", background: C.bg, fontFamily: F, position: "relative" }}>
      <FloatingHearts />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: `clamp(36px, 5vw, 72px) ${PX}`, position: "relative", zIndex: 1, animation: "slideR .45s cubic-bezier(.16,1,.3,1) both" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(32px, 4vw, 56px)" }}>
          <div>
            <p style={{ fontSize: "clamp(25px, 2.5vw, 35px)", fontWeight: 800, color: C.text, letterSpacing: "-.03em", lineHeight: 1.1 }}>Coffee</p>
            <p style={{ fontSize: "clamp(25px, 2.5vw, 35px)", fontWeight: 800, color: C.text, letterSpacing: "-.03em", lineHeight: 1.1 }}>after <span style={{ color: C.red }}>work</span></p>
          </div>
          {/* <div style={{ width: "clamp(20px, 4vw, 56px)", height: "clamp(20px, 4vw, 56px)", borderRadius: "50%", background: C.card, display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .5s cubic-bezier(.34,1.56,.64,1) .2s both" }}>
            <Heart sz={2} gap={0.5} />
          </div> */}
        </div>

        {/* Title */}
        <div style={{ marginBottom: "clamp(28px, 4vw, 48px)", marginTop: "clamp(50px, 4vw, 48px)", animation: "fadeUp .4s ease .05s both" }}>
          <p style={{ fontSize: "clamp(30px, 5vw, 64px)", fontWeight: 800, color: C.text, letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: 8 }}>You're on the list.</p>
          <p style={{ fontSize: "clamp(14px, 1.2vw, 18px)", color: C.muted }}>Good things take time{name ? `, ${name}` : ""}.</p>
        </div>

        {/* Cards grid — 1 col mobile, 2 col desktop */}
        <div className="done-grid">

          {/* Spot — spans full width on desktop */}
          <div className="done-spot card-lift" style={{ background: C.card, borderRadius: 20, padding: "clamp(20px, 3vw, 36px)", animation: "fadeUp .4s ease .12s both" }}>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 800, color: C.red, lineHeight: 1, letterSpacing: "-.05em" }}>
                  {spot == null && !countErr ? "000" : animSpot.toLocaleString()}
                </p>
                <p style={{ fontSize: "clamp(13px, 1vw, 16px)", color: C.text, marginTop: 8, lineHeight: 1.5 }}>
                  {countErr
                    ? "Couldn't load count. Please refresh."
                    : <>People joined.  <br />Your match  may be here already.</>
                  }
                </p>
              </div>
              <div style={{ marginBottom: 20 }}>
                <img src={heroPng} alt="coffee cup" style={{ width: "clamp(80px, 10vw, 160px)", height: "auto", display: "block" }} />
              </div>
            </div>
          </div>

          {/* Share */}
          <div
            className="card-click"
            style={{ background: C.card, borderRadius: 20, padding: "clamp(20px, 2.5vw, 32px)", display: "flex", justifyContent: "space-between", alignItems: "center", animation: "fadeUp .4s ease .18s both" }}
          >
            <div>
              <Label>Unlock Rewards</Label>
              <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: C.text, lineHeight: 1.6, marginTop: 4 }}>Invite friends. Unlock exclusive goodies and rewards.</p>
            </div>
            <button
              onClick={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.blur();
                navigator.share?.({ title: "Coffee After Work", url: referralId ? `https://www.coffeeafterwork.com?ref=${referralId}` : 'https://www.coffeeafterwork.com' });
              }}
              style={{ width: 44, height: 44, borderRadius: "50%", background: C.white, border: `1px solid ${C.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .15s", flexShrink: 0, marginLeft: 16 }}
              onPointerEnter={e => { if (e.pointerType === "mouse") e.currentTarget.style.transform = "scale(1.1) rotate(-8deg)"; }}
              onPointerLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              onPointerCancel={e => (e.currentTarget.style.transform = "scale(1)")}
              onPointerUp={e => { if (e.pointerType !== "mouse") e.currentTarget.style.transform = "scale(1)"; }}
              onBlur={e => (e.currentTarget.style.transform = "scale(1)")}
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
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.white, border: `1px solid ${C.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .15s", flexShrink: 0, marginLeft: 16 }}>{I.arrow}</div>
          </div>

        </div>
      </div>
    </div>
  );
}
