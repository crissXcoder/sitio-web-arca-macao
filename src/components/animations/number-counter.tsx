"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface NumberCounterProps {
    endValue: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export function NumberCounter({ endValue, duration = 2, suffix = "", prefix = "", className }: NumberCounterProps) {
    const [value, setValue] = useState(0);
    const counterRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!counterRef.current) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            setValue(endValue);
            return;
        }

        const obj = { val: 0 };
        gsap.to(obj, {
            val: endValue,
            duration: duration,
            ease: "power2.out",
            scrollTrigger: {
                trigger: counterRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            onUpdate: () => {
                setValue(Math.floor(obj.val));
            }
        });
    }, { scope: counterRef });

    return (
        <span ref={counterRef} className={cn("tabular-nums", className)}>
            {prefix}{value}{suffix}
        </span>
    );
}
