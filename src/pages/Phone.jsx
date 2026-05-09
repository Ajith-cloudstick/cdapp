import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { FormPage, PrimaryBtn, BackBtn, FieldLabel, ErrorBox, ProgressDots } from "../components/ui";
import { useApp } from "../context/AppContext";
import { COUNTRIES, cleanPhone, validatePhone } from "../utils/phone";
import { I } from "../components/icons";

const DEFAULT_COUNTRY = COUNTRIES[0]; // India

export default function Phone() {
  const navigate = useNavigate();
  const { phone, setPhone, setDialCode } = useApp();

  const [country,  setCountry]  = useState(DEFAULT_COUNTRY);
  const [phoneErr, setPhoneErr] = useState(null);
  const [shakeEl,  setShakeEl]  = useState(null);
  const [focused,  setFocused]  = useState(false);

  function shake(el) { setShakeEl(el); setTimeout(() => setShakeEl(null), 380); }

  function submit() {
    const err = validatePhone(country.dial, phone);
    if (phone.trim() && err) { setPhoneErr(err); shake("phone"); return; }
    navigate("/company");
  }

  return (
    <FormPage
      header={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 20 }}>
          <BackBtn onClick={() => navigate(-1)} />
          <ProgressDots current={1} total={3} />
        </div>
      }
      action={
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <PrimaryBtn onClick={submit}>Continue →</PrimaryBtn>
          <button onClick={() => navigate("/company")} style={{ background: "none", border: "none", color: C.muted, fontFamily: F, fontSize: 13, cursor: "pointer", padding: "6px 0", textAlign: "center" }}>Skip for now</button>
        </div>
      }
    >
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "clamp(24px, 4vw, 60px) 0 clamp(32px, 5vw, 80px)" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.card, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, animation: "popIn .45s cubic-bezier(.34,1.56,.64,1) both" }}>
          {I.phone}
        </div>

        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 48px)", fontWeight: 800, color: C.text, letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: 8, animation: "fadeUp .4s ease .08s both" }}>
          Your phone number.
        </h2>
        <p style={{ fontSize: "clamp(13px, 1.1vw, 16px)", color: C.muted, lineHeight: 1.65, marginBottom: 32, animation: "fadeUp .4s ease .12s both" }}>
          So we can reach you when your match is ready — no spam, ever.
        </p>

        <div style={{ animation: "fadeUp .4s ease .16s both" }}>
          <FieldLabel>Phone number</FieldLabel>
          <div className={shakeEl === "phone" ? "shake" : ""}>
            <PhoneInput
              country={country}
              onCountryChange={c => { setCountry(c); setDialCode(c.dial); setPhoneErr(null); }}
              value={phone}
              onChange={v => { setPhone(cleanPhone(v)); setPhoneErr(null); }}
              focused={focused}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onSubmit={submit}
            />
          </div>
          {phoneErr && <ErrorBox msg={phoneErr} />}
        </div>

        <div style={{ marginTop: 24, padding: "14px 16px", background: C.card, borderRadius: 12, animation: "fadeUp .4s ease .2s both" }}>
          <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.65 }}>📱 We'll reach you when it's your turn. That's it.</p>
        </div>
      </div>
    </FormPage>
  );
}

function PhoneInput({ country, onCountryChange, value, onChange, focused, onFocus, onBlur, onSubmit }) {
  return (
    <div style={{
      display: "flex",
      height: 52,
      border: `1.5px solid ${focused ? C.red : C.border}`,
      borderRadius: 10,
      background: C.white,
      overflow: "hidden",
      transition: "border-color .18s",
    }}>
      {/* Country selector */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 10px 0 14px",
          borderRight: `1.5px solid ${focused ? "rgba(154,0,2,.2)" : C.border}`,
          cursor: "pointer",
          userSelect: "none",
          transition: "border-color .18s",
        }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>{country.flag}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F, letterSpacing: "-.01em" }}>+{country.dial}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .7 }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {/* Native select overlaid for accessibility + mobile native picker */}
        <select
          value={country.code}
          onChange={e => onCountryChange(COUNTRIES.find(c => c.code === e.target.value))}
          style={{
            position: "absolute", inset: 0,
            opacity: 0, cursor: "pointer",
            width: "100%", height: "100%",
            fontSize: 16,
          }}
        >
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>{c.flag} {c.name} (+{c.dial})</option>
          ))}
        </select>
      </div>

      {/* Number input */}
      <input
        className="field-bare"
        type="tel"
        inputMode="numeric"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={e => e.key === "Enter" && onSubmit()}
        placeholder="98765 43210"
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: F,
          fontSize: 15,
          color: C.text,
          padding: "0 16px",
          letterSpacing: ".02em",
        }}
      />
    </div>
  );
}
