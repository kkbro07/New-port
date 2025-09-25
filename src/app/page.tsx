import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { type ImagePlaceholder } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const imageMap = PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as Record<string, ImagePlaceholder>);

  return (
    <>
      <div className="relative h-dvh flex flex-col items-center justify-center text-center fade-in">
        <div className="container px-4 sm:px-6 lg:px-8">
            <h1 className="font-headline text-5xl font-bold uppercase tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
              Creative Studio
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              A collective of designers, developers, and dreamers focused on
              design, branding, and development.
            </p>
        </div>
        <Link href="#work" className="absolute bottom-12">
            <Button variant="ghost" size="icon" className="animate-bounce">
                <ArrowDown className="h-6 w-6" />
            </Button>
        </Link>
      </div>

      <div id="work" className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <section className="mb-16 text-center fade-in">
          <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Selected Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A collection of projects showcasing our passion for design and
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
