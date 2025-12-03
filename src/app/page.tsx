

"use client";

import { Hero } from "@/components/home/hero";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { type ImagePlaceholder } from "@/lib/placeholder-images";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { ProjectSectionHeader } from "@/components/home/project-section-header";
import { motion, useScroll, useTransform } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstagramBadge } from "@/components/home/instagram-badge";
import { GithubBadge } from "@/components/home/github-badge";
import { YoutubeBadge } from "@/components/home/youtube-badge";
import { LinkedInBadge } from "@/components/home/linkedin-badge";
import { ExperienceSection } from "@/components/home/experience-section";
import { SkillsSection } from "@/components/home/skills-section";
import { FaqSection } from "@/components/home/faq-section";
import { FeaturedProjectCard } from "@/components/home/featured-project-card";
import { ResumeSection } from "@/components/home/resume-section";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  const moreProjectsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: moreProjectsScrollYProgress } = useScroll({
    target: moreProjectsRef,
    offset: ["start end", "end start"],
  });
  const moreProjectsY = useTransform(moreProjectsScrollYProgress, [0, 1], [-100, 100]);
  const moreProjectsOpacity = useTransform(moreProjectsScrollYProgress, [0.4, 0.6], [0, 1]);


  useEffect(() => {
    setMounted(true);
  }, []);
  
  const imageMap = PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as Record<string, ImagePlaceholder>);

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <>
      <Hero />
      <div id="work" className="container mx-auto px-4 pt-16 sm:px-6 lg:px-8 sm:pt-24">
        <ProjectSectionHeader />

        <section className="flex flex-col gap-12 sm:gap-16">
          {featuredProjects.map((project, index) => {
             const image = imageMap[project.imageId];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: 'spring',
                  stiffness: 50,
                  damping: 20,
                  delay: index * 0.1,
                }}
              >
                <FeaturedProjectCard 
                  project={project} 
                  image={image} 
                  align={index % 2 === 0 ? 'left' : 'right'} 
                />
              </motion.div>
            )
          })}
        </section>

        {otherProjects.length > 0 && (
          <>
            <motion.div 
              ref={moreProjectsRef}
              style={{ y: moreProjectsY, opacity: moreProjectsOpacity }}
              className="my-16 sm:my-24 text-center"
            >
              <h3 className="font-headline text-3xl font-bold tracking-tighter">
                More Projects
              </h3>
            </motion.div>
            <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 pb-16 sm:pb-24">
              {otherProjects.map((project, index) => {
                const image = imageMap[project.imageId];
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      type: 'spring',
                      stiffness: 50,
                      damping: 20,
                      delay: index * 0.1,
                    }}
                  >
                    <ProjectCard project={project} image={image} />
                  </motion.div>
                );
              })}
            </section>
          </>
        )}
      </div>
      <AboutSection>
        <ExperienceSection />
        <SkillsSection />
      </AboutSection>
      <ResumeSection />
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
      <FaqSection />
      <ContactSection />
    </>
  );
}
