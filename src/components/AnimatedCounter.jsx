import { useState, useEffect, useRef } from 'react';

/**
 * Animated counter that counts up from 0 to the target value.
 * @param {Object} props
 * @param {number} props.value - Target value to count to
 * @param {number} props.duration - Animation duration in ms
 * @param {boolean} props.animate - Whether to animate
 */
export default function AnimatedCounter({ value = 0, duration = 1000, animate = true }) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef(null);
  const rafId = useRef(null);
  const prevValue = useRef(0);

  useEffect(() => {
    if (!animate || value === prevValue.current) {
      setDisplayValue(value);
      prevValue.current = value;
      return;
    }

    const startVal = prevValue.current;
    const diff = value - startVal;
    if (diff === 0) {
      setDisplayValue(value);
      return;
    }

    startTime.current = null;

    const step = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = progress * (2 - progress);
      setDisplayValue(Math.round(startVal + diff * eased));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
        prevValue.current = value;
      }
    };

    rafId.current = requestAnimationFrame(step);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [value, duration, animate]);

  return <span>{displayValue.toLocaleString()}</span>;
}