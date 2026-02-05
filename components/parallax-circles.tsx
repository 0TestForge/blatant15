"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"

export function ParallaxCircles() {
  const [scrollY, setScrollY] = useState(0)
  const [circlesLoaded, setCirclesLoaded] = useState(false)
  const [maxScroll, setMaxScroll] = useState(0)
  const [shouldBeFixed, setShouldBeFixed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const rafRef = useRef<number | null>(null)

  const colors = {
    yellow: "#FFD60A",
    blue: "#5AC8F5",
    green: "#30D158",
  }

  const opacity = 0.35

  useEffect(() => {
    const timer = setTimeout(() => setCirclesLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  /**
   * 🔥 DESKTOP ONLY — OG SCROLL LOGIC
   */
  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        setScrollY(currentScrollY)

        if (currentScrollY >= maxScroll && maxScroll > 0) {
          setShouldBeFixed(false)
        } else {
          setShouldBeFixed(true)
        }

        rafRef.current = null
      })
    }

    const updateMaxScroll = () => {
      const venuesSection = document.getElementById("venues")
      if (venuesSection) {
        const venuesTop = venuesSection.offsetTop
        setMaxScroll(venuesTop - 250)
      }
    }

    updateMaxScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateMaxScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateMaxScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [maxScroll, isMobile])

  /**
   * 📱 MOBILE — NO SCROLL, STATIC POSITION
   */
  const convergeProgress =
    !isMobile && maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0

  const leftConvergeOffset = convergeProgress * 8
  const rightConvergeOffset = convergeProgress * 8

  const containerStyle: React.CSSProperties =
    !isMobile && shouldBeFixed
      ? {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 5,
        }
      : {
          position: "absolute",
          top: isMobile ? 0 : maxScroll,
          left: 0,
          width: "100%",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 5,
        }

  return (
    <div style={containerStyle}>
      <div className="relative w-full h-full max-w-[1400px] mx-auto overflow-hidden">
        {/* Yellow */}
        <svg
          className={`absolute hero-circle transition-opacity duration-500 ${
            circlesLoaded ? "animate-grow" : ""
          }`}
          style={{
            width: isMobile ? "12rem" : "16rem",
            height: isMobile ? "12rem" : "16rem",
            top: isMobile ? "15%" : "10%",
            left: `calc(5% + ${leftConvergeOffset}%)`,
            opacity,
            transition: "left 0.1s ease-out",
          }}
          viewBox="0 0 200 200"
        >
          <path
            fill={colors.yellow}
            d="M44.7,-76.4C58.8,-69.2,71.8,-58.9,79.6,-45.4C87.4,-31.9,90,-15.2,88.4,-0.9C86.8,13.4,81,26.8,72.8,38.8C64.6,50.8,54,61.4,41.4,69.4C28.8,77.4,14.4,82.8,-1.2,84.8C-16.8,86.8,-33.6,85.4,-47.8,78.2C-62,71,-73.6,58,-80.4,43.2C-87.2,28.4,-89.2,11.9,-87.2,-3.6C-85.2,-19.1,-79.2,-33.6,-69.8,-45.6C-60.4,-57.6,-47.6,-67.1,-34,-74.4C-20.4,-81.7,-6,-86.8,7.1,-81.8C20.2,-76.8,30.6,-61.7,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Blue */}
        <svg
          className={`absolute left-1/2 -translate-x-1/2 hero-circle transition-opacity duration-500 ${
            circlesLoaded ? "animate-grow" : ""
          }`}
          style={{
            width: isMobile ? "14rem" : "20rem",
            height: isMobile ? "14rem" : "20rem",
            top: isMobile ? "12%" : "5%",
            opacity,
          }}
          viewBox="0 0 200 200"
        >
          <path
            fill={colors.blue}
            d="M39.9,-65.7C52.2,-59.5,63.1,-49.5,71.1,-37.1C79.1,-24.7,84.2,-9.9,83.1,4.2C82,18.3,74.7,31.7,65.2,43.1C55.7,54.5,44,63.9,30.8,69.8C17.6,75.7,2.9,78.1,-11.9,77.1C-26.7,76.1,-41.6,71.7,-54.1,63.1C-66.6,54.5,-76.7,41.7,-81.4,27.2C-86.4,12.7,-86.4,-3.5,-80.4,-18.1C-74.4,-32.7,-66.1,-45.7,-53.8,-52.1C-41.5,-58.5,-26.2,-58.3,-12.4,-60.1C1.4,-61.9,27.6,-65.7,39.9,-65.7Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Green */}
        <svg
          className={`absolute hero-circle transition-opacity duration-500 ${
            circlesLoaded ? "animate-grow" : ""
          }`}
          style={{
            width: isMobile ? "13rem" : "18rem",
            height: isMobile ? "13rem" : "18rem",
            top: isMobile ? "18%" : "12%",
            right: `calc(5% + ${rightConvergeOffset}%)`,
            opacity,
            transition: "right 0.1s ease-out",
          }}
          viewBox="0 0 200 200"
        >
          <path
            fill={colors.green}
            d="M47.7,-79.1C62.3,-71.8,75.1,-60.2,82.4,-45.8C89.7,-31.4,91.5,-14.2,89.2,1.9C86.9,18,80.5,33,70.9,45.6C61.3,58.2,48.5,68.4,34.3,74.8C20.1,81.2,4.5,83.8,-11.4,82.5C-27.3,81.2,-43.5,76,-56.1,66.2C-68.7,56.4,-77.7,42,-82.1,26.4C-86.5,10.8,-86.3,-6,-81.4,-21C-76.5,-36,-66.9,-49.2,-54.1,-57.3C-41.3,-65.4,-25.3,-68.4,-9.4,-71.8C6.5,-75.2,33.1,-79,47.7,-79.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  )
}
