import { useState, useEffect, useRef } from "react";

export function useCountUp(target, ms=1600) {
  const [n, setN] = useState(0);
  const currentRef = useRef(0);

  useEffect(() => {
    if (target == null) return;
    
    const start = currentRef.current;
    const diff = target - start;
    if (diff === 0) return;

    const t0 = Date.now(); let raf;
    const tick = () => {
      const p = Math.min((Date.now()-t0)/ms, 1);
      const val = Math.round(start + diff * (1-Math.pow(1-p,4)));
      setN(val);
      currentRef.current = val;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);

  return n;
}
