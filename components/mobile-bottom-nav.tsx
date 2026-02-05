"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"

type NavItem = {
  id: string
  targetId: string
  icon: React.ReactNode
  labelKey: "partyspace" | "venues" | "reviews" | "listYourSpace"
}

const navItems: NavItem[] = [
  {
    id: "partyspace",
    targetId: "#top",
    labelKey: "partyspace",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    id: "venues",
    targetId: "#venues",
    labelKey: "venues",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    id: "testimonials",
    targetId: "#testimonials",
    labelKey: "reviews",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
  {
    id: "list-space",
    targetId: "/list-your-space",
    labelKey: "listYourSpace",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
]

const sectionIds = ["top", "venues", "testimonials"]

const SECTION_VISIBILITY_THRESHOLD = 200

const springConfig = {
  type: "spring" as const,
  stiffness: 520,
  damping: 32,
  mass: 0.85,
}

const glassSpringConfig = {
  type: "spring" as const,
  stiffness: 180,
  damping: 22,
  mass: 1,
}

interface GlassDockProps {
  activeIndex: number | null
  isAnimating: boolean
  tappedIndex: number | null
  onNavClick: (e: React.MouseEvent<HTMLButtonElement>, targetId: string, index: number) => void
  variant?: "mobile" | "desktop"
}

function MobileGlassDock({ activeIndex, isAnimating, tappedIndex, onNavClick }: Omit<GlassDockProps, "variant">) {
  const { t } = useLanguage()
  const itemWidth = 100 / navItems.length
  const [hasAppeared, setHasAppeared] = useState(false)
  const isOverReviews = false

  useEffect(() => {
    const timer = setTimeout(() => setHasAppeared(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const textColor = "#000000"
  const activeColor = "#000000"
  const borderColor = "rgba(0, 0, 0, 0.08)"
  const bgColor = "rgba(255, 255, 255, 1)"
  const pillBg = isOverReviews ? "rgba(255, 200, 50, 0.2)" : "rgba(0, 122, 255, 0.15)"
  const shadowColor =
    "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08), inset 0 0.5px 0 rgba(255, 255, 255, 0.8)"

  const getLabel = (item: NavItem) => {
    if (item.labelKey === "partyspace") return "PartySpace"
    return t.header[item.labelKey]
  }

  return (
    <>
      <motion.div
        className="absolute inset-0 -z-10 rounded-[40px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasAppeared ? 1 : 0 }}
        transition={glassSpringConfig}
        style={{
          background: "rgba(0, 0, 0, 0.03)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transform: "scale(1.15)",
        }}
      />

      <motion.div
        className="relative flex items-center justify-around px-3 py-2.5"
        initial={{
          borderRadius: 24,
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          borderRadius: hasAppeared ? 40 : 24,
          opacity: hasAppeared ? 1 : 0,
          scale: hasAppeared ? 1 : 0.95,
        }}
        whileTap={{
          borderRadius: 44,
          scale: 0.98,
        }}
        transition={glassSpringConfig}
        style={{
          background: bgColor,
          backdropFilter: `blur(${hasAppeared ? 34 : 20}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${hasAppeared ? 34 : 20}px) saturate(180%)`,
          boxShadow: shadowColor,
          borderTop: `0.5px solid ${borderColor}`,
          borderRight: `0.5px solid ${borderColor}`,
          borderBottom: `0.5px solid ${borderColor}`,
          borderLeft: `0.5px solid ${borderColor}`,
          width: "min(380px, 94vw)",
        }}
      >
        {activeIndex !== null && (
          <>
            {/* Chromatic glow - ROUND bubble */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full pointer-events-none"
              style={{
                width: `calc(${itemWidth}% - 6px)`,
                background: isOverReviews
                  ? "linear-gradient(135deg, rgba(255, 200, 50, 0.25) 0%, rgba(255, 180, 50, 0.2) 50%, rgba(255, 220, 100, 0.22) 100%)"
                  : "linear-gradient(135deg, rgba(0, 122, 255, 0.2) 0%, rgba(0, 122, 255, 0.15) 50%, rgba(90, 200, 245, 0.18) 100%)",
              }}
              initial={{ opacity: 0, left: `calc(${activeIndex * itemWidth}% + 3px)` }}
              animate={{
                left: `calc(${activeIndex * itemWidth}% + 3px)`,
                scaleX: isAnimating ? 1.25 : 1,
                scaleY: isAnimating ? 0.85 : 1,
                filter: isAnimating ? "blur(6px)" : "blur(8px)",
                opacity: isAnimating ? 0.85 : 1,
              }}
              transition={springConfig}
            />

            {/* Pill behind active item */}
            <motion.div
              className="absolute top-2 bottom-2 rounded-full"
              style={{
                width: `calc(${itemWidth}% - 10px)`,
                background: pillBg,
                boxShadow: isOverReviews 
                  ? "0 2px 10px rgba(255, 200, 50, 0.2), inset 0 0.5px 0 rgba(255, 255, 255, 0.5)"
                  : "0 2px 10px rgba(0, 122, 255, 0.15), inset 0 0.5px 0 rgba(255, 255, 255, 0.5)",
              }}
              initial={{ opacity: 0, left: `calc(${activeIndex * itemWidth}% + 5px)` }}
              animate={{
                left: `calc(${activeIndex * itemWidth}% + 5px)`,
                scaleX: isAnimating ? 1.25 : 1,
                scaleY: isAnimating ? 0.85 : 1,
                filter: isAnimating ? "blur(6px)" : "blur(0px)",
                opacity: isAnimating ? 0.8 : 1,
              }}
              transition={springConfig}
            />
          </>
        )}

        {navItems.map((item, index) => {
          const isActive = activeIndex === index
          const isTapped = tappedIndex === index
          const label = getLabel(item)

          return (
            <button
              key={item.id}
              onClick={(e) => onNavClick(e, item.targetId, index)}
              className="relative z-10 flex flex-col items-center justify-center gap-0.5 py-1.5 flex-1 cursor-pointer"
              aria-label={label}
            >
              <AnimatePresence>
                {isTapped && (
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, rgba(0, 122, 255, 0.25) 0%, transparent 70%)`,
                    }}
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1.5, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 2, filter: "blur(3px)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                animate={{
                  scale: isActive ? 1.2 : 1,
                }}
                transition={springConfig}
                style={{
                  color: isActive ? activeColor : textColor,
                }}
              >
                {item.icon}
              </motion.div>

              <motion.span
                className="text-[9px] font-semibold"
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
                transition={springConfig}
                style={{
                  color: isActive ? activeColor : textColor,
                }}
              >
                {label}
              </motion.span>
            </button>
          )
        })}
      </motion.div>
    </>
  )
}

const desktopNavItems: NavItem[] = [
  {
    id: "venues",
    targetId: "#venues",
    labelKey: "venues",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    id: "testimonials",
    targetId: "#testimonials",
    labelKey: "reviews",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
  {
    id: "list-space",
    targetId: "/list-your-space",
    labelKey: "listYourSpace",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
]

type NavbarState = "initial" | "scrolled" | "expanded"

function DesktopGlassDock({ activeIndex, isAnimating, tappedIndex, onNavClick }: Omit<GlassDockProps, "variant">) {
  const { t } = useLanguage()
  const itemWidth = 100 / desktopNavItems.length
  const desktopActiveIndex = activeIndex !== null && activeIndex > 0 ? activeIndex - 1 : null

  const textColor = "#000000"
  const activeColor = "#000000"

  const [navbarState, setNavbarState] = useState<NavbarState>("initial")
  const [hasLoaded, setHasLoaded] = useState(false)

  // Initial load animation - start small, grow to initial state
  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const testimonialsSection = document.getElementById("testimonials")

      if (testimonialsSection) {
        const rect = testimonialsSection.getBoundingClientRect()
        // Check if we're in the testimonials section (navbar should expand)
        if (rect.top < 150 && rect.bottom > 0) {
          setNavbarState("expanded")
          return
        }
      }

      // Otherwise, check if scrolled past threshold
      if (scrollY > 80) {
        setNavbarState("scrolled")
      } else {
        setNavbarState("initial")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Before loaded: tiny, After loaded + initial: medium size, scrolled: small, expanded: medium
  const isExpanded = navbarState === "expanded"
  const isInitial = navbarState === "initial" && hasLoaded
  const isScrolled = navbarState === "scrolled"
  const isOverReviews = navbarState === "expanded"

  // Size values: initial/expanded = medium, scrolled = small
  // Fixed vertical padding to maintain constant height
  const currentGap = isExpanded ? 14 : isInitial ? 12 : 8
  const currentPaddingX = isExpanded ? 24 : isInitial ? 44 : 14
  const fixedPaddingY = 10
  const currentRadius = isExpanded ? 26 : isInitial ? 32 : 40

  return (
    <motion.div
      className="relative flex items-center px-0 py-[10px]"
      initial={{
        gap: 0,
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 50,
        scale: 0,
        opacity: 0,
        y: 0,
      }}
      animate={{
        gap: hasLoaded ? currentGap : 0,
        paddingLeft: hasLoaded ? currentPaddingX : 0,
        paddingRight: hasLoaded ? currentPaddingX : 0,
        borderRadius: hasLoaded ? currentRadius : 50,
        scale: hasLoaded ? 1 : 0,
        opacity: hasLoaded ? 1 : 0,
        y: isOverReviews ? 4 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 30,
        mass: 0.8,
      }}
      style={{
        background: isOverReviews ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: isOverReviews
          ? "0 12px 48px rgba(0, 0, 0, 0.18), 0 4px 16px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 122, 255, 0.1)"
          : "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
        borderTop: "2px solid #d1d5db",
        borderRight: "2px solid #d1d5db",
        borderBottom: "2px solid #d1d5db",
        borderLeft: "2px solid #d1d5db",
      }}
    >
      <motion.button
        onClick={(e) => onNavClick(e, "#top", 0)}
        className="relative font-black tracking-tight px-2 py-1 flex-shrink-0 cursor-pointer"
        style={{ color: "#000000", fontSize: "1.25rem" }}
        animate={{
          letterSpacing: isExpanded ? "-0.02em" : "-0.01em",
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
        }}
      >
        <span>PartySpace</span>
      </motion.button>

      <motion.div
        className="mx-1.5 h-5"
        animate={{
          opacity: isExpanded ? 0.2 : 0.15,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
        }}
        style={{ width: 1, background: "rgba(0, 0, 0, 0.15)" }}
      />

      <motion.div
        className="flex items-center justify-around relative"
        animate={{
          width: isExpanded ? 320 : isInitial ? 300 : 260,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
        }}
      >
        {desktopActiveIndex !== null && (
          <>
            <motion.div
              className="absolute top-0 bottom-0 rounded-full pointer-events-none"
              style={{
                width: `calc(${itemWidth}% + 8px)`,
                background: isOverReviews
                  ? "linear-gradient(135deg, rgba(255, 200, 50, 0.2) 0%, rgba(255, 180, 50, 0.15) 50%, rgba(255, 220, 100, 0.18) 100%)"
                  : "linear-gradient(135deg, rgba(90, 200, 245, 0.15) 0%, rgba(0, 255, 255, 0.1) 50%, rgba(138, 180, 255, 0.12) 100%)",
                filter: "blur(12px)",
              }}
              initial={{ opacity: 0, left: `calc(${desktopActiveIndex * itemWidth}% - 4px)` }}
              animate={{
                left: `calc(${desktopActiveIndex * itemWidth}% - 4px)`,
                scaleX: isAnimating ? 1.3 : 1,
                scaleY: isAnimating ? 0.8 : 1,
                opacity: isAnimating ? 0.9 : 1,
              }}
              transition={springConfig}
            />

            <motion.div
              className="absolute top-1 bottom-1 rounded-full"
              style={{
                width: `calc(${itemWidth}% - 4px)`,
                background: isOverReviews ? "rgba(255, 200, 50, 0.12)" : "rgba(0, 0, 0, 0.06)",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
              }}
              initial={{ opacity: 0, left: `calc(${desktopActiveIndex * itemWidth}% + 2px)` }}
              animate={{
                left: `calc(${desktopActiveIndex * itemWidth}% + 2px)`,
                scaleX: isAnimating ? 1.3 : 1,
                scaleY: isAnimating ? 0.8 : 1,
                opacity: isAnimating ? 0.85 : 1,
              }}
              transition={springConfig}
            />
          </>
        )}

        {desktopNavItems.map((item, index) => {
          const isActive = desktopActiveIndex === index
          const isTapped = tappedIndex === index + 1
          const label = t.header[item.labelKey]

          return (
            <button
              key={item.id}
              onClick={(e) => onNavClick(e, item.targetId, index + 1)}
              className="relative z-10 flex flex-col items-center justify-center gap-0.5 py-1.5 flex-1 cursor-pointer"
              aria-label={label}
            >
              <AnimatePresence>
                {isTapped && (
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, rgba(0, 122, 255, 0.25) 0%, transparent 70%)`,
                    }}
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1.5, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 2, filter: "blur(3px)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                animate={{
                  scale: isActive ? (isExpanded ? 1.2 : isInitial ? 1.1 : 1.05) : isExpanded ? 1 : isInitial ? 0.95 : 0.85,
                }}
                transition={springConfig}
                style={{
                  color: isActive ? activeColor : textColor,
                }}
              >
                {item.icon}
              </motion.div>

              <motion.span
                className="font-bold whitespace-nowrap text-xs"
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
                transition={springConfig}
                style={{
                  color: "#000000",
                  fontSize: "10px",
                }}
              >
                {label}
              </motion.span>
            </button>
          )
        })}
      </motion.div>

      <motion.div
        className="mx-1.5 h-5"
        animate={{
          opacity: isExpanded ? 0.2 : 0.15,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
        }}
        style={{ width: 1, background: "rgba(0, 0, 0, 0.15)" }}
      />

      <div className="flex items-center gap-2 pl-1">
        <LanguageSwitcher variant="navbar" style={{ color: "#6b7280" }} />
        <Link
          href="#"
          className="font-bold rounded-full hover:opacity-90 whitespace-nowrap transition-all"
          style={{
            backgroundColor: "#111111",
            color: "#ffffff",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.15)",
            paddingLeft: "28px",
            paddingRight: "28px",
            paddingTop: "12px",
            paddingBottom: "12px",
            fontSize: "1rem",
          }}
        >
          {t.header.signIn}
        </Link>
      </div>
    </motion.div>
  )
}

function useDockState() {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [tappedIndex, setTappedIndex] = useState<number | null>(null)
  const [isManualScroll, setIsManualScroll] = useState(false)

  useEffect(() => {
    const handleScrollSpy = () => {
      if (isManualScroll) return

      const scrollPosition = window.scrollY + window.innerHeight / 3

      if (scrollPosition < 300) {
        if (activeIndex !== 0) {
          setIsAnimating(true)
          setTimeout(() => setIsAnimating(false), 400)
          setActiveIndex(0)
        }
        return
      }

      for (let i = sectionIds.length - 1; i >= 1; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section) {
          const sectionTop = section.offsetTop
          if (scrollPosition >= sectionTop + SECTION_VISIBILITY_THRESHOLD) {
            if (activeIndex !== i) {
              setIsAnimating(true)
              setTimeout(() => setIsAnimating(false), 400)
              setActiveIndex(i)
            }
            return
          }
        }
      }

      if (activeIndex !== 0) {
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 400)
        setActiveIndex(0)
      }
    }

    window.addEventListener("scroll", handleScrollSpy, { passive: true })
    handleScrollSpy()

    return () => window.removeEventListener("scroll", handleScrollSpy)
  }, [activeIndex, isManualScroll])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLButtonElement>, targetId: string, index: number) => {
    e.preventDefault()

    setTappedIndex(index)
    setTimeout(() => setTappedIndex(null), 250)

    // Handle page navigation
    if (targetId.startsWith("/")) {
      router.push(targetId)
      return
    }

    setIsManualScroll(true)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 400)
    setActiveIndex(index)

    setTimeout(() => setIsManualScroll(false), 1000)

    if (targetId === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (targetId !== "#") {
      const element = document.querySelector(targetId)
      if (element) {
        const elementTop = element.getBoundingClientRect().top + window.scrollY
        const offset = 100
        window.scrollTo({ top: elementTop - offset, behavior: "smooth" })
      }
    }
  }, [router])

  return { activeIndex, isAnimating, tappedIndex, handleNavClick }
}

export function MobileBottomNav() {
  const { activeIndex, isAnimating, tappedIndex, handleNavClick } = useDockState()

  return (
    <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-2">
      <MobileGlassDock
        activeIndex={activeIndex}
        isAnimating={isAnimating}
        tappedIndex={tappedIndex}
        onNavClick={handleNavClick}
      />
    </nav>
  )
}

interface DesktopNavbarProps {
  user?: any
  loading?: boolean
  logout?: () => Promise<void>
  isAdmin?: boolean
  authModalOpen?: boolean
  setAuthModalOpen?: (open: boolean) => void
  setAuthMode?: (mode: "signin" | "signup") => void
}

export function DesktopNavbar({ user, loading, logout, isAdmin, authModalOpen, setAuthModalOpen, setAuthMode }: DesktopNavbarProps = {}) {
  const { activeIndex, isAnimating, tappedIndex, handleNavClick } = useDockState()

  return (
    <nav className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <DesktopGlassDock
        activeIndex={activeIndex}
        isAnimating={isAnimating}
        tappedIndex={tappedIndex}
        onNavClick={handleNavClick}
      />
    </nav>
  )
}
