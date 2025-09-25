

'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const journeyData = [
    {
        type: 'education',
        year: "2019",
        degree: "Class X - SSC",
        institution: "BAPS SWAMINARAYAN VIDYAMANDIR, SARANGPUR",
        grade: "69.33%",
        position: { top: '15%', left: '55%' },
        mobilePosition: { top: '10%', left: '10%' }
    },
    {
        type: 'education',
        year: "2021",
        degree: "Class XII - HSC",
        institution: "BAPS SWAMINARAYAN VIDYAMANDIR, SARANGPUR",
        grade: "60.93%",
        position: { top: '30%', left: '15%' },
        mobilePosition: { top: '25%', left: '10%' }
    },
    {
        type: 'education',
        year: "2021 - 2024",
        degree: "Bachelor of Science (IT)",
        institution: "UKA TARSADIA UNIVERSITY",
        grade: "CGPA 5.47",
        position: { top: '48%', left: '55%' },
        mobilePosition: { top: '40%', left: '10%' }
    },
    {
        type: 'education',
        year: "2024 - Present",
        degree: "Master of Science (IT)",
        institution: "UKA TARSADIA UNIVERSITY",
        grade: "SGPA 7.59",
        position: { top: '65%', left: '15%' },
        mobilePosition: { top: '55%', left: '10%' }
    },
];

const Milestone = ({ item, isMobile, scrollYProgress }: { item: typeof journeyData[0], isMobile: boolean, scrollYProgress: any }) => {
    const isEven = journeyData.indexOf(item) % 2 === 0;
    
    // Determine the opacity animation range based on the item's index
    const startOpacity = (journeyData.indexOf(item) * 0.2);
    const endOpacity = startOpacity + 0.2;
    const opacity = useTransform(scrollYProgress, [startOpacity, endOpacity], [0, 1]);

    const position = isMobile ? item.mobilePosition : item.position;

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: position.top,
                left: isMobile ? position.left : (isEven ? position.left : undefined),
                right: isMobile ? undefined : (isEven ? undefined : '15%'),
                opacity: opacity,
                textAlign: isMobile ? 'left' : (isEven ? 'left' : 'right'),
            }}
            className="w-full sm:w-2/5"
        >
            <p className="text-muted-foreground font-mono text-sm">{item.year}</p>
            <h3 className="text-lg sm:text-xl font-bold mt-1 text-foreground">{item.degree}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{item.institution}</p>
            {item.grade && <p className="text-muted-foreground font-mono text-xs mt-1">{item.grade}</p>}
        </motion.div>
    );
};


export function EducationTimeline({ experienceRef }: { experienceRef: React.RefObject<HTMLDivElement> }) {
    const isMobile = useIsMobile();
    const timelineRef = React.useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start start", "end end"],
    });

    const pathLength = useTransform(scrollYProgress, [0.05, 0.8], [0, 1]);

    const desktopPath = "M 500 0 V 150 Q 500 250 350 350 T 650 550 Q 650 650 500 750 V 900 Q 500 1000 350 1100 T 650 1300 V 1400";
    const mobilePath = "M 50 0 V 1400";
    const path = isMobile ? mobilePath : desktopPath;
    const pathKey = isMobile ? 'mobile' : 'desktop';

    return (
        <div ref={timelineRef} className="relative w-full" style={{ height: '140vh' }}>
            <div className="sticky top-0 h-dvh w-full">
                <h2 className="font-headline text-3xl sm:text-4xl font-bold pt-16 text-center z-20 relative">My Journey</h2>
                
                <svg width="100%" height="100%" viewBox={isMobile ? "0 0 100 1400" : "0 0 1000 1400"} preserveAspectRatio="none" className="absolute top-0 left-0">
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

                <div className="relative h-full w-full">
                    {journeyData.map((item, index) => (
                        <Milestone key={index} item={item} isMobile={isMobile ?? false} scrollYProgress={scrollYProgress} />
                    ))}
                </div>
            </div>
        </div>
    );
}
