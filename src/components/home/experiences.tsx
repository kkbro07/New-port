import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { type Project } from '@/lib/projects-data';
import { type ImagePlaceholder } from '@/lib/placeholder-images';

type ExperiencesProps = {
  projects: Project[];
  images: Record<string, ImagePlaceholder>;
};

export function Experiences({ projects, images }: ExperiencesProps) {
  return (
    <div className="relative bg-background text-foreground py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
            {projects.map((project, index) => {
                 const image = images[project.imageId];
                 if(!image) return null;
                 return (
                    <div key={project.id} className={`absolute w-1/3 aspect-square ${index === 0 ? 'top-1/4 left-1/4' : 'bottom-1/4 right-1/4'}`}>
                        <Image 
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                 )
            })}
        </div>
        
        <div className="relative z-10 text-center">
          <h2 className="font-headline text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-primary leading-tight">
            Experiences and digital products that seamlessly blend
            functionality with aesthetics in innovative ways
          </h2>
        </div>

        <div className="relative z-20 mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
            {projects.map((project, index) => (
                <div key={project.id} className="space-y-4">
                    <div className="flex items-baseline gap-4">
                        <span className="font-headline text-xl text-muted-foreground">{`0${index + 1}`}</span>
                         <h3 className="font-headline text-4xl font-bold uppercase tracking-tight">
                            <Link href="#" className="flex items-center gap-4 hover:text-primary transition-colors">
                                {project.title} <ArrowRight className="h-6 w-6" />
                            </Link>
                        </h3>
                    </div>
                    <p className="pl-10 text-muted-foreground">{project.meta}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
