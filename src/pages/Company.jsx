import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { Page, PrimaryBtn, BackBtn, Field, FieldLabel, ErrorBox, ProgressDots } from "../components/ui";
import { useApp } from "../context/AppContext";
import { I } from "../components/icons";

export default function Company() {
  const navigate = useNavigate();
  const { company, setCompany, setSpot } = useApp();

  const [compErr, setCompErr] = useState(null);
  const [shakeEl, setShakeEl] = useState(null);

  function shake(el) { setShakeEl(el); setTimeout(()=>setShakeEl(null), 380); }

  function submit() {
    setCompErr(null);
    if (!company.trim()) { setCompErr("Please enter your company name."); shake("company"); return; }
    setSpot(Math.floor(Math.random() * 1400 + 600));
    navigate("/done");
  }

  return (
    <Page
      header={
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingBottom:20 }}>
          <BackBtn onClick={() => navigate(-1)} />
          <ProgressDots current={2} total={3} />
        </div>
      }
      action={<PrimaryBtn onClick={submit}>Reserve my spot →</PrimaryBtn>}
    >
      <div style={{ padding:"12px 0 24px" }}>
        <div style={{ width:48, height:48, borderRadius:"50%", background:C.card, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, animation:"popIn .45s cubic-bezier(.34,1.56,.64,1) both" }}>
          {I.building}
        </div>
        <h2 style={{ fontSize:24, fontWeight:800, color:C.text, letterSpacing:"-.025em", lineHeight:1.2, marginBottom:6, animation:"fadeUp .4s ease .08s both" }}>
          Where do you work?
        </h2>
        <p style={{ fontSize:13.5, color:C.muted, lineHeight:1.65, marginBottom:28, animation:"fadeUp .4s ease .12s both" }}>
          Coffee after work is built for professionals. This helps us find you the right people.
        </p>
        <div style={{ animation:"fadeUp .4s ease .16s both" }}>
          <FieldLabel>Company / Employer</FieldLabel>
          <div className={shakeEl==="company"?"shake":""}>
            <Field value={company} onChange={v=>{setCompany(v);setCompErr(null);}} placeholder="e.g. Deloitte, Google, NHS…" onKeyDown={e=>e.key==="Enter"&&submit()} />
          </div>
          {compErr && <ErrorBox msg={compErr} />}
        </div>
        <div style={{ marginTop:24, animation:"fadeUp .4s ease .2s both" }}>
          <p style={{ fontSize:13, color:C.muted, lineHeight:1.75 }}>
            Coffee After Work is built around your professional world. We connect people within the same corporate circles — so you meet someone who gets your pace, your ambitions, and what life after 6pm actually looks like.
          </p>
        </div>
      </div>
    </Page>
  );
}
