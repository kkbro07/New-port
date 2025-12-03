
"use client";

import { useRef } from "react";
import { EducationTimeline } from "./education-timeline";
import { Separator } from "../ui/separator";
import { motion, useScroll, useTransform } from "framer-motion";

export function AboutSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  
  return (
    <>
      <div id="journey" className="relative bg-background">
        <EducationTimeline />
      </div>
      <div ref={targetRef} className="relative z-10 max-w-5xl mx-auto px-4 bg-background h-dvh">
          <div className="sticky top-0 flex justify-center items-center h-dvh">
              <motion.h2 
                style={{ y, opacity }}
                className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground/80 leading-none"
              >
                Dream. Make. Change.
              </motion.h2>
          </div>
        </div>
    </>
  );
}
