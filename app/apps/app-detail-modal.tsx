"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Github,
  Star,
  Calendar,
  Smartphone,
  HardDrive,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface AppDetailModalProps {
  app: any;
  isOpen: boolean;
  onClose: () => void;
}

export function AppDetailModal({ app, isOpen, onClose }: AppDetailModalProps) {
  if (!app) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden">
              <Image
                src={app.image || "/placeholder.svg"}
                alt={app.name}
                fill
                className="object-cover"
              />
            </div>
            {app.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Screenshots */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Screenshots</h3>
            <div className="grid grid-cols-2 gap-4">
              {app.screenshots
                ?.slice(0, 4)
                .map((screenshot: string, index: number) => (
                  <motion.div
                    key={index}
                    className="relative aspect-[9/16] rounded-lg overflow-hidden shadow-md"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={screenshot || "/placeholder.svg"}
                      alt={`Screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
            </div>
          </div>

          {/* App Details */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {app.longDescription}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {app.technologies?.map((tech: string) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Key Features */}
            {app.features && app.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="space-y-1">
                  {app.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* App Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Rating: {app.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-blue-500" />
                <span>Downloads: {app.downloads}</span>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-green-500" />
                <span>Size: {app.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span>Updated: {app.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-orange-500" />
                <span>Version: {app.version}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 text-red-500">⚙️</span>
                <span>Requires: {app.requirements}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button asChild className="flex-1">
                <Link href={app.apkUrl}>
                  <Download className="w-4 h-4 mr-2" />
                  Download APK
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={app.githubUrl}>
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={app.playStoreUrl}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Play Store
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
