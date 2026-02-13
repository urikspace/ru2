"use client";

import { useMemo, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import RU2Slideshow from "@/components/ru2-slideshow";

type Choice = "YES 💘" | "OF COURSE 😍";

export default function ValentinePage() {
  const [accepted, setAccepted] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedAudioRef = useRef(false);

  const question =
    'If this guy was like "Hey — will you be my valentine?", what would you say?';

  // ✅ VALENTINE TOP (Photo 1) slideshow filenames go here ONLY
  const valentineTopImages = [
    "/ru2/slides/rue/1-rue-1.png",
    "/ru2/slides/rue/2-rue-3.png",
    "/ru2/slides/rue/3-rue-8.png",
    "/ru2/slides/rue/4-rue-4.png",
    "/ru2/slides/rue/5-rue-5.png",
    "/ru2/slides/rue/6-rue-7.png",
  ];

  const inviteText = useMemo(() => {
    const prefix = choice ? `You said: ${choice} 💞` : "💞";
    return `${prefix} Dinner date?`;
  }, [choice]);

  async function startAudio() {
    if (hasStartedAudioRef.current) return;
    hasStartedAudioRef.current = true;

    const el = audioRef.current;
    if (!el) return;

    try {
      el.volume = 1;
      el.loop = true;
      await el.play();
    } catch {
      // fail silently
    }
  }

  function handleTap(val: Choice) {
    startAudio();
    setChoice(val);
    setAccepted(true);
  }

  return (
    <main className="min-h-screen ru2-valentine-bg">
      {/* Hidden audio (plays on tap, loops, no controls) */}
      <audio ref={audioRef} src="/ru2/audio/winner-winner.m4a" preload="auto" />

      <div className="min-h-screen ru2-overlay">
        <div className="mx-auto w-full max-w-[540px] px-5 py-8">
          {/* Top bar */}
          <div className="flex items-center justify-end">
            <ThemeToggle />
          </div>

          {/* Main card */}
          <section
            className="mt-4 rounded-3xl bg-white/75 p-5 shadow-lg ring-1 ring-black/10 backdrop-blur
                              dark:bg-zinc-950/60 dark:ring-white/15"
          >
            <div className="flex flex-col items-center text-center">
              {/* Photo 1 */}
              <div className="w-full overflow-hidden rounded-3xl ring-1 ring-black/10 dark:ring-white/15">
                <div className="relative aspect-[4/5] w-full">
                  <RU2Slideshow
                    images={valentineTopImages}
                    intervalMs={6000}
                    alt="RU2 Valentine hero slideshow"
                    priority
                  />
                </div>
              </div>

              <h1 className="mt-5 text-balance text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {question}
              </h1>

              <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                (You can only pick the correct answer.)
              </p>

              {/* Buttons */}
              <div className="mt-5 flex w-full flex-col gap-3">
                <button
                  type="button"
                  onClick={() => handleTap("YES 💘")}
                  className="w-full rounded-2xl px-5 py-4 text-lg font-semibold
                             bg-rose-600 text-white shadow-sm
                             hover:brightness-110 active:brightness-95
                             dark:bg-rose-500"
                >
                  YES 💘
                </button>

                <button
                  type="button"
                  onClick={() => handleTap("OF COURSE 😍")}
                  className="w-full rounded-2xl px-5 py-4 text-lg font-semibold
                             bg-pink-200 text-zinc-900 shadow-sm ring-1 ring-black/10
                             hover:brightness-105 active:brightness-95
                             dark:bg-pink-300"
                >
                  OF COURSE 😍
                </button>
              </div>
            </div>
          </section>

          {/* Reveal section */}
          <section
            className={`mt-5 overflow-hidden rounded-3xl transition-all duration-500
                        ${
                          accepted
                            ? "max-h-[1200px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
            aria-hidden={!accepted}
          >
            <div
              className="rounded-3xl bg-white/75 p-5 shadow-lg ring-1 ring-black/10 backdrop-blur
                            dark:bg-zinc-950/60 dark:ring-white/15"
            >
              <div className="flex flex-col items-center text-center">
                <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {inviteText}
                </p>

                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                  Arom Dee Thai — 6735 3rd Ave, Brooklyn, NY 11220
                </p>

                {/* Photo 2 (conditional slideshow based on YES vs OF COURSE) */}
                <div className="mt-4 w-full overflow-hidden rounded-3xl ring-1 ring-black/10 dark:ring-white/15">
                  <div className="relative aspect-[4/5] w-full">
                    {choice === "YES 💘" ? (
                      <RU2Slideshow
                        images={[
                          "/ru2/slides/primary/1-rupee-4.png",
                          "/ru2/slides/primary/2-us-1.png",
                          "/ru2/slides/primary/3-us-8.png",
                          "/ru2/slides/primary/4-us-5.png",
                          "/ru2/slides/primary/5-rupee-3.png",
                          "/ru2/slides/primary/6-us-2.png",
                        ]}
                        intervalMs={6000}
                        alt="RU2 primary slideshow"
                      />
                    ) : (
                      <RU2Slideshow
                        images={[
                          "/ru2/slides/secondary/1-sweethearts-1.png",
                          "/ru2/slides/secondary/2-rupee-1.png",
                          "/ru2/slides/secondary/3-us-4.png",
                          "/ru2/slides/secondary/4-us-6.png",
                          "/ru2/slides/secondary/5-us-3.png",
                          "/ru2/slides/secondary/6-connecticut-house-1.png",
                          "/ru2/slides/secondary/7-us-7.png",
                        ]}
                        intervalMs={6000}
                        alt="RU2 secondary slideshow"
                      />
                    )}
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/wi5k1qb4PCLABoes8"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl px-5 py-4
                             text-lg font-semibold bg-zinc-900 text-white shadow-sm
                             hover:brightness-110 active:brightness-95
                             dark:bg-white dark:text-zinc-900"
                >
                  Open the dinner spot 📍
                </a>

                <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-300">
                  (RU2 v1 — more moments soon.)
                </p>
              </div>
            </div>
          </section>

          <div className="h-10" />
        </div>
      </div>
    </main>
  );
}
