
'use client';

import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const skillsData = {
  languages: ["C", "C++", "Java", "Python", "JavaScript", "C#", "SQL", "PHP"],
  frameworks: ["React.js", "Node.js", "ASP.Net"],
  tools: ["MySQL", "MongoDB", "Vercel"],
  other: ["App Development", "Image Processing"],
};

const skillBadgeVariants = {
  initial: { y: 0 },
  hover: { y: -4 },
};

export function SkillTabs() {
  return (
    <Tabs defaultValue="languages" className="w-full max-w-2xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
        <TabsTrigger value="languages">Languages</TabsTrigger>
        <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
        <TabsTrigger value="other">Other</TabsTrigger>
      </TabsList>
      
      <div className="pt-8">
        <TabsContent value="languages">
          <div className="flex flex-wrap justify-center gap-3">
            {skillsData.languages.map((skill) => (
              <motion.div
                key={skill}
                variants={skillBadgeVariants}
                initial="initial"
                whileHover="hover"
                className="cursor-default rounded-lg bg-secondary px-4 py-2 text-base font-medium text-secondary-foreground shadow-sm"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="frameworks">
          <div className="flex flex-wrap justify-center gap-3">
            {skillsData.frameworks.map((skill) => (
              <motion.div
                key={skill}
                variants={skillBadgeVariants}
                initial="initial"
                whileHover="hover"
                className="cursor-default rounded-lg bg-secondary px-4 py-2 text-base font-medium text-secondary-foreground shadow-sm"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tools">
          <div className="flex flex-wrap justify-center gap-3">
            {skillsData.tools.map((skill) => (
              <motion.div
                key={skill}
                variants={skillBadgeVariants}
                initial="initial"
                whileHover="hover"
                className="cursor-default rounded-lg bg-secondary px-4 py-2 text-base font-medium text-secondary-foreground shadow-sm"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="other">
          <div className="flex flex-wrap justify-center gap-3">
            {skillsData.other.map((skill) => (
              <motion.div
                key={skill}
                variants={skillBadgeVariants}
                initial="initial"
                whileHover="hover"
                className="cursor-default rounded-lg bg-secondary px-4 py-2 text-base font-medium text-secondary-foreground shadow-sm"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
