"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: "up" | "left" | "right" | "scale"
  delay?: number
}

export function ScrollReveal({ children, className = "", animation = "up", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isTouchDevice && isSmallScreen)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      if (ref.current) {
        ref.current.classList.remove("unrevealed")
        ref.current.classList.add("revealed")
      }
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("unrevealed")
            entry.target.classList.add("revealed")
          } else {
            entry.target.classList.remove("revealed")
            entry.target.classList.add("unrevealed")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isMobile])

  const animationClass = {
    up: "scroll-reveal",
    left: "scroll-reveal-left",
    right: "scroll-reveal-right",
    scale: "scroll-reveal-scale",
  }[animation]

  const delayClass = delay > 0 ? `delay-${delay}` : ""

  if (isMobile) {
    return (
      <div ref={ref} className={`revealed ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={`${animationClass} ${delayClass} ${className}`}>
      {children}
    </div>
  )
}
