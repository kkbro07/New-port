import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "about-portrait");

  return (
    <div className="relative h-dvh flex items-center justify-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4 sm:px-6 lg:px-8">
        <div className="relative h-[70vh] w-full flex items-center justify-center fade-in">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              width={800}
              height={1000}
              data-ai-hint={heroImage.imageHint}
              className="object-cover h-full w-auto rounded-lg"
            />
          )}
        </div>
        <div className="text-left fade-in space-y-8">
          <h1 className="font-headline text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-primary leading-none">
            In a world where every second counts, we design with intention to
            maximise dwell time
          </h1>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Samet + Hassam</h2>
            <p className="text-muted-foreground">
              CO-FOUNDERS OF FUTURE THREE
            </p>
            <Link href="/about">
              <Button variant="link" className="p-0 text-lg text-primary">
                Our Story <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
