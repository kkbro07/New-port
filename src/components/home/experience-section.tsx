
import { experiences } from "@/lib/experiences-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ExperienceSection() {
  const experience = experiences[0];

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-1">
            <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tighter">
              Work Experience
            </h2>
          </div>
          <div className="md:col-span-2">
            <Card className="bg-secondary/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">{experience.title}</CardTitle>
                        <CardDescription className="text-base">{experience.company}</CardDescription>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono shrink-0">{experience.period}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {experience.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
