import { Hero } from "@/components/home/hero";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { type ImagePlaceholder } from "@/lib/placeholder-images";

export default function Home() {
  const imageMap = PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as Record<string, ImagePlaceholder>);

  return (
    <>
      <Hero />
      <div id="work" className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <section className="mb-16 text-center fade-in">
          <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Projects We Love
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A collection of projects showcasing my passion for design and
            technology.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
    </>
  );
}
