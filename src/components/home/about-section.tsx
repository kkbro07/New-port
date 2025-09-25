
"use client";

import Image from "next/image";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { SkillTabs } from "./skill-tabs";
import { EducationTimeline } from "./education-timeline";
import { experiences } from "@/lib/experiences-data";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

function useParallax(value: any, distance: any) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Experience({
  experience,
  image,
  index,
}: {
  experience: (typeof experiences)[0];
  image?: ImagePlaceholder;
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  let width = 800;
  let height = 600;

  if (image) {
    try {
      const url = new URL(image.imageUrl);
      const parts = url.pathname.split('/');
      const w = parseInt(parts[parts.length - 2], 10);
      const h = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(w) && w > 0) width = w;
      if (!isNaN(h) && h > 0) height = h;
    } catch (e) {
      // Keep default values if URL parsing fails
    }
  }

  const isOdd = index % 2 !== 0;

  return (
    <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 md:py-24">
      <div 
        ref={ref} 
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg",
          isOdd && "md:order-last"
        )}
      >
        {image ? (
            <Image
              src={image.imageUrl}
              alt={image.description}
              width={width}
              height={height}
              data-ai-hint={image.imageHint}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
        ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary">
            <p className="text-muted-foreground">Image not found</p>
            </div>
        )}
      </div>
      <motion.div style={{ y }} className={cn("text-white", isOdd && "md:order-first")}>
        <h3 className="font-headline text-3xl sm:text-4xl font-bold">{experience.title}</h3>
        <p className="mt-2 text-lg text-muted-foreground">{experience.company}</p>
        <p className="mt-1 text-sm text-muted-foreground/80">{experience.period}</p>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground">{experience.description}</p>
      </motion.div>
    </section>
  );
}


export function AboutSection() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-portrait");
  const imageMap = PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as Record<string, ImagePlaceholder>);
  
  let width = 800;
  let height = 1000;

  if (aboutImage?.imageUrl) {
    try {
      const url = new URL(aboutImage.imageUrl);
      const parts = url.pathname.split('/');
      if (parts.length >= 2) {
        const w = parseInt(parts[parts.length - 2], 10);
        const h = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(w)) width = w;
        if (!isNaN(h)) height = h;
      }
    } catch (e) {
      // Keep default values if URL parsing fails
    }
  }

  const certificates = [
    {
      year: "2023",
      name: "Python Fundamentals for Beginners",
      issuer: "Great Learning"
    }
  ];

  const interests = [
    "Cinematography & Content Creation",
    "Video Editing & Motion Graphics",
    "Acting & Performance Arts"
  ];

  return (
    <>
      <div id="about" className="fade-in">
        <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-32 lg:px-8">
          <section className="mb-12 md:mb-16">
            <h1 className="font-headline text-5xl font-bold uppercase tracking-tighter text-foreground sm:text-6xl md:text-8xl leading-none">
              About Me
            </h1>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start mb-16 md:mb-24">
              <div className="md:col-span-1 relative h-auto w-full flex items-center justify-center">
                  {aboutImage && (
                  <div className="overflow-hidden rounded-lg shadow-lg w-full max-w-xs md:max-w-full mx-auto">
                      <Image
                        src={aboutImage.imageUrl}
                        alt={aboutImage.description}
                        width={width}
                        height={height}
                        data-ai-hint={aboutImage.imageHint}
                        className="h-auto w-full object-cover"
                      />
                  </div>
                  )}
              </div>
              <div className="md:col-span-2 space-y-6">
                  <div className="space-y-2">
                      <h2 className="text-3xl sm:text-4xl font-bold font-headline">KIRTAN KALATHIYA</h2>
                      <p className="text-muted-foreground text-base sm:text-lg">
                        WEB DESIGNER + DEVELOPER
                      </p>
                  </div>
                  <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
                    <p>
                    My name is Kirtan Kalathiya, a web designer and developer from Surat, India. I'm a passionate programmer and quick learner with experience in Node.js, React, Bootstrap, MongoDB, and MySQL. As an SEO fresher, I have basic knowledge of on-page and off-page SEO, keyword research, and tools like Google Search Console and Yoast SEO. I'm eager to build websites that are both user-friendly and search engine optimized.
                    </p>
                  </div>
                  <Button size="lg" asChild>
                    <a href="/resume.pdf" download="Kirtan_Kalathiya_Resume.pdf">
                      Download Resume <Download className="ml-2"/>
                    </a>
                  </Button>
              </div>
          </section>

          <section className="mb-16 md:mb-24">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">My Skills</h2>
            <SkillTabs />
          </section>

          <section id="journey" className="mb-16 md:mb-24">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-8 md:mb-16 text-center">My Journey</h2>
            <div id="experience">
              <EducationTimeline />
            </div>
          </section>
        </div>
      </div>
      <div className="relative py-24 md:py-48 bg-background background-grid">
         <div 
          className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background"
        />
        <div className="relative z-10 container mx-auto">
          <div className="text-center mb-16 md:mb-24">
              <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground/80 leading-none">
                  Dream. Make. Change.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">My professional process in three words.</p>
          </div>
          
          {experiences.map((experience, index) => {
            const image = imageMap[experience.imageId];
            return (
              <Experience 
                key={experience.id} 
                experience={experience} 
                image={image} 
                index={index} 
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
