"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, Users, Zap, Wifi, UtensilsCrossed, X, ChevronDown, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef } from "react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

const amenitiesMap = {
  wifi: { icon: Wifi, label: "WiFi" },
  kitchen: { icon: UtensilsCrossed, label: "Kitchen" },
  heating: { icon: Zap, label: "Heating" },
}

interface VenueDetailsClientProps {
  venue: {
    id: number
    nameKey: "skylinePenthouse" | "gardenVilla" | "rooftopTerrace" | "loftStudio" | "seasideVilla" | "mountainRetreat"
    locationKey: "vakeTbilisi" | "saburtaloTbilisi" | "oldTownTbilisi" | "veraTbilisi" | "batumi" | "borjomi"
    price: number
    guests: number
    image: string
    images?: string[]
    description: string
    amenities: string[]
  }
}

// Sample reviews data
const reviewsData = [
  { name: "Sarah M.", rating: 5, text: "magari adgilia dzaan! dzaan magaria", date: "2 weeks ago" },
  { name: "John D.", rating: 5, text: "magari adgilia dzaan! dzaan magaria", date: "1 month ago" },
  { name: "Emma T.", rating: 4, text: "magari adgilia dzaan! dzaan magaria", date: "2 months ago" },
  { name: "Michael R.", rating: 5, text: "magari adgilia dzaan! dzaan magaria", date: "3 months ago" },
  { name: "Lisa K.", rating: 5, text: "magari adgilia dzaan! dzaan magaria", date: "3 months ago" },
  { name: "James B.", rating: 4, text: "magari adgilia dzaan! dzaan magaria", date: "4 months ago" },
  { name: "Rachel G.", rating: 5, text: "magari adgilia dzaan! dzaan magaria", date: "4 months ago" },
  { name: "David L.", rating: 5, text: "magari adgilia dzaan! dzaan magaria", date: "5 months ago" },
]

