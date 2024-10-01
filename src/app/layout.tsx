import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Header from "@containers/Header/Header";
import Footer from "@containers/Footer/Footer";

const inter = localFont({
  src: "./fonts/Inter.woff",
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata: Metadata = {
  title:
    "Pastore – Jouw Partner voor Tweedehands Professioneel Audio Apparatuur",
  description:
    "Pastore is dé specialist in tweedehands professioneel audio apparatuur. Wij kopen en verkopen hoogwaardige geluidsapparatuur voor bedrijven, evenementen, en meer. Ontdek onze uitgebreide collectie en verkoop uw overtollige audio gear eenvoudig aan ons!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
