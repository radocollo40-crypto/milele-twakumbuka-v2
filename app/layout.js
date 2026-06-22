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

const siteUrl = "https://mileletwakumbuka.com";

export const metadata = {
  metadataBase: new URL(siteUrl),

  verification: {
    google: "zAKCDNCdkfUHy2q51ASDJH5dc0YRUUCkpDKzHhRMjqY",
  },

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
    url: siteUrl,
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Milele Twakumbuka",
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      description:
        "A peaceful digital sanctuary for honoring loved ones, preserving memories, funeral notices, and supporting families with dignity.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Milele Twakumbuka",
      description:
        "A peaceful digital sanctuary for honoring loved ones, preserving memories, funeral notices, and supporting families with dignity.",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {children}
      </body>
    </html>
  );
}