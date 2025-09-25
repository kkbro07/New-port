'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
    {
        type: 'experience',
        title: 'SEO Intern',
        company: 'CoreNet Tech',
        period: '08/2025–Present',
        description: 'Assisted in optimizing websites for search engines, focusing on both on-page and off-page SEO strategies. Conducted keyword research and analysis to improve website visibility and search rankings. Used Google Search Console & Yoast SEO to monitor performance.'
    },
];

const JourneyNode = ({ item, index, isMobile }: { item: (typeof journeyData)[0], index: number, isMobile: boolean }) => {
    const isEven = index % 2 === 0;
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 10;
        const y = (clientY - top - height / 2) / 10;
        cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
    };

    const isEducation = item.type === 'education';

    return (
        <motion.div
            className={cn(
                "relative flex items-center w-full group",
                isMobile ? 'justify-start' : (isEven ? 'justify-start' : 'justify-end')
            )}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={cn('absolute h-4 w-4 rounded-full border-2 border-primary bg-background z-10 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_15px_5px] group-hover:shadow-primary/50',
                isMobile ? 'left-0 -translate-x-1/2' : (isEven ? 'left-1/2 -translate-x-1/2' : 'left-1/2 -translate-x-1/2')
            )} />

            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "p-6 rounded-lg shadow-lg bg-card/50 backdrop-blur-sm border border-border/20 transition-transform duration-300 ease-out",
                    isMobile ? "w-full ml-8" : "w-[calc(50%-2rem)]"
                )}
            >
                {isEducation ? (
                    <>
                        <p className="text-muted-foreground font-mono text-sm">{item.year}</p>
                        <h3 className="text-lg sm:text-xl font-bold mt-1 text-foreground">{item.degree}</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">{item.institution}</p>
                        {item.grade && <p className="text-muted-foreground font-mono text-xs mt-1">{item.grade}</p>}
                    </>
                ) : (
                     <div className="relative">
                        <p className="text-muted-foreground font-mono text-sm">{item.period}</p>
                        <h3 className="text-lg sm:text-xl font-bold mt-1 text-foreground">{item.title}</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">{item.company}</p>
                        <motion.div
                            className="mt-4 text-sm text-muted-foreground/80 overflow-hidden"
                            initial={{ height: 0 }}
                            animate={{ height: isHovered ? 'auto' : 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                           <p>{item.description}</p>
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export function EducationTimeline() {
    const isMobile = useIsMobile();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start center', 'end end'],
    });

    const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
    const parallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    const desktopPath = "M 500 0 Q 500 150 350 200 T 500 400 Q 500 550 650 600 T 500 800 Q 500 950 350 1000";
    const mobilePath = "M 0 0 L 0 1000";

    const path = isMobile ? mobilePath : desktopPath;
    const pathKey = isMobile ? 'mobile' : 'desktop';

    const getPointAtLength = (length: number, path: string) => {
        if (typeof document === 'undefined') return { x: 0, y: 0 };
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute('d', path);
        const totalLength = svgPath.getTotalLength();
        return svgPath.getPointAtLength(length * totalLength);
    };

    return (
        <div ref={ref} className="relative max-w-4xl mx-auto py-24 px-4 min-h-[200vh]">
             <h2 className="font-headline text-3xl sm:text-4xl font-bold mb-16 text-center">My Journey</h2>
            <div className="absolute top-0 h-full w-full" style={{ perspective: '1000px' }}>
                <motion.div
                    className="absolute inset-0"
                    style={{ y: parallax }}
                >
                    <svg width="100%" height="100%" viewBox={isMobile ? "0 0 50 1000" : "0 0 1000 1000"} preserveAspectRatio="none">
                        <defs>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
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
                         <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="hsl(var(--primary) / 0)" />
                                <stop offset="100%" stopColor="hsl(var(--primary))" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>
            </div>

            <div className="relative z-10 space-y-32 md:space-y-48">
                {journeyData.map((item, index) => (
                    <JourneyNode key={index} item={item} index={index} isMobile={isMobile} />
                ))}
            </div>

            <div className="relative flex justify-center items-center h-96 mt-48">
                 <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground/80 leading-none">
                  Dream. Make. Change.
              </h2>
            </div>
        </div>
    );
}