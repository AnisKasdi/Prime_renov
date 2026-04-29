import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CookieNotice from "@/components/CookieNotice";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://primerenov.fr';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  title: "Prime Rénov — Cabinet d'Architecture",
  description: "Prime Rénov transforme vos projets en espaces durables et empreints d'une esthétique singulière. De la villa privée à l'immeuble de bureau, chaque ligne compte.",
  openGraph: {
    title: "Prime Rénov — Cabinet d'Architecture",
    description: "Prime Rénov transforme vos projets en espaces durables et empreints d'une esthétique singulière.",
    url: baseUrl,
    siteName: 'Prime Rénov',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Prime Rénov — Cabinet d'Architecture",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Prime Rénov — Cabinet d'Architecture",
    description: "Prime Rénov transforme vos projets en espaces durables et empreints d'une esthétique singulière.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={plusJakartaSans.variable}>
      <body>
        {children}
        <CookieNotice />
      </body>
    </html>
  );
}
