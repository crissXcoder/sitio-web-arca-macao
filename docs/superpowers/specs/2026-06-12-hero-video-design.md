# Especificación de Diseño: Hero con Video de la Lapa Roja (YouTube API)

Este documento define la especificación técnica para reemplazar la animación de frames de la Lapa Roja en el Hero por un video embebido mediante la API de Iframe de YouTube.

## 1. Objetivos y Criterios de Éxito
* **Rendimiento:** Eliminar la carga de 151 imágenes JPG para mejorar los tiempos de LCP (Largest Contentful Paint) y reducir el consumo de ancho de banda.
* **Control de Audio:** Iniciar el video silenciado por defecto para cumplir con las políticas de reproducción automática, ofreciendo un botón para alternar el silencio.
* **Eficiencia de Recursos:** Pausar la reproducción del video de YouTube en el Hero cuando salga del viewport del usuario al hacer scroll para ahorrar CPU/GPU.
* **Adaptabilidad (Responsive):** Asegurar que el iframe de YouTube cubra todo el contenedor del Hero sin distorsión y sin bordes negros, simulando `object-fit: cover`.

## 2. Origen del Video
Utilizaremos el video directo desde YouTube.

* **Origen:** `https://youtu.be/kVALWjSeDUE`
* **Video ID:** `kVALWjSeDUE`
* **Rango:** `09:34 - 09:54` (segundos 574 a 594)
* **Imagen de Fallback (Poster):**
  * Mantendremos `/lapa-frames/sequence/frame_0001.jpg` como fondo estático de carga inicial en SSR y fallback.

## 3. Arquitectura del Componente `HeroLapaVideo`
Reemplazaremos `HeroLapaAnimation` por un nuevo componente de cliente `HeroLapaVideo` que cargará dinámicamente la API de Iframe de YouTube.

### Propiedades (Props)
```typescript
interface HeroLapaVideoProps {
  children: React.ReactNode;
}
```

### Comportamiento del Ciclo de Vida
1. **Carga Dinámica del Script de YouTube:**
   * Cargar el script `https://www.youtube.com/iframe_api` solo una vez.
   * Inicializar el reproductor mediante `new window.YT.Player`.
2. **Control de Reproducción y Bucle de 20 segundos:**
   * Configurar `start: 574` y `end: 594`.
   * Monitorear el tiempo de reproducción. Cuando alcance los 594 segundos o cambie de estado a `ENDED`, realizar `seekTo(574)` y llamar a `playVideo()`.
3. **Scroll Trigger Optimization:**
   * Utilizar ScrollTrigger de GSAP para vigilar la sección Hero.
   * Al hacer scroll fuera del Hero, pausar el video con `player.pauseVideo()`.
   * Al volver a estar visible, reanudar con `player.playVideo()`.
4. **Control de Audio:**
   * Utilizar `player.mute()` e `player.unMute()` para controlar el estado de sonido.
   * Mostrar un botón flotante con diseño de glassmorphic para alternar entre silenciado y sonido activo.

## 4. Estructura JSX y CSS del Componente
```tsx
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

export function HeroLapaVideo({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isApiReady, setIsApiReady] = useState(false);

  useEffect(() => {
    // 1. Cargar script de YouTube
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsApiReady(true);
      };
    } else {
      setIsApiReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isApiReady) return;

    // 2. Inicializar reproductor de YouTube
    const player = new window.YT.Player("youtube-player", {
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
          event.target.playVideo();
        },
        onStateChange: (event: any) => {
          // Bucle personalizado al terminar o acercarse al final
          if (event.data === window.YT.PlayerState.ENDED) {
            event.target.seekTo(574);
            event.target.playVideo();
          }
        },
      },
    });

    // Monitoreo de tiempo para bucle preciso
    const checkInterval = setInterval(() => {
      if (player && typeof player.getCurrentTime === "function") {
        const currentTime = player.getCurrentTime();
        if (currentTime >= 594) {
          player.seekTo(574);
          player.playVideo();
        }
      }
    }, 500);

    return () => {
      clearInterval(checkInterval);
      if (player && typeof player.destroy === "function") {
        player.destroy();
      }
    };
  }, [isApiReady]);

  useGSAP(() => {
    // 3. Pausar/reproducir dinámicamente según scroll
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
    if (playerRef.current) {
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
      {/* Poster / Fallback Inicial */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center grayscale-[0.1] brightness-[0.7]" 
        style={{ backgroundImage: "url('/lapa-frames/sequence/frame_0001.jpg')" }}
      />

      {/* YouTube Player Wrapper */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <div id="youtube-player" className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 grayscale-[0.1] brightness-[0.7] scale-[1.05]" />
      </div>

      {/* Capas decorativas de gradiente de la estética anterior */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-linear-to-r from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-linear-to-b from-transparent via-transparent to-background" />

      {/* Contenido principal del Hero */}
      <div className="relative z-10 h-full w-full">{children}</div>

      {/* Botón de control de Audio */}
      {playerRef.current && (
        <button
          onClick={toggleMute}
          className="absolute left-6 bottom-24 z-30 flex items-center justify-center w-12 h-12 rounded-full border border-border/40 bg-card/40 backdrop-blur-md text-foreground/80 hover:text-foreground hover:border-accent transition-all duration-300 cursor-pointer"
          aria-label={isMuted ? "Activar sonido" : "Silenciar video"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
}
```

## 5. Plan de Verificación
* **Manual:** Comprobar la reproducción en dispositivos móviles y de escritorio, verificar que el volumen se active al interactuar y que el video se pause inmediatamente al bajar con scroll.
* **Rendimiento:** Medir los cambios en LCP usando Lighthouse antes y después de los cambios.
