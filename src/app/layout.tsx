import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Toaster } from "@/components/ui/toaster";

const fontInter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fontOswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kirtan Kalathiya - Web Designer & Developer",
  description: "Portfolio of Kirtan Kalathiya, a web designer and developer from Surat, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontInter.variable,
          fontOswald.variable
        )}
      >
        <div className="relative flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
