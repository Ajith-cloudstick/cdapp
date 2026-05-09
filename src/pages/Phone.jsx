import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { Page, PrimaryBtn, BackBtn, Field, FieldLabel, ErrorBox, ProgressDots } from "../components/ui";
import { useApp } from "../context/AppContext";
import { fmtPhone } from "../utils/phone";
import { I } from "../components/icons";

export default function Phone() {
  const navigate = useNavigate();
  const { phone, setPhone } = useApp();

  const [phoneErr, setPhoneErr] = useState(null);
  const [shakeEl,  setShakeEl]  = useState(null);

  function shake(el) { setShakeEl(el); setTimeout(()=>setShakeEl(null), 380); }

  function submit() {
    const d = phone.replace(/\D/g,"");
    if (phone.trim() && d.length < 7) { setPhoneErr("Enter a valid phone number."); shake("phone"); return; }
    navigate("/company");
  }

  return (
    <Page
      header={
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingBottom:20 }}>
          <BackBtn onClick={() => navigate(-1)} />
          <ProgressDots current={1} total={3} />
        </div>
      }
      action={
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <PrimaryBtn onClick={submit}>Continue →</PrimaryBtn>
          <button onClick={() => navigate("/company")} style={{ background:"none", border:"none", color:C.muted, fontFamily:F, fontSize:13, cursor:"pointer", padding:"6px 0", textAlign:"center" }}>Skip for now</button>
        </div>
      }
    >
      <div style={{ padding:"12px 0 24px" }}>
        <div style={{ width:48, height:48, borderRadius:"50%", background:C.card, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, animation:"popIn .45s cubic-bezier(.34,1.56,.64,1) both" }}>
          {I.phone}
        </div>
        <h2 style={{ fontSize:24, fontWeight:800, color:C.text, letterSpacing:"-.025em", lineHeight:1.2, marginBottom:6, animation:"fadeUp .4s ease .08s both" }}>
          Your phone number.
        </h2>
        <p style={{ fontSize:13.5, color:C.muted, lineHeight:1.65, marginBottom:28, animation:"fadeUp .4s ease .12s both" }}>
          So we can reach you when your match is ready — no spam, ever.
        </p>
        <div style={{ animation:"fadeUp .4s ease .16s both" }}>
          <FieldLabel>Phone number</FieldLabel>
          <div className={shakeEl==="phone"?"shake":""}>
            <Field value={phone} onChange={v=>{setPhone(fmtPhone(v));setPhoneErr(null);}} placeholder="(555) 000-0000" type="tel" onKeyDown={e=>e.key==="Enter"&&submit()} />
          </div>
          {phoneErr && <ErrorBox msg={phoneErr} />}
        </div>
        <div style={{ marginTop:24, padding:"12px 14px", background:C.card, borderRadius:10, animation:"fadeUp .4s ease .2s both" }}>
          <p style={{ fontSize:12.5, color:C.muted, lineHeight:1.6 }}>📱 We'll text you when it's your turn. That's it.</p>
        </div>
      </div>
    </Page>
  );
}
