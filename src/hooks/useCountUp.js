import { useState, useEffect } from "react";

export function useCountUp(target, ms=1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!target) return;
    const t0 = Date.now(); let raf;
    const tick = () => {
      const p = Math.min((Date.now()-t0)/ms, 1);
      setN(Math.round((1-Math.pow(1-p,4))*target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return n;
}
