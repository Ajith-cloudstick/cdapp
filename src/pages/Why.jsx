import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { Page, PrimaryBtn, BackBtn, RedLine, IconBadge } from "../components/ui";

export default function Why() {
  const navigate = useNavigate();

  return (
    <Page
      header={<div style={{ paddingBottom:16 }}><BackBtn onClick={() => navigate(-1)} /></div>}
      action={<PrimaryBtn onClick={() => navigate("/how")}>Join the waitlist</PrimaryBtn>}
    >
      <div style={{ padding:"8px 0 28px" }}>
        <h2 style={{ fontSize:30, fontWeight:800, color:C.text, letterSpacing:"-.03em", lineHeight:1.15, marginBottom:4, animation:"fadeUp .4s ease both" }}>
          Why coffee<br/>after <span style={{ color:C.red }}>work?</span>
        </h2>
        <RedLine />
        <p style={{ fontSize:14, color:"rgba(27,23,23,.7)", lineHeight:1.7, marginBottom:32, animation:"fadeUp .4s ease .06s both" }}>
          We believe real connections happen in real life. Coffee after work is for busy professionals who want to meet someone meaningful—over coffee, after work.
        </p>

        {[
          {icon:"people",   title:"Curated matches",    desc:"We match you with people who align with your lifestyle and values."},
          {icon:"calendar", title:"Real-life meetups",  desc:"No endless chatting. Just coffee, connection, and good conversation."},
          {icon:"shield",   title:"Safe & intentional", desc:"We prioritize safety, respect, and meaningful intentions."},
        ].map((f,i) => (
          <div key={i} className="row-hover" style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:22, animation:`fadeUp .4s ease ${.1+i*.08}s both` }}>
            <IconBadge>
              {f.icon==="people"   && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              {f.icon==="calendar" && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
              {f.icon==="shield"   && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
            </IconBadge>
            <div style={{ paddingTop:5 }}>
              <p style={{ fontWeight:700, fontSize:14, marginBottom:3, color:C.text }}>{f.title}</p>
              <p style={{ color:C.muted, fontSize:13, lineHeight:1.65 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}
