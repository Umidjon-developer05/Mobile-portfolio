"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";

const images = [
  {
    src: "/images/image1.avif",
    alt: "Task Management App 1",
    color: "from-purple-500 to-pink-500",
  },
  {
    src: "/images/image2.webp",
    alt: "Task Management App 2",
    color: "from-blue-500 to-cyan-500",
  },
  {
    src: "/images/image3.webp",
    alt: "Task Management App 3",
    color: "from-green-500 to-emerald-500",
  },
  {
    src: "/images/image4.jpeg",
    alt: "Task Management App 4",
    color: "from-orange-500 to-red-500",
  },
  {
    src: "/images/image5.jpeg",
    alt: "Task Management App 5",
    color: "from-violet-500 to-purple-500",
  },
  {
    src: "/images/image6.webp",
    alt: "Task Management App 6",
    color: "from-teal-500 to-blue-500",
  },
  {
    src: "/images/image7.webp",
    alt: "Task Management App 7",
    color: "from-rose-500 to-pink-500",
  },
];

const shapeVariants = [
  {
    shape: "rounded-full",
    name: "Circle",
    rotation: 360,
    scale: 1.2,
    glow: "shadow-[0_0_50px_rgba(147,51,234,0.8)]",
  },
  {
    shape: "rounded-none",
    name: "Diamond",
    rotation: 45,
    scale: 1.15,
    glow: "shadow-[0_0_50px_rgba(59,130,246,0.8)]",
  },
  {
    shape: "rounded-3xl",
    name: "Rounded",
    rotation: -15,
    scale: 1.25,
    glow: "shadow-[0_0_50px_rgba(34,197,94,0.8)]",
  },
  {
    shape: "rounded-tl-full rounded-br-full",
    name: "Leaf",
    rotation: 180,
    scale: 1.1,
    glow: "shadow-[0_0_50px_rgba(249,115,22,0.8)]",
  },
  {
    shape: "rounded-tr-full rounded-bl-full",
    name: "Wave",
    rotation: -180,
    scale: 1.3,
    glow: "shadow-[0_0_50px_rgba(139,92,246,0.8)]",
  },
  {
    shape: "rounded-t-full",
    name: "Arc Top",
    rotation: 90,
    scale: 1.2,
    glow: "shadow-[0_0_50px_rgba(20,184,166,0.8)]",
  },
  {
    shape: "rounded-b-full",
    name: "Arc Bottom",
    rotation: -90,
    scale: 1.15,
    glow: "shadow-[0_0_50px_rgba(244,63,94,0.8)]",
  },
];

