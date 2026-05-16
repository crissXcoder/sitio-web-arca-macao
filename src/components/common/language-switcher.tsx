"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleLanguageChange = (locale: string) => {
    router.push(redirectedPathname(locale));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-10 px-4 rounded-full border border-border/40 bg-background/40 hover:bg-accent/10 transition-all duration-300 group"
        >
          <Globe className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-accent transition-colors" />
          <span className="font-sans text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
            {currentLang === "es" ? "ES" : "EN"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[180px] bg-background/95 backdrop-blur-xl border-border/40 p-2 rounded-2xl shadow-2xl"
      >
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("es")}
          className={`
            rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 mb-1
            ${currentLang === "es" 
              ? "bg-accent text-accent-foreground font-black" 
              : "text-muted-foreground hover:text-foreground hover:bg-accent/10"}
          `}
        >
          <div className="flex flex-col">
            <span className="font-sans text-[10px] uppercase tracking-widest opacity-50">Español</span>
            <span className="font-serif italic text-lg">Castellano</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("en")}
          className={`
            rounded-xl px-4 py-3 cursor-pointer transition-all duration-300
            ${currentLang === "en" 
              ? "bg-accent text-accent-foreground font-black" 
              : "text-muted-foreground hover:text-foreground hover:bg-accent/10"}
          `}
        >
          <div className="flex flex-col">
            <span className="font-sans text-[10px] uppercase tracking-widest opacity-50">English</span>
            <span className="font-serif italic text-lg">Modern English</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
