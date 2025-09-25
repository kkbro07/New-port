'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const educationData = [
    {
      year: "2024 - Present",
      degree: "Master of Science (IT)",
      institution: "UKA TARSADIA UNIVERSITY",
      grade: ""
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
            className={`flex items-start my-8 md:my-4 ${isOdd ? 'md:justify-end md:text-right' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
        >
            <div className={`relative w-full md:w-5/12 ${isOdd ? 'md:pr-8' : 'md:pl-8'}`}>
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
    offset: ['start center', 'end end'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div ref={targetRef} className="relative max-w-4xl mx-auto py-12 md:py-24">
        <div className="absolute left-1/2 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-px bg-border/40">
            <motion.div 
                className='h-full w-full bg-primary origin-top'
                style={{ scaleY: pathLength }}
            />
        </div>
      
        <div className="relative">
            {educationData.map((item, index) => {
            const isOdd = index % 2 !== 0;
            return (
                <motion.div
                    key={index}
                    className={`relative flex items-center ${isOdd ? 'justify-start md:justify-end' : 'justify-start'}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    {/* Desktop Line and Circle */}
                    <div className={`hidden md:block w-1/2 ${isOdd ? 'border-r-0' : 'border-l-0'}`}>
                        <div className={`w-full h-px ${isOdd ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-primary to-transparent`} />
                    </div>
                    <motion.div 
                        className="hidden md:block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary"
                        initial={{ scale: 0 }}
                        variants={{ visible: { scale: 1, transition: { delay: 0.3 } } }}
                    />
                    {/* Mobile Circle */}
                    <motion.div 
                        className="md:hidden absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary"
                        initial={{ scale: 0 }}
                        variants={{ visible: { scale: 1, transition: { delay: 0.3 } } }}
                    />
                    
                    <div className="w-full md:w-1/2 pl-8 md:pl-0">
                        <EducationItem item={item} index={index}/>
                    </div>
                </motion.div>
            );
            })}
      </div>
    </div>
  );
}
