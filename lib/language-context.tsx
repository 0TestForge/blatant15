"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Language } from "./i18n"
import { getTranslation } from "./i18n"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: ReturnType<typeof getTranslation>
  isTransitioning: boolean
}

const defaultValue: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: getTranslation("en"),
  isTransitioning: false,
}

const LanguageContext = createContext<LanguageContextType>(defaultValue)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "en" || saved === "ka")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    if (lang === language) return

    setIsTransitioning(true)

    setTimeout(() => {
      setLanguageState(lang)
      localStorage.setItem("language", lang)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 300)
  }

  const t = getTranslation(language)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTransitioning }}>
      <div
        className="language-transition"
        style={{
          opacity: isTransitioning ? 0.6 : 1,
          transition: "opacity 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
