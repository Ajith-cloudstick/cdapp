import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { C, F } from "../utils/tokens";
import { FormPage, PrimaryBtn, BackBtn, FieldLabel, ErrorBox, ProgressDots } from "../components/ui";
import { useApp } from "../context/AppContext";
import { COUNTRIES, cleanPhone, validatePhone } from "../utils/phone";
import { I } from "../components/icons";

const INDIA = COUNTRIES.find(c => c.code === "IN");

export default function Phone() {
  const navigate = useNavigate();
  const { phone, setPhone, setDialCode } = useApp();

  const [country, setCountry] = useState(INDIA);
  const [phoneErr, setPhoneErr] = useState(null);
  const [shakeEl, setShakeEl] = useState(null);
  const [focused, setFocused] = useState(false);

  // Detect user's country via IP geolocation and auto-select dial code
  useEffect(() => {
    let cancelled = false;
    fetch("https://ipwho.is/")
      .then(r => r.json())
      .then(data => {
        if (cancelled || !data?.country_code) return;
        const match = COUNTRIES.find(c => c.code === data.country_code);
        if (match) {
          setCountry(match);
          setDialCode(match.dial);
        }
      })
      .catch(() => { /* keep India default */ });
    return () => { cancelled = true; };
  }, [setDialCode]);

  function shake(el) { setShakeEl(el); setTimeout(() => setShakeEl(null), 380); }

  function submit() {
    if (!phone.trim()) {
      setPhoneErr("Please enter your phone number.");
      shake("phone");
      return;
    }
    const err = validatePhone(country.dial, phone);
    if (err) {
      setPhoneErr(err);
      shake("phone");
      return;
    }
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
          We'll notify you the moment the app is live.
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


      </div>
    </FormPage>
  );
}

function PhoneInput({ country, onCountryChange, value, onChange, focused, onFocus, onBlur, onSubmit }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 1024);
  const btnRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function onResize() { setIsMobile(window.innerWidth < 1024); }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => searchRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.dial.includes(q.replace(/^\+/, "")) ||
      c.code.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div data-phone-row style={{
      display: "flex",
      height: 52,
      border: `1.5px solid ${focused ? C.red : C.border}`,
      borderRadius: 10,
      background: C.white,
      overflow: "visible",
      transition: "border-color .18s",
      position: "relative",
    }}>
      {/* Country selector */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0 10px 0 14px",
            borderRight: `1.5px solid ${focused ? "rgba(154,0,2,.2)" : C.border}`,
            background: "transparent",
            border: "none",
            borderRadius: "10px 0 0 10px",
            cursor: "pointer",
            userSelect: "none",
            transition: "border-color .18s",
          }}
        >
          <span style={{ fontSize: 20, lineHeight: 1 }}>{country.flag}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F, letterSpacing: "-.01em" }}>+{country.dial}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .7, transform: open ? "rotate(180deg)" : "none", transition: "transform .18s" }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {open && createPortal(
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.45)",
              zIndex: 9998,
              display: "flex",
              alignItems: isMobile ? "flex-end" : "center",
              justifyContent: "center",
              animation: "fadeIn .18s ease both",
            }}
          >
          <div
            role="dialog"
            aria-modal="true"
            onClick={e => e.stopPropagation()}
            style={{
              width: isMobile ? "100%" : 440,
              maxWidth: isMobile ? "100%" : "calc(100vw - 24px)",
              height: isMobile ? "auto" : 560,
              minHeight: isMobile ? "50vh" : 360,
              maxHeight: isMobile ? "85vh" : "min(560px, 80vh)",
              display: "flex",
              flexDirection: "column",
              background: C.white,
              borderRadius: isMobile ? "16px 16px 0 0" : 16,
              boxShadow: "0 20px 60px rgba(0,0,0,.25)",
              zIndex: 9999,
              overflow: "hidden",
              animation: isMobile ? "slideUp .22s ease both" : "fadeUp .18s ease both",
              paddingBottom: isMobile ? "env(safe-area-inset-bottom, 0px)" : 0,
            }}
          >
            {isMobile && (
              <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
                <div style={{ width: 40, height: 4, borderRadius: 4, background: "rgba(0,0,0,.18)" }} />
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px 6px" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: C.text, fontFamily: F, letterSpacing: "-.01em" }}>Select country</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: 6, color: C.muted, display: "flex" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
            <div style={{ padding: 10, borderBottom: `1px solid ${C.border}` }}>
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search country or code"
                style={{
                  width: "100%",
                  height: 38,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  padding: "0 12px",
                  fontFamily: F,
                  fontSize: 14,
                  color: C.text,
                  outline: "none",
                  background: C.white,
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ flex: 1, minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
              {filtered.length === 0 ? (
                <div style={{ padding: "16px 14px", fontSize: 13, color: C.muted, fontFamily: F }}>No matches</div>
              ) : filtered.map(c => {
                const active = c.code === country.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onCountryChange(c);
                      setOpen(false);
                      setQuery("");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      width: "100%",
                      padding: "10px 14px",
                      background: active ? "rgba(154,0,2,.06)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: F,
                      fontSize: 14,
                      color: C.text,
                      textAlign: "left",
                    }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(0,0,0,.04)"; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                  >
                    <span style={{ fontSize: 18, lineHeight: 1 }}>{c.flag}</span>
                    <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                    <span style={{ color: C.muted, fontWeight: 600 }}>+{c.dial}</span>
                  </button>
                );
              })}
            </div>
          </div>
          </div>,
          document.body
        )}
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
        placeholder={country.placeholder}
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
