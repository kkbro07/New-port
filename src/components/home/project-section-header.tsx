"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ProjectSectionHeader() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <section ref={targetRef} className="mb-16 text-center fade-in overflow-hidden">
        <motion.h2 
            style={{ y }}
            className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
        >
            Projects We Love
        </motion.h2>
        <motion.p 
            style={{ y }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
        >
            A collection of projects showcasing my passion for design and
            technology.
        </motion.p>
    </section>
  );
}
