"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  Github,
  Star,
  Users,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Play,
  Apple,
  ExternalLink,
  Heart,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface AppDetailModalProps {
  app: {
    id: number;
    name: string;
    image: string;
    description: string;
    longDescription: string;
    technologies: string[];
    downloads: string;
    rating: string;
    featured: boolean;
    category: string;
    apkUrl: string;
    githubUrl: string;
    color: string;
    screenshots?: string[];
    features?: string[];
    version?: string;
    size?: string;
    lastUpdated?: string;
    developer?: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
    requirements?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AppDetailModal({ app, isOpen, onClose }: AppDetailModalProps) {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!app) return null;

  // Default screenshots if not provided
  const screenshots = app.screenshots || [
    "/placeholder.svg?height=600&width=300&text=Screenshot+1",
    "/placeholder.svg?height=600&width=300&text=Screenshot+2",
    "/placeholder.svg?height=600&width=300&text=Screenshot+3",
    "/placeholder.svg?height=600&width=300&text=Screenshot+4",
    "/placeholder.svg?height=600&width=300&text=Screenshot+5",
  ];

  const features = app.features || [
    "Intuitive user interface",
    "Real-time synchronization",
    "Offline mode support",
    "Push notifications",
    "Data export functionality",
  ];

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white dark:bg-slate-900">
        <div className="relative">
          {/* Header with gradient */}
          <div
            className={`bg-gradient-to-r ${app.color} p-6 text-white relative overflow-hidden`}
          >
            <motion.div
              className="absolute inset-0 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            <DialogHeader className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={app.image || "/placeholder.svg"}
                      alt={app.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <div>
                    <DialogTitle className="text-2xl font-bold text-white mb-2">
                      {app.name}
                    </DialogTitle>
                    <p className="text-white/90 mb-2">
                      {app.developer || "Umidjon"}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {app.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {app.downloads}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {app.category}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isLiked ? "fill-red-400 text-red-400" : "text-white"
                      }`}
                    />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Screenshots Carousel */}
            <section>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Screenshots
              </h3>

              <div className="relative">
                <div className="flex gap-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentScreenshot}
                      className="relative w-64 h-96 mx-auto rounded-2xl overflow-hidden shadow-2xl"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={
                          screenshots[currentScreenshot] || "/placeholder.svg"
                        }
                        alt={`${app.name} screenshot ${currentScreenshot + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation buttons */}
                <button
                  onClick={prevScreenshot}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextScreenshot}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-4">
                  {screenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScreenshot(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentScreenshot
                          ? "bg-indigo-600"
                          : "bg-slate-300 dark:bg-slate-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Download Buttons */}
            <section>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Download Options
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* APK Download */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    className="w-full h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Link href={app.apkUrl}>
                      <div className="flex flex-col items-center gap-1">
                        <Download className="w-6 h-6" />
                        <span className="text-sm font-medium">
                          Download APK
                        </span>
                      </div>
                    </Link>
                  </Button>
                </motion.div>

                {/* Play Store */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-16 bg-white dark:bg-slate-800 border-2"
                  >
                    <Link href={app.playStoreUrl || "#"}>
                      <div className="flex flex-col items-center gap-1">
                        <Play className="w-6 h-6 text-green-600" />
                        <span className="text-sm font-medium">Play Store</span>
                      </div>
                    </Link>
                  </Button>
                </motion.div>

                {/* App Store */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-16 bg-white dark:bg-slate-800 border-2"
                  >
                    <Link href={app.appStoreUrl || "#"}>
                      <div className="flex flex-col items-center gap-1">
                        <Apple className="w-6 h-6 text-slate-800 dark:text-white" />
                        <span className="text-sm font-medium">App Store</span>
                      </div>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </section>

            {/* App Information */}
            <section className="grid md:grid-cols-2 gap-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  About This App
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {app.longDescription}
                </p>

                {/* Features */}
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Technical Details */}
              <div className="space-y-6">
                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {app.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* App Details */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                      App Details
                    </h4>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Version:
                        </span>
                        <span className="font-medium">
                          {app.version || "1.0.0"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Size:
                        </span>
                        <span className="font-medium">
                          {app.size || "25 MB"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Last Updated:
                        </span>
                        <span className="font-medium">
                          {app.lastUpdated || "Dec 2024"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Requirements:
                        </span>
                        <span className="font-medium">
                          {app.requirements || "Android 6.0+"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* GitHub Link */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    <Link href={app.githubUrl}>
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
