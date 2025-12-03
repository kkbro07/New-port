"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ProjectSectionHeader() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.7], [-100, 0]);

  return (
    <section ref={targetRef} className="relative mb-12 sm:mb-16 text-center h-48 sm:h-64 flex flex-col justify-center overflow-hidden">
        <motion.div 
            style={{ opacity, scale, y }}
            className="relative z-10"
        >
            <h2 
                className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
            >
                Projects We Love
            </h2>
            <p 
                className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground"
            >
                A collection of projects showcasing my passion for design and
                technology.
            </p>
        </motion.div>
    </section>
  );
}
