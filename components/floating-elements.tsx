"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingElements() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Faqat brauzerda ishlaydi
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const elements = [
    { icon: "📱", delay: 0, duration: 20 },
    { icon: "⚡", delay: 2, duration: 25 },
    { icon: "🚀", delay: 4, duration: 30 },
    { icon: "💡", delay: 6, duration: 22 },
    { icon: "🎨", delay: 8, duration: 28 },
  ];

  if (dimensions.width === 0) return null; // Ekran o'lchami hali aniqlanmagan

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-20 dark:opacity-10"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
            rotate: [0, 360],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "linear",
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
}
