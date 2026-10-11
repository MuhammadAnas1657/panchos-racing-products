import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({
  value,
  suffix = '',
  decimals = 0,
  duration = 2.5,
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [value, duration]);

  return (
    <span className="font-heading font-bold text-white tracking-tight flex items-center">
      <motion.span>{rounded}</motion.span>
      {suffix && <span className="text-cyan-400 ml-0.5">{suffix}</span>}
    </span>
  );
};
