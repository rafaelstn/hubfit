import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ProvedorDemo } from "@/estado/store";
import "./globals.css";

const corpo = Inter({
  variable: "--fonte-corpo",
  subsets: ["latin"],
  display: "swap",
});

const display = Archivo({
  variable: "--fonte-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const DESCRICAO =
  "HUBFIT transforma treino em desafio: gamificação, ranking automático, registro com foto e espaço para patrocinadores. Conheça a proposta e navegue pela demonstração.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hubfit.vercel.app"),
  title: {
    default: "HUBFIT | Desafios fitness, ranking e patrocinadores",
    template: "%s | HUBFIT",
  },
  description: DESCRICAO,
  applicationName: "HUBFIT",
  keywords: [
    "desafio fitness",
    "gamificação de treino",
    "ranking de treinos",
    "app fitness",
    "patrocinadores",
    "HUBFIT",
  ],
  authors: [{ name: "Damatech Solutions" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "HUBFIT",
    title: "HUBFIT | Desafios fitness, ranking e patrocinadores",
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: "HUBFIT | Desafios fitness, ranking e patrocinadores",
    description: DESCRICAO,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${corpo.variable} ${display.variable} antialiased`}>
        <ProvedorDemo>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#101317",
                border: "1px solid #232932",
                color: "#f5f7fa",
              },
            }}
          />
        </ProvedorDemo>
      </body>
    </html>
  );
}
