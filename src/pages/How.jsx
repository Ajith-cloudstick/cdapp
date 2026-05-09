import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { Page, PrimaryBtn, BackBtn, RedLine } from "../components/ui";

export default function How() {
  const navigate = useNavigate();

  return (
    <Page
      header={<div style={{ paddingBottom:16 }}><BackBtn onClick={() => navigate(-1)} /></div>}
      action={<PrimaryBtn onClick={() => navigate("/ready")}>Join the waitlist</PrimaryBtn>}
    >
      <div style={{ padding:"8px 0 28px" }}>
        <h2 style={{ fontSize:30, fontWeight:800, color:C.text, letterSpacing:"-.03em", lineHeight:1.15, marginBottom:4, animation:"fadeUp .4s ease both" }}>
          How it works
        </h2>
        <RedLine />

        <div style={{ position:"relative", marginTop:8 }}>
          <div style={{ position:"absolute", left:25, top:50, bottom:50, width:0, borderLeft:`1.5px dashed rgba(154,0,2,.3)` }} />
          {[
            {n:"1", title:"Join the waitlist", desc:"Sign up and secure your spot on the list."},
            {n:"2", title:"Get early access",  desc:"We'll notify you when you're in."},
            {n:"3", title:"Get matched",        desc:"We'll introduce you to someone great."},
            {n:"4", title:"Meet after work",    desc:"Grab coffee. Make a real connection."},
          ].map((s,i) => (
            <div key={i} className="row-hover" style={{ display:"flex", gap:18, alignItems:"flex-start", marginBottom:26, position:"relative", zIndex:1, animation:`fadeUp .4s ease ${.08+i*.09}s both` }}>
              <div style={{ width:50, height:50, borderRadius:"50%", background:C.card, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:C.red, fontSize:18, flexShrink:0 }}>
                {s.n}
              </div>
              <div style={{ paddingTop:10 }}>
                <p style={{ fontWeight:700, fontSize:15, marginBottom:4, color:C.text }}>{s.title}</p>
                <p style={{ color:C.muted, fontSize:13.5, lineHeight:1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