export function VenueDetailsClient({ venue }: VenueDetailsClientProps) {
  const { t } = useLanguage()
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showCheckmark, setShowCheckmark] = useState(false)
  const [reviewsIndex, setReviewsIndex] = useState(0)
  const reviewsContainerRef = useRef<HTMLDivElement>(null)

  const images = venue.images || [venue.image]
  const currentImage = images[selectedImageIndex]

  const handleSaveClick = () => {
    setIsFavorite(!isFavorite)
    if (!isFavorite) {
      setShowCheckmark(true)
      setTimeout(() => setShowCheckmark(false), 600)
    }
  }

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const scrollReviewsLeft = () => {
    setReviewsIndex(Math.max(0, reviewsIndex - 1))
    if (reviewsContainerRef.current) {
      const scrollAmount = reviewsContainerRef.current.scrollWidth / reviewsData.length
      reviewsContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const scrollReviewsRight = () => {
    setReviewsIndex(Math.min(reviewsData.length - 1, reviewsIndex + 1))
    if (reviewsContainerRef.current) {
      const scrollAmount = reviewsContainerRef.current.scrollWidth / reviewsData.length
      reviewsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const canScrollLeft = reviewsIndex > 0
  const canScrollRight = reviewsIndex < reviewsData.length - 1

  return (
    <main className="min-h-screen bg-background relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 md:w-[500px] h-96 md:h-[500px] bg-gradient-to-br from-apple-blue/20 md:from-apple-blue/15 via-apple-blue/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 md:w-96 h-80 md:h-96 bg-gradient-to-br from-apple-green/15 md:from-apple-green/10 via-apple-green/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-64 md:w-80 h-64 md:h-80 bg-gradient-to-br from-apple-yellow/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-background/60 backdrop-blur-xl border-b border-border/30 shadow-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold hover:bg-foreground/90"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to venues
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="light" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-screen pt-20">
        <div className="lg:col-span-2 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
          <div className="px-6 py-8 space-y-8">
            <div className="space-y-4">
              <div className="relative">
                <button
                  onClick={() => setImageModalOpen(true)}
                  className="relative aspect-video overflow-hidden rounded-[28px] w-full cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <Image
                    src={currentImage}
                    alt={t.venueData[venue.nameKey]}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/20 group-hover:from-black/60 group-hover:via-black/10 group-hover:to-black/30 transition-colors duration-500 rounded-[28px]" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-semibold">Click to expand</span>
                  </div>
                </button>

                <button
                  onClick={handlePrevImage}
                  className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-300 z-10 items-center justify-center"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-300 z-10 items-center justify-center"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-3 lg:hidden">
                <button
                  onClick={handlePrevImage}
                  className="flex-1 py-3 px-4 rounded-xl bg-foreground text-background font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextImage}
                  className="flex-1 py-3 px-4 rounded-xl bg-foreground text-background font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  Next
                </button>
              </div>

              <div className="flex gap-2 lg:gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 lg:w-24 h-20 lg:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${
                      selectedImageIndex === index ? "border-accent shadow-lg lg:scale-105" : "border-border/30 hover:border-border/60"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>

              <div className="text-center text-sm text-muted-foreground font-medium">
                {selectedImageIndex + 1} of {images.length}
              </div>
            </div>

            <div className="space-y-6 animate-fade-up">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
                  {t.venueData[venue.nameKey]}
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 group cursor-default">
                  <div className="p-2 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-lg font-medium">{t.venueData[venue.locationKey]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-apple-yellow text-apple-yellow" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-foreground">4.9</span>
                  <span className="text-sm text-muted-foreground">(128 reviews)</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[28px] bg-gradient-to-br from-card to-secondary border border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 space-y-4 group hover:border-border/60 animate-fade-up">
              <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">About this space</h2>
              <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{venue.description}</p>
            </div>

            <div className="p-8 rounded-[28px] bg-gradient-to-br from-card to-secondary border border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 space-y-6 group animate-fade-up">
              <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {venue.amenities.map((amenity, index) => {
                  const amenityData = amenitiesMap[amenity as keyof typeof amenitiesMap]
                  if (!amenityData) return null

                  const Icon = typeof amenityData.icon === "string" ? null : amenityData.icon

                  return (
                    <div key={amenity} className="flex flex-col items-center gap-3 p-5 bg-background/40 hover:bg-gradient-to-br hover:from-accent/10 hover:to-accent/5 rounded-2xl border border-border/30 hover:border-accent/40 transition-all duration-300 group/amenity cursor-default hover:shadow-md" style={{ animationDelay: `${index * 50}ms` }}>
                      <div className="p-3 rounded-full bg-accent/10 group-hover/amenity:bg-accent/20 group-hover/amenity:scale-110 transition-all duration-300">
                        {Icon ? (
                          <Icon className="w-6 h-6 text-accent group-hover/amenity:text-accent" />
                        ) : (
                          <span className="text-2xl">{amenityData.icon}</span>
                        )}
                      </div>
                      <span className="text-foreground font-semibold text-sm text-center group-hover/amenity:text-accent transition-colors duration-300">{amenityData.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-8 rounded-[28px] bg-gradient-to-br from-card to-secondary border border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 space-y-6 group animate-fade-up">
              <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">Location</h2>
              <div className="w-full h-80 md:h-96 bg-gradient-to-br from-secondary via-secondary/50 to-background rounded-[28px] border border-border/30 group-hover:border-accent/40 flex items-center justify-center overflow-hidden transition-all duration-300 shadow-sm group-hover:shadow-md">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                    <MapPin className="w-10 h-10 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">Location Map</h3>
                    <p className="text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">Google Maps integration coming soon</p>
                  </div>
                  <p className="text-sm font-medium text-accent">{t.venueData[venue.locationKey]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-1 sticky top-20 h-fit">
          <div className="w-full mx-6 my-8 p-8 rounded-[28px] bg-gradient-to-br from-card via-card to-secondary border border-border/40 shadow-2xl hover:shadow-2xl transition-all duration-500 space-y-6 group">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest group-hover:text-accent transition-colors duration-300">Instant booking</p>
              <h3 className="text-3xl font-extrabold text-foreground group-hover:text-accent transition-colors duration-300">Ready to book?</h3>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 hover:border-accent/40 space-y-3 transition-all duration-300 group/price">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-foreground group-hover/price:text-accent transition-colors duration-300">${venue.price}</span>
                <span className="text-muted-foreground font-semibold group-hover/price:text-foreground transition-colors duration-300">/night</span>
              </div>
              <p className="text-sm text-muted-foreground group-hover/price:text-foreground/70 transition-colors duration-300">Average price per night</p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-secondary/50 to-secondary/30 border border-border/40 hover:border-accent/40 flex items-center gap-3 transition-all duration-300 group/guests hover:bg-accent/5">
              <div className="p-2 rounded-full bg-accent/10 group-hover/guests:bg-accent/20 transition-colors duration-300">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <span className="text-foreground font-medium group-hover/guests:text-accent transition-colors duration-300">Up to {venue.guests} guests</span>
            </div>

            <button
              onClick={handleSaveClick}
              className="w-full py-3 px-6 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/40 hover:border-accent/40 text-foreground font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 group/fav hover:text-accent relative h-11"
            >
              <div className="relative w-5 h-5">
                <Heart
                  className={`w-5 h-5 transition-all duration-300 absolute ${
                    isFavorite ? 'opacity-0' : 'group-hover/fav:text-accent opacity-100'
                  }`}
                />
                {isFavorite && (
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-5 h-5 absolute ${showCheckmark ? 'animate-checkmark' : ''}`}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(255, 214, 10, 0.6))'
                    }}
                  >
                    {/* Checkmark circle background */}
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="#ffd60a"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    {/* Checkmark path */}
                    <path
                      d="M 8 12 L 11 15 L 16 9"
                      stroke="#ffd60a"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="10"
                      className={showCheckmark ? 'animate-checkmark' : ''}
                    />
                  </svg>
                )}
              </div>
              {isFavorite ? "Saved" : "Save for later"}
            </button>

            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <button className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-accent to-blue-600 text-white font-bold text-lg cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-lg">
              Book Now
            </button>

            <p className="text-xs text-muted-foreground text-center">You won't be charged yet</p>

            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">Guest Reviews</h3>
                <span className="text-xs text-muted-foreground font-semibold">{reviewsIndex + 1} of {reviewsData.length}</span>
              </div>

              <div className="relative">
                <div className="p-4 rounded-lg bg-gradient-to-br from-background/60 to-background/40 border border-border/30 hover:border-accent/40 transition-all duration-300 min-h-[160px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="font-semibold text-foreground">{reviewsData[reviewsIndex].name}</div>
                      <span className="text-xs text-muted-foreground">{reviewsData[reviewsIndex].date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(reviewsData[reviewsIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-apple-yellow text-apple-yellow" />
                      ))}
                      {[...Array(5 - reviewsData[reviewsIndex].rating)].map((_, i) => (
                        <Star key={i + reviewsData[reviewsIndex].rating} className="w-4 h-4 text-border" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">&quot;{reviewsData[reviewsIndex].text}&quot;</p>
                </div>

                <button
                  onClick={scrollReviewsLeft}
                  disabled={!canScrollLeft}
                  className="absolute -left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-accent/10 hover:bg-accent/20 disabled:opacity-30 disabled:cursor-not-allowed text-accent transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollReviewsRight}
                  disabled={!canScrollRight}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-accent/10 hover:bg-accent/20 disabled:opacity-30 disabled:cursor-not-allowed text-accent transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-center gap-1.5">
                {reviewsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setReviewsIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === reviewsIndex
                        ? 'bg-accent w-6'
                        : 'bg-border/50 w-2 hover:bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-background/80 backdrop-blur-xl border-t border-border/30 shadow-2xl">
        <button className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-accent to-blue-600 text-white font-bold cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-lg">
          Book Now - ${venue.price}/night
        </button>
      </div>

      {imageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-3 md:p-4 animate-fade-up overflow-y-auto">
          <button
            onClick={() => setImageModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-white/90 text-black transition-all duration-300 z-10 hover:scale-110"
          >
            <X className="w-5 md:w-6 h-5 md:h-6" />
          </button>

          <div className="relative w-full max-w-2xl md:max-w-3xl lg:max-w-4xl aspect-video rounded-[20px] md:rounded-[28px] overflow-hidden shadow-2xl flex items-center justify-center flex-shrink-0 mt-12 md:mt-0">
            <Image
              src={currentImage}
              alt={t.venueData[venue.nameKey]}
              fill
              className="object-contain"
              priority
            />

            <button
              onClick={handlePrevImage}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white hover:bg-white/90 text-black transition-all duration-300 z-10 hover:scale-110"
            >
              <ChevronLeft className="w-5 md:w-8 h-5 md:h-8" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white hover:bg-white/90 text-black transition-all duration-300 z-10 hover:scale-110"
            >
              <ChevronRight className="w-5 md:w-8 h-5 md:h-8" />
            </button>
          </div>

          <div className="flex gap-2 md:gap-3 mt-4 md:mt-6 overflow-x-auto pb-2 justify-center flex-wrap w-full px-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${
                  selectedImageIndex === index ? "border-white shadow-lg scale-105" : "border-white/40 hover:border-white/70"
                }`}
              >
                <Image
                  src={img}
                  alt={`View ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          <div className="text-center text-white font-medium mt-3 md:mt-4 text-sm md:text-base">
            {selectedImageIndex + 1} of {images.length}
          </div>
        </div>
      )}
    </main>
  )
}
