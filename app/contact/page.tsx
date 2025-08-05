"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, Send, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend or email service
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Get In Touch 📬
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Got a project or idea? Let's make it real! I'm always excited to
            work on new challenges and bring innovative ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Send me a message</CardTitle>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or idea..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Thanks for reaching out! I'll get back to you soon.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Contact Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Prefer a more direct approach? Reach out to me through these
                  channels:
                </p>

                <Button
                  asChild
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Link href="https://t.me/Umidjon" target="_blank">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Message on Telegram
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <Link href="mailto:Umidjon@example.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Send Email
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                  ⚡ Response Time
                </h3>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span>Telegram:</span>
                    <span className="font-medium">
                      Usually within 1-2 hours
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact Form:</span>
                    <span className="font-medium">Within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What I Can Help With */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                  🚀 What I Can Help With
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>• Mobile app development (React Native)</li>
                  <li>• Cross-platform app solutions</li>
                  <li>• App store deployment & optimization</li>
                  <li>• UI/UX design consultation</li>
                  <li>• Code review & optimization</li>
                  <li>• Technical consulting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
