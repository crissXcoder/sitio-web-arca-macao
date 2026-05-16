"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroLapaAnimationProps {
  children: React.ReactNode;
}

export function HeroLapaAnimation({ children }: HeroLapaAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  const frameCount = 151;
  const currentFrame = (index: number) =>
    `/lapa-frames/sequence/frame_${(index + 1).toString().padStart(4, "0")}.jpg`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const setCanvasSize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };

        setCanvasSize();

        const images: HTMLImageElement[] = [];
        const lapaSeq = { frame: 0 };

        const render = () => {
          if (!images[lapaSeq.frame] || !images[lapaSeq.frame].complete) return;
          const img = images[lapaSeq.frame];

          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShift_x = (canvas.width - img.width * ratio) / 2;
          const centerShift_y = (canvas.height - img.height * ratio) / 2;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio,
          );
        };

        const handleResize = () => {
          setCanvasSize();
          render();
        };
        window.addEventListener("resize", handleResize);

        // Load first frame immediately to draw and fade out fallback
        const firstImg = new window.Image();
        firstImg.src = currentFrame(0);
        firstImg.onload = () => {
          images[0] = firstImg;
          render();
          gsap.to(fallbackRef.current, {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.inOut",
          });
        };

        // Preload remaining frames
        for (let i = 1; i < frameCount; i++) {
          const img = new window.Image();
          img.src = currentFrame(i);
          images.push(img);
        }

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.5,
          animation: gsap.to(lapaSeq, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            onUpdate: render,
          }),
        });

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full bg-background overflow-hidden"
    >
      {/* Fallback & LCP Priority Image */}
      <div ref={fallbackRef} className="absolute inset-0 z-0">
        <Image
          src="/lapa-frames/sequence/frame_0001.jpg"
          alt="Lapa Roja (Ara Macao) volando sobre Guanacaste"
          fill
          priority
          className="object-cover object-right lg:object-center grayscale-[0.1] brightness-[0.7]"
        />
      </div>

      {/* Canvas for sequence animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full grayscale-[0.1] brightness-[0.7] block"
      />

      {/* Overlays to match previous style */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-linear-to-r from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-linear-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
