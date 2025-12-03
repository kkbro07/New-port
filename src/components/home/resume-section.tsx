
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

export function ResumeSection() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tighter">
          Interested in working together?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          You can download my resume to get a more detailed look at my skills, experience, and qualifications.
        </p>
        <div className="mt-8">
            <Button asChild size="lg">
                <Link href="/resume.pdf" download="Kirtan_Kalathiya_Resume.pdf">
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
