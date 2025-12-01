
import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/shared/footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/shared/theme-provider";
import Script from "next/script";

const fontInter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fontOswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kirtan Kalathiya - Web Designer & Developer",
  description: "Portfolio of Kirtan Kalathiya, a web designer and developer from Surat, India, specializing in creating beautiful, functional, and intelligent digital experiences.",
  verification: {
    google: "3djwAsJalUA-JfNPlS0vR-AQNlCOpz38R4mQDePdY8I",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kirtan Kalathiya",
    "url": "https://kirtankalathiya.com",
    "jobTitle": "Web Designer & Developer",
    "email": "kirtan6189@gmail.com",
    "telephone": "+91 7621987245",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://github.com/kkbro07",
      "https://www.linkedin.com/in/kirtankalathiya/",
      "https://www.instagram.com/kirtankalathiyas/",
      "https://www.youtube.com/@kirtankalathiya"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://kirtankalathiya.com",
    "name": "Kirtan Kalathiya",
    "author": {
      "@type": "Person",
      "name": "Kirtan Kalathiya"
    }
  };


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontInter.variable,
          fontOswald.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
        <Script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></Script>
        
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-MHS8TBJLFW"
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MHS8TBJLFW');
          `}
        </Script>

      </body>
    </html>
  );
}
