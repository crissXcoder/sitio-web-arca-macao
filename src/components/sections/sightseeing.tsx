"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Check, X, Eye, Info, ShieldCheck, AlertTriangle } from "lucide-react";
import type { Dictionary } from "@/types/dictionary";

interface SightseeingProps {
  dict: Dictionary;
}

export function Sightseeing({ dict }: SightseeingProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, []);

  return (
    <section id="sightseeing" ref={sectionRef} className="py-32 lg:py-48 bg-background relative overflow-hidden text-foreground">
      {/* Immersive Background Decor */}
      <div 
        ref={bgRef}
        className="absolute inset-0 opacity-20 pointer-events-none scale-110"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,184,0,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(255,184,0,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24 lg:mb-32 space-y-8">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <Eye className="w-3 h-3" aria-hidden="true" />
              {dict.sightseeing.tag}
            </div>
            <h2 className="font-serif text-6xl lg:text-9xl leading-[0.85] font-light tracking-tighter mb-8">
              {dict.sightseeing.title}
            </h2>
            <p className="font-sans text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed italic">
              {dict.sightseeing.subtitle}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* DOS - THE RESPECTFUL WAY */}
          <ScrollReveal direction="up" delay={0.2} className="h-full">
            <div className="h-full bg-card/40 border border-border/40 backdrop-blur-3xl p-12 lg:p-16 relative group hover:border-accent/40 transition-all duration-700 overflow-hidden rounded-sm">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12">
                <ShieldCheck className="w-24 h-24 text-accent" aria-hidden="true" />
              </div>
              
              <div className="space-y-12 relative z-10">
                <div className="space-y-2">
                  <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-accent/60">{dict.sightseeing.dos_tag}</span>
                  <h3 className="font-serif text-4xl text-accent flex items-center gap-4">
                    {dict.sightseeing.dos_title}
                  </h3>
                </div>
                
                <ul className="space-y-8">
                  {dict.sightseeing.dos.map((item: string, i: number) => (
                    <li key={i} className="flex gap-6 items-start font-sans text-lg text-foreground/70 group/item hover:text-foreground transition-colors duration-300">
                      <div className="mt-1.5 w-6 h-6 rounded-full border border-accent/30 flex items-center justify-center shrink-0 group-hover/item:bg-accent/10 transition-colors">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="leading-relaxed font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* DON'TS - WHAT TO AVOID */}
          <ScrollReveal direction="up" delay={0.4} className="h-full">
            <div className="h-full bg-card/40 border border-border/40 backdrop-blur-3xl p-12 lg:p-16 relative group hover:border-red-500/40 transition-all duration-700 overflow-hidden rounded-sm">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12">
                <AlertTriangle className="w-24 h-24 text-red-500" aria-hidden="true" />
              </div>
              
              <div className="space-y-12 relative z-10">
                <div className="space-y-2">
                  <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-red-500/60">{dict.sightseeing.donts_tag}</span>
                  <h3 className="font-serif text-4xl text-red-400 flex items-center gap-4">
                    {dict.sightseeing.donts_title}
                  </h3>
                </div>
                
                <ul className="space-y-8">
                  {dict.sightseeing.donts.map((item: string, i: number) => (
                    <li key={i} className="flex gap-6 items-start font-sans text-lg text-foreground/70 group/item hover:text-foreground transition-colors duration-300">
                      <div className="mt-1.5 w-6 h-6 rounded-full border border-red-500/30 flex items-center justify-center shrink-0 group-hover/item:bg-red-500/10 transition-colors">
                        <X className="w-3 h-3 text-red-500" />
                      </div>
                      <span className="leading-relaxed font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Footer info card - Premium Layout */}
        <ScrollReveal direction="up" delay={0.6} className="mt-24 lg:mt-40">
          <div className="max-w-4xl mx-auto bg-card/40 border border-border/40 p-12 lg:p-20 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
              <div className="md:col-span-2 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-700">
                  <Info className="w-10 h-10 text-accent" aria-hidden="true" />
                </div>
              </div>
              <div className="md:col-span-10 space-y-6">
                <div className="space-y-2">
                  <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-accent/60">{dict.sightseeing.commitment_tag}</span>
                  <h4 className="font-serif text-4xl lg:text-5xl text-foreground font-light">{dict.sightseeing.commitment_title}</h4>
                </div>
                <p className="font-sans text-xl text-muted-foreground leading-relaxed font-light italic">
                  {dict.sightseeing.content}
                </p>
              </div>
            </div>
            
            {/* Abstract Background Text */}
            <div className="absolute bottom-0 right-0 font-serif text-[15vw] font-black text-foreground/[0.02] pointer-events-none select-none uppercase leading-none translate-y-1/2 translate-x-1/4">
              {dict.sightseeing.bg_text}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
