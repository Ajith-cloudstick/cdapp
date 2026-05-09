import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { Label } from "../components/ui";
import { Heart, CoffeeCup, FloatingHearts } from "../components/Heart";
import { I } from "../components/icons";
import { useApp } from "../context/AppContext";
import { useCountUp } from "../hooks/useCountUp";

export default function Done() {
  const navigate = useNavigate();
  const { name, spot } = useApp();
  const animSpot = useCountUp(spot, 1600);

  return (
    <div style={{ minHeight:"100svh", display:"flex", flexDirection:"column", background:C.bg, fontFamily:F, position:"relative" }}>
      <FloatingHearts />
      <div style={{ flex:1, padding:"36px 24px 24px", position:"relative", zIndex:1, animation:"slideR .45s cubic-bezier(.16,1,.3,1) both" }}>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
          <div>
            <p style={{ fontSize:22, fontWeight:800, color:C.text, letterSpacing:"-.02em" }}>coffee</p>
            <p style={{ fontSize:22, fontWeight:800, color:C.text, letterSpacing:"-.02em" }}>after work</p>
          </div>
          <div style={{ width:32, height:32, borderRadius:"50%", background:C.card, display:"flex", alignItems:"center", justifyContent:"center", animation:"popIn .5s cubic-bezier(.34,1.56,.64,1) .2s both" }}>
            <Heart sz={3} gap={1} />
          </div>
        </div>

        <div style={{ marginBottom:28, animation:"fadeUp .4s ease .05s both" }}>
          <p style={{ fontSize:26, fontWeight:800, color:C.text, letterSpacing:"-.025em", lineHeight:1.2, marginBottom:5 }}>You're on the list.</p>
          <p style={{ fontSize:13.5, color:C.muted }}>Good things take time{name ? `, ${name}` : ""}.</p>
        </div>

        <div className="card-lift" style={{ background:C.card, borderRadius:16, padding:"20px", marginBottom:12, animation:"fadeUp .4s ease .12s both" }}>
          <Label>Your Spot</Label>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between" }}>
            <div>
              <p style={{ fontSize:52, fontWeight:800, color:C.red, lineHeight:1, letterSpacing:"-.04em" }}>{animSpot.toLocaleString()}</p>
              <p style={{ fontSize:12.5, color:C.muted, marginTop:6 }}>people ahead of you</p>
            </div>
            <div style={{ opacity:.65, marginBottom:4 }}>
              <CoffeeCup sz={7} gap={1.5} />
            </div>
          </div>
        </div>

        <div className="card-click" style={{ background:C.card, borderRadius:14, padding:"16px 18px", marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"center", animation:"fadeUp .4s ease .18s both" }}>
          <div>
            <Label>Share & Move Up</Label>
            <p style={{ fontSize:13.5, color:C.text, lineHeight:1.5 }}>Invite friends to move up the list together.</p>
          </div>
          <button onClick={()=>navigator.share?.({title:"coffee after work",url:window.location.href})}
            style={{ width:38, height:38, borderRadius:"50%", background:C.white, border:`1px solid ${C.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .15s", flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1) rotate(-8deg)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
          >{I.share}</button>
        </div>

        <div className="card-click" style={{ background:C.card, borderRadius:14, padding:"16px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", animation:"fadeUp .4s ease .24s both" }} onClick={() => navigate("/why")}>
          <div>
            <Label>Updates</Label>
            <p style={{ fontSize:13.5, color:C.text, lineHeight:1.5 }}>We're building something worth the wait.</p>
          </div>
          {I.arrow}
        </div>

      </div>
    </div>
  );
}
