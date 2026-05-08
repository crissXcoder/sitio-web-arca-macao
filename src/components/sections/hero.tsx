import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { HeroEntrance } from "@/components/animations/hero-entrance";

interface HeroProps {
  dict: any;
}

export function Hero({ dict }: HeroProps) {
  return (
    <section className="relative h-[calc(100vh-64px)] min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-ara-macao.png"
          alt="Ara Macao flying over Guanacaste"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-background" />
      </div>

      {/* Content Container with Animation Bridge */}
      <HeroEntrance>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <h1 className="animate-title text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="block">{dict.hero.title}</span>
              <span className="mt-2 block text-destructive drop-shadow-xl">
                Guanacaste
              </span>
            </h1>
            
            <p className="animate-subtitle mx-auto max-w-2xl text-lg text-zinc-200 sm:text-xl md:text-2xl">
              {dict.hero.subtitle}
            </p>

            <div className="animate-cta flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
              <Button size="lg" className="h-12 px-8 text-lg font-semibold bg-destructive hover:bg-destructive/90 text-white border-none shadow-lg shadow-destructive/20 transition-all hover:scale-105">
                {dict.hero.cta_primary}
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg font-semibold backdrop-blur-md bg-white/10 hover:bg-white/20 border-white/30 text-white transition-all hover:scale-105">
                {dict.hero.cta_secondary}
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <ChevronDown className="h-8 w-8 text-white" />
          </div>
        </div>
      </HeroEntrance>
    </section>
  );
}
