import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-portrait");
  
  let width = 800;
  let height = 1000;

  if (aboutImage?.imageUrl) {
    try {
      const url = new URL(aboutImage.imageUrl);
      const widthParam = url.searchParams.get("w");
      const heightParam = url.searchParams.get("h");

      if (widthParam && !isNaN(parseInt(widthParam))) {
        width = parseInt(widthParam, 10);
      }
      if (heightParam && !isNaN(parseInt(heightParam))) {
        height = parseInt(heightParam, 10);
      }
    } catch (e) {
      // Keep default values if URL parsing fails
    }
  }


  return (
    <div className="fade-in">
      <div className="container mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <section className="mb-16 text-center">
          <h1 className="font-headline text-8xl font-bold uppercase tracking-tighter text-foreground sm:text-9xl md:text-[10rem] lg:text-[12rem] leading-none">
            About Me
          </h1>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[80vh] w-full flex items-center justify-center">
                {aboutImage && (
                <div className="overflow-hidden rounded-lg shadow-lg h-full">
                    <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={width}
                    height={height}
                    data-ai-hint={aboutImage.imageHint}
                    className="h-full w-full object-cover"
                    />
                </div>
                )}
            </div>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold font-headline">Kirtan Kalathiya</h2>
                    <p className="text-muted-foreground text-lg">
                    WEB DESIGNER + DEVELOPER
                    </p>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-lg">
                  My name is Kirtan Kalathiya, a web designer and developer from Surat, India. I'm a passionate programmer and quick learner with experience in Node.js, React, Bootstrap, MongoDB, and MySQL. As an SEO fresher, I have basic knowledge of on-page and off-page SEO, keyword research, and tools like Google Search Console and Yoast SEO. I'm eager to build websites that are both user-friendly and search engine optimized.
                  </p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
