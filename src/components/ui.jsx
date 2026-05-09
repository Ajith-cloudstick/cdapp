import { useState } from "react";
import { C, F } from "../utils/tokens";
import { I } from "./icons";

export function Page({ header, children, action, animDir="forward", animKey, noPad }) {
  return (
    <div style={{ minHeight:"100svh", display:"flex", flexDirection:"column", background:C.bg, fontFamily:F }}>
      {header && <div style={{ padding:"20px 24px 0", flexShrink:0 }}>{header}</div>}
      <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch" }}>
        <div key={animKey} style={{ padding: noPad ? "0" : "0 24px", animation:`${animDir==="back"?"slideL":"slideR"} .42s cubic-bezier(.16,1,.3,1) both` }}>
          {children}
        </div>
      </div>
      {action && (
        <div style={{ flexShrink:0, background:C.bg, padding:"12px 24px", paddingBottom:`max(24px, env(safe-area-inset-bottom, 24px))` }}>
          {action}
        </div>
      )}
    </div>
  );
}

export function PrimaryBtn({ children, onClick, disabled, flush }) {
  return (
    <button className="btn-primary" onClick={onClick} disabled={disabled} style={{ width:"100%", height:flush?64:54, background:disabled?"rgba(154,0,2,.35)":C.red, color:"#fff", border:"none", borderRadius:flush?0:12, fontSize:15, fontWeight:700, fontFamily:F, letterSpacing:".01em", cursor:disabled?"not-allowed":"pointer" }}>
      {children}
    </button>
  );
}

export function GhostBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ flex:1, height:54, background:"transparent", border:`1.5px solid ${C.red}`, color:C.red, borderRadius:12, fontSize:15, fontWeight:600, fontFamily:F, cursor:"pointer", transition:"background .15s" }}
      onMouseEnter={e=>e.currentTarget.style.background="rgba(154,0,2,.06)"}
      onMouseLeave={e=>e.currentTarget.style.background="transparent"}
    >{children}</button>
  );
}

export function BackBtn({ onClick }) {
  return (
    <button className="back-btn" onClick={onClick} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", padding:0, color:C.text }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
      </svg>
    </button>
  );
}

export function Field({ value, onChange, placeholder, type="text", onKeyDown, prefix }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
      {prefix && <span style={{ position:"absolute", left:16, color:C.muted, fontSize:15, fontWeight:500, userSelect:"none", pointerEvents:"none" }}>{prefix}</span>}
      <input className="field" type={type} value={value}
        onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        onKeyDown={onKeyDown} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ width:"100%", height:52, padding:prefix?"0 16px 0 42px":"0 16px", border:`1px solid ${focused?C.red:C.border}`, borderRadius:10, background:C.white, fontFamily:F, fontSize:15, color:C.text }}
      />
    </div>
  );
}

export function FieldLabel({ children }) {
  return <p style={{ fontSize:11, fontWeight:600, color:C.muted, letterSpacing:".07em", textTransform:"uppercase", marginBottom:8 }}>{children}</p>;
}

export function ErrorBox({ msg, fix, onFix }) {
  return (
    <div style={{ marginTop:8, background:"#FEE2E2", border:`1px solid rgba(154,0,2,.25)`, borderRadius:8, padding:"9px 12px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:8, animation:"fadeUp .25s ease both" }}>
      <p style={{ fontSize:12.5, color:C.red, fontWeight:500, lineHeight:1.4 }}>{msg}</p>
      {fix && onFix && <button onClick={onFix} style={{ flexShrink:0, fontSize:11.5, fontWeight:700, color:C.red, background:"rgba(154,0,2,.1)", border:"none", borderRadius:5, padding:"3px 8px", cursor:"pointer" }}>Use this</button>}
    </div>
  );
}

export function ProgressDots({ current, total }) {
  return (
    <div style={{ display:"flex", gap:5, alignItems:"center" }}>
      {Array.from({length:total}).map((_,i)=>(
        <div key={i} style={{ height:4, borderRadius:2, background:i<=current?C.red:C.border, width:i===current?20:5, transition:"all .38s cubic-bezier(.34,1.56,.64,1)" }} />
      ))}
    </div>
  );
}

export function RedLine() {
  return <div style={{ width:32, height:2.5, background:C.red, borderRadius:2, margin:"8px 0 18px", transformOrigin:"left center", animation:"lineGrow .5s cubic-bezier(.16,1,.3,1) .1s both" }} />;
}

export function Label({ children }) {
  return <p style={{ fontSize:10, fontWeight:600, letterSpacing:".09em", textTransform:"uppercase", color:C.muted, marginBottom:7 }}>{children}</p>;
}

export function IconBadge({ children }) {
  return <div style={{ width:44, height:44, borderRadius:"50%", background:C.card, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>{children}</div>;
}

export function NavBar({ active, go }) {
  return (
    <div style={{ borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-around", paddingTop:10, paddingBottom:"max(16px,env(safe-area-inset-bottom,16px))", background:C.bg, flexShrink:0, width:"100%" }}>
      {[{k:"home",l:"Home",icon:I.home},{k:"learn",l:"Learn More",icon:I.info},{k:"profile",l:"Profile",icon:I.user}].map(t=>(
        <button key={t.k} className="nav-btn" onClick={()=>go(t.k)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, fontFamily:F, fontSize:10.5, fontWeight:500, color:active===t.k?C.red:C.muted, padding:"4px 16px", position:"relative" }}>
          {active===t.k&&<div style={{ position:"absolute", top:-10, left:"50%", marginLeft:-10, width:20, height:2, background:C.red, borderRadius:1, animation:"fadeIn .3s ease both" }}/>}
          {t.icon(active===t.k)}
          {t.l}
        </button>
      ))}
    </div>
  );
}

