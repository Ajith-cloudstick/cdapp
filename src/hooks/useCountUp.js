import { useState, useEffect, useRef } from "react";

// Two-phase count-up: races to (target - SLOW_TAIL) quickly,
// then crawls the final stretch so the last few numbers feel deliberate.
const SLOW_TAIL = 10;
const FAST_MS = 600;   // time spent on the rapid run-up
const SLOW_MS = 1400;  // time spent on the final tail

export function useCountUp(target, _ms) {
  const [n, setN] = useState(target ?? 0);
  const currentRef = useRef(target ?? 0);

  useEffect(() => {
    if (target == null) return;

    const start = currentRef.current;
    const diff = target - start;
    if (diff === 0) return;

    const dir = Math.sign(diff);
    const absDiff = Math.abs(diff);
    const tailSize = Math.min(SLOW_TAIL, absDiff);
    const fastSize = absDiff - tailSize;
    const handoff = start + dir * fastSize;

    // Allocate time only to phases that actually have distance to cover.
    const fastMs = fastSize > 0 ? FAST_MS : 0;
    const slowMs = tailSize > 0 ? SLOW_MS : 0;
    const totalMs = fastMs + slowMs;

    const t0 = Date.now();
    let raf;
    const tick = () => {
      const elapsed = Date.now() - t0;
      let val;
      if (elapsed >= totalMs) {
        val = target;
      } else if (elapsed < fastMs) {
        // Fast phase — easeOutQuart, covers most of the distance.
        const p = elapsed / fastMs;
        val = start + dir * fastSize * (1 - Math.pow(1 - p, 4));
      } else {
        // Slow tail — gentle easeInOut over the last few numbers.
        const p = (elapsed - fastMs) / slowMs;
        const eased = p < 0.5
          ? 2 * p * p
          : 1 - Math.pow(-2 * p + 2, 2) / 2;
        val = handoff + dir * tailSize * eased;
      }
      const rounded = Math.round(val);
      setN(rounded);
      currentRef.current = rounded;
      if (elapsed < totalMs) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return n;
}
