import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { DocumentTitleSync } from "@/components/ui/document-title-sync";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
  ],
};

export const metadata: Metadata = {
  title: {
    template: "%s - Oynx Interactive",
    default: "Oynx Interactive",
  },
  description:
    "Onyx Interactive builds cutting-edge digital products, immersive websites, and enterprise software that define tomorrow's standards.",
  keywords: ["digital agency", "web development", "UI/UX", "enterprise software"],
  authors: [{ name: "Onyx Interactive" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Onyx Interactive",
    title: "Oynx Interactive",
    description:
      "Cutting-edge digital products, immersive websites, and enterprise software.",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onyx Interactive",
    description: "Premium Digital Experiences",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('onyx-theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;var m=t||(p?'dark':'light');if(m==='light')document.documentElement.classList.add('light');}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col font-sans antialiased"
        style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <DocumentTitleSync />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
