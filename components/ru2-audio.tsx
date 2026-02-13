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
  const retryTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
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

    // Cleanup timers if provider ever unmounts (or during hot reload)
    useEffect(() => {
    return () => {
        if (retryTimerRef.current) window.clearInterval(retryTimerRef.current);
        if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current);
    };
    }, []);

  const api = useMemo<RU2AudioCtx>(() => {
    return {
      isReady,
      start: () => {
        const el = audioRef.current;
        if (!el) return;

        // Always ensure these
        el.loop = true;
        el.preload = "auto";

        // If already playing, no-op
        if (!el.paused && el.currentTime > 0) return;

        // Kill timers from any previous start attempt
        if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;

        // If iOS has it in a half-loaded state, calling load() here is safe
        // AND still inside the user gesture.
        try {
            el.load();
        } catch {
            // ignore
        }

        // Start silent, fade once we know it is actually playing
        el.volume = 0;

        const onPlaying = () => {
            // fade in
            const fadeMs = 1400;
            const steps = 20;
            const stepMs = Math.floor(fadeMs / steps);
            let i = 0;

            if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current);

            fadeTimerRef.current = window.setInterval(() => {
            i += 1;
            el.volume = Math.min(1, i / steps);
            if (i >= steps) {
                if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current);
                fadeTimerRef.current = null;
            }
            }, stepMs);

            el.removeEventListener("playing", onPlaying);
        };

        el.addEventListener("playing", onPlaying);

        // IMPORTANT: keep play() only in the tap gesture path.
        // Don’t schedule future play() attempts on iOS.
        try {
            const p = el.play();
            if (p && typeof (p as any).catch === "function") {
            (p as any).catch(() => {
                // ignore; iOS may delay until buffered
                // user tapping again will re-trigger start() legally
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
        src="/ru2/audio/winner-winner.m4a?v=3"
        preload="auto"
      />
      {children}
    </Ctx.Provider>
  );
}
