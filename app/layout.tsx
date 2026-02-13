import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

function getSiteUrl() {
  // If you set NEXT_PUBLIC_SITE_URL later (recommended), it will use that.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;

  // Vercel provides VERCEL_URL like "ru2.vercel.app" (no protocol)
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  // Local fallback
  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),

  title: "RU2",
  description: "A small question. A real moment. 💘",
  applicationName: "RU2",

  appleWebApp: {
    capable: true,
    title: "RU2",
    statusBarStyle: "default",
  },

  formatDetection: { telephone: false },

  openGraph: {
    type: "website",
    title: "RU2",
    description: "RU2 — small moments, on purpose.",
    images: [
      {
        url: "/ru2/og.png",
        width: 1024,
        height: 1024,
        alt: "RU2",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "RU2",
    description: "RU2 — small moments, on purpose.",
    images: ["/ru2/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
