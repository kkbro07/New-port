"use client";

import Image from "next/image";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { SkillTabs } from "./skill-tabs";
import { EducationTimeline } from "./education-timeline";

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-portrait");
  
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
        </div>
      </div>
       <div id="journey" className="relative bg-background background-grid">
         <div 
          className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background"
        />
        <div className="relative z-10 container mx-auto">
           <EducationTimeline />
        </div>
      </div>
    </>
  );
}