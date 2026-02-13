import Link from "next/link";
import RU2Slideshow from "@/components/ru2-slideshow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RU2",
  description: "A small question. A real moment. 💘",
  openGraph: {
    title: "RU2",
    description: "A small question. A real moment. 💘",
    images: ["/ru2/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RU2",
    description: "A small question. A real moment. 💘",
    images: ["/ru2/og.png"],
  },
};

export default function Home() {
  // ✅ LANDING (rue) slideshow image list
  // Replace/add filenames here ONLY:
  const rueImages = [
    "/ru2/slides/primary/1-rupee-4.png",
    "/ru2/slides/primary/2-us-1.png",
    "/ru2/slides/primary/3-us-8.png",
    "/ru2/slides/primary/4-us-5.png",
    "/ru2/slides/primary/6-us-2.png",
  ];

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-white/70 p-6 text-center shadow-lg ring-1 ring-black/10 backdrop-blur
                      dark:bg-zinc-950/60 dark:ring-white/15">
        {/* Slideshow card (4:5) */}
        <div className="w-full overflow-hidden rounded-3xl ring-1 ring-black/10 dark:ring-white/15">
          <div className="relative aspect-[4/5] w-full">
            <RU2Slideshow images={rueImages} intervalMs={3500} alt="RU2 landing slideshow" priority />
          </div>
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          RU2
        </h1>

        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
          Small moments, on purpose.
        </p>

        <div className="mt-6">
          <Link
            href="/valentine"
            className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-4
                       text-lg font-semibold bg-rose-600 text-white shadow-sm
                       hover:brightness-110 active:brightness-95"
          >
            Open Valentine 💘
          </Link>
        </div>

        <p className="mt-4 text-xs text-zinc-600 dark:text-zinc-300">
          (More chapters coming soon.)
        </p>
      </div>
    </main>
  );
}
