
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Experience } from '@/lib/experiences-data';
import { useIsMobile } from '@/hooks/use-mobile';


export const ExperienceNode = ({ item }: { item: Experience }) => {
    const isMobile = useIsMobile();
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isMobile) return;
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 10;
        const y = (clientY - top - height / 2) / 10;
        cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current || isMobile) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
    };

    return (
        <motion.div
            className="relative w-full flex justify-center pb-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
             <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "p-6 rounded-lg shadow-lg bg-card/50 backdrop-blur-sm border border-border/20 transition-transform duration-300 ease-out z-20",
                    isMobile ? "w-full" : "w-3/4 max-w-2xl"
                )}
            >
                <div className="relative">
                    <p className="text-muted-foreground font-mono text-sm">{item.period}</p>
                    <h3 className="text-lg sm:text-xl font-bold mt-1 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">{item.company}</p>
                    {item.description && (
                        <p className="mt-4 text-sm text-muted-foreground/80">{item.description}</p>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
