
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Experience } from '@/lib/experiences-data';
import { useIsMobile } from '@/hooks/use-mobile';


export const ExperienceNode = ({ item }: { item: Experience }) => {
    const isMobile = useIsMobile();

    return (
        <motion.div
            className={cn(
                "relative z-20 w-full",
                isMobile ? "p-4" : "p-8 w-3/4 max-w-2xl mx-auto"
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
