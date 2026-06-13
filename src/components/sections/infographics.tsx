"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Download, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/types/dictionary";

interface InfographicsProps {
  dict: Dictionary;
}

interface InfographicItem {
  id: string;
  title: string;
  summary: string;
  imageSrc: string;
  downloadName: string;
  type: "anatomy" | "conservation";
}

export function Infographics({ dict }: InfographicsProps) {
  const [activeImage, setActiveImage] = useState<InfographicItem | null>(null);

  // Escuchar la tecla de Escape para cerrar el lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDownload = (item: InfographicItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = item.imageSrc;
    link.download = item.downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const infographicsData: InfographicItem[] = [
    {
      id: "anatomy",
      title: dict.infographics.anatomy.title,
      summary: dict.infographics.anatomy.summary,
      imageSrc: "/images/ara-macao-pico.png",
      downloadName: "Anatomia_Pico_Ara_Macao.png",
      type: "anatomy",
    },
    {
      id: "conservation",
      title: dict.infographics.conservation.title,
      summary: dict.infographics.conservation.summary,
      imageSrc: "/images/lapa-roja-conservacion.png",
      downloadName: "Habitat_Conservacion_Lapa_Roja.png",
      type: "conservation",
    },
  ];

  return (
    <section id="resources" className="relative bg-background py-32 lg:py-48 overflow-hidden border-t border-border/20">
      {/* Background Watermark */}
      <div className="absolute top-0 left-0 -translate-y-1/3 -translate-x-10 font-serif text-[24rem] font-black text-foreground/[0.01] select-none pointer-events-none uppercase">
        {dict.infographics.bg_text}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header de la Sección */}
        <div className="max-w-3xl mb-24 lg:mb-32 space-y-6">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-primary" />
              <span className="font-sans text-xs font-bold tracking-[0.4em] text-primary uppercase">
                {dict.infographics.tag}
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="font-serif text-6xl lg:text-8xl leading-[0.9] font-light tracking-tighter text-foreground">
              {dict.infographics.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="font-sans text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {dict.infographics.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Grid Asimétrico Editorial (Sharp Corners 0px) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Tarjeta 1 (Anatomía) - lg:col-span-5 (Vertical) */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="up" delay={0.2}>
              <div 
                className="group relative aspect-[3/4] bg-muted/30 border border-border/30 overflow-hidden cursor-pointer rounded-none"
                onClick={() => setActiveImage(infographicsData[0])}
              >
                <Image
                  src={infographicsData[0].imageSrc}
                  alt={infographicsData[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay Glassmorphic Hover */}
                <div className="absolute inset-0 bg-background/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-background border border-border/40 px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-foreground shadow-2xl flex items-center gap-2 rounded-none">
                    <Maximize2 className="w-4 h-4 text-primary" />
                    {dict.infographics.view_btn}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} className="space-y-6">
              <h3 className="font-serif text-3xl lg:text-4xl font-normal text-foreground leading-tight">
                {infographicsData[0].title}
              </h3>
              <p className="font-sans text-base text-muted-foreground leading-relaxed">
                {infographicsData[0].summary}
              </p>

              {/* Contenido en pasos (Anatomía) */}
              <div className="space-y-4 pt-4 border-t border-border/20">
                <span className="font-sans text-xs font-bold tracking-wider text-primary uppercase">
                  {dict.infographics.anatomy.steps_title}
                </span>
                <ol className="space-y-3 font-sans text-sm text-foreground/90">
                  {dict.infographics.anatomy.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-4 items-start leading-relaxed">
                      <span className="font-serif text-lg font-bold text-primary/70 select-none">
                        0{idx + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  onClick={() => setActiveImage(infographicsData[0])} 
                  variant="outline" 
                  className="rounded-none font-bold uppercase tracking-wider text-xs px-6 py-5 border-border hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                  <Maximize2 className="w-4 h-4 mr-2" />
                  {dict.infographics.view_btn}
                </Button>
                <Button 
                  onClick={(e) => handleDownload(infographicsData[0], e)} 
                  variant="default" 
                  className="rounded-none font-bold uppercase tracking-wider text-xs px-6 py-5 bg-primary hover:bg-primary/95 text-white transition-colors duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {dict.infographics.download_btn}
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Tarjeta 2 (Conservación) - lg:col-span-7 (Horizontal/Asimétrica) */}
          <div className="lg:col-span-7 space-y-8 lg:mt-24">
            <ScrollReveal direction="up" delay={0.4}>
              <div 
                className="group relative aspect-video bg-muted/30 border border-border/30 overflow-hidden cursor-pointer rounded-none"
                onClick={() => setActiveImage(infographicsData[1])}
              >
                <Image
                  src={infographicsData[1].imageSrc}
                  alt={infographicsData[1].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay Glassmorphic Hover */}
                <div className="absolute inset-0 bg-background/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-background border border-border/40 px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-foreground shadow-2xl flex items-center gap-2 rounded-none">
                    <Maximize2 className="w-4 h-4 text-primary" />
                    {dict.infographics.view_btn}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5} className="space-y-6">
              <h3 className="font-serif text-3xl lg:text-4xl font-normal text-foreground leading-tight">
                {infographicsData[1].title}
              </h3>
              <p className="font-sans text-base text-muted-foreground leading-relaxed">
                {infographicsData[1].summary}
              </p>

              {/* Botones de acción */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  onClick={() => setActiveImage(infographicsData[1])} 
                  variant="outline" 
                  className="rounded-none font-bold uppercase tracking-wider text-xs px-6 py-5 border-border hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                  <Maximize2 className="w-4 h-4 mr-2" />
                  {dict.infographics.view_btn}
                </Button>
                <Button 
                  onClick={(e) => handleDownload(infographicsData[1], e)} 
                  variant="default" 
                  className="rounded-none font-bold uppercase tracking-wider text-xs px-6 py-5 bg-primary hover:bg-primary/95 text-white transition-colors duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {dict.infographics.download_btn}
                </Button>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>

      {/* Lightbox Modal (Framer Motion) */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4 cursor-zoom-out"
            onClick={() => setActiveImage(null)}
          >
            {/* Botón Cerrar */}
            <button
              className="absolute top-6 right-6 z-50 text-foreground hover:text-primary transition-colors duration-300 bg-background border border-border/30 p-3 rounded-none shadow-xl cursor-pointer"
              onClick={() => setActiveImage(null)}
              aria-label={dict.infographics.close_btn}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Contenedor de Imagen de Alta Resolución */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full aspect-[3/4] md:aspect-auto h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[75vh] bg-muted/10 border border-border/20">
                <Image
                  src={activeImage.imageSrc}
                  alt={activeImage.title}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
              </div>

              {/* Datos de la infografía flotante */}
              <div className="w-full mt-4 bg-background border border-border/30 p-6 flex flex-wrap gap-4 justify-between items-center rounded-none shadow-2xl">
                <div className="space-y-1 max-w-xl">
                  <h4 className="font-serif text-lg text-foreground font-semibold">
                    {activeImage.title}
                  </h4>
                  <p className="font-sans text-xs text-muted-foreground line-clamp-1">
                    {activeImage.summary}
                  </p>
                </div>
                <Button
                  onClick={(e) => handleDownload(activeImage, e)}
                  variant="default"
                  className="rounded-none font-bold uppercase tracking-wider text-xs px-6 py-4 bg-primary hover:bg-primary/95 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {dict.infographics.download_btn}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
