"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ColorRevealSectionProps {
    children: ReactNode;
    className?: string;
    triggerStart?: string;
    targetColorHex?: string; // Example: "#0a0a0a"
}

export function ColorRevealSection({ children, className, triggerStart = "top 60%", targetColorHex = "#0a0a0a" }: ColorRevealSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        gsap.to(sectionRef.current, {
            backgroundColor: targetColorHex,
            duration: 1,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: triggerStart,
                toggleActions: "play reverse play reverse",
            }
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className={cn("transition-colors duration-1000", className)}>
            {children}
        </section>
    );
}
