import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { CampaignTabs } from "@/components/campaign/campaign-tabs";
import type { Dictionary } from "@/types/dictionary";

interface CampaignSectionProps {
  dict: Dictionary;
}

export function CampaignSection({ dict }: CampaignSectionProps) {
  return (
    <section id="campaign" className="relative bg-background py-32 lg:py-48 overflow-hidden border-t border-border/20">
      {/* Background Watermark (Scientific documentary editorial) */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-12 font-serif text-[24rem] font-black text-foreground/[0.01] select-none pointer-events-none uppercase">
        {dict.campaign.bg_text}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Encabezado Editorial */}
        <div className="max-w-3xl mb-24 lg:mb-32 space-y-6">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-primary" />
              <span className="font-sans text-xs font-bold tracking-[0.4em] text-primary uppercase">
                {dict.campaign.tag}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="font-serif text-6xl lg:text-8xl leading-[0.9] font-light tracking-tighter text-foreground">
              {dict.campaign.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="font-sans text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {dict.campaign.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Wrapper de Pestañas Interactivas (Client Island) */}
        <ScrollReveal direction="up" delay={0.4}>
          <CampaignTabs dict={dict} />
        </ScrollReveal>
      </div>
    </section>
  );
}
