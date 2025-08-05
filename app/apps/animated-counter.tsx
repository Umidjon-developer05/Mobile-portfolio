"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface AnimatedCounterProps {
  value: string;
}

export function AnimatedCounter({ value }: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    // Extract number from string like "2.5K+" or "1.8K+"
    const numericValue = Number.parseFloat(value.replace(/[^\d.]/g, ""));
    if (!isNaN(numericValue)) {
      animate(count, numericValue, { duration: 1 });
    }
  }, [value, count]);

  return (
    <motion.span>
      {value.includes("K") ? (
        <>
          <motion.span>{rounded}</motion.span>K+
        </>
      ) : (
        value
      )}
    </motion.span>
  );
}
