"use client";

import confetti from "canvas-confetti";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import RU2Slideshow from "@/components/ru2-slideshow";
import { useRU2Audio } from "@/components/ru2-audio";

type Choice = "YES 💘" | "OF COURSE 😍";

export default function ValentinePage() {
  const [accepted, setAccepted] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);
  
  const { start: startAudio } = useRU2Audio();
  const question =
    "hi. r u… p a l? if yes, i have an important question 🙂 would you like to be my valentine?";

  // ✅ VALENTINE TOP (Photo 1) slideshow filenames go here ONLY
  const valentineTopImages = [
    "/ru2/slides/rue/1-rue-1.png",
    "/ru2/slides/rue/7-rue-9.png",
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

  function handleTap(val: Choice) {
    startAudio();
    setChoice(val);
    setAccepted(true);

    // Confetti on EVERY tap (heart-shaped)
      if (val === "YES 💘") {
        confetti({
          particleCount: 55,
          spread: 65,
          startVelocity: 24,
          origin: { y: 0.72 },
          shapes: ["emoji"],
          scalar: 1.25,
          // @ts-ignore canvas-confetti emoji typing can be missing/loose
          emojis: ["💘", "💖", "💗"],
        });
      } else {
        const big = () =>
          confetti({
            particleCount: 90,
            spread: 95,
            startVelocity: 32,
            origin: { y: 0.72 },
            shapes: ["emoji"],
            scalar: 1.55,
            // @ts-ignore canvas-confetti emoji typing can be missing/loose
            emojis: ["❤️‍🔥", "😍", "💞", "💕"],
          });

        big();
        window.setTimeout(big, 220);
        window.setTimeout(big, 440);
      }
    }


  return (
    <main className="min-h-screen ru2-valentine-bg">

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
                (Please pick the answer that’s in your heart.)
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
            className={`mt-5 rounded-3xl transition-all duration-500 ease-out
                        ${accepted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
            aria-hidden={!accepted}
          >
            <div className={accepted ? "block" : "hidden"}>
              <div
                className="rounded-3xl bg-white/75 p-5 shadow-lg ring-1 ring-black/10 backdrop-blur
                          dark:bg-zinc-950/60 dark:ring-white/15"
              >
              <div className="flex flex-col items-center text-center">
                <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {choice === "YES 💘"
                    ? "Winner Winner, Chicken Dinner* 🍾"
                    : "Ahhh splendid. Splendid choice indeed 😌"}
                </p>

                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {choice === "YES 💘"
                    ? "Eating chicken not required*"
                    : "Scroll for a brief message."}
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

                  <div className="mt-4 text-sm leading-relaxed text-left text-zinc-800 dark:text-zinc-200 space-y-4">
                    {choice === "YES 💘" ? (
                      <>
                        <p>
                          Our first time going out for dinner was on Friday, February 14, 2025.
                          But that wasn’t really a date (mainly because it literally wasn’t a date 😭).
                          So, what if this year we made up for it?
                        </p>
                        <p>
                          I know you love Thai food. Have you ever heard of Arom Dee Thai
                          (6735 3rd Ave, Brooklyn, NY 11220)?
                        </p>
                        <p>
                          I’ve already reserved a table for us this Saturday at 8 PM.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>Dear Rupal,</p>

                        <p>
                          Being with you is like running into the love of your life in the middle
                          of the day, at a fast food restaurant. It doesn’t matter what’s going on
                          around us – silly people who gorge on barely edible foods for the thrill
                          of an allergic reaction, co-parents who ignore their children and
                          consistently choose war in public spaces, janitors who’ve seen/done/mopped
                          up everything and earned themselves a six-hour smoke break, and kids who
                          scream incessantly and do their best to break everything within reach that
                          isn’t bolted to the floor. We aren’t phased or distracted. They get blocked
                          out, and we get locked in.
                        </p>

                        <p>
                          When I think about you, I realize that I have never felt more sure about
                          who a person is to me, and what that means than when I first met you.
                        </p>

                        <p>
                          Jeremiah 29:11 says “For I know the plans I have for you,” declares the Lord,
                          “plans to prosper you and not to harm you, plans to give you hope and a future.”
                          Faith in God has been the pre-requisite for every good thing that has ever come
                          into my life. That’s how I knew (so quickly and emphatically) that you were the
                          one for me. It also <em>really</em> helps that you’re smart, hot, funny, and
                          willing to take risks for the sake of evolving.
                        </p>

                        <p>
                          Last year, the dinner table was crowded. This year, it’s just the two of us—
                          that is, if you’ll join me?
                        </p>

                        <p>
                          8 PM Saturday Dinner at Arom Dee Thai — 6735 3rd Ave, Brooklyn, NY 11220
                        </p>

                        <p>
                          You are my valentine, and I love you. ♥️
                        </p>
                      </>
                    )}
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
            </div>
          </section>

          <div className="h-10" />
        </div>
      </div>
    </main>
  );
}
