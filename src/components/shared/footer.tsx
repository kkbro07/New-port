import { Github, Twitter, Linkedin, Download, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center sm:text-left text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} KIRTAN KALATHIYA. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/kkbro07"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-foreground"
            target="_blank"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            aria-label="Twitter"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/kirtankalathiya/"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-foreground"
            target="_blank"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/kirtankalathiyas/"
            aria-label="Instagram"
            className="text-muted-foreground transition-colors hover:text-foreground"
            target="_blank"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.youtube.com/@kirtankalathiya"
            aria-label="YouTube"
            className="text-muted-foreground transition-colors hover:text-foreground"
            target="_blank"
          >
            <Youtube className="h-5 w-5" />
          </Link>
          <Link
            href="/resume.pdf"
            download="Kirtan_Kalathiya_Resume.pdf"
            aria-label="Download Resume"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Download className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
