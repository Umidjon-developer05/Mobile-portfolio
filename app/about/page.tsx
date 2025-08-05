import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  MessageCircle,
  Github,
  Code,
  Smartphone,
  Database,
  Palette,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const skills = [
    {
      category: "Mobile Development",
      icon: Smartphone,
      techs: ["React Native", "Expo", "TypeScript", "JavaScript"],
    },
    {
      category: "Backend & Database",
      icon: Database,
      techs: ["Firebase", "Node.js", "SQLite", "MongoDB"],
    },
    {
      category: "State Management",
      icon: Code,
      techs: ["Zustand", "Redux", "Context API", "AsyncStorage"],
    },
    {
      category: "Design & UI",
      icon: Palette,
      techs: ["React Native Elements", "NativeBase", "Styled Components"],
    },
  ];

  const experience = [
    {
      title: "Mobile App Developer",
      period: "2022 - Present",
      description:
        "Developing cross-platform mobile applications using React Native and modern development practices.",
    },
    {
      title: "Freelance Developer",
      period: "2021 - 2022",
      description:
        "Built custom mobile solutions for small businesses and startups, focusing on user experience and performance.",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-xl">
            <Image
              src="/image.png?height=128&width=128"
              alt="Umidjon"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About Me 👨‍💻
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            I'm Umidjon, a passionate mobile developer from Uzbekistan. With
            over 2+ years of experience, I specialize in creating beautiful and
            functional mobile applications using React Native.
          </p>
        </div>

        {/* Bio Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              My Story
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Started my journey in mobile development 2+ years ago with a
                simple goal: create apps that solve real problems. What began as
                curiosity about how mobile apps work has evolved into a passion
                for crafting beautiful, functional applications that make
                people's lives easier.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                I specialize in React Native development, building
                cross-platform apps that feel native on both iOS and Android. My
                approach combines clean code practices with user-centered
                design, ensuring every app I build is both technically sound and
                delightful to use.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community. I believe in continuous learning and
                staying updated with the latest trends in mobile development.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Technologies I Work With
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <Card
                key={skill.category}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                      <skill.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {skill.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.techs.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <Badge variant="outline" className="w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Buttons */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Let's Connect! 🤝
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Link href="https://t.me/umidjon_dasturchi" target="_blank">
                <MessageCircle className="w-5 h-5 mr-2" />
                Telegram
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="mailto:umidjongafforov175@gmail.com" target="_blank">
                <Mail className="w-5 h-5 mr-2" />
                Email
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href="https://github.com/Umidjon-developer05"
                target="_blank"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
