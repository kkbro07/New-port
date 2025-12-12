
"use client";

import { Star } from "lucide-react";

export function Ticker() {
  const items = [
    "Web Development",
    "React",
    "Node.js",
    "JavaScript",
    "Python",
    "SEO",
    "UI/UX Design",
    "Content Creation",
    "Video Editing",
    "Cinematography",
  ];

  return (
    <div className="absolute inset-x-0 bottom-1/4 z-10 select-none overflow-hidden">
        <div className="relative flex whitespace-nowrap py-4">
            <div className="animate-ticker flex items-center">
            {items.map((item, index) => (
                <div key={index} className="flex items-center mx-4">
                    <span className="text-3xl md:text-5xl font-headline font-bold uppercase text-foreground/10">
                        {item}
                    </span>
                    <Star className="w-4 h-4 md:w-8 md:h-8 mx-4 text-foreground/10" fill="hsl(var(--foreground) / 0.1)" />
                </div>
            ))}
            </div>
            <div className="animate-ticker flex items-center" aria-hidden="true">
            {items.map((item, index) => (
                <div key={index + items.length} className="flex items-center mx-4">
                    <span className="text-3xl md:text-5xl font-headline font-bold uppercase text-foreground/10">
                        {item}
                    </span>
                    <Star className="w-4 h-4 md:w-8 md:h-8 mx-4 text-foreground/10" fill="hsl(var(--foreground) / 0.1)" />
                </div>
            ))}
            </div>
      </div>
    </div>
  );
}
