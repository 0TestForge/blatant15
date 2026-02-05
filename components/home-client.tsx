"use client"

import dynamic from "next/dynamic"

const ParallaxCircles = dynamic(
  () =>
    import("@/components/parallax-circles").then((mod) => ({
      default: mod.ParallaxCircles,
    })),
  { ssr: false }
)

export function HomeClient() {
  return <ParallaxCircles />
}
