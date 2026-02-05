"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Users, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal } from "./scroll-reveal"

const venues = [
  {
    id: 1,
    nameKey: "skylinePenthouse" as const,
    locationKey: "vakeTbilisi" as const,
    price: 450,
    guests: 30,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    ],
  },
  {
    id: 2,
    nameKey: "gardenVilla" as const,
    locationKey: "saburtaloTbilisi" as const,
    price: 680,
    guests: 50,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
  },
  {
    id: 3,
    nameKey: "rooftopTerrace" as const,
    locationKey: "oldTownTbilisi" as const,
    price: 320,
    guests: 25,
    image: "https://images.unsplash.com/photo-1600607687939-ce6161a56a0c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
  },
  {
    id: 4,
    nameKey: "loftStudio" as const,
    locationKey: "veraTbilisi" as const,
    price: 280,
    guests: 20,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce6161a56a0c?w=800&q=80",
    ],
  },
  {
    id: 5,
    nameKey: "seasideVilla" as const,
    locationKey: "batumi" as const,
    price: 890,
    guests: 60,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce6161a56a0c?w=800&q=80",
    ],
  },
  {
    id: 6,
    nameKey: "mountainRetreat" as const,
    locationKey: "borjomi" as const,
    price: 520,
    guests: 35,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
  },
]

