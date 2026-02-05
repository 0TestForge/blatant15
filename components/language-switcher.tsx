"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

interface LanguageSwitcherProps {
  isOverDarkSection?: boolean
  variant?: "light" | "dark" | "navbar"
}

const springConfig = {
  type: "spring" as const,
  stiffness: 520,
  damping: 32,
  mass: 0.85,
}

export function LanguageSwitcher({ isOverDarkSection = false, variant }: LanguageSwitcherProps) {
  const { language, setLanguage, isTransitioning } = useLanguage()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkIsDesktop()
    window.addEventListener("resize", checkIsDesktop)
    return () => window.removeEventListener("resize", checkIsDesktop)
  }, [])

  const isEnglish = language === "en"

  const isDark = variant === "dark" || isOverDarkSection
  const isNavbar = variant === "navbar"

  const textColor = isDark || isNavbar ? "#cccccc" : "#333333"
  const activeColor = isDark || isNavbar ? "#ffffff" : "#000000"
  const pillBg = "rgba(0, 122, 255, 0.15)"

  const containerBg = isNavbar
    ? "rgba(0, 0, 0, 0.95)"
    : isDark
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0.95)"

  const containerBorder = isNavbar
    ? "1px solid rgba(255, 255, 255, 0.15)"
    : isDark
      ? "1px solid rgba(255, 255, 255, 0.15)"
      : "1px solid rgba(0, 0, 0, 0.08)"

  const containerShadow = isNavbar
    ? "0 2px 8px rgba(0, 0, 0, 0.4)"
    : isDark
      ? "0 2px 8px rgba(0, 0, 0, 0.3)"
      : "0 2px 8px rgba(0, 0, 0, 0.08)"

  return (
    <div
      className="relative flex items-center justify-center rounded-full px-0 py-1 w-[120px] sm:w-[140px]"
      style={{
        background: containerBg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: containerShadow,
        border: containerBorder,
        flexShrink: 0,
      }}
    >
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "calc(50% - 8px)",
          top: "50%",
          transform: "translateY(-50%)",
          background:
            "linear-gradient(135deg, rgba(90, 200, 245, 0.15) 0%, rgba(0, 255, 255, 0.1) 50%, rgba(138, 180, 255, 0.12) 100%)",
          filter: "blur(8px)",
        }}
        initial={false}
        animate={{
          left: isEnglish ? "4px" : "calc(50% + 4px)",
          height: isDesktop ? "36px" : "30px",
        }}
        transition={springConfig}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: "calc(50% - 8px)",
          top: "50%",
          transform: "translateY(-50%)",
          background: pillBg,
          boxShadow: "0 2px 10px rgba(0, 122, 255, 0.15), inset 0 0.5px 0 rgba(255, 255, 255, 0.5)",
          border: "1px solid rgba(0, 122, 255, 0.1)",
        }}
        initial={false}
        animate={{
          left: isEnglish ? "4px" : "calc(50% + 4px)",
          height: isDesktop ? "36px" : "30px",
        }}
        transition={springConfig}
      />

      {/* Divider between buttons */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-5 bg-gray-400/30 pointer-events-none"
        style={{ zIndex: 9 }}
      />

      {/* EN option */}
      <button
        onClick={() => setLanguage("en")}
        disabled={isTransitioning}
        className="relative z-10 w-1/2 h-9 flex items-center justify-center font-bold text-xs sm:text-sm tracking-wide cursor-pointer select-none disabled:cursor-wait"
      >
        <motion.span
          animate={{
            color: isEnglish ? activeColor : textColor,
            scale: isEnglish ? 1.05 : 1,
          }}
          transition={springConfig}
        >
          EN
        </motion.span>
      </button>

      {/* GEO option */}
      <button
        onClick={() => setLanguage("ka")}
        disabled={isTransitioning}
        className="relative z-10 w-1/2 h-9 flex items-center justify-center font-bold text-xs sm:text-sm tracking-wide cursor-pointer select-none disabled:cursor-wait"
      >
        <motion.span
          animate={{
            color: !isEnglish ? activeColor : textColor,
            scale: !isEnglish ? 1.05 : 1,
          }}
          transition={springConfig}
        >
          GEO
        </motion.span>
      </button>
    </div>
  )
}
