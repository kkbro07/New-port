
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ProjectSectionHeader() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end center"],
  });

  // Animate from blur(8px) to blur(0px)
  const blur = useTransform(scrollYProgress, [0, 1], [8, 0]);
  // Animate from opacity(0) to opacity(1)
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Parallax for vertical movement
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section ref={targetRef} className="relative mb-16 text-center fade-in h-64 flex flex-col justify-center">
        <motion.div style={{ y, opacity, filter: useTransform(blur, (v) => `blur(${v}px)`) }} className="relative z-10">
            <h2 
                className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
            >
                Projects We Love
            </h2>
            <p 
                className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
            >
                A collection of projects showcasing my passion for design and
                technology.
            </p>
        </motion.div>
    </section>
  );
}
