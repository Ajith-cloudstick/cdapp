import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { FormPage, PrimaryBtn, BackBtn, Field, FieldLabel, ErrorBox, ProgressDots } from "../components/ui";
import { useApp } from "../context/AppContext";
import { I } from "../components/icons";
import { submitPromo } from "../utils/api";

export default function Company() {
  const navigate = useNavigate();
  const { name, email, phone, dialCode, company, setCompany, setSpot, markAsJoined } = useApp();

  const [compErr, setCompErr] = useState(null);
  const [apiErr,  setApiErr]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [shakeEl, setShakeEl] = useState(null);

  function shake(el) { setShakeEl(el); setTimeout(() => setShakeEl(null), 380); }

  async function submit() {
    setCompErr(null);
    setApiErr(null);
    if (!company.trim()) { setCompErr("Please enter your company name."); shake("company"); return; }

    setLoading(true);
    try {
      const fullPhone = phone ? `+${dialCode}${phone}` : undefined;
      const data = await submitPromo({ 
        name, 
        email, 
        company: company.trim(),
        phone_number: fullPhone
      });
      const count = data?.count ?? data?.spot ?? null;
      setSpot(count);
      
      // Mark as joined in local storage
      markAsJoined(true);
      
      navigate("/done");
    } catch (err) {
      setApiErr(err.message);
      shake("api");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormPage
      header={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 20 }}>
          <BackBtn onClick={() => navigate(-1)} />
          <ProgressDots current={2} total={3} />
        </div>
      }
      action={<PrimaryBtn onClick={submit} disabled={loading}>{loading ? "Reserving…" : "Reserve my spot →"}</PrimaryBtn>}
    >
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "clamp(24px, 4vw, 60px) 0 clamp(32px, 5vw, 80px)" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.card, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, animation: "popIn .45s cubic-bezier(.34,1.56,.64,1) both" }}>
          {I.building}
        </div>

        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 48px)", fontWeight: 800, color: C.text, letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: 8, animation: "fadeUp .4s ease .08s both" }}>
          Where do you work?
        </h2>
        <p style={{ fontSize: "clamp(14px, 1.1vw, 16px)", color: C.muted, lineHeight: 1.6, marginBottom: 32, animation: "fadeUp .4s ease .12s both" }}>
          This helps us connect you with people in similar professional circles who understand your lifestyle.
        </p>

        <div style={{ animation: "fadeUp .4s ease .16s both" }}>
          <FieldLabel>Company / Employer</FieldLabel>
          <div className={shakeEl === "company" ? "shake" : ""}>
            <Field value={company} onChange={v => { setCompany(v); setCompErr(null); }} placeholder="e.g. Deloitte, Google, NHS…" onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
          {compErr && <ErrorBox msg={compErr} />}
        </div>

        {apiErr && (
          <div className={shakeEl === "api" ? "shake" : ""} style={{ marginTop: 16 }}>
            <ErrorBox msg={apiErr} />
          </div>
        )}

      </div>
    </FormPage>
  );
}
