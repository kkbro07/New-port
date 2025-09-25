'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const educationData = [
    {
      year: "2024 - Present",
      degree: "Master of Science (IT)",
      institution: "UKA TARSADIA UNIVERSITY"
    },
    {
      year: "2021 - 2024",
      degree: "Bachelor of Science (IT)",
      institution: "UKA TARSADIA UNIVERSITY",
      grade: "CGPA 5.47"
    },
    {
      year: "2021",
      degree: "Class XII - HSC",
      institution: "BAPS SWAMINARAYAN VIDYAMANDIR, SARANGPUR",
      grade: "60.93%"
    },
    {
      year: "2019",
      degree: "Class X - SSC",
      institution: "BAPS SWAMINARAYAN VIDYAMANDIR, SARANGPUR",
      grade: "69.33%"
    }
  ];

const EducationItem = ({ item, index }: { item: (typeof educationData)[0], index: number }) => {
    const isOdd = index % 2 !== 0;
    
    return (
        <motion.div 
            className={`flex items-start my-8 ${isOdd ? 'justify-end' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className={`relative w-full md:w-1/2 ${isOdd ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                <div className="absolute top-1 -translate-x-1/2 left-1/2 md:left-auto md:right-0 md:translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background" style={ isOdd ? { right: '-0.5rem' } : { left: '-0.5rem' }}/>
                <p className="text-muted-foreground font-mono text-sm">{item.year}</p>
                <h3 className="text-lg sm:text-xl font-bold mt-1">{item.degree}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{item.institution}</p>
                {item.grade && <p className="text-muted-foreground font-mono text-xs mt-1">{item.grade}</p>}
            </div>
        </motion.div>
    );
};

export function EducationTimeline() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end center'],
  });

  return (
    <div ref={targetRef} className="relative">
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-border/40" />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-primary origin-top"
        style={{ scaleY: scrollYProgress }}
      />
      <div>
        {educationData.map((item, index) => (
          <EducationItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
