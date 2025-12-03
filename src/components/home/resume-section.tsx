
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Rocket, Code, Calendar } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/projects-data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ResumeSection() {

    const stats = [
        {
            icon: <Rocket className="h-8 w-8 text-primary" />,
            value: projects.length,
            label: "Projects Completed"
        },
        {
            icon: <Calendar className="h-8 w-8 text-primary" />,
            value: "1+",
            label: "Years of Experience"
        },
        {
            icon: <Code className="h-8 w-8 text-primary" />,
            value: "10+",
            label: "Technologies Mastered"
        }
    ];

    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);


  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity, y }}
      className="py-16 sm:py-24 bg-secondary/50"
    >
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tighter">
          Interested in working together?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Get a snapshot of my qualifications below, or download my full resume for more details.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
                <Card key={index} className="bg-background/50">
                    <CardHeader className="flex flex-col items-center justify-center p-6">
                        {stat.icon}
                    </CardHeader>
                    <CardContent className="text-center p-6 pt-0">
                        <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="mt-12">
            <Button asChild size="lg">
                <Link href="/resume.pdf" download="Kirtan_Kalathiya_Resume.pdf">
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                </Link>
            </Button>
        </div>
      </div>
    </motion.section>
  );
}
