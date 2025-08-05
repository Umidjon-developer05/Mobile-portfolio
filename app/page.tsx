"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Download,
  Star,
  Sparkles,
  Zap,
  Heart,
  Code2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedCounter } from "@/components/animated-counter";
import { FloatingElements } from "@/components/floating-elements";
import { GradientText } from "@/components/gradient-text";
import ScrollingImages from "@/components/scrolling-images";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const featuredApps = [
    {
      id: 1,
      name: "TaskFlow",
      image: "/mushuk.jpg?height=400&width=200",
      description: "Smart task management with AI-powered scheduling",
      downloads: "2.5K+",
      rating: "4.8",
      color: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      name: "WeatherPro",
      image: "/obhavo.jpg?height=400&width=200",
      description: "Beautiful weather forecasts with location-based alerts",
      downloads: "5.1K+",
      rating: "4.9",
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: 3,
      name: "FitTracker",
      image: "/sport.avif?height=400&width=200",
      description: "Comprehensive fitness tracking with social features",
      downloads: "3.2K+",
      rating: "4.7",
      color: "from-green-500 to-emerald-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.17, 0.67, 0.83, 0.67], // Use a valid cubic bezier easing
      },
    } as const,
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-indigo-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge
                variant="secondary"
                className="mb-4 px-6 py-3 text-sm bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 border-0 shadow-lg"
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                  className="mr-2"
                >
                  🇺🇿
                </motion.span>
                Based in Uzbekistan
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6"
              variants={itemVariants}
            >
              Hi, I'm{" "}
              <GradientText className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                Umidjon
              </GradientText>
              <motion.span
                animate={{ rotate: [0, 20, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                }}
                className="inline-block ml-2"
              >
                👋
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              I craft useful and beautiful mobile apps for real-life needs{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
                className="inline-block"
              >
                ❤️
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Animated Hero Banner */}
          <motion.div
            className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-8 px-8 rounded-3xl mb-12 shadow-2xl overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-30"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <div className="relative z-10">
              <motion.h2
                className="text-2xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Sparkles className="w-8 h-8" />
                Mobile apps made with care
                <Heart className="w-8 h-8 text-red-300" />
              </motion.h2>
              <motion.p
                className="text-indigo-100 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Turning ideas into reality, one app at a time
              </motion.p>
            </div>
          </motion.div>

          {/* Featured Apps Carousel with Enhanced Animations */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
          >
            {featuredApps.map((app, index) => (
              <motion.div
                key={app.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  scale: 1.02,
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <CardContent className="p-6 relative z-10">
                    <motion.div
                      className="relative mb-4 mx-auto w-32 h-56 rounded-2xl overflow-hidden shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={app.image || "/placeholder.svg"}
                        alt={app.name}
                        fill
                        className="object-cover"
                      />
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>

                    <motion.h3
                      className="text-xl font-bold text-slate-900 dark:text-white mb-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      {app.name}
                    </motion.h3>

                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {app.description}
                    </p>

                    <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                      <motion.div
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Download className="w-4 h-4" />
                        <AnimatedCounter value={app.downloads} />
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {app.rating}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Link href="/apps">
                  <Zap className="mr-2 w-5 h-5" />
                  Explore My Apps
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/about">
                  <Code2 className="mr-2 w-5 h-5" />
                  Check My Work
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      <ScrollingImages />
      {/* Enhanced Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-white via-indigo-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 15, suffix: "+", label: "Apps Built", icon: "📱" },
              { value: 10, suffix: "K+", label: "Downloads", icon: "⬇️" },
              { value: 4.8, suffix: "⭐", label: "Avg Rating", icon: "⭐" },
              { value: 2, suffix: "+", label: "Years Experience", icon: "🚀" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="group"
              >
                <motion.div
                  className="text-4xl mb-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3 + index,
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Enhanced Tech Stack Preview */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Built with{" "}
            <GradientText className="bg-gradient-to-r from-indigo-600 to-purple-600">
              Modern Tech
            </GradientText>
          </motion.h2>

          <motion.p
            className="text-slate-600 dark:text-slate-300 mb-12 text-lg"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Using cutting-edge technologies to create amazing experiences
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              "React Native",
              "Firebase",
              "Zustand",
              "TypeScript",
              "Expo",
              "Node.js",
            ].map((tech, index) => (
              <motion.div
                key={tech}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="secondary"
                  className="px-6 py-3 text-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 cursor-pointer transition-all duration-300"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
