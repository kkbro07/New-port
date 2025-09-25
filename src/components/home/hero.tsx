import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center text-center fade-in bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-primary leading-tight">
            I craft brands & digital experiences that blend functionality with aesthetics.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground">
            Let’s create something special — Contact me
          </p>
          <Link href="/contact" className="mt-8 inline-block">
            <Button size="lg">
              Get in Touch <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
