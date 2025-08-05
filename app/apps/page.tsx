"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Github, Star, Sparkles, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AnimatedCounter } from "@/components/animated-counter";
import { AppDetailModal } from "@/components/app-detail-modal";
import {
  getMobileApps,
  getMobileCategories,
} from "@/service/mobile-apps.service";
import { MobileCategory, MobileApp } from "@/types";
// Type definitions based on API response
interface AppDetail {
  id: string;
  lastUpdated: string;
  requirements: string;
  size: string;
  stage: string;
  version: string;
}

interface AppImage {
  id: string;
  image: {
    url: string;
  };
}

interface KeyFeature {
  id: string;
  keyFeatures: string;
}

interface Language {
  id: string;
  languages: string;
}

interface Category {
  name: string;
  slug: string;
  id: string;
}

// Transform API data to component format
const transformAppData = (apiApp: MobileApp, index: number) => {
  const appDetail = Array.isArray(apiApp.appDetails)
    ? apiApp.appDetails[0]
    : apiApp.appDetails;
  const mainImage =
    apiApp.images[0]?.image?.url || "/placeholder.svg?height=400&width=200";

  return {
    id: index + 1,
    name: apiApp.title,
    image: mainImage,
    description:
      apiApp.about?.substring(0, 120) + "..." || "No description available",
    longDescription: apiApp.about || "No detailed description available",
    technologies: apiApp.languages?.map((lang) => lang.languages) || [],
    downloads: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(
      Math.random() * 9
    )}K+`,
    rating: (4.5 + Math.random() * 0.4).toFixed(1),
    featured: index < 3, // First 3 apps are featured
    category: getCategoryFromApp(apiApp),
    apkUrl: apiApp.dowlandApk || "#",
    githubUrl: apiApp.githubUrl || "#",
    color: getGradientFromBg(apiApp.backgroundColor?.css),
    screenshots: apiApp.images?.map((img) => img.image.url) || [mainImage],
    features: apiApp.keyFeatures?.map((feature) => feature.keyFeatures) || [],
    version: appDetail?.version || "1.0.0",
    size: appDetail?.size ? `${appDetail.size} MB` : "Unknown",
    lastUpdated: appDetail?.lastUpdated
      ? new Date(appDetail.lastUpdated).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "Recently",
    requirements: appDetail?.requirements || "Android 6.0+",
    playStoreUrl: "https://play.google.com/store",
    appStoreUrl: "https://apps.apple.com",
  };
};

const getCategoryFromApp = (app: MobileApp): string => {
  const title = app.title.toLowerCase();
  if (title.includes("weather")) return "utility";
  if (title.includes("task") || title.includes("productivity"))
    return "productivity";
  if (title.includes("health") || title.includes("fit")) return "health";
  if (title.includes("expense") || title.includes("finance")) return "finance";
  if (title.includes("recipe") || title.includes("lifestyle"))
    return "lifestyle";
  if (title.includes("study") || title.includes("education"))
    return "education";
  return "utility";
};

const getGradientFromBg = (bgColor?: string): string => {
  if (!bgColor) return "from-blue-500 to-purple-600";

  // Convert RGB to gradient classes (simplified)
  if (bgColor.includes("57,21,239")) return "from-indigo-600 to-purple-700";
  return "from-blue-500 to-purple-600";
};

const transformCategoryData = (apiCategories: Category[]) => {
  return apiCategories.map((cat) => ({
    id: cat.slug,
    name: cat.name.replace(/[📱⚡🛠️💪💰🎨📚]/gu, "").trim(),
    icon: cat.name.match(/[📱⚡🛠️💪💰🎨📚]/u)?.[0] || "📱",
  }));
};

export default function AppsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all-apps");
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apps, setApps] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both apps and categories
        const [appsResponse, categoriesResponse] = await Promise.all([
          getMobileApps(),
          getMobileCategories(),
        ]);

        console.log("Fetched mobile apps:", appsResponse);
        console.log("Fetched mobile categories:", categoriesResponse);

        // Transform and set apps data
        const transformedApps = appsResponse.map(
          (app: MobileApp, index: number) => transformAppData(app, index)
        );
        setApps(transformedApps);

        // Transform and set categories data
        const transformedCategories = transformCategoryData(categoriesResponse);
        setCategories(transformedCategories);

        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load apps data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.technologies.some((tech: string) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all-apps" ||
      app.category === selectedCategory.replace("-", "");

    return matchesSearch && matchesCategory;
  });

  const featuredApps = filteredApps.filter((app) => app.featured);
  const otherApps = filteredApps.filter((app) => !app.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    } as const,
  };

  const openAppDetail = (app: any) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const closeAppDetail = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            📱
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Loading Apps...
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Fetching the latest mobile applications
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Error Loading Apps
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            My Mobile Apps{" "}
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
              className="inline-block"
            >
              📱
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A collection of mobile applications I've built to solve real-world
            problems and enhance user experiences.
          </motion.p>
          <motion.div
            className="mt-4 text-sm text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Total Apps: <AnimatedCounter value={apps.length.toString()} />
          </motion.div>
        </motion.div>

        {/* Enhanced Search and Filter */}
        <motion.div
          className="mb-12 space-y-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg focus:shadow-xl transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Featured Apps */}
          {featuredApps.length > 0 && (
            <motion.section
              className="mb-16"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key="featured"
            >
              <motion.div
                className="flex items-center gap-3 mb-8"
                variants={itemVariants}
              >
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  <Sparkles className="inline-block w-8 h-8 mr-2 text-yellow-500" />
                  Featured Apps
                </h2>
                <Badge
                  variant="secondary"
                  className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 border-0"
                >
                  🏆 Best Apps
                </Badge>
              </motion.div>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
              >
                {featuredApps.map((app) => (
                  <motion.div
                    key={app.id}
                    variants={itemVariants}
                    whileHover={{
                      y: -10,
                      rotateY: 5,
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openAppDetail(app)}
                    className="cursor-pointer"
                    layout
                  >
                    <Card className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                      {/* Gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      <CardHeader className="pb-4 relative z-10">
                        <motion.div
                          className="relative mx-auto w-32 h-56 rounded-2xl overflow-hidden shadow-lg mb-4"
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
                        <CardTitle className="text-xl text-center">
                          {app.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 relative z-10">
                        <div className="flex flex-wrap gap-2">
                          {app.technologies.slice(0, 3).map((tech: string) => (
                            <motion.div key={tech} whileHover={{ scale: 1.1 }}>
                              <Badge
                                variant="outline"
                                className="text-xs bg-white/50 dark:bg-slate-700/50"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
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
                        <div className="flex gap-2 pt-2">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1"
                          >
                            <Button
                              asChild
                              size="sm"
                              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                            >
                              <Link href={app.apkUrl}>
                                <Download className="w-4 h-4 mr-2" />
                                Download APK
                              </Link>
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="bg-white/50 dark:bg-slate-700/50"
                            >
                              <Link href={app.githubUrl}>
                                <Github className="w-4 h-4" />
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}

          {/* Other Apps */}
          {otherApps.length > 0 && (
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key="other"
            >
              <motion.h2
                className="text-3xl font-bold text-slate-900 dark:text-white mb-8"
                variants={itemVariants}
              >
                📚 All Apps
              </motion.h2>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
              >
                {otherApps.map((app) => (
                  <motion.div
                    key={app.id}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openAppDetail(app)}
                    className="cursor-pointer"
                    layout
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg h-full">
                      <CardHeader className="pb-4">
                        <motion.div
                          className="relative mx-auto w-28 h-48 rounded-xl overflow-hidden shadow-md mb-4"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Image
                            src={app.image || "/placeholder.svg"}
                            alt={app.name}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                        <CardTitle className="text-lg text-center">
                          {app.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {app.technologies.slice(0, 3).map((tech: string) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs bg-white/50 dark:bg-slate-700/50"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">
                          {app.description}
                        </p>
                        <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            <AnimatedCounter value={app.downloads} />
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {app.rating}
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1"
                          >
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="w-full bg-white/50 dark:bg-slate-700/50"
                            >
                              <Link href={app.apkUrl}>
                                <Download className="w-4 h-4 mr-2" />
                                APK
                              </Link>
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="bg-white/50 dark:bg-slate-700/50"
                            >
                              <Link href={app.githubUrl}>
                                <Github className="w-4 h-4" />
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}

          {/* No Results */}
          {filteredApps.length === 0 && !loading && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              key="no-results"
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                🔍
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                No apps found
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* App Detail Modal */}
        <AppDetailModal
          app={selectedApp}
          isOpen={isModalOpen}
          onClose={closeAppDetail}
        />
      </motion.div>
    </div>
  );
}
