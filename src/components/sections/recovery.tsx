import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { NumberCounter } from "@/components/animations/number-counter";
import type { Dictionary } from "@/types/dictionary";

interface RecoveryProps {
  dict: Dictionary;
}

interface RecoveryStat {
  value: string;
  label: string;
  description: string;
}

export function Recovery({ dict }: RecoveryProps) {
  return (
    <section id="recovery" className="py-32 lg:py-48 bg-paper relative overflow-hidden">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 items-start">
          
          {/* Narrative Content */}
          <div className="lg:col-span-5 space-y-12">
            <ScrollReveal direction="up">
              <div className="space-y-6">
                <div className="space-y-4">
                  <span className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-accent/80">
                    Restauración Ecológica
                  </span>
                  <h2 className="font-serif text-6xl lg:text-8xl leading-[0.9] text-black tracking-tighter">
                    {dict.recovery.title}
                  </h2>
                </div>
                <p className="font-sans text-2xl text-black/90 font-light leading-relaxed italic">
                  {dict.recovery.subtitle}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="prose prose-xl text-black/50 font-sans leading-relaxed font-light">
                <p>{dict.recovery.content}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <div className="pt-12 border-t border-black/5">
                <blockquote className="relative">
                  <span className="absolute -top-10 -left-6 font-serif text-[10rem] text-accent/10 pointer-events-none">&quot;</span>
                  <p className="font-serif text-3xl lg:text-4xl text-black/40 leading-snug italic relative z-10">
                    &quot;La conservación no es solo salvar una especie, es restaurar la sinfonía del bosque.&quot;
                  </p>
                </blockquote>
              </div>
            </ScrollReveal>
          </div>

          {/* Scientific Stats Dashboard */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {dict.recovery.stats.map((stat: RecoveryStat, index: number) => {
              const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''), 10) || 0;
              const suffix = stat.value.replace(/[0-9]/g, '');

              return (
                <ScrollReveal 
                  key={index} 
                  direction="up"
                  delay={index * 0.1}
                  className="group relative bg-white p-10 lg:p-14 flex flex-col justify-between min-h-[320px] border border-black/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Subtle Progress Bar Background */}
                  <div className="absolute bottom-0 left-0 h-1 bg-accent/10 w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="font-sans text-[9px] font-black uppercase tracking-[0.2em] text-black/20">
                        Metric Unit {index + 1}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-accent/20 group-hover:bg-accent transition-colors duration-500" />
                    </div>
                    <h3 className="font-serif text-8xl lg:text-9xl text-accent tracking-tighter leading-none flex items-baseline gap-1">
                      <NumberCounter endValue={numericValue} />
                      <span className="text-4xl lg:text-5xl font-light opacity-50">{suffix}</span>
                    </h3>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <h4 className="font-sans text-xs font-black uppercase tracking-[0.3em] text-black group-hover:text-accent transition-colors duration-500">
                      {stat.label}
                    </h4>
                    <p className="font-sans text-sm text-black/40 leading-relaxed group-hover:text-black/60 transition-colors duration-500">
                      {stat.description}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -right-8 -top-8 w-24 h-24 border border-black/[0.02] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                </ScrollReveal>
              );
            })}
            
            {/* Call to Action Block */}
            <ScrollReveal 
              direction="up"
              delay={0.4}
              className="bg-accent p-10 lg:p-14 flex flex-col justify-center items-center text-white text-center group cursor-pointer hover:bg-black transition-all duration-700 relative overflow-hidden md:col-span-2 lg:col-span-1"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="relative z-10 space-y-6">
                <h4 className="font-serif text-3xl lg:text-4xl leading-tight">¿Quieres ser parte?</h4>
                <p className="font-sans text-[10px] font-black opacity-60 uppercase tracking-[0.3em]">Apoya los esfuerzos de monitoreo</p>
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:scale-110 transition-all duration-500">
                  <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>

      {/* Narrative Progress Text */}
      <div className="absolute bottom-10 left-10 font-sans text-[8px] font-black uppercase tracking-[0.5em] text-black/10 vertical-rl hidden lg:block">
        Conservation Metrics — Data Driven Restoration
      </div>
    </section>
  );
}
