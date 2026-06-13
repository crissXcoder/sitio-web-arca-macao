"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Globe, Heart, ArrowUpRight, Mail, MapPin, ArrowUp, Clock, Check, AlertCircle } from "lucide-react";
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
  // Costa Rica Local Time Clock (GMT-6)
  const [crTime, setCrTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Costa_Rica",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatted = new Date().toLocaleTimeString(lang === "es" ? "es-CR" : "en-US", options);
      setCrTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  // Newsletter states
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-background text-foreground pt-32 pb-12 border-t border-border/20 relative overflow-hidden">
      {/* Decorative Background Text (Scientific Editorial watermark) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[25vw] font-black text-foreground/[0.015] pointer-events-none select-none uppercase whitespace-nowrap z-0">
        {dict.footer.bg_text}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-24">
          
          {/* Col 1: Brand, Mission & Local Time Widget */}
          <div className="lg:col-span-5 space-y-10">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="space-y-4">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-primary/80">
                  {dict.footer.project_label}
                </span>
                <h3 className="font-serif text-5xl lg:text-7xl text-foreground tracking-tighter leading-[0.9] font-light">
                  {dict.footer.brand_prefix} <br />
                  <span className="text-primary italic font-normal">{dict.footer.brand_suffix}</span>
                </h3>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="font-sans text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md font-light italic">
                {dict.footer.description}
              </p>
            </ScrollReveal>

            {/* Local Time Dashboard Card */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="inline-flex items-center gap-4 bg-foreground/[0.02] border border-border/15 px-6 py-4 rounded-none backdrop-blur-md">
                <div className="p-2.5 bg-primary/10 text-primary">
                  <Clock className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="font-sans text-[9px] font-bold tracking-widest text-muted-foreground uppercase block">
                    {dict.footer.widget_time_label}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-xl font-normal text-foreground tabular-nums">
                      {crTime || "--:--:--"}
                    </span>
                    <span className="font-sans text-[9px] text-muted-foreground">
                      {dict.footer.widget_gmt}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Col 2: Navigation Links (Explore & Legal) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:gap-12">
            <ScrollReveal direction="up" delay={0.2} className="space-y-8">
              <h4 className="font-sans font-bold uppercase tracking-[0.3em] text-[10px] text-foreground/45 border-b border-border/10 pb-3">
                {dict.footer.explore_label}
              </h4>
              <nav className="flex flex-col gap-5">
                {dict.footer.explore_items.map((item, i) => (
                  <Link 
                    key={item}
                    href={`#${['campaign', 'ecology', 'threats', 'recovery', 'sightseeing'][i]}`} 
                    className="font-serif text-lg text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center justify-between group py-0.5"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-primary duration-300" />
                  </Link>
                ))}
              </nav>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} className="space-y-8">
              <h4 className="font-sans font-bold uppercase tracking-[0.3em] text-[10px] text-foreground/45 border-b border-border/10 pb-3">
                {dict.footer.legal_label}
              </h4>
              <nav className="flex flex-col gap-5">
                {dict.footer.legal_items.map((item) => (
                  <Link 
                    key={item}
                    href="#" 
                    className="font-serif text-lg text-muted-foreground hover:text-primary transition-colors duration-300 py-0.5 block"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </ScrollReveal>
          </div>

          {/* Col 3: Interactive Newsletter & Contact */}
          <div className="lg:col-span-3 space-y-10">
            <ScrollReveal direction="up" delay={0.3} className="space-y-6">
              <h4 className="font-sans font-bold uppercase tracking-[0.3em] text-[10px] text-foreground/45 border-b border-border/10 pb-3">
                {dict.footer.newsletter_title}
              </h4>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder={dict.footer.newsletter_placeholder}
                    disabled={status === "loading" || status === "success"}
                    className="w-full bg-foreground/[0.015] border border-border/20 px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground/60 rounded-none transition-colors duration-300"
                  />
                  {status === "success" && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="w-full bg-foreground text-background hover:bg-primary hover:text-white disabled:bg-border/40 disabled:text-muted-foreground/60 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-none cursor-pointer transition-all duration-500"
                >
                  {status === "loading" ? "..." : dict.footer.newsletter_button}
                </button>

                {/* Validation Feedback with Animation */}
                {status === "success" && (
                  <p className="flex items-center gap-1.5 text-xs text-emerald-600 font-sans mt-2">
                    <Check className="w-3.5 h-3.5" />
                    {dict.footer.newsletter_success}
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-center gap-1.5 text-xs text-rose-600 font-sans mt-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {dict.footer.newsletter_invalid}
                  </p>
                )}
              </form>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4} className="space-y-6">
              <div className="flex gap-3.5 items-start text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="font-sans text-sm font-light leading-snug">
                  {dict.footer.location_text}
                </p>
              </div>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal direction="up" delay={0.5} className="flex gap-4">
              {[
                { icon: <GithubIcon className="w-4 h-4" />, href: "https://github.com/crissXcoder" }
              ].map((social, i) => (
                <Link 
                  key={i}
                  href={social.href} 
                  className="w-11 h-11 border border-border/20 bg-foreground/[0.01] flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 rounded-none"
                >
                  {social.icon}
                </Link>
              ))}
            </ScrollReveal>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Credits & Smooth Scroll Up */}
        <div className="pt-12 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-8 relative">
          
          <ScrollReveal direction="up" delay={0.5}>
            <p className="font-sans text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              © {new Date().getFullYear()} {dict.footer.copyright}
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.6}>
            <div className="flex items-center gap-2 px-4 py-2 bg-foreground/[0.02] border border-border/15 font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground rounded-none">
              {dict.footer.made_with} <Heart className="w-3 h-3 text-rose-600 fill-rose-600 animate-pulse" /> {dict.footer.by} <span className="text-foreground/80">Estudiantes de la UNA</span>
            </div>
          </ScrollReveal>

          {/* Interactive Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="md:absolute md:right-0 md:-top-6 w-12 h-12 bg-foreground hover:bg-primary text-background hover:text-white flex items-center justify-center transition-all duration-500 shadow-md group rounded-none cursor-pointer border-none"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>

        </div>
      </div>
    </footer>
  );
}
