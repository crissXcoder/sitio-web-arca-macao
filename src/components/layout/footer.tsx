"use client";

import Link from "next/link";
import { Globe, Heart, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Dictionary } from "@/types/dictionary";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface FooterProps {
  dict: Dictionary;
  lang: string;
}

export function Footer({ dict, lang }: FooterProps) {
  return (
    <footer className="bg-background text-foreground pt-32 pb-12 border-t border-border/40 relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[25vw] font-black text-foreground/[0.03] pointer-events-none select-none uppercase whitespace-nowrap">
        {dict.footer.bg_text}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-32">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-10">
            <ScrollReveal direction="up">
              <div className="space-y-4">
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-accent/60">{dict.footer.project_label}</span>
                <h3 className="font-serif text-5xl lg:text-6xl text-foreground tracking-tighter leading-none">
                  {dict.footer.brand_prefix} <br />
                  <span className="text-accent italic">{dict.footer.brand_suffix}</span>
                </h3>
              </div>
              <p className="font-sans text-xl text-muted-foreground leading-relaxed max-w-md font-light italic">
                {dict.footer.description}
              </p>
              
              <div className="pt-4">
                <Link 
                  href="mailto:info@laparoja.cr" 
                  className="group flex items-center gap-4 text-foreground/80 hover:text-accent transition-colors duration-500"
                >
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-2xl tracking-tight">info@laparoja.cr</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-12">
            <ScrollReveal direction="up" delay={0.2} className="space-y-8">
              <h4 className="font-sans font-black uppercase tracking-[0.3em] text-[10px] text-foreground/30">{dict.footer.explore_label}</h4>
              <nav className="flex flex-col gap-6">
                {dict.footer.explore_items.map((item, i) => (
                  <Link 
                    key={item}
                    href={`#${['ecology', 'threats', 'recovery', 'sightseeing'][i]}`} 
                    className="font-serif text-xl text-muted-foreground hover:text-accent transition-all duration-300 flex items-center justify-between group"
                  >
                    {item}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </nav>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} className="space-y-8">
              <h4 className="font-sans font-black uppercase tracking-[0.3em] text-[10px] text-foreground/30">{dict.footer.legal_label}</h4>
              <nav className="flex flex-col gap-6">
                {dict.footer.legal_items.map((item) => (
                  <Link 
                    key={item}
                    href="#" 
                    className="font-serif text-xl text-muted-foreground hover:text-accent transition-all duration-300"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </ScrollReveal>
          </div>

          {/* Location / Meta */}
          <div className="lg:col-span-3 space-y-12">
            <ScrollReveal direction="up" delay={0.4} className="space-y-6">
              <h4 className="font-sans font-black uppercase tracking-[0.3em] text-[10px] text-foreground/30">{dict.footer.location_label}</h4>
              <div className="flex gap-4 items-start text-muted-foreground">
                <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
                <p className="font-sans text-lg font-light leading-snug">
                  {dict.footer.location_text}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5} className="flex gap-4">
              {[
                { icon: <GithubIcon className="w-5 h-5" />, href: "#" },
                { icon: <Globe className="w-5 h-5" />, href: "#" }
              ].map((social, i) => (
                <Link 
                  key={i}
                  href={social.href} 
                  className="w-14 h-14 rounded-full border border-border/40 bg-foreground/[0.02] flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all duration-500 transform hover:-translate-y-1"
                >
                  {social.icon}
                </Link>
              ))}
            </ScrollReveal>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-8">
          <ScrollReveal direction="up" delay={0.6}>
            <p className="font-sans text-[11px] font-medium tracking-widest text-foreground/30 uppercase">
              © {new Date().getFullYear()} {dict.footer.copyright}
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.7}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.03] border border-border/40 font-sans text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              {dict.footer.made_with} <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> {dict.footer.by} <span className="text-foreground/60">Guanacaste Digital</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
}
