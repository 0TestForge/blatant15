import type React from "react"
import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, Noto_Sans_Georgian } from "next/font/google"
import { LanguageProvider } from "@/lib/language-context"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
})

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-georgian",
})

export const metadata: Metadata = {
  title: "PartySpace Georgia | Find & Book Event Venues",
  description:
    "Discover and book unique party spaces, apartments, rooftops, villas, and venues across Georgia.",
  icons: null,
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${notoSansGeorgian.variable} font-sans antialiased overscroll-none`}
      >
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
