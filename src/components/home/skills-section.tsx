
import { SkillsCarousel } from "./skills-carousel";

export function SkillsSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tighter">
                Tools & Technologies
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
                A collection of technologies I'm proficient with, from programming languages to modern frameworks.
            </p>
        </div>
        <SkillsCarousel />
      </div>
    </section>
  );
}
