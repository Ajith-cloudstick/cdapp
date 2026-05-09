export function injectGlobalStyles() {
  if (document.getElementById("caw-fonts")) return;

  const f = document.createElement("link");
  f.id  = "caw-fonts";
  f.rel = "stylesheet";
  f.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap";
  document.head.appendChild(f);

  const s = document.createElement("style");
  s.id = "caw-global";
  s.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { -webkit-text-size-adjust: 100%; }
    body {
      background: #e8ddc8;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    @keyframes pixelBloom {
      0%   { opacity:0; transform:scale(0) rotate(-15deg); }
      65%  { transform:scale(1.18) rotate(2deg); }
      100% { opacity:1; transform:scale(1) rotate(0deg); }
    }
    @keyframes heartPulse {
      0%,100% { transform:scale(1); }
      50%      { transform:scale(1.04); }
    }
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(16px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity:0; }
      to   { opacity:1; }
    }
    @keyframes slideR {
      from { opacity:0; transform:translateX(40px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes slideL {
      from { opacity:0; transform:translateX(-40px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes lineGrow {
      from { transform:scaleX(0); }
      to   { transform:scaleX(1); }
    }
    @keyframes shimmer {
      from { left:-120%; }
      to   { left:200%; }
    }
    @keyframes shake {
      0%,100%    { transform:translateX(0); }
      20%,60%    { transform:translateX(-5px); }
      40%,80%    { transform:translateX(5px); }
    }
    @keyframes popIn {
      0%   { transform:scale(0.5); opacity:0; }
      65%  { transform:scale(1.14); }
      100% { transform:scale(1); opacity:1; }
    }
    @keyframes floatUp {
      0%   { opacity:0; transform:translateY(0) scale(0.8); }
      12%  { opacity:0.45; }
      88%  { opacity:0.18; }
      100% { opacity:0; transform:translateY(-80px) scale(1.05); }
    }
    @keyframes pixelPop {
      0%   { opacity:0; transform:scale(0); }
      70%  { transform:scale(1.25); opacity:1; }
      100% { transform:scale(1); opacity:1; }
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; }
    input[type=number] { -moz-appearance:textfield; }
    input:focus { outline:none; }

    .btn-primary {
      position:relative; overflow:hidden;
      transition:transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .18s;
    }
    .btn-primary::after {
      content:''; position:absolute; top:0; left:-120%;
      width:55%; height:100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
      pointer-events:none;
    }
    .btn-primary:not(:disabled):hover { transform:translateY(-1px); box-shadow:0 8px 28px rgba(154,0,2,.26); }
    .btn-primary:not(:disabled):hover::after { animation:shimmer .55s ease; }
    .btn-primary:not(:disabled):active { transform:scale(.97); box-shadow:none; }

    .field { transition:border-color .18s, box-shadow .2s cubic-bezier(.16,1,.3,1); }
    .field:focus { border-color:#9A0002 !important; box-shadow:0 0 0 3px rgba(154,0,2,.1); }

    .card-lift { transition:transform .2s cubic-bezier(.34,1.2,.64,1), box-shadow .2s; }
    .card-lift:hover { transform:translateY(-3px); box-shadow:0 10px 32px rgba(154,0,2,.08); }

    .card-click { cursor:pointer; transition:transform .18s, box-shadow .18s; }
    .card-click:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(154,0,2,.09); }
    .card-click:active { transform:scale(.99); }

    .row-hover { transition:transform .18s cubic-bezier(.34,1.56,.64,1); }
    .row-hover:hover { transform:translateX(4px); }

    .back-btn { transition:transform .15s, opacity .15s; }
    .back-btn:hover { transform:translateX(-3px); opacity:.6; }

    .nav-btn { transition:color .18s, transform .18s; }
    .nav-btn:hover { transform:translateY(-1px); }

    .link { position:relative; }
    .link::after { content:''; position:absolute; bottom:-1px; left:0; width:100%; height:1px; background:#9A0002; transform:scaleX(0); transform-origin:left; transition:transform .2s; }
    .link:hover::after { transform:scaleX(1); }

    .shake { animation:shake .34s cubic-bezier(.36,.07,.19,.97) both; }

    /* Centralized app shell */
    .app-shell {
      max-width: 480px;
      margin: 0 auto;
      min-height: 100svh;
      background: #fbfaf4;
      position: relative;
    }
    @media (min-width: 520px) {
      body { display: flex; align-items: flex-start; justify-content: center; min-height: 100svh; }
      .app-shell {
        min-height: 100svh;
        box-shadow: 0 0 0 1px rgba(27,23,23,.06), 0 24px 64px rgba(27,23,23,.12);
      }
    }
  `;
  document.head.appendChild(s);
}
