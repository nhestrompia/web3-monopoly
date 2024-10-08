import { MovingFrame } from "@/components/MovingFrame";
import Providers from "@/components/Providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const ouroboros = localFont({
  src: "../public/fonts/Ouroboros-Regular.woff",
  variable: "--font-ouroboros",
  weight: "100 900",
});
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ouroboros.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="relative  ">
              {/* <MarqueeNavbar /> */}
              <MovingFrame />
            </div>

            <main className=" h-[100vh] flex justify-center items-center  p-8">
              {children}
            </main>
          </Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
