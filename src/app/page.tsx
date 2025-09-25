import { Hero } from "@/components/home/hero";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { type ImagePlaceholder } from "@/lib/placeholder-images";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { Experiences } from "@/components/home/experiences";
import { ProjectSectionHeader } from "@/components/home/project-section-header";

export default function Home() {
  const imageMap = PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as Record<string, ImagePlaceholder>);

  return (
    <>
      <Hero />
      <div id="work" className="container mx-auto px-4 pt-24 sm:px-6 lg:px-8">
        <ProjectSectionHeader />

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 pb-24">
          {projects.map((project, index) => {
            const image = imageMap[project.imageId];
            return (
              <div
                key={project.id}
                className="fade-in-stagger opacity-0"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProjectCard project={project} image={image} />
              </div>
            );
          })}
        </section>
      </div>
      <AboutSection />
      <Experiences />
      <ContactSection />
    </>
  );
}
