"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ImageColorRevealProps {
    children: ReactNode;
    className?: string;
    triggerStart?: string;
}

export function ImageColorReveal({ children, className, triggerStart = "top 40%" }: ImageColorRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            // Instantly remove grayscale and scale if reduced motion is preferred
            gsap.set(containerRef.current, { filter: "grayscale(0%)", scale: 1 });
            return;
        }

        gsap.to(containerRef.current, {
            filter: "grayscale(0%)",
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: triggerStart,
                toggleActions: "play none none reverse",
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={cn("grayscale scale-[1.05]", className)}>
            {children}
        </div>
    );
}
