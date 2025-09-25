"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Hero() {
  const navItems = [
    { href: "/#work", label: "Work" },
    { href: "/#about", label: "About" },
    { href: "/#experience", label: "Experience" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }
  };

  return (
    <div className="relative min-h-dvh w-full fade-in background-grid">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background" />
      <div className="container relative mx-auto grid h-dvh grid-cols-1 grid-rows-[auto_1fr_auto] gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:px-8">
        {/* Top Left */}
        <div className="col-start-1 row-start-1 self-start">
          <Link
            href="/"
            onClick={(e) => handleScroll(e, "/")}
            className="font-headline text-2xl font-bold uppercase tracking-tighter transition-colors hover:text-muted-foreground"
          >
            KIRTAN
          </Link>
        </div>

        {/* Top Right */}
        <div className="col-start-1 row-start-2 -mt-20 flex flex-col items-start self-start text-left sm:col-start-2 sm:row-start-1 sm:mt-0 sm:items-end sm:text-right">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-muted-foreground">
              ■ Surat, Gujarat, India
            </span>
          </div>
          <nav className="mt-4 flex flex-col items-start space-y-1 text-sm font-medium md:flex-row md:items-center md:space-x-4 md:space-y-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={cn(
                  "transition-colors hover:text-foreground text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Left */}
        <div className="col-span-2 row-start-3 self-end md:col-span-1">
          <h1 className="font-headline text-5xl font-bold uppercase leading-none tracking-tighter md:text-7xl">
            KIRTAN KALATHIYA
          </h1>
          <h2 className="font-body text-lg text-muted-foreground">
            Web Designer & Developer
          </h2>
        </div>

        {/* Bottom Right */}
        <div className="col-start-1 row-start-2 self-end sm:col-start-2 sm:row-start-3 sm:flex sm:items-end sm:justify-end sm:text-right">
          <div className="max-w-sm">
            <p className="text-base text-muted-foreground">
              I craft brands & digital experiences that blend functionality with
              aesthetics.
            </p>
            <Link href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
              <Button size="lg" className="mt-4">
                Get in Touch <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
