import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { FeaturedVenues } from "@/components/featured-venues"
import { Testimonials } from "@/components/testimonials"
import { ChatWidget } from "@/components/chat-widget"
import { HomeClient } from "@/components/home-client"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <HomeClient />
      <Header />
      <HeroSection />
      <FeaturedVenues />
      <Testimonials />
      <ChatWidget />
      <Footer />
    </main>
  )
}