const Particle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-white rounded-full opacity-70"
    initial={{
      x: Math.random() * 300,
      y: Math.random() * 400,
      scale: 0,
      opacity: 0,
    }}
    animate={{
      x: Math.random() * 300,
      y: Math.random() * 400,
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
);

export default function ScrollingImages() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-1400, 0],
    ["hsl(280, 100%, 95%)", "hsl(240, 100%, 95%)"]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      style={{ background }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto relative">
          {/* Title with floating animation */}
          <motion.div
            className="text-center mb-16 relative z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Task Management Apps
            </motion.h1>
            <motion.p
              className="text-xl text-gray-700 font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Hover over images to see magical transformations ✨
            </motion.p>
          </motion.div>

          <div className="relative overflow-hidden rounded-3xl">
            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                padding: "4px",
                background:
                  "conic-gradient(from 0deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)",
              }}
            />

            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 m-1">
              <motion.div
                className="flex gap-8"
                style={{ x }}
                animate={{
                  x: isPaused ? undefined : [0, -1400],
                }}
                transition={{
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* First set of images */}
                {images.map((image, index) => (
                  <motion.div
                    key={`first-${index}`}
                    className="flex-shrink-0 relative group"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileHover={{
                      scale: shapeVariants[index].scale,
                      zIndex: 20,
                      rotateY: [0, 15, -15, 0],
                      rotateX: [0, 10, -10, 0],
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      rotateY: {
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      },
                      rotateX: {
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      },
                    }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl ${shapeVariants[index].glow} opacity-0 group-hover:opacity-100`}
                      animate={{
                        opacity: hoveredIndex === index ? [0, 1, 0.7, 1] : 0,
                        scale: hoveredIndex === index ? [1, 1.1, 1.05, 1.1] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat:
                          hoveredIndex === index ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                      }}
                    />

                    <motion.div
                      className={`w-64 h-80 overflow-hidden shadow-2xl transition-all duration-700 relative ${
                        hoveredIndex === index
                          ? shapeVariants[index].shape
                          : "rounded-2xl"
                      }`}
                      animate={{
                        rotate:
                          hoveredIndex === index
                            ? [0, shapeVariants[index].rotation, 0]
                            : 0,
                        borderRadius: hoveredIndex === index ? "50%" : "1rem",
                      }}
                      transition={{
                        rotate: { duration: 1.5, ease: "easeInOut" },
                        borderRadius: { duration: 0.8, ease: "easeInOut" },
                      }}
                    >
                      {/* Gradient overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${image.color} opacity-0 mix-blend-overlay`}
                        animate={{
                          opacity: hoveredIndex === index ? 0.6 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      />

                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        width={256}
                        height={320}
                        className="w-full h-full object-cover"
                      />

                      {/* Floating particles on hover */}
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <div className="absolute inset-0 pointer-events-none">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full"
                                initial={{
                                  x: 128,
                                  y: 160,
                                  scale: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  x: Math.random() * 256,
                                  y: Math.random() * 320,
                                  scale: [0, 1, 0],
                                  opacity: [0, 1, 0],
                                }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                  duration: 2,
                                  delay: i * 0.1,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeOut",
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Enhanced hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center opacity-0 rounded-2xl"
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        y: hoveredIndex === index ? 0 : 20,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <motion.div
                        className="text-white text-center p-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: hoveredIndex === index ? 0 : 20,
                          opacity: hoveredIndex === index ? 1 : 0,
                        }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <motion.h3
                          className="text-2xl font-bold mb-2"
                          animate={{
                            scale: hoveredIndex === index ? [1, 1.1, 1] : 1,
                          }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          App Design {index + 1}
                        </motion.h3>
                        <motion.p
                          className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
                          animate={{
                            boxShadow:
                              hoveredIndex === index
                                ? [
                                    "0 0 0 rgba(255,255,255,0.5)",
                                    "0 0 20px rgba(255,255,255,0.8)",
                                    "0 0 0 rgba(255,255,255,0.5)",
                                  ]
                                : "0 0 0 rgba(255,255,255,0.5)",
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          {shapeVariants[index].name} Transform
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Duplicate set for seamless loop */}
                {images.map((image, index) => (
                  <motion.div
                    key={`second-${index}`}
                    className="flex-shrink-0 relative group"
                    onMouseEnter={() => setHoveredIndex(index + 7)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileHover={{
                      scale: shapeVariants[index].scale,
                      zIndex: 20,
                      rotateY: [0, 15, -15, 0],
                      rotateX: [0, 10, -10, 0],
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      rotateY: {
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      },
                      rotateX: {
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      },
                    }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl ${shapeVariants[index].glow} opacity-0 group-hover:opacity-100`}
                      animate={{
                        opacity:
                          hoveredIndex === index + 7 ? [0, 1, 0.7, 1] : 0,
                        scale:
                          hoveredIndex === index + 7 ? [1, 1.1, 1.05, 1.1] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat:
                          hoveredIndex === index + 7
                            ? Number.POSITIVE_INFINITY
                            : 0,
                        ease: "easeInOut",
                      }}
                    />

                    <motion.div
                      className={`w-64 h-80 overflow-hidden shadow-2xl transition-all duration-700 relative ${
                        hoveredIndex === index + 7
                          ? shapeVariants[index].shape
                          : "rounded-2xl"
                      }`}
                      animate={{
                        rotate:
                          hoveredIndex === index + 7
                            ? [0, shapeVariants[index].rotation, 0]
                            : 0,
                        borderRadius:
                          hoveredIndex === index + 7 ? "50%" : "1rem",
                      }}
                      transition={{
                        rotate: { duration: 1.5, ease: "easeInOut" },
                        borderRadius: { duration: 0.8, ease: "easeInOut" },
                      }}
                    >
                      {/* Gradient overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${image.color} opacity-0 mix-blend-overlay`}
                        animate={{
                          opacity: hoveredIndex === index + 7 ? 0.6 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      />

                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        width={256}
                        height={320}
                        className="w-full h-full object-cover"
                      />

                      {/* Floating particles on hover */}
                      <AnimatePresence>
                        {hoveredIndex === index + 7 && (
                          <div className="absolute inset-0 pointer-events-none">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full"
                                initial={{
                                  x: 128,
                                  y: 160,
                                  scale: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  x: Math.random() * 256,
                                  y: Math.random() * 320,
                                  scale: [0, 1, 0],
                                  opacity: [0, 1, 0],
                                }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                  duration: 2,
                                  delay: i * 0.1,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeOut",
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Enhanced hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center opacity-0 rounded-2xl"
                      animate={{
                        opacity: hoveredIndex === index + 7 ? 1 : 0,
                        y: hoveredIndex === index + 7 ? 0 : 20,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <motion.div
                        className="text-white text-center p-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: hoveredIndex === index + 7 ? 0 : 20,
                          opacity: hoveredIndex === index + 7 ? 1 : 0,
                        }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <motion.h3
                          className="text-2xl font-bold mb-2"
                          animate={{
                            scale: hoveredIndex === index + 7 ? [1, 1.1, 1] : 1,
                          }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          App Design {index + 1}
                        </motion.h3>
                        <motion.p
                          className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
                          animate={{
                            boxShadow:
                              hoveredIndex === index + 7
                                ? [
                                    "0 0 0 rgba(255,255,255,0.5)",
                                    "0 0 20px rgba(255,255,255,0.8)",
                                    "0 0 0 rgba(255,255,255,0.5)",
                                  ]
                                : "0 0 0 rgba(255,255,255,0.5)",
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          {shapeVariants[index].name} Transform
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Enhanced status indicator */}
          <motion.div
            className="text-center mt-12"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm font-medium text-lg ${
                isPaused
                  ? "bg-red-500/20 text-red-700 border border-red-300"
                  : "bg-green-500/20 text-green-700 border border-green-300"
              }`}
              animate={{
                boxShadow: isPaused
                  ? [
                      "0 0 0 rgba(239,68,68,0.4)",
                      "0 0 20px rgba(239,68,68,0.6)",
                      "0 0 0 rgba(239,68,68,0.4)",
                    ]
                  : [
                      "0 0 0 rgba(34,197,94,0.4)",
                      "0 0 20px rgba(34,197,94,0.6)",
                      "0 0 0 rgba(34,197,94,0.4)",
                    ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  isPaused ? "bg-red-500" : "bg-green-500"
                }`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
              {isPaused
                ? "⏸️ Animation Paused - Move mouse away to continue"
                : "▶️ Scrolling automatically..."}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
