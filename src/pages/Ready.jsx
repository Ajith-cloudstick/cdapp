import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { Page, PrimaryBtn, BackBtn } from "../components/ui";
import { Heart } from "../components/Heart";
import { I } from "../components/icons";

export default function Ready() {
  const navigate = useNavigate();

  return (
    <Page
      header={<div style={{ paddingBottom:16 }}><BackBtn onClick={() => navigate(-1)} /></div>}
      action={
        <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
          <PrimaryBtn onClick={() => navigate("/signup")}>Continue →</PrimaryBtn>
          <button onClick={() => navigate(-1)} style={{ background:"none", border:"none", color:C.muted, fontFamily:F, fontSize:14, fontWeight:500, cursor:"pointer", padding:"10px 0", textAlign:"center", letterSpacing:".01em" }}>Cancel</button>
        </div>
      }
    >
      <div style={{ padding:"16px 0 24px" }}>
        <div style={{ marginBottom:24, animation:"fadeUp .4s ease both" }}>
          <Heart sz={4} gap={1} />
        </div>
        <h2 style={{ fontSize:24, fontWeight:800, color:C.text, letterSpacing:"-.025em", lineHeight:1.2, marginBottom:6, animation:"fadeUp .4s ease .1s both" }}>
          Ready to meet<br/>someone great?
        </h2>
        <p style={{ fontSize:13.5, color:C.muted, lineHeight:1.7, marginBottom:28, animation:"fadeUp .4s ease .15s both" }}>
          We only welcome real people with genuine intentions.
        </p>
        <div style={{ animation:"fadeUp .4s ease .2s both" }}>
          {["I'm genuinely looking to meet someone","I'll show up if we're matched","I want something real, not just a swipe"].map((t,i,arr)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none" }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(154,0,2,.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {I.check}
              </div>
              <p style={{ fontSize:14, color:C.text, fontWeight:500 }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
