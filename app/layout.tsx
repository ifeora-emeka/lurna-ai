import type { Metadata } from "next";
import { Lato, Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const lato = Lato({
  weight: ['400', '700'],
  variable: "--font-lato",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lurna AI",
  description: "Your AI-powered learning companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" 
        />
      </head>
      <body
        className={`${lato.variable} ${poppins.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-secondary/30 via-background to-primary/20 text-foreground font-lato`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
