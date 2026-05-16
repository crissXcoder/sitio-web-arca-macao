import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/context/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import { getDictionary } from "@/lib/dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang as "es" | "en";
  const dict = await getDictionary(lang);

  return {
    title: {
      default: dict.hero.title + " | Guanacaste",
      template: `%s | ${dict.hero.title}`,
    },
    description: dict.hero.subtitle,
    keywords: ["Ara macao", "Lapa Roja", "Guanacaste", "Costa Rica", "Conservación", "Bosque Seco"],
    authors: [{ name: "Ara Macao Project" }],
    creator: "Ara Macao Project",
    publisher: "Ara Macao Project",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://ara-macao-guanacaste.com"),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        "es-CR": "/es",
        "en-US": "/en",
      },
    },
    openGraph: {
      title: dict.hero.title,
      description: dict.hero.subtitle,
      url: `/${lang}`,
      siteName: dict.hero.title,
      locale: lang === "es" ? "es_CR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.hero.title,
      description: dict.hero.subtitle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as "es" | "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} min-h-screen bg-background font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
