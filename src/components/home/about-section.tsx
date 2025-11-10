
"use client";

import { useRef } from "react";
import { EducationTimeline } from "./education-timeline";
import { Separator } from "../ui/separator";

export function AboutSection() {
  const experienceContainerRef = useRef<HTMLDivElement>(null);
  
  return (
    <>
      <div id="journey" className="relative bg-background">
        <EducationTimeline />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 bg-background">
          <div className="relative flex justify-center items-center h-96">
              <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground/80 leading-none">
              Dream. Make. Change.
              </h2>
          </div>
        </div>
    </>
  );
}
