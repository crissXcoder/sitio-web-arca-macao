"use client";

import { Button } from "@/components/ui/button";
import { HeroEntrance } from "@/components/animations/hero-entrance";
import { HeroLapaAnimation } from "@/components/hero/hero-lapa-animation";
import { ArrowRight, Play } from "lucide-react";
import type { Dictionary } from "@/types/dictionary";

interface HeroProps {
  dict: Dictionary;
}

export function Hero({ dict }: HeroProps) {
  return (
    <HeroLapaAnimation>
      {/* Content Container */}
      <HeroEntrance>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-start justify-center px-6 lg:px-12 pt-20">
          <div className="max-w-5xl space-y-12 text-left">
            <div className="space-y-8">
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="h-[1px] w-12 bg-accent/50" />
                <span className="inline-block font-sans text-[11px] font-black tracking-[0.5em] text-accent uppercase">
                  {dict.hero.location}
                </span>
              </div>
              
              <div className="overflow-hidden">
                <h1 className="font-serif text-8xl leading-[0.85] font-light tracking-tighter text-foreground sm:text-9xl lg:text-[12rem]">
                  {dict.hero.title.split(' ').map((word: string, i: number) => (
                    <span key={i} className="inline-block mr-[0.2em] last:mr-0 transition-transform hover:scale-105 duration-700 cursor-default">
                      {word === "Ara" ? <span className="text-accent italic">Ara</span> : word}
                    </span>
                  ))}
                </h1>
              </div>
            </div>
            
            <div className="max-w-2xl space-y-8">
              <p className="font-sans text-xl leading-relaxed text-muted-foreground sm:text-2xl font-light tracking-wide">
                {dict.hero.subtitle}
              </p>

              <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
                <Button 
                  size="lg" 
                  className="group relative h-16 overflow-hidden rounded-full px-10 bg-foreground text-background hover:bg-accent transition-all duration-500 font-black uppercase text-[11px] tracking-widest"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {dict.hero.cta_primary}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                
                <button className="group flex items-center gap-4 text-foreground/80 hover:text-foreground transition-colors duration-500">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full border border-border/40 group-hover:border-accent transition-all duration-500">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                  <span className="font-serif italic text-lg">{dict.hero.cta_secondary}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </HeroEntrance>

      {/* Floating Info Cards - Subtle Decor */}
      <div className="absolute right-12 bottom-24 hidden lg:flex flex-col gap-8 z-20">
        <div className="p-6 bg-card/40 backdrop-blur-md border border-border/40 rounded-2xl max-w-[200px] hover:bg-card/60 transition-colors duration-500">
          <span className="block font-sans text-[10px] font-black text-accent uppercase tracking-widest mb-2">Población</span>
          <span className="block font-serif text-3xl text-foreground">1,500+</span>
          <p className="text-[11px] text-muted-foreground mt-1">Individuos en estado salvaje</p>
        </div>
        <div className="p-6 bg-card/40 backdrop-blur-md border border-border/40 rounded-2xl max-w-[200px] hover:bg-card/60 transition-colors duration-500">
          <span className="block font-sans text-[10px] font-black text-accent uppercase tracking-widest mb-2">Hábitat</span>
          <span className="block font-serif text-3xl text-foreground">Seco</span>
          <p className="text-[11px] text-muted-foreground mt-1">Bosque tropical de Guanacaste</p>
        </div>
      </div>

      {/* Scroll Indicator - Premium */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 opacity-40">
        <span className="font-sans text-[9px] font-black tracking-[0.5em] text-foreground uppercase">Explorar</span>
        <div className="relative h-12 w-px overflow-hidden bg-border" aria-hidden="true">
          <div className="absolute top-0 left-0 h-full w-full animate-scroll-line bg-accent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
        }
      `}</style>
    </HeroLapaAnimation>
  );
}
