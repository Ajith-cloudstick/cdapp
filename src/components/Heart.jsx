import { C } from "../utils/tokens";

const HM = [
  [0,0,1,1,1,0,0,0,1,1,1,0,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,0,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0],
];

export function Heart({ sz=8, gap=1.5, bloom=false, pulse=false, opacity=1, animName="pixelBloom" }) {
  const CR = Math.floor(HM.length / 2), CC = Math.floor(HM[0].length / 2);
  return (
    <div style={{ display:"inline-flex", flexDirection:"column", gap, opacity, animation:pulse?"heartPulse 4s ease-in-out 1s infinite":"none" }}>
      {HM.map((row,r) => (
        <div key={r} style={{ display:"flex", gap }}>
          {row.map((c,i) => {
            const dist = Math.sqrt((r-CR)**2+(i-CC)**2);
            return <div key={i} style={{ width:sz, height:sz, background:c?C.red:"transparent", borderRadius:1, animation:c&&bloom?`${animName} .38s cubic-bezier(.34,1.56,.64,1) ${dist*.052}s both`:"none" }} />;
          })}
        </div>
      ))}
    </div>
  );
}

export function SplashHeart() {
  const SZ = 9, STEP = 10.5;
  const COLS = HM[0].length, ROWS = HM.length;
  const W = COLS * STEP - 1.5, H = ROWS * STEP - 1.5;
  const CR = Math.floor(ROWS / 2), CC = Math.floor(COLS / 2);
  const MAX_DIST = Math.sqrt(CR * CR + (COLS - 1 - CC) ** 2);
  return (
    <div style={{ position:"relative", width:W, height:H }}>
      {HM.flatMap((row, r) =>
        row.map((c, col) => {
          if (!c) return null;
          const dist  = Math.sqrt((r - CR) ** 2 + (col - CC) ** 2);
          const delay = (dist / MAX_DIST) * 0.5;
          return (
            <div key={`${r}-${col}`} style={{
              position:"absolute", left:col*STEP, top:r*STEP,
              width:SZ, height:SZ, background:C.red, borderRadius:1,
              animationName:"pixelPop",
              animationDuration:".42s",
              animationDelay:`${delay}s`,
              animationTimingFunction:"cubic-bezier(.34,1.56,.64,1)",
              animationFillMode:"both",
            }} />
          );
        })
      )}
    </div>
  );
}

const CM = [
  [0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
];

export function CoffeeCup({ sz=6, gap=1.5 }) {
  return (
    <div style={{ display:"inline-flex", flexDirection:"column", gap }}>
      {CM.map((row,r) => (
        <div key={r} style={{ display:"flex", gap }}>
          {row.map((c,i) => <div key={i} style={{ width:sz, height:sz, background:c?C.red:"transparent", borderRadius:1 }} />)}
        </div>
      ))}
    </div>
  );
}

export function FloatingHearts() {
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      {[{l:"10%",d:.3,s:8,t:3},{l:"28%",d:1.2,s:6,t:3.6},{l:"52%",d:.6,s:9,t:2.8},{l:"74%",d:1.7,s:5,t:3.8},{l:"88%",d:.9,s:7,t:3.3}].map((h,i)=>(
        <div key={i} style={{ position:"absolute", bottom:"6%", left:h.l, animation:`floatUp ${h.t}s ease-in-out ${h.d}s infinite` }}>
          <svg width={h.s*2} height={h.s*2} viewBox="0 0 24 24" fill={C.red} opacity={0.35}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      ))}
    </div>
  );
}
