
'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Experience } from '@/lib/experiences-data';
import { useIsMobile } from '@/hooks/use-mobile';


export const ExperienceNode = ({ item, targetRef }: { item: Experience, targetRef: React.RefObject<HTMLDivElement> }) => {
    const isMobile = useIsMobile();
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);


    return (
        <motion.div
            style={{ y, opacity }}
            transition={{
                y: { type: "spring", stiffness: 100, damping: 30, restDelta: 0.001 }
            }}
            className={cn(
                "relative z-20 w-full pt-16",
                isMobile ? "p-4 text-left" : "p-8 w-3/4 max-w-2xl mx-auto text-center"
            )}
        >
            <p className="text-muted-foreground font-mono text-sm">{item.period}</p>
            <h3 className="text-lg sm:text-xl font-bold mt-1 text-foreground">{item.title}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{item.company}</p>
            {item.description && (
                <p className="mt-4 text-sm text-muted-foreground/80">{item.description}</p>
            )}
        </motion.div>
    )
}
