"use client";

import { useRef } from "react";
import Image, { ImageProps } from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Ensure ScrollTrigger is registered before use
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps extends Omit<ImageProps, "className"> {
    containerClassName?: string;
    imageClassName?: string;
    speed?: number;
    direction?: "up" | "down";
}

export function ParallaxImage({ containerClassName, imageClassName, speed = 15, direction = "up", ...props }: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !imageRef.current) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const yValue = direction === "up" ? -speed : speed;

        gsap.to(imageRef.current, {
            yPercent: yValue,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={cn("relative overflow-hidden", containerClassName)}>
            <div className={cn("absolute inset-0", direction === "up" ? "-top-[20%] -bottom-[20%]" : "-top-[20%] -bottom-[20%]")}>
                <Image
                    ref={imageRef}
                    {...props}
                    className={cn("object-cover w-full h-full", imageClassName)}
                />
            </div>
        </div>
    );
}
