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

        // Ensure settings are correct every time
        el.loop = true;

        // If it's already playing, do nothing
        if (!el.paused && el.currentTime > 0) return;

        // Clear any old timers (important if user taps again)
        if (retryTimerRef.current) window.clearInterval(retryTimerRef.current);
        retryTimerRef.current = null;

        if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;

        // We start at 0 volume, but we will ONLY fade once we know audio is actually playing.
        el.volume = 0;

        const tryPlay = () => {
            try {
            const p = el.play();
            if (p && typeof (p as any).catch === "function") {
                (p as any).catch(() => {
                // ignore; we'll retry
                });
            }
            } catch {
            // ignore; we'll retry
            }
        };

        // 1) Immediate attempt (the actual user gesture)
        tryPlay();

        // 2) Retry a few times quickly after the tap (makes one tap behave like many taps)
        const startedAt = Date.now();
        retryTimerRef.current = window.setInterval(() => {
            // stop retrying if playing
            if (!el.paused && el.currentTime > 0) {
            if (retryTimerRef.current) window.clearInterval(retryTimerRef.current);
            retryTimerRef.current = null;
            return;
            }

            // stop after ~8 seconds (prevents infinite loops)
            if (Date.now() - startedAt > 8000) {
            if (retryTimerRef.current) window.clearInterval(retryTimerRef.current);
            retryTimerRef.current = null;
            return;
            }

            tryPlay();
        }, 350);

        // 3) Fade in ONLY when playback begins
        const onPlaying = () => {
            // stop retries once it’s playing
            if (retryTimerRef.current) window.clearInterval(retryTimerRef.current);
            retryTimerRef.current = null;

            // fade in
            const fadeMs = 1400;
            const steps = 20;
            const stepMs = Math.floor(fadeMs / steps);
            let i = 0;

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
