import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ParallaxImage } from "@/components/animations/parallax-image";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { Leaf, Map, TreeDeciduous } from "lucide-react";
import type { Dictionary } from "@/types/dictionary";

interface EcologyProps {
  dict: Dictionary;
}

export function Ecology({ dict }: EcologyProps) {
  const bentoItems: BentoItem[] = [
    {
      title: "Dependencia de Cavidades",
      meta: "Crítico",
      description: "Dependen de árboles maduros de gran diámetro con cavidades naturales para anidar y asegurar su reproducción.",
      icon: <TreeDeciduous className="w-6 h-6" />,
      status: "85%",
      tags: ["Nidificación", "Supervivencia"],
    },
    {
      title: "Especies en Simbiosis",
      meta: "Flora",
      description: "Interactúan activamente con cientos de especies del bosque seco tropical, vitales para su dieta y el ecosistema.",
      icon: <Leaf className="w-6 h-6" />,
      status: "700+",
      tags: ["Dieta", "Dispersión"],
    },
    {
      title: "Corredor Biológico",
      meta: "Guanacaste",
      description: "Su área de distribución actual se concentra fuertemente en el Área de Conservación Guanacaste, creando un puente genético fundamental entre el bosque seco y los ecosistemas costeros.",
      icon: <Map className="w-6 h-6" />,
      status: "Vital",
      tags: ["Territorio", "Conservación"],
      colSpan: 2,
      hasPersistentHover: true,
    }
  ];

  return (
    <section id="ecology" className="relative bg-background py-32 lg:py-48 overflow-hidden">
      {/* Background Textural Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 font-serif text-[20rem] font-black text-foreground/[0.02] select-none pointer-events-none">
        Ara
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 space-y-12 order-2 lg:order-1">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-primary" />
                  <span className="font-sans text-xs font-bold tracking-[0.4em] text-primary uppercase">
                    ECOLOGÍA Y HÁBITAT
                  </span>
                </div>
                <h2 className="font-serif text-6xl lg:text-8xl leading-[0.9] font-light tracking-tighter text-foreground">
                  {dict.ecology.title}
                </h2>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4}>
              <div className="space-y-8">
                <p className="font-sans text-xl lg:text-2xl font-medium text-foreground/90 leading-tight border-l-2 border-primary/30 pl-8 py-2">
                  {dict.ecology.subtitle}
                </p>
                <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                  {dict.ecology.content}
                </p>
              </div>
            </ScrollReveal>

            {/* Premium Data Points using Bento Grid */}
            <ScrollReveal direction="up" delay={0.6}>
              <div className="pt-8">
                <BentoGrid items={bentoItems} className="max-w-full" />
              </div>
            </ScrollReveal>
          </div>

          {/* Image Composition with Parallax Wrappers */}
          <div className="lg:col-span-7 relative order-1 lg:order-2 px-4 lg:px-0 mt-12 lg:mt-0">
            <ParallaxImage
              src="/images/ecology-macaw.png"
              alt="Lapa Roja en su hábitat"
              fill
              priority
              direction="up"
              speed={15}
              containerClassName="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden shadow-2xl rounded-sm"
              imageClassName="scale-110"
            />
            
            {/* Overlapping floating image with Glassmorphism */}
            <ParallaxImage
              src="/images/ecology-forest.png"
              alt="Bosque Seco de Guanacaste"
              fill
              direction="down"
              speed={20}
              containerClassName="absolute -bottom-16 -left-8 lg:-left-24 w-3/4 lg:w-3/5 aspect-video border-[8px] lg:border-[16px] border-background shadow-2xl overflow-hidden hidden sm:block rounded-sm"
            />
            
            {/* Structural Decor */}
            <ScrollReveal direction="left" delay={0.8} className="absolute -top-12 -right-12 hidden lg:block -z-10">
              <div className="w-48 h-48 border border-primary/10 rotate-12" />
            </ScrollReveal>
          </div>
        </div>

        {/* Big Quote - Documentary Style */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-48 lg:mt-64 relative py-24 border-y border-border/30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-8">
              <span className="font-serif text-6xl text-primary opacity-20">&quot;</span>
            </div>
            <div className="max-w-5xl mx-auto text-center space-y-12">
              <blockquote className="font-serif text-4xl lg:text-7xl font-light italic text-foreground/95 leading-[1.1] tracking-tight">
                Su vuelo no es solo un espectáculo de color, es el pulso vital de un ecosistema que se niega a desaparecer.
              </blockquote>
              <cite className="block font-sans text-xs font-black uppercase tracking-[0.5em] text-primary">
                &mdash; Crónica del Bosque Seco
              </cite>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
