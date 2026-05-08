"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { Dictionary } from "@/types/dictionary";

interface ThreatsProps {
  dict: Dictionary;
}

interface ThreatItem {
  title: string;
  description: string;
}

export function Threats({ dict }: ThreatsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      // Background immersion effect
      gsap.to(sectionRef.current, {
        backgroundColor: "#0a0a0a",
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Grayscale to Color reveal
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          filter: "grayscale(0%)",
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }
  }, []);

  return (
    <section 
      id="threats" 
      ref={sectionRef}
      className="relative bg-[#111111] py-32 lg:py-48 overflow-hidden text-white transition-colors duration-1000"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-start">
          
          {/* Main Image Container */}
          <div className="lg:col-span-7 relative group">
            <div 
              ref={imageRef}
              className="relative aspect-video lg:aspect-[16/10] grayscale scale-[1.05] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
              <Image
                src="/images/threats-habitat.png"
                alt="Destrucción del hábitat en Guanacaste"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>

            {/* Overlapping Detail Box - Premium Glassmorphism */}
            <div className="absolute -bottom-16 right-0 lg:-right-16 bg-white/5 backdrop-blur-2xl p-10 lg:p-16 max-w-lg border border-white/10 shadow-2xl z-10">
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent font-sans text-[10px] font-black uppercase tracking-[0.3em]">
                  Impacto Crítico
                </span>
                <p className="font-serif text-3xl lg:text-4xl text-white font-light leading-tight italic">
                  &quot;Cada árbol caído es un nido menos, una generación perdida en el eco del bosque.&quot;
                </p>
                <div className="h-px w-20 bg-accent/50" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-5 space-y-16 lg:pt-12">
            <ScrollReveal direction="up">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="font-sans text-xs font-black tracking-[0.5em] text-accent uppercase">
                    AMENAZAS ACTUALES
                  </span>
                  <h2 className="font-serif text-6xl lg:text-8xl leading-[0.9] font-light tracking-tighter text-white">
                    {dict.threats.title}
                  </h2>
                </div>
                <p className="font-sans text-xl text-white/60 leading-relaxed font-light">
                  {dict.threats.content}
                </p>
              </div>
            </ScrollReveal>

            {/* Threat List - Refined Design */}
            <div className="space-y-12 pt-12 border-t border-white/5">
              {Object.entries(dict.threats.items).map(([key, item]: [string, ThreatItem]) => (
                <ScrollReveal key={key} direction="up" delay={Number(key) * 0.15}>
                  <div className="group flex gap-8 items-start">
                    <div className="relative flex-shrink-0 mt-1">
                      <span className="font-serif text-5xl text-accent/20 group-hover:text-accent/40 transition-colors duration-500">{key}</span>
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans text-[10px] font-black text-accent">{key.padStart(2, '0')}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans text-sm font-black uppercase tracking-[0.2em] text-white/90 group-hover:text-accent transition-colors duration-500">
                        {item.title}
                      </h3>
                      <p className="font-sans text-base text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Abstract Danger Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 font-serif text-[30vw] font-black text-white/[0.01] pointer-events-none select-none uppercase">
        Crisis
      </div>
    </section>
  );
}