export function FeaturedVenues() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [desktopIndex, setDesktopIndex] = useState(0)
  const desktopSliderRef = useRef<HTMLDivElement>(null)
  const cardsPerView = 3 // Show 3 cards at a time on desktop

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleScroll = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.scrollWidth / venues.length
      const newIndex = Math.round(sliderRef.current.scrollLeft / cardWidth)
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
      }
    }
  }

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.scrollWidth / venues.length
      sliderRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      })
      setCurrentIndex(index)
    }
  }

  const scrollDesktopToIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, venues.length - cardsPerView))
    setDesktopIndex(clampedIndex)
    if (desktopSliderRef.current) {
      const cardWidth = desktopSliderRef.current.scrollWidth / venues.length
      desktopSliderRef.current.scrollTo({
        left: cardWidth * clampedIndex,
        behavior: "smooth",
      })
    }
  }

  const handleDesktopScroll = () => {
    if (desktopSliderRef.current) {
      const cardWidth = desktopSliderRef.current.scrollWidth / venues.length
      const newIndex = Math.round(desktopSliderRef.current.scrollLeft / cardWidth)
      if (newIndex !== desktopIndex) {
        setDesktopIndex(newIndex)
      }
    }
  }

  const canScrollLeft = desktopIndex > 0
  const canScrollRight = desktopIndex < venues.length - cardsPerView

  return (
    <section
      id="venues"
      className="py-36 px-6 lg:px-8 pt-28 md:pt-48 pb-24 md:pb-36 relative z-[1] section-soft-blue overflow-visible"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue lightning - left side */}
        <div className="absolute top-24 md:top-32 left-4 md:left-1/4 w-28 md:w-72 h-28 md:h-72 bg-gradient-to-br from-apple-blue/20 md:from-apple-blue/15 to-transparent rounded-full blur-3xl" />
        {/* Green lightning - right side */}
        <div className="absolute top-36 md:top-40 right-4 md:right-1/4 w-24 md:w-64 h-24 md:h-64 bg-gradient-to-br from-apple-green/20 md:from-apple-green/15 to-transparent rounded-full blur-3xl" />
        {/* Yellow lightning - center - MORE VISIBLE on PC */}
        <div className="absolute top-28 md:top-36 left-1/2 -translate-x-1/2 w-40 md:w-96 h-40 md:h-96 bg-gradient-to-br from-apple-yellow/15 md:from-apple-yellow/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative overflow-visible">
        <ScrollReveal className="text-center mb-16 md:mb-24 relative z-30">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground text-balance relative z-30">
            {t.venues.title}
          </h2>
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">{t.venues.subtitle}</p>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 mt-8 md:mt-10 px-8 py-3.5 bg-white text-foreground font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 bubblegum-animate border border-border/20"
          >
            <Search className="w-5 h-5 text-foreground" />
            {t.venues.browseAll || "Browse All Venues"}
          </Link>
        </ScrollReveal>

        {isMobile ? (
          <ScrollReveal animation="up" className="relative z-20">
            <div className="relative">
              <div
                ref={sliderRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto pb-4 pt-4 scroll-smooth"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {venues.map((venue) => (
                  <div
                    key={venue.id}
                    className="flex-shrink-0 w-[85vw] group bg-card rounded-[28px] overflow-hidden shadow-sm select-none border border-border/50"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <Image
                        src={venue.image || "/placeholder.svg"}
                        alt={t.venueData[venue.nameKey]}
                        fill
                        className="object-cover pointer-events-none"
                        draggable={false}
                        loading="lazy"
                        sizes="85vw"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground">{t.venueData[venue.nameKey]}</h3>

                      <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{t.venueData[venue.locationKey]}</span>
                      </div>

                      <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {t.venues.upToGuests.replace("{count}", venue.guests.toString())}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-bold text-foreground">${venue.price}</span>
                          <span className="text-sm text-muted-foreground font-medium">{t.venues.perNight}</span>
                        </div>
                      </div>

                      <Link
                        href={`/venues/${venue.id}`}
                        className="w-full mt-5 py-3 px-6 rounded-2xl border border-border text-foreground font-semibold cursor-pointer transition-all duration-300 hover:bg-foreground hover:text-background hover:shadow-lg hover:scale-105 block text-center"
                      >
                        {t.venues.viewDetails}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="flex gap-2">
                  {venues.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        index === currentIndex ? "bg-foreground w-6" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal animation="up" className="relative z-20">
            <div className="relative">
              <button
                onClick={() => scrollDesktopToIndex(desktopIndex - 1)}
                disabled={!canScrollLeft}
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black text-white hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)" }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div
                ref={desktopSliderRef}
                onScroll={handleDesktopScroll}
                className="flex gap-6 overflow-x-auto scroll-smooth px-2 py-6 -my-2"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  scrollSnapType: "x mandatory",
                }}
              >
                {venues.map((venue, index) => (
                  <div
                    key={venue.id}
                    className="flex-shrink-0 group bg-card rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border/50"
                    style={{
                      width: "calc((100% - 48px) / 3)",
                      minWidth: "320px",
                      maxWidth: "420px",
                      scrollSnapAlign: "start",
                    }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <Image
                        src={venue.image || "/placeholder.svg"}
                        alt={t.venueData[venue.nameKey]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        sizes="(min-width: 768px) 33vw, 85vw"
                      />
                    </div>

                    <div className="p-7">
                      <h3 className="text-xl font-bold text-foreground">{t.venueData[venue.nameKey]}</h3>

                      <div className="flex items-center gap-1.5 mt-3 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{t.venueData[venue.locationKey]}</span>
                      </div>

                      <div className="flex items-center justify-between mt-7">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {t.venues.upToGuests.replace("{count}", venue.guests.toString())}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-xl font-bold text-foreground">${venue.price}</span>
                          <span className="text-sm text-muted-foreground font-medium">{t.venues.perNight}</span>
                        </div>
                      </div>

                      <Link
                        href={`/venues/${venue.id}`}
                        className="w-full mt-7 py-3.5 px-6 rounded-2xl border border-border text-foreground font-semibold cursor-pointer transition-all duration-300 hover:bg-foreground hover:text-background hover:shadow-lg hover:scale-105 block text-center"
                      >
                        {t.venues.viewDetails}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollDesktopToIndex(desktopIndex + 1)}
                disabled={!canScrollRight}
                className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black text-white hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)" }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: venues.length - cardsPerView + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollDesktopToIndex(index)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      index === desktopIndex ? "bg-foreground w-6" : "bg-muted-foreground/30 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
