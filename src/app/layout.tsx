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
  metadataBase: new URL("https://nickgomes.com.br"),
  title: {
    default: "Tatuador em São Paulo | Nicolas Gomes Tattoo",
    template: "%s | Nicolas Gomes Tattoo",
  },
  description:
    "Tatuador em São Paulo especializado em tatuagem autoral e personalizada. Desenhos exclusivos criados do papel para a sua pele, com atendimento acolhedor. Agende sua sessão pelo WhatsApp ou Instagram e eternize sua história com uma tattoo única.",
  keywords:
    "tatuador em são paulo, tatuagem autoral, tatuagem personalizada, tattoo sp, estúdio de tatuagem, tatuador profissional, tatuagem exclusiva, tatuagem neo tradicional, desenhos de tattoo, agendar tatuagem, nicolas gomes, nickgomes tattoo",
  alternates: {
    canonical: "https://nickgomes.com.br",
  },
  openGraph: {
    title: "Tatuador em São Paulo | Nicolas Gomes Tattoo",
    description:
      "Tatuagem autoral e personalizada em São Paulo. Desenhos exclusivos do papel para a sua pele. Agende sua sessão e eternize sua história com uma tattoo única.",
    url: "https://nickgomes.com.br",
    siteName: "Nicolas Gomes Tattoo",
    images: [
      {
        url: "https://nickgomes.com.br/assets/img/perfil.webp",
        width: 500,
        height: 787,
        alt: "Nicolas Gomes - Tatuador em São Paulo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tatuador em São Paulo | Nicolas Gomes Tattoo",
    description:
      "Tatuagem autoral e personalizada em São Paulo. Desenhos exclusivos do papel para a sua pele. Agende sua sessão.",
    images: ["https://nickgomes.com.br/assets/img/perfil.webp"],
  },
  icons: {
    icon: [
      { url: "/assets/img/perfil.webp", sizes: "any", type: "image/webp" },
      { url: "/assets/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/favicons/apple-touch-icon.png",
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