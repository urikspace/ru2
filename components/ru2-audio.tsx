"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type RU2AudioCtx = {
  start: () => void;
  isReady: boolean;
};

const Ctx = createContext<RU2AudioCtx | null>(null);

export function useRU2Audio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRU2Audio must be used within <RU2AudioProvider />");
  return ctx;
}

export default function RU2AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Warm on initial app load (not just on /valentine)
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    // Force the browser to fetch + buffer metadata early
    el.load();

    const onCanPlay = () => setIsReady(true);
    el.addEventListener("canplaythrough", onCanPlay);
    return () => el.removeEventListener("canplaythrough", onCanPlay);
  }, []);

  const api = useMemo<RU2AudioCtx>(() => {
    return {
      isReady,
      start: () => {
        const el = audioRef.current;
        if (!el) return;

        try {
          el.loop = true;
          el.volume = 0;

          const p = el.play();
          if (p && typeof p.then === "function") {
            p.then(() => {
              // fade in
              const fadeMs = 1400;
              const steps = 20;
              const stepMs = Math.floor(fadeMs / steps);
              let i = 0;

              const timer = window.setInterval(() => {
                i += 1;
                el.volume = Math.min(1, i / steps);
                if (i >= steps) window.clearInterval(timer);
              }, stepMs);
            }).catch(() => {
              // do nothing; next tap can retry
            });
          }
        } catch {
          // ignore
        }
      },
    };
  }, [isReady]);

  return (
    <Ctx.Provider value={api}>
      {/* Persisted audio element (survives route changes) */}
      <audio
        ref={audioRef}
        src="/ru2/audio/winner-winner.m4a?v=2"
        preload="auto"
      />
      {children}
    </Ctx.Provider>
  );
}
