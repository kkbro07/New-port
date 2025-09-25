
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { SkillCloud } from "./skill-cloud";

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-portrait");
  
  let width = 800;
  let height = 1000;

  if (aboutImage?.imageUrl) {
    try {
      const url = new URL(aboutImage.imageUrl);
      const parts = url.pathname.split('/');
      if (parts.length >= 2) {
        const w = parseInt(parts[parts.length - 2], 10);
        const h = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(w)) width = w;
        if (!isNaN(h)) height = h;
      }
    } catch (e) {
      // Keep default values if URL parsing fails
    }
  }
  
  const skills = [
    "C", "C++", "Java", "Python", "JavaScript", "C#", "SQL",
    "React.js", "Node.js", "ASP.Net", "PHP", "MySQL", "MongoDB",
    "Vercel", "App Development", "Image Processing"
  ];

  const education = [
    {
      year: "2024 - Present",
      degree: "Master of Science (Information Technology)",
      institution: "UKA TARSADIA UNIVERSITY"
    },
    {
      year: "2021 - 2024",
      degree: "Bachelor of Science (Information Technology)",
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

  const certificates = [
    {
      year: "2023",
      name: "Python Fundamentals for Beginners",
      issuer: "Great Learning"
    }
  ];

  const interests = [
    "Cinematography & Content Creation",
    "Video Editing & Motion Graphics",
    "Acting & Performance Arts"
  ];

  return (
    <div id="about" className="fade-in">
      <div className="container mx-auto max-w-5xl px-4 py-32 sm:px-6 lg:px-8">
        <section className="mb-16">
          <h1 className="font-headline text-6xl font-bold uppercase tracking-tighter text-foreground sm:text-7xl md:text-8xl leading-none">
            About Me
          </h1>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-24">
            <div className="md:col-span-1 relative h-auto w-full flex items-center justify-center">
                {aboutImage && (
                <div className="overflow-hidden rounded-lg shadow-lg w-full">
                    <Image
                      src={aboutImage.imageUrl}
                      alt={aboutImage.description}
                      width={width}
                      height={height}
                      data-ai-hint={aboutImage.imageHint}
                      className="h-auto w-full object-cover"
                    />
                </div>
                )}
            </div>
            <div className="md:col-span-2 space-y-8">
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold font-headline">KIRTAN KALATHIYA</h2>
                    <p className="text-muted-foreground text-lg">
                      WEB DESIGNER + DEVELOPER
                    </p>
                </div>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                  My name is Kirtan Kalathiya, a web designer and developer from Surat, India. I'm a passionate programmer and quick learner with experience in Node.js, React, Bootstrap, MongoDB, and MySQL. As an SEO fresher, I have basic knowledge of on-page and off-page SEO, keyword research, and tools like Google Search Console and Yoast SEO. I'm eager to build websites that are both user-friendly and search engine optimized.
                  </p>
                </div>
                <Button size="lg" asChild>
                  <a href="/resume.pdf" download="Kirtan_Kalathiya_Resume.pdf">
                    Download Resume <Download className="ml-2"/>
                  </a>
                </Button>
            </div>
        </section>

        <section className="mb-24">
          <h2 className="font-headline text-4xl font-bold mb-12 text-center">My Skills</h2>
          <SkillCloud skills={skills} />
        </section>

        <section className="mb-24">
          <h2 className="font-headline text-4xl font-bold mb-8">Education</h2>
          <div className="space-y-6">
            {education.map(edu => (
              <div key={edu.degree} className="flex flex-col sm:flex-row justify-between sm:items-start">
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-muted-foreground">{edu.institution}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground font-mono text-sm mt-2 sm:mt-0">{edu.year}</p>
                  {edu.grade && <p className="text-muted-foreground font-mono text-sm">{edu.grade}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="font-headline text-4xl font-bold mb-8">Certificates</h2>
          <div className="space-y-6">
            {certificates.map(cert => (
              <div key={cert.name} className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <h3 className="text-xl font-bold">{cert.name}</h3>
                  <p className="text-muted-foreground">{cert.issuer}</p>
                </div>
                <p className="text-muted-foreground font-mono text-sm mt-2 sm:mt-0">{cert.year}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-headline text-4xl font-bold mb-8">Interests</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground">
            {interests.map(interest => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
