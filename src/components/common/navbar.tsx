"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Bird } from "lucide-react";

import { Dictionary } from "@/types/dictionary";

interface NavbarProps {
  lang: string;
  dict: Dictionary;
}

export function Navbar({ lang, dict }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Entrance animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.5 }
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: dict.nav.campaign, href: "#campaign" },
    { name: dict.nav.ecology, href: "#ecology" },
    { name: dict.nav.threats, href: "#threats" },
    { name: dict.nav.recovery, href: "#recovery" },
    { name: dict.nav.sightseeing, href: "#sightseeing" },
  ];

  return (
    <div 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-40 transition-all duration-500 px-3 py-3 md:px-6 md:py-6"
    >
      <header 
        className={`
          container mx-auto max-w-7xl h-20 flex items-center justify-between px-4 sm:px-8 rounded-full border transition-all duration-700
          ${isScrolled 
            ? "bg-background/80 backdrop-blur-2xl border-border/40 shadow-lg h-16" 
            : "bg-transparent border-transparent h-20"}
        `}
      >
        <div className="flex items-center gap-4">
          <Link id="brand-logo-link" href={`/${lang}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
              <Bird className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="font-serif text-lg sm:text-2xl font-light tracking-tighter text-foreground whitespace-nowrap">
              {dict.nav.brand_prefix}<span className="text-accent italic">{dict.nav.brand_suffix}</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8 pr-8 border-r border-border/40">
            {navItems.map((item) => (
              <Link
                id={`nav-link-${item.href.replace("#", "")}`}
                key={item.name}
                href={item.href}
                className="font-sans text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLang={lang} />
            <ThemeToggle />
            <Button 
              id="desktop-docs-button"
              className="rounded-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-500 px-8 font-black uppercase text-[10px] tracking-[0.2em]"
            >
              {dict.nav.docs}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center gap-4">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button id="mobile-menu-trigger" variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-border/40 bg-card/40">
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] bg-background border-border text-foreground">
              <SheetHeader className="text-left mb-16">
                <SheetTitle className="font-serif text-3xl font-light">
                  {dict.nav.brand_prefix}<span className="text-accent italic">{dict.nav.brand_suffix}</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8">
                {navItems.map((item) => (
                  <Link
                    id={`mobile-nav-link-${item.href.replace("#", "")}`}
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-3xl max-sm:text-2xl font-light text-muted-foreground hover:text-accent transition-all duration-300 tracking-tighter"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-12 border-t border-border mt-12 flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">{dict.nav.language}</span>
                    <LanguageSwitcher currentLang={lang} />
                  </div>
                  <Button 
                    id="mobile-docs-button"
                    className="rounded-full bg-foreground text-background h-16 text-lg font-serif italic"
                  >
                    {dict.nav.view_docs}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
}

