
import Image from "next/image";
import type { Project } from "@/lib/projects-data";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type FeaturedProjectCardProps = {
  project: Project;
  image?: ImagePlaceholder;
  align?: "left" | "right";
};

export function FeaturedProjectCard({ project, image, align = "left" }: FeaturedProjectCardProps) {
  let width = 800;
  let height = 600;

  if (image && image.imageUrl) {
    try {
      if (image.imageUrl.startsWith("https://images.unsplash.com")) {
        const url = new URL(image.imageUrl);
        const w = parseInt(url.searchParams.get("w") || "800", 10);
        const h = parseInt(url.searchParams.get("h") || "600", 10);
        if (!isNaN(w)) width = w;
        if (!isNaN(h)) height = h;
      } else if (image.imageUrl.startsWith("https://picsum.photos")) {
        const url = new URL(image.imageUrl);
        const parts = url.pathname.split("/");
        const w = parseInt(parts[parts.length - 2], 10);
        const h = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(w)) width = w;
        if (!isNaN(h)) height = h;
      }
    } catch (e) {
      // Keep default values if URL parsing fails
    }
  }

  const CardBody = () => (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className={cn(
          "relative aspect-video md:aspect-auto",
           align === 'right' && 'md:order-last'
        )}>
          {image ? (
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              data-ai-hint={image.imageHint}
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary">
              <p className="text-muted-foreground">Image not found</p>
            </div>
          )}
        </div>
        <div className="flex flex-col p-6 sm:p-8">
            <p className="mb-2 text-sm font-medium text-muted-foreground">
                {project.category}
            </p>
            <h3 className="font-headline text-2xl font-bold text-foreground mb-4">
                {project.title}
            </h3>
            <p className="text-muted-foreground mb-6 flex-grow">
                {project.description}
            </p>
            <div className="mt-auto">
                <Button variant="outline" asChild>
                    <span className="w-full">
                        View Project
                        <ArrowRight />
                    </span>
                </Button>
            </div>
        </div>
      </div>
    </Card>
  );


  if (project.githubLink && project.githubLink !== "#") {
    return (
      <Link href={project.githubLink} target="_blank" rel="noopener noreferrer" className="block">
        <CardBody />
      </Link>
    );
  }

  return <CardBody />;
}
