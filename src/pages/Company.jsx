import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { FormPage, PrimaryBtn, BackBtn, Field, FieldLabel, ErrorBox, ProgressDots } from "../components/ui";
import { useApp } from "../context/AppContext";
import { I } from "../components/icons";

export default function Company() {
  const navigate = useNavigate();
  const { company, setCompany, setSpot } = useApp();

  const [compErr, setCompErr] = useState(null);
  const [shakeEl, setShakeEl] = useState(null);

  function shake(el) { setShakeEl(el); setTimeout(() => setShakeEl(null), 380); }

  function submit() {
    setCompErr(null);
    if (!company.trim()) { setCompErr("Please enter your company name."); shake("company"); return; }
    setSpot(Math.floor(Math.random() * 1400 + 600));
    navigate("/done");
  }

  return (
    <FormPage
      header={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 20 }}>
          <BackBtn onClick={() => navigate(-1)} />
          <ProgressDots current={2} total={3} />
        </div>
      }
    >
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "clamp(24px, 4vw, 60px) 0 clamp(32px, 5vw, 80px)" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.card, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, animation: "popIn .45s cubic-bezier(.34,1.56,.64,1) both" }}>
          {I.building}
        </div>

        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 48px)", fontWeight: 800, color: C.text, letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: 8, animation: "fadeUp .4s ease .08s both" }}>
          Where do you work?
        </h2>
        <p style={{ fontSize: "clamp(13px, 1.1vw, 16px)", color: C.muted, lineHeight: 1.65, marginBottom: 32, animation: "fadeUp .4s ease .12s both" }}>
          Coffee after work is built for professionals. This helps us find you the right people.
        </p>

        <div style={{ animation: "fadeUp .4s ease .16s both" }}>
          <FieldLabel>Company / Employer</FieldLabel>
          <div className={shakeEl === "company" ? "shake" : ""}>
            <Field value={company} onChange={v => { setCompany(v); setCompErr(null); }} placeholder="e.g. Deloitte, Google, NHS…" onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
          {compErr && <ErrorBox msg={compErr} />}
        </div>

        <div style={{ marginTop: 28, animation: "fadeUp .4s ease .2s both" }}>
          <p style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: C.muted, lineHeight: 1.8 }}>
            Coffee After Work is built around your professional world. We connect people within the same corporate circles — so you meet someone who gets your pace, your ambitions, and what life after 6pm actually looks like.
          </p>
        </div>

        <div style={{ marginTop: 32 }}>
          <PrimaryBtn onClick={submit}>Reserve my spot →</PrimaryBtn>
        </div>
      </div>
    </FormPage>
  );
}
