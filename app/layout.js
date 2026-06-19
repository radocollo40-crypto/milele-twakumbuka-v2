import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://milele-twakumbuka-v2.vercel.app"),

  title: {
    default: "Milele Twakumbuka | Preserving Memory & Legacy",
    template: "%s",
  },

  description:
    "A peaceful digital sanctuary for honoring loved ones, preserving memories, funeral notices, and supporting families with dignity.",

  keywords: [
    "memorials",
    "funeral notices",
    "remembrance",
    "legacy",
    "family walls",
    "tributes",
    "Kenya memorials",
    "memory preservation",
    "Milele Twakumbuka",
  ],

  openGraph: {
    title: "Milele Twakumbuka | Preserving Memory & Legacy",
    description:
      "A peaceful digital sanctuary for honoring loved ones, preserving memories, and supporting families with dignity.",
    url: "https://milele-twakumbuka-v2.vercel.app",
    siteName: "Milele Twakumbuka",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Milele Twakumbuka",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Milele Twakumbuka | Preserving Memory & Legacy",
    description:
      "A peaceful digital sanctuary for honoring loved ones, preserving memories, and supporting families with dignity.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}