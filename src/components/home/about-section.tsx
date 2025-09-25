
"use client";

import { useRef } from "react";
import { EducationTimeline } from "./education-timeline";
import { ExperienceNode } from "./experience-node";
import { experiences } from "@/lib/experiences-data";

export function AboutSection() {
  const experienceRef = useRef<HTMLDivElement>(null);
  
  return (
    <>
      <div id="journey" className="relative background-grid">
         <div 
          className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background z-0"
        />
        <EducationTimeline experienceRef={experienceRef} />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="relative flex justify-center items-center h-96">
              <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground/80 leading-none">
              Dream. Make. Change.
              </h2>
          </div>
          <div ref={experienceRef}>
            <ExperienceNode item={experiences[0]} />
          </div>
        </div>
      </div>
    </>
  );
}
