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

export default function Home() {
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
      <ContactSection />
    </>
  );
}
