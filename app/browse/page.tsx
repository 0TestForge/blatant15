import { Suspense } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"
import BrowseClient from "./BrowseClient"

const venuesData = [
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
    description: "Luxury penthouse with city views",
    amenities: ["wifi", "kitchen", "heating"],
    location: "Vake, Tbilisi",
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
    description: "Beautiful garden villa with spacious grounds",
    amenities: ["wifi", "kitchen"],
    location: "Saburtalo, Tbilisi",
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
    description: "Charming rooftop terrace in historic old town",
    amenities: ["wifi", "heating"],
    location: "Old Town, Tbilisi",
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
    description: "Modern loft studio with contemporary design",
    amenities: ["wifi", "kitchen", "heating"],
    location: "Vera, Tbilisi",
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
    description: "Luxurious seaside villa with beach access",
    amenities: ["wifi", "kitchen"],
    location: "Batumi",
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
    description: "Peaceful mountain retreat surrounded by nature",
    amenities: ["wifi", "heating"],
    location: "Borjomi",
  },
]

export default function BrowsePage() {
  return (
    <main className="min-h-screen bg-background relative">
      {/* Wave decoration at top */}
      <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 md:h-52 lg:h-64 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-16 sm:-top-20 md:-top-28 lg:-top-36 left-0 right-0 h-32 sm:h-40 md:h-52 lg:h-64"
          style={{
            background: "linear-gradient(180deg, transparent 0%, var(--background) 100%)",
            filter: "blur(24px)",
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 md:w-[500px] h-96 md:h-[500px] bg-gradient-to-br from-apple-blue/20 md:from-apple-blue/15 via-apple-blue/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 md:w-96 h-80 md:h-96 bg-gradient-to-br from-apple-green/15 md:from-apple-green/10 via-apple-green/5 to-transparent rounded-full blur-3xl" />

        {/* Gray-to-white gradient frame on right side */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[600px] md:w-[900px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.15) 100%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-background/60 backdrop-blur-xl border-b border-border/30 shadow-sm">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold hover:bg-foreground/90"
        >
          Back
        </a>
        <h1 className="text-xl font-bold text-foreground">Browse Venues</h1>
        <LanguageSwitcher variant="light" />
      </div>

      <Suspense fallback={<div className="pt-24 px-6">Loading venues...</div>}>
        <BrowseClient venuesData={venuesData} />
      </Suspense>
    </main>
  )
}
