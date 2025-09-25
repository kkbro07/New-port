
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const educationData = [
    {
        year: "2019",
        degree: "Class X - SSC",
        institution: "BAPS SWAMINARAYAN VIDYAMANDIR, SARANGPUR",
        grade: "69.33%"
    },
    {
        year: "2021",
        degree: "Class XII - HSC",
        institution: "BAPS SWAMINARAYAN VIDYAMANDIR, SARANGPUR",
        grade: "60.93%"
    },
    {
        year: "2021 - 2024",
        degree: "Bachelor of Science (IT)",
        institution: "UKA TARSADIA UNIVERSITY",
        grade: "CGPA 5.47"
    },
    {
        year: "2024 - Present",
        degree: "Master of Science (IT)",
        institution: "UKA TARSADIA UNIVERSITY",
        grade: ""
    }
];

const EducationItem = ({ item, index }: { item: (typeof educationData)[0], index: number }) => {
    const isOdd = index % 2 !== 0;
    
    return (
        <motion.div 
            className={`relative p-6 rounded-lg shadow-lg bg-card/50 backdrop-blur-sm border border-border/20 w-full max-w-sm`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <p className="text-muted-foreground font-mono text-sm">{item.year}</p>
            <h3 className="text-lg sm:text-xl font-bold mt-1 text-foreground">{item.degree}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{item.institution}</p>
            {item.grade && <p className="text-muted-foreground font-mono text-xs mt-1">{item.grade}</p>}
        </motion.div>
    );
};

export function EducationTimeline() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end end'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const experiencePathLength = useTransform(scrollYProgress, [0.8, 1], [0, 1]);


  return (
    <div ref={targetRef} className="relative max-w-4xl mx-auto py-12 px-4 md:py-24">
        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 h-full w-px bg-border/40">
            <motion.div 
                className='h-full w-full bg-primary origin-top'
                style={{ scaleY: pathLength }}
            />
        </div>
        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-full h-48 w-px bg-border/40">
            <motion.div 
                className='h-full w-full bg-primary origin-top'
                style={{ scaleY: experiencePathLength }}
            />
        </div>
      
        <div className="relative space-y-16">
            {educationData.map((item, index) => {
            const isOdd = index % 2 !== 0;
            return (
                <motion.div
                    key={index}
                    className={`relative flex items-center ${isOdd ? 'justify-start md:justify-end' : 'justify-start'}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    {/* Desktop Timeline Structure */}
                    <div className={`hidden md:block w-1/2 ${isOdd ? 'text-right pr-8' : 'pl-8'}`}>
                      {isOdd && <EducationItem item={item} index={index}/>}
                    </div>
                    <motion.div 
                        className="hidden md:block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background border-2 border-primary"
                        initial={{ scale: 0 }}
                        variants={{ visible: { scale: 1, transition: { delay: 0.1 } } }}
                    />
                    <div className={`hidden md:block w-1/2 ${!isOdd ? 'pl-8' : 'pr-8'}`}>
                      {!isOdd && <EducationItem item={item} index={index}/>}
                    </div>

                    {/* Mobile Timeline Structure */}
                    <motion.div 
                        className="md:hidden absolute top-0 left-4 -translate-x-1/2 w-5 h-5 rounded-full bg-background border-2 border-primary"
                        initial={{ scale: 0 }}
                        variants={{ visible: { scale: 1, transition: { delay: 0.1 } } }}
                    />
                    <div className="md:hidden w-full pl-12">
                        <EducationItem item={item} index={index}/>
                    </div>

                </motion.div>
            );
            })}
      </div>
    </div>
  );
}
