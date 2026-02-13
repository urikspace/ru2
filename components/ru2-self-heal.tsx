"use client";

import { useEffect } from "react";

export default function RU2SelfHeal() {
  useEffect(() => {
    // Only in standalone/PWA
    const isStandalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      // @ts-ignore iOS Safari standalone flag
      window.navigator.standalone === true;

    if (!isStandalone) return;

    // Next build id changes every deploy
    // @ts-ignore Next injects this at runtime
    const buildId = window.__NEXT_DATA__?.buildId as string | undefined;
    if (!buildId) return;

    const key = "ru2_build_id";
    const prev = localStorage.getItem(key);

    if (prev && prev !== buildId) {
      localStorage.setItem(key, buildId);
      window.location.reload(); // self-heal
      return;
    }

    if (!prev) localStorage.setItem(key, buildId);
  }, []);

  return null;
}
