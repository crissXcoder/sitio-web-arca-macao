"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trees, ShieldAlert, Sparkles, MapPin, Milestone } from "lucide-react";
import type { Dictionary } from "@/types/dictionary";

interface CampaignTabsProps {
  dict: Dictionary;
}

type TabType = "mission" | "census" | "botany";

export function CampaignTabs({ dict }: CampaignTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("mission");

  const tabItems = [
    { id: "mission" as TabType, label: dict.campaign.tabs.mission, icon: <Milestone className="w-4 h-4" /> },
    { id: "census" as TabType, label: dict.campaign.tabs.census, icon: <MapPin className="w-4 h-4" /> },
    { id: "botany" as TabType, label: dict.campaign.tabs.botany, icon: <Trees className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-12">
      {/* Botones de Navegación de Pestañas (look editorial, esquinas sharp 0px) */}
      <div className="flex flex-wrap border-b border-border/30">
        {tabItems.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-8 py-5 font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 border-b-2 -mb-px rounded-none cursor-pointer ${
                isActive
                  ? "border-primary text-primary bg-primary/[0.02]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Contenedor del Contenido de Pestañas con transiciones animadas */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* PESTAÑA 1: LA CAMPAÑA */}
            {activeTab === "mission" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* Gran cita del Mensaje Rector (Look de revista premium) */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-4">
                    <span className="font-sans text-xs font-bold tracking-[0.2em] text-primary uppercase">
                      {dict.campaign.mission.rector_title}
                    </span>
                    <blockquote className="font-serif text-3xl lg:text-5xl font-light italic leading-tight text-foreground border-l-4 border-primary pl-6 py-2">
                      {dict.campaign.mission.rector_text}
                    </blockquote>
                  </div>
                  <p className="font-sans text-base lg:text-lg text-muted-foreground leading-relaxed">
                    {dict.campaign.mission.description}
                  </p>
                </div>

                {/* Especie Sombrilla (Glassmorphic precision panel) */}
                <div className="lg:col-span-5 bg-foreground/[0.02] border border-border/20 p-8 space-y-6 relative overflow-hidden rounded-none backdrop-blur-md">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Sparkles className="w-24 h-24 text-primary" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-xl font-semibold text-foreground">
                      {dict.campaign.mission.umbrella_title}
                    </h4>
                  </div>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {dict.campaign.mission.umbrella_desc}
                  </p>
                </div>
              </div>
            )}

            {/* PESTAÑA 2: DISTRIBUCIÓN Y CENSO */}
            {activeTab === "census" && (
              <div className="space-y-12">
                <div className="max-w-3xl space-y-4">
                  <h3 className="font-serif text-3xl text-foreground font-normal">
                    {dict.campaign.census.title}
                  </h3>
                  <p className="font-sans text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {dict.campaign.census.desc}
                  </p>
                </div>

                {/* Bento Grid Estadístico Asimétrico */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dict.campaign.census.regions.map((region, idx) => {
                    // Determinar colores y estilos dinámicos de estatus
                    let statusColor = "text-yellow-600 bg-yellow-500/10 border-yellow-500/20";
                    if (region.status.includes("Viable") || region.status.includes("Healthy")) {
                      statusColor = "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
                    } else if (region.status.includes("Riesgo") || region.status.includes("Risk")) {
                      statusColor = "text-rose-600 bg-rose-500/10 border-rose-500/20";
                    }

                    return (
                      <div
                        key={idx}
                        className="border border-border/20 bg-foreground/[0.01] hover:bg-foreground/[0.02] p-8 space-y-6 transition-all duration-300 rounded-none relative group"
                      >
                        {/* Indicador Numérico e Información de Cabecera */}
                        <div className="flex justify-between items-start">
                          <span className="font-serif text-xs font-semibold text-primary">
                            0{idx + 1}.
                          </span>
                          <span className={`font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border ${statusColor} rounded-none`}>
                            {region.status}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <span className="font-sans text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase block">
                            {region.meta}
                          </span>
                          <h4 className="font-serif text-2xl font-normal text-foreground group-hover:text-primary transition-colors duration-300">
                            {region.name}
                          </h4>
                        </div>

                        {/* Métrica Grande */}
                        <div className="py-2 border-y border-border/10">
                          <span className="font-serif text-4xl lg:text-5xl font-light tracking-tight text-foreground block">
                            {region.count}
                          </span>
                          <span className="font-sans text-xs text-muted-foreground">
                            {region.label}
                          </span>
                        </div>

                        <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                          {region.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PESTAÑA 3: DEPENDENCIA BOTÁNICA */}
            {activeTab === "botany" && (
              <div className="space-y-12">
                <div className="max-w-3xl space-y-4">
                  <h3 className="font-serif text-3xl text-foreground font-normal">
                    {dict.campaign.botany.title}
                  </h3>
                  <p className="font-sans text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {dict.campaign.botany.desc}
                  </p>
                </div>

                {/* Grid de 4 columnas para especies arbóreas críticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dict.campaign.botany.trees.map((tree, idx) => (
                    <div
                      key={idx}
                      className="border border-border/20 bg-foreground/[0.01] hover:bg-foreground/[0.02] p-8 space-y-6 transition-all duration-300 rounded-none group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <Trees className="w-5 h-5" />
                        </div>
                        <span className="font-serif text-xs font-bold text-muted-foreground">
                          {idx + 1} / 4
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-sans text-xl font-bold text-foreground">
                          {tree.name}
                        </h4>
                        <span className="font-serif text-xs italic text-primary block">
                          {tree.scientific}
                        </span>
                      </div>

                      <div className="space-y-4 border-t border-border/15 pt-4">
                        <span className="font-sans text-[10px] font-bold tracking-widest text-primary uppercase block">
                          {tree.role}
                        </span>
                        <p className="font-sans text-xs lg:text-sm text-muted-foreground leading-relaxed">
                          {tree.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
