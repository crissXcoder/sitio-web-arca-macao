"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface HeroEntranceProps {
  children: React.ReactNode;
}

export function HeroEntrance({ children }: HeroEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Subtle entrance to avoid LCP issues
      tl.from(".animate-title", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
      })
        .from(
          ".animate-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 1,
          },
          "-=0.8"
        )
        .from(
          ".animate-cta",
          {
            y: 15,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
          },
          "-=0.6"
        );
    },
    { scope: containerRef }
  );

  return <div ref={containerRef}>{children}</div>;
}
