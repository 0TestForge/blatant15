"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal } from "./scroll-reveal"

const testimonials = [
  { id: 1, name: "Mariam K.", reviewKey: "review1" as const },
  { id: 2, name: "Giorgi T.", reviewKey: "review2" as const },
  { id: 3, name: "Ana B.", reviewKey: "review3" as const },
]

const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <circle cx="12" cy="9" r="4" className="fill-background" />
      <path
        d="M12 14c-4.5 0-7 2.5-7 5.5 0 0.5 0 1.5 0 1.5h14s0-1 0-1.5c0-3-2.5-5.5-7-5.5z"
        className="fill-background"
      />
    </svg>
  )
}

export function Testimonials() {
  const { t } = useLanguage()
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const TestimonialCard = ({
    testimonial,
    isDesktop = false,
  }: { testimonial: (typeof testimonials)[0]; isDesktop?: boolean }) => (
    <div
      className={`rounded-[24px] flex flex-col border border-border/20 ${
        isDesktop ? "p-6 w-[300px] min-h-[280px]" : "p-5 flex-shrink-0 w-[260px] min-h-[240px] select-none"
      }`}
      style={{
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className={`flex items-center gap-3 ${isDesktop ? "mb-4" : "mb-3"}`}>
        <div className={`${isDesktop ? "w-11 h-11" : "w-10 h-10"} flex-shrink-0`}>
          <UserIcon className="w-full h-full text-foreground" />
        </div>
        <div>
          <h4 className={`font-bold text-foreground ${isDesktop ? "text-sm" : "text-xs"}`}>{testimonial.name}</h4>
          <div className="flex gap-0.5 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`${isDesktop ? "w-3 h-3" : "w-2.5 h-2.5"} text-apple-yellow fill-current`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      <p className={`text-muted-foreground ${isDesktop ? "text-sm" : "text-xs"} leading-relaxed flex-1`}>
        "{t.testimonials[testimonial.reviewKey]}"
      </p>
    </div>
  )

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 px-6 lg:px-8 pb-28 md:pb-32 overflow-hidden relative z-[1] section-soft-blue"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Yellow lightning - left side - bigger on mobile */}
        <div className="absolute top-12 md:top-16 left-4 md:left-1/4 w-44 md:w-64 h-44 md:h-64 bg-gradient-to-br from-apple-yellow/30 md:from-apple-yellow/20 to-transparent rounded-full blur-3xl" />
        {/* Green lightning - right side - bigger on mobile */}
        <div className="absolute top-20 md:top-24 right-4 md:right-1/4 w-40 md:w-56 h-40 md:h-56 bg-gradient-to-br from-apple-green/25 md:from-apple-green/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-br from-apple-yellow/25 md:from-apple-yellow/20 to-transparent rounded-full blur-3xl" />
        {/* Additional mobile lightnings at bottom */}
        <div className="absolute bottom-20 md:hidden left-1/4 w-36 h-36 bg-gradient-to-br from-apple-yellow/25 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-16 md:hidden right-1/4 w-32 h-32 bg-gradient-to-br from-apple-green/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-24 md:hidden left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-br from-apple-yellow/25 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal className="text-center mb-12 md:mb-20 relative z-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground text-balance">
            {t.testimonials.title}
          </h2>
          <p className="mt-5 md:mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal animation="up" className="relative z-20">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden">
              <div
                ref={sliderRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleDragEnd}
                className={`flex gap-4 md:gap-5 testimonials-slider ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                style={{
                  width: "max-content",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {duplicatedTestimonials.map((testimonial, index) => (
                  <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} isDesktop={!isMobile} />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
