"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer
      className="py-24 px-6 lg:px-8 pb-32 md:pb-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1a1a1c 0%, #0d0d0e 100%)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 md:h-52 lg:h-64 xl:h-80 pointer-events-none overflow-hidden">
        {/* Blurred gradient transition */}
        <div
          className="absolute -top-16 sm:-top-20 md:-top-28 lg:-top-36 left-0 right-0 h-32 sm:h-40 md:h-52 lg:h-64"
          style={{
            background: "linear-gradient(180deg, var(--background) 0%, transparent 100%)",
            filter: "blur(24px)",
          }}
        />
        {/* Liquid wave SVG shapes - height scales with breakpoints */}
        <svg
          className="absolute -top-1 left-0 w-full h-20 sm:h-28 md:h-40 lg:h-52 xl:h-64 text-background"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,20 C150,40 350,25 550,35 C750,45 950,20 1200,35 L1200,0 L0,0 Z" opacity="0.3" />
          <path d="M0,10 C300,50 600,10 900,40 C1050,55 1150,35 1200,45 L1200,0 L0,0 Z" opacity="0.5" />
          <path d="M0,0 C200,40 400,15 600,35 C800,55 1000,20 1200,40 L1200,0 L0,0 Z" opacity="1" />
        </svg>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated fluid blobs */}
        <div className="absolute top-12 md:top-16 left-1/4 md:left-1/3 w-64 md:w-72 h-64 md:h-72 bg-gradient-to-br from-apple-blue/15 to-transparent rounded-full blur-3xl animate-blob-slow" />
        <div className="absolute top-20 md:top-24 right-1/4 md:right-1/3 w-56 md:w-64 h-56 md:h-64 bg-gradient-to-br from-apple-green/10 to-transparent rounded-full blur-3xl animate-blob-slow-delay-1" />
        <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 w-48 md:w-56 h-48 md:h-56 bg-gradient-to-br from-apple-yellow/10 to-transparent rounded-full blur-3xl animate-blob-slow-delay-2" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-gradient-to-tr from-accent/12 to-transparent rounded-full blur-3xl animate-blob-slow-delay-3" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center md:text-left pb-4 overflow-visible">
          <Link
            href="/"
            className="text-4xl md:text-5xl font-black text-white tracking-tight inline-block leading-normal py-2"
          >
            PartySpace
          </Link>
          <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-md">{t.footer.tagline}</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-12 border-y border-white/10">
          <nav className="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-12">
            <Link
              href="#"
              className="text-lg font-medium text-gray-400 hover:text-apple-blue transition-colors duration-300"
            >
              {t.footer.about}
            </Link>
            <Link
              href="#"
              className="text-lg font-medium text-gray-400 hover:text-apple-blue transition-colors duration-300"
            >
              {t.footer.contact}
            </Link>
            <Link
              href="#"
              className="text-lg font-medium text-gray-400 hover:text-apple-blue transition-colors duration-300"
            >
              {t.footer.terms}
            </Link>
            <Link
              href="#"
              className="text-lg font-medium text-gray-400 hover:text-apple-blue transition-colors duration-300"
            >
              {t.footer.privacy}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-base text-gray-400 font-medium">Language:</span>
            <LanguageSwitcher variant="dark" />
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-base text-gray-500">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-500 hover:text-apple-blue transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-apple-blue transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.204.013-3.663.07-4.949.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.763v-2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-apple-blue transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
