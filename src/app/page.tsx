

"use client";

import { Hero } from "@/components/home/hero";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { type ImagePlaceholder } from "@/lib/placeholder-images";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { ProjectSectionHeader } from "@/components/home/project-section-header";
import { motion } from "framer-motion";
import { BlogSection } from "@/components/home/blog-section";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstagramBadge } from "@/components/home/instagram-badge";
import { GithubBadge } from "@/components/home/github-badge";
import { YoutubeBadge } from "@/components/home/youtube-badge";
import { LinkedInBadge } from "@/components/home/linkedin-badge";
import { ExperienceSection } from "@/components/home/experience-section";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const imageMap = PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as Record<string, ImagePlaceholder>);

  return (
    <>
      <Hero />
      <div id="work" className="container mx-auto px-4 pt-16 sm:px-6 lg:px-8 sm:pt-24">
        <ProjectSectionHeader />

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 pb-16 sm:pb-24">
          {projects.map((project, index) => {
            const image = imageMap[project.imageId];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
                className="fade-in-stagger"
              >
                <ProjectCard project={project} image={image} />
              </motion.div>
            );
          })}
        </section>
      </div>
      <AboutSection />
      <ExperienceSection />
      <div className="max-w-5xl mx-auto px-4">
        <Separator />
      </div>
      <BlogSection />
      <section className="py-16 sm:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Me on Social Media
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                Connect with me to see my professional journey, achievements, and to network with other professionals in our industry.
            </p>
            <div className="flex justify-center gap-8 mt-8">
              <Link href="https://github.com/kkbro07" aria-label="GitHub" target="_blank">
                <Button variant="outline" size="icon">
                  <Github />
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/kirtankalathiya/" aria-label="LinkedIn" target="_blank">
                <Button variant="outline" size="icon">
                  <Linkedin />
                </Button>
              </Link>
              <Link href="#" aria-label="Twitter">
                <Button variant="outline" size="icon">
                  <Twitter />
                </Button>
              </Link>
              <Link href="https://www.instagram.com/kirtankalathiyas/" aria-label="Instagram" target="_blank">
                <Button variant="outline" size="icon">
                  <Instagram />
                </Button>
              </Link>
              <Link href="https://www.youtube.com/@kirtankalathiya" aria-label="YouTube" target="_blank">
                <Button variant="outline" size="icon">
                  <Youtube />
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center items-start gap-8 mt-8">
              {mounted && <LinkedInBadge />}
              {mounted && <GithubBadge />}
              {mounted && <YoutubeBadge />}
              {mounted && <InstagramBadge />}
            </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
