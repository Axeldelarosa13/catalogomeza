import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MobileActionBar } from "@/components/public/mobile-action-bar";
import { withBasePath } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Articulos Meza",
    template: "%s | Articulos Meza",
  },
  description:
    "Catalogo de articulos para cocina, hogar y mesa con contacto directo por WhatsApp.",
  keywords: [
    "articulos meza",
    "articulos de cocina",
    "ollas",
    "baterias de cocina",
    "vajillas",
    "electrodomesticos",
  ],
  openGraph: {
    title: "Articulos Meza",
    description:
      "Catalogo de productos para cocina, hogar y mesa con atencion por WhatsApp.",
    type: "website",
    images: [
      { url: withBasePath("/brand/grupo-meza-header.png"), alt: "Grupo Meza" },
    ],
  },
  icons: {
    icon: withBasePath("/brand/grupo-meza-logo.jpg"),
    apple: withBasePath("/brand/grupo-meza-logo.jpg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-stone-50 text-slate-950">
        {children}
        <MobileActionBar />
      </body>
    </html>
  );
}
