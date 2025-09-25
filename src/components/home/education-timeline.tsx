
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { experiences } from '@/lib/experiences-data';
import type { Experience } from '@/lib/experiences-data';

const journeyData = [
    {
        type: 'education',
        year: "2019",
        degree: "Class X - SSC",
        institution: "BAPS SWAMINARAYAN VIDYAMANDIR, SARANGPUR",
        grade: "69.33%"
    },
    {
        type: 'education',
        year: "2021",
        degree: "Class XII - HSC",
        institution: "BAPS SWAMINARAYAN VIDYAMANDIR, SARANGPUR",
        grade: "60.93%"
    },
    {
        type: 'education',
        year: "2021 - 2024",
        degree: "Bachelor of Science (IT)",
        institution: "UKA TARSADIA UNIVERSITY",
        grade: "CGPA 5.47"
    },
    {
        type: 'education',
        year: "2024 - Present",
        degree: "Master of Science (IT)",
        institution: "UKA TARSADIA UNIVERSITY",
        grade: "SGPA 7.59"
    },
];

const JourneyNode = ({ item, index, isMobile }: { item: (typeof journeyData)[0], index: number, isMobile: boolean }) => {
    const isEven = index % 2 === 0;
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
            className={cn(
                "relative flex items-center w-full group h-48",
                isMobile ? 'justify-start' : (isEven ? 'justify-start' : 'justify-end')
            )}
            initial={{ opacity: 0, x: isMobile ? -20 : (isEven ? -20 : 20) }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
        >
            <div className={cn('absolute h-4 w-4 rounded-full border-2 border-primary bg-background z-20 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_15px_5px] group-hover:shadow-primary/50',
                isMobile ? 'left-[1.5px] -translate-x-1/2' : 'left-1/2 -translate-x-1/2'
            )} />

            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "p-6 rounded-lg shadow-lg bg-card/50 backdrop-blur-sm border border-border/20 transition-transform duration-300 ease-out z-20",
                    isMobile ? "w-full ml-8" : "w-[calc(50%-2rem)]"
                )}
            >
                <p className="text-muted-foreground font-mono text-sm">{item.year}</p>
                <h3 className="text-lg sm:text-xl font-bold mt-1 text-foreground">{item.degree}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{item.institution}</p>
                {item.grade && <p className="text-muted-foreground font-mono text-xs mt-1">{item.grade}</p>}
            </div>
        </motion.div>
    );
};

export const ExperienceNode = ({ item, isMobile }: { item: Experience, isMobile: boolean }) => {
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
            className="relative w-full flex justify-center pb-24 h-96 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.5 }}
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

export function EducationTimeline() {
    const isMobile = useIsMobile();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const pathLength = useTransform(scrollYProgress, [0.05, 0.8], [0, 1]);
    
    const desktopPath = "M 500 0 V 150 Q 500 250 350 350 T 650 550 Q 650 650 500 750 V 900 Q 500 1000 350 1100 T 650 1300 V 1400";
    const mobilePath = "M 3 0 V 1600";

    const path = isMobile ? mobilePath : desktopPath;
    const pathKey = isMobile ? 'mobile' : 'desktop';

    return (
        <div ref={ref} className="relative max-w-5xl mx-auto py-16 px-4" style={{minHeight: "2000px"}}>
             <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-16 text-center z-20 relative">My Journey</h2>
            
            <div className="absolute top-0 left-0 h-full w-full">
                <svg width="100%" height="100%" viewBox={isMobile ? "0 0 10 1600" : "0 0 1000 1400"} preserveAspectRatio="none">
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                         <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary) / 0)" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        key={pathKey}
                        d={path}
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="2"
                    />
                    <motion.path
                        key={`${pathKey}-animated`}
                        d={path}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2.5"
                        style={{ pathLength }}
                        filter="url(#glow)"
                    />
                </svg>
            </div>

            <div className="relative z-10">
                {journeyData.map((item, index) => (
                    <JourneyNode key={index} item={item} index={index} isMobile={isMobile ?? false} />
                ))}

                <div className="relative flex justify-center items-center h-96">
                    <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground/80 leading-none">
                    Dream. Make. Change.
                    </h2>
                </div>

                <ExperienceNode item={experiences[0]} isMobile={isMobile ?? false} />
            </div>
        </div>
    );
}
