"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 50,
  className,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const vars = {
        opacity: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      };

      if (direction === "up") Object.assign(vars, { y: distance });
      if (direction === "down") Object.assign(vars, { y: -distance });
      if (direction === "left") Object.assign(vars, { x: distance });
      if (direction === "right") Object.assign(vars, { x: -distance });

      gsap.from(elementRef.current, vars);
    },
    { scope: elementRef }
  );

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
