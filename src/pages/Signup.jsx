import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { FormPage, PrimaryBtn, BackBtn, Field, FieldLabel, ErrorBox, ProgressDots } from "../components/ui";
import { useApp } from "../context/AppContext";
import { validateEmail } from "../utils/email";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, setName, email, setEmail, setSpot } = useApp();

  useEffect(() => {
    setSpot(null);
  }, [setSpot]);

  const [nameErr,  setNameErr]  = useState(null);
  const [emailErr, setEmailErr] = useState(
    location.state?.emailErr ? { msg: location.state.emailErr } : null
  );
  const [shakeEl,  setShakeEl]  = useState(location.state?.emailErr ? "email" : null);

  useEffect(() => {
    if (location.state?.emailErr) {
      setTimeout(() => setShakeEl(null), 380);
    }
  }, []);
  const [loading, setLoading] = useState(false);

  function shake(el) { setShakeEl(el); setTimeout(() => setShakeEl(null), 380); }

  async function submit() {
    setNameErr(null); setEmailErr(null);
    if (!name.trim()) { setNameErr("Please enter your first name."); shake("name"); return; }
    const ev = validateEmail(email);
    if (!ev.ok) { setEmailErr(ev); shake("email"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    setLoading(false);
    navigate("/phone");
  }

  return (
    <FormPage
      header={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 20 }}>
          <BackBtn onClick={() => navigate(-1)} />
          <ProgressDots current={0} total={3} />
        </div>
      }
      action={<PrimaryBtn onClick={submit} disabled={loading}>{loading ? "Checking…" : "Continue →"}</PrimaryBtn>}
    >
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "clamp(24px, 4vw, 60px) 0 clamp(32px, 5vw, 80px)" }}>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 48px)", fontWeight: 800, color: C.text, letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: 8, animation: "fadeUp .4s ease both" }}>
          Let's get you<br />on the list.
        </h2>
        <p style={{ fontSize: "clamp(13px, 1.1vw, 16px)", color: C.muted, lineHeight: 1.65, marginBottom: 32, animation: "fadeUp .4s ease .06s both" }}>
          We keep it real — no fake emails, no bots.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeUp .4s ease .1s both" }}>
          <div>
            <FieldLabel>First name</FieldLabel>
            <div className={shakeEl === "name" ? "shake" : ""}>
              <Field value={name} onChange={v => { setName(v); setNameErr(null); }} placeholder="Your first name" />
            </div>
            {nameErr && <ErrorBox msg={nameErr} />}
          </div>
          <div>
            <FieldLabel>Email address</FieldLabel>
            <div className={shakeEl === "email" ? "shake" : ""}>
              <Field value={email} onChange={v => { setEmail(v); setEmailErr(null); }} placeholder="your@email.com" type="email" onKeyDown={e => e.key === "Enter" && submit()} />
            </div>
            {emailErr && <ErrorBox msg={emailErr.msg} fix={emailErr.fix} onFix={() => { setEmail(emailErr.fix); setEmailErr(null); }} />}
          </div>
        </div>

        <div style={{ marginTop: 28, padding: "14px 16px", background: C.card, borderRadius: 12, animation: "fadeUp .4s ease .16s both" }}>
          <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.65 }}>🔒 Your info is never shared. We'll only contact you when the app is live.</p>
        </div>

      </div>
    </FormPage>
  );
}
