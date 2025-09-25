import Image from "next/image";
import type { Project } from "@/lib/projects-data";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

type ProjectCardProps = {
  project: Project;
  image?: ImagePlaceholder;
};

export function ProjectCard({ project, image }: ProjectCardProps) {
  let width = 800;
  let height = 600;

  if (image) {
    try {
      const url = new URL(image.imageUrl);
      const widthParam = url.searchParams.get("w");
      if (widthParam) {
        width = parseInt(widthParam, 10);
      }
      // Assuming a 4:3 aspect ratio if height isn't available
      height = width * (3 / 4);
    } catch (e) {
      // Keep default values if URL parsing fails
    }
  }

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
      {image ? (
        <Image
          src={image.imageUrl}
          alt={image.description}
          width={width}
          height={height}
          data-ai-hint={image.imageHint}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-secondary">
          <p className="text-muted-foreground">Image not found</p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-4">
          <h3 className="font-headline text-2xl font-bold text-white">
            {project.title}
          </h3>
          <p className="text-sm text-white/80">
            {project.category}
          </p>
        </div>
        <div className="absolute bottom-6 right-6 -translate-x-4 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowRight className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}
