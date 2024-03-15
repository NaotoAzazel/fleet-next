import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import QueryProvider from "@/components/query-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: siteConfig.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("relative h-full font-sans antialiased", `${inter.variable} font-sans`, `${manrope.variable} font-sans`)}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="relative flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow flex-1">
                {children}
              </div>
              <Footer />
              <Toaster />
            </main>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
