"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function GeorgiaHoverText() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-flex items-center cursor-pointer min-h-[1em]"
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.span
            key="text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="inline-block"
          >
            Georgia
          </motion.span>
        ) : (
          <motion.div
            key="icon"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="inline-flex items-center"
            style={{
              height: "1em",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Image
              src="https://cdn.builder.io/api/v1/image/assets%2F74927ce92a054075ac6480651ed06ddf%2F4bea9b26840a4c3e9014898c18c29e5d?format=webp&width=800&height=1200"
              alt="Georgia"
              width={150}
              height={100}
              className="w-auto"
              style={{
                height: "1em",
                width: "auto",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
