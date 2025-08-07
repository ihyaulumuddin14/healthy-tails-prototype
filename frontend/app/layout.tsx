import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "@/themes/AppThemeProvider";
import { Toaster } from "@/components/ui/sonner"

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
        className={`${inter.variable} antialiased text-[var(--color-foreground)] overflow-x-hidden`}
      >
         <AppThemeProvider>
            <Toaster position="top-center" />
            {children}
         </AppThemeProvider>
      </body>
   </html>
  )
}
