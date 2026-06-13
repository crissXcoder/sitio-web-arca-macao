"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: any;
  }
}

interface HeroLapaVideoProps {
  children: React.ReactNode;
}

export function HeroLapaVideo({ children }: HeroLapaVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isApiReady, setIsApiReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 1. Cargar script de YouTube de forma dinámica
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Callback global requerido por la API de YouTube
      window.onYouTubeIframeAPIReady = () => {
        setIsApiReady(true);
      };
    } else {
      setIsApiReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isApiReady) return;

    let player: any;
    let checkInterval: NodeJS.Timeout;

    try {
      // 2. Inicializar reproductor de YouTube
      player = new window.YT.Player("youtube-player", {
        videoId: "kVALWjSeDUE",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          start: 574,
          end: 594,
        },
        events: {
          onReady: (event: any) => {
            playerRef.current = event.target;
            event.target.mute();
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            }
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(574);
              event.target.playVideo();
            }
          },
        },
      });

      // Monitoreo periódico del tiempo para hacer un bucle preciso
      checkInterval = setInterval(() => {
        if (player && typeof player.getCurrentTime === "function" && typeof player.getPlayerState === "function") {
          const state = player.getPlayerState();
          if (state === window.YT.PlayerState.PLAYING) {
            const currentTime = player.getCurrentTime();
            // Si supera o iguala el segundo 594, regresamos al 574
            if (currentTime >= 594) {
              player.seekTo(574);
            }
          }
        }
      }, 250);
    } catch (error) {
      console.error("Error al inicializar el reproductor de YouTube:", error);
    }

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      if (player && typeof player.destroy === "function") {
        player.destroy();
      }
    };
  }, [isApiReady]);

  useGSAP(() => {
    // 3. Pausar/reproducir dinámicamente según el viewport usando ScrollTrigger
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      onLeave: () => {
        if (playerRef.current && typeof playerRef.current.pauseVideo === "function") {
          playerRef.current.pauseVideo();
        }
      },
      onEnterBack: () => {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          if (playerRef.current && typeof playerRef.current.playVideo === "function") {
            playerRef.current.playVideo();
          }
        }
      },
    });
  }, { scope: containerRef, dependencies: [isApiReady] });

  const toggleMute = () => {
    if (playerRef.current && typeof playerRef.current.mute === "function") {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-background overflow-hidden">
      {/* Poster / Fallback Inicial (Visible hasta que el video empiece a reproducirse) */}
      <div 
        className={`absolute inset-0 z-10 bg-cover bg-center grayscale-[0.1] brightness-[0.7] transition-opacity duration-[1500ms] ease-out ${
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        }`} 
        style={{ backgroundImage: "url('/images/hero-ara-macao.png')" }}
      />

      {/* YouTube Player Wrapper */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <div 
          id="youtube-player" 
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 grayscale-[0.1] brightness-[0.7] scale-[1.05]" 
        />
      </div>

      {/* Capas decorativas de gradiente de la estética anterior */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-r from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-b from-transparent via-transparent to-background" />

      {/* Contenido principal del Hero */}
      <div className="relative z-20 h-full w-full">{children}</div>

      {/* Botón de control de Audio */}
      <button
        onClick={toggleMute}
        className="absolute left-6 bottom-24 z-30 flex items-center justify-center w-12 h-12 rounded-full border border-border/40 bg-card/40 backdrop-blur-md text-foreground/80 hover:text-foreground hover:border-accent transition-all duration-300 cursor-pointer hover:scale-105"
        aria-label={isMuted ? "Activar sonido" : "Silenciar video"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
