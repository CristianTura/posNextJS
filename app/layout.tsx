import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./provider";

const outfit = Outfit({
  // variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "POS - Next.js",
  description: "POS - Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className={`${outfit.className} bg-gray-200`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
