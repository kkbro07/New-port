"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/#work", label: "Work" },
    { href: "/#about", label: "About" },
    { href: "/#experience", label: "Experience" },
    { href: "/#contact", label: "Contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
      "bg-background/80 backdrop-blur-sm"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={(e) => handleScroll(e, '/')}
          className="text-2xl font-bold tracking-tighter transition-colors hover:text-muted-foreground font-headline uppercase"
        >
          Kirtan
        </Link>
        <div className="flex items-center gap-8">
          <nav className="hidden items-center space-x-8 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={cn(
                  "transition-colors hover:text-foreground",
                  (pathname === item.href || (item.href === "/#work" && pathname === "/"))
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center space-x-4 md:flex">
             <Link
              href="#"
              aria-label="Instagram"
              className="font-bold text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              IG
            </Link>
            <Link
              href="#"
              aria-label="LinkedIn"
               className="font-bold text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              LI
            </Link>
             <Link
              href="#"
              aria-label="Youtube"
               className="font-bold text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              YT
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
    