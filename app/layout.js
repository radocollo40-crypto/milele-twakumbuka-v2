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
  metadataBase: new URL("https://mileletwakumbuka.com"),

  title: {
    default: "Milele Twakumbuka | Preserving Memory & Legacy",
    template: "%s | Milele Twakumbuka",
  },

  description:
    "A peaceful digital sanctuary for honoring loved ones, preserving memories, funeral notices, and supporting families with dignity.",

  keywords: [
    "memorial website Kenya",
    "online memorial Kenya",
    "digital remembrance",
    "funeral notices Kenya",
    "memorials",
    "remembrance",
    "legacy preservation",
    "family walls",
    "tributes",
    "Milele Twakumbuka",
  ],

  openGraph: {
    title: "Milele Twakumbuka | Preserving Memory & Legacy",
    description:
      "A peaceful digital sanctuary for honoring loved ones, preserving memories, and supporting families with dignity.",
    url: "https://mileletwakumbuka.com",
    siteName: "Milele Twakumbuka",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
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
    images: ["/opengraph-image.png"],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}