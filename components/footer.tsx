import Link from "next/link";
import { Smartphone, Github, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                AppNest
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Your Mobile App Showroom - Crafting beautiful and useful mobile
              applications.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/apps"
                  className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Apps
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Featured Apps
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  TaskFlow
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  WeatherPro
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  FitTracker
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  RecipeBook
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <Link
                href="https://t.me/Umidjon"
                target="_blank"
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:Umidjon@example.com"
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Mail className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/Umidjon"
                target="_blank"
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            © {new Date().getFullYear()} AppNest by Umidjon. Made with ❤️ in
            Uzbekistan 🇺🇿
          </p>
        </div>
      </div>
    </footer>
  );
}
