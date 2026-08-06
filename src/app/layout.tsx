import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/components/i18n-provider";
import { VLibrasWidget } from "@/components/layout/VLibrasWidget";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nicolasgomestattoo.com.br"),
  title: "Nicolas Gomes - Tatuador",
  description: "Portfólio de tatuagens de Nicolas Gomes. Arte, criatividade e tinta na pele. Explore meus trabalhos e agende sua sessão.",
  keywords: "tatuagem, tatuador, Nicolas Gomes, tattoo, ink, arte na pele, body art, tatuador profissional",
  openGraph: {
    title: "Nicolas Gomes - Tatuador",
    description: "Portfólio de tatuagens de Nicolas Gomes. Explore meus trabalhos e agende sua sessão.",
    url: "https://nicolasgomestattoo.com.br",
    siteName: "Nicolas Gomes - Tatuador",
    images: [{ url: "/assets/img/perfil.jpg", width: 800, height: 600, alt: "Nicolas Gomes" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicolas Gomes - Tatuador",
    description: "Portfólio de tatuagens de Nicolas Gomes. Explore meus trabalhos e agende sua sessão.",
    images: ["/assets/img/perfil.jpg"],
  },
  icons: {
    icon: [
      { url: '/assets/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/assets/favicons/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <I18nProvider>
            {children}
          </I18nProvider>
          <Toaster />
        </ThemeProvider>
        <VLibrasWidget />
      </body>
    </html>
  );
}