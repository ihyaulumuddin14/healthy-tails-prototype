import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "@/providers/AppThemeProvider";
import { Toaster } from "@/components/ui/sonner"
import { TransitionProvider } from "@/providers/TransitionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   title: {
      default: "Healthy Tails Vet",
      template: "%s | Healthy Tails Vet",
   },
   description: "Healthy Tails Veterinary Clinic",
};

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode
}>) {
  return (
   <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased text-[var(--color-foreground)] overflow-x-hidden selection:bg-accent selection:text-accent-foreground relative`}
      >
         <div className="w-full h-screen gradient-background top-0 fixed -z-1"></div>
         <AppThemeProvider>
            <TransitionProvider>
               <Toaster position="top-center" />
                  {children}
            </TransitionProvider>
         </AppThemeProvider>
      </body>
   </html>
  )
}
