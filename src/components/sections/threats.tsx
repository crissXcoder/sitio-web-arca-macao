import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ColorRevealSection } from "@/components/animations/color-reveal-section";
import { ImageColorReveal } from "@/components/animations/image-color-reveal";
import type { Dictionary } from "@/types/dictionary";

interface ThreatsProps {
  dict: Dictionary;
}

interface ThreatItem {
  title: string;
  description: string;
}

export function Threats({ dict }: ThreatsProps) {
  return (
    <ColorRevealSection 
      targetColorHex="var(--color-muted)" 
      triggerStart="top 60%"
      className="relative bg-background py-32 lg:py-48 overflow-hidden text-foreground"
    >
      <div id="threats" className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-start">
          
          {/* Main Image Container */}
          <div className="lg:col-span-7 relative group">
            <ImageColorReveal triggerStart="top 40%" className="relative aspect-video lg:aspect-[16/10] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/threats-habitat.png"
                alt={dict.threats.image_alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 ring-1 ring-inset ring-border/40" />
            </ImageColorReveal>

            {/* Overlapping Detail Box - Premium Glassmorphism */}
            <ScrollReveal direction="up" delay={0.2} className="absolute -bottom-16 right-0 lg:-right-16 bg-card/40 backdrop-blur-2xl p-10 lg:p-16 max-w-lg border border-border/40 shadow-2xl z-10">
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent font-sans text-[10px] font-black uppercase tracking-[0.3em]">
                  {dict.threats.impact_tag}
                </span>
                <p className="font-serif text-3xl lg:text-4xl text-foreground font-light leading-tight italic">
                  &quot;{dict.threats.quote}&quot;
                </p>
                <div className="h-px w-20 bg-accent/50" />
              </div>
            </ScrollReveal>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-5 space-y-16 lg:pt-12">
            <ScrollReveal direction="up">
              <div className="space-y-8 mt-12 lg:mt-0">
                <div className="space-y-4">
                  <span className="font-sans text-xs font-black tracking-[0.5em] text-accent uppercase">
                    {dict.threats.tag}
                  </span>
                  <h2 className="font-serif text-6xl lg:text-8xl leading-[0.9] font-light tracking-tighter text-foreground">
                    {dict.threats.title}
                  </h2>
                </div>
                <p className="font-sans text-xl text-muted-foreground leading-relaxed font-light">
                  {dict.threats.content}
                </p>
              </div>
            </ScrollReveal>

            {/* Threat List - Refined Design */}
            <div className="space-y-12 pt-12 border-t border-border/40">
              {Object.entries(dict.threats.items).map(([key, item]: [string, ThreatItem], index) => (
                <ScrollReveal key={key} direction="up" delay={index * 0.15}>
                  <div className="group flex gap-8 items-start">
                    <div className="relative flex-shrink-0 mt-1">
                      <span className="font-serif text-5xl text-accent/20 group-hover:text-accent/40 transition-colors duration-500">{key}</span>
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans text-[10px] font-black text-accent">{key.padStart(2, '0')}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans text-sm font-black uppercase tracking-[0.2em] text-foreground/90 group-hover:text-accent transition-colors duration-500">
                        {item.title}
                      </h3>
                      <p className="font-sans text-base text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">
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
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 font-serif text-[30vw] font-black text-foreground/[0.03] pointer-events-none select-none uppercase">
        {dict.threats.bg_text}
      </div>
    </ColorRevealSection>
  );
}
