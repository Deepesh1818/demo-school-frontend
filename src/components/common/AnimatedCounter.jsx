import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

export default function AnimatedCounter({ 
  value, 
  duration = 1500, // duration in ms
  suffix = '', 
  prefix = '',
  className = ''
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  // Extract clean number from value
  const targetNumber = typeof value === 'number' 
    ? value 
    : (parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setCount(targetNumber);
      return;
    }

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutQuad logic for natural slowdown
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * targetNumber);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, targetNumber, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
