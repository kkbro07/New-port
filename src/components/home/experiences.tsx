"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { experiences } from "@/lib/experiences-data";
import { ImagePlaceholder, PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

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
    <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-24">
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
        <h3 className="font-headline text-4xl font-bold">{experience.title}</h3>
        <p className="mt-2 text-lg text-muted-foreground">{experience.company}</p>
        <p className="mt-1 text-sm text-muted-foreground/80">{experience.period}</p>
        <p className="mt-4 text-muted-foreground">{experience.description}</p>
      </motion.div>
    </section>
  );
}

export function Experiences() {
  const imageMap = PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as Record<string, ImagePlaceholder>);


  return (
    <div id="experience" className="relative py-48 bg-background background-grid">
       <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background"
      />
      <div className="relative z-10 container mx-auto">
        <div className="text-center">
            <h2 className="font-headline text-8xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground/80 leading-none">
                Dream. Make. Change.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">Our process in three words.</p>
        </div>
        {/* The individual experience items can be re-added here if needed */}
      </div>
    </div>
  );
}
