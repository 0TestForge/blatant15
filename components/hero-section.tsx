"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Calendar, Users, ChevronDown, Check, LayoutGrid } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"

const monthKeys = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const

type SearchMode = "browse" | "search"

export function HeroSection() {
  const { t } = useLanguage()
  const router = useRouter()

  const cities = [
    { value: "tbilisi", labelKey: "tbilisi" as const },
    { value: "batumi", labelKey: "batumi" as const },
    { value: "kutaisi", labelKey: "kutaisi" as const },
    { value: "borjomi", labelKey: "borjomi" as const },
  ]

  const guestOptions = [
    { value: "1-10", labelKey: "1-10" as const },
    { value: "11-25", labelKey: "11-25" as const },
    { value: "26-50", labelKey: "26-50" as const },
    { value: "50+", labelKey: "50+" as const },
  ]

  const [searchMode, setSearchMode] = useState<SearchMode>("browse")
  const [city, setCity] = useState("")
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [dayInput, setDayInput] = useState("")
  const [guests, setGuests] = useState("")
  const [cityOpen, setCityOpen] = useState(false)
  const [monthOpen, setMonthOpen] = useState(false)
  const [guestsOpen, setGuestsOpen] = useState(false)

  const cityRef = useRef<HTMLDivElement>(null)
  const monthRef = useRef<HTMLDivElement>(null)
  const guestsRef = useRef<HTMLDivElement>(null)

  const currentYear = 2026

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setCityOpen(false)
      }
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setMonthOpen(false)
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        setGuestsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const closeAllDropdowns = () => {
    setCityOpen(false)
    setMonthOpen(false)
    setGuestsOpen(false)
  }

  const handleBrowseClick = () => {
    const params = new URLSearchParams()
    if (city) params.append("location", city)
    if (guests) params.append("guests", guests)
    const queryString = params.toString()
    router.push(`/browse${queryString ? `?${queryString}` : ""}`)
  }

  const getMaxDaysInMonth = (month: number | null) => {
    if (month === null) return 31
    return new Date(currentYear, month + 1, 0).getDate()
  }

  const handleDayChange = (value: string) => {
    const numValue = value.replace(/\D/g, "")
    if (numValue === "") {
      setDayInput("")
      return
    }
    const num = Number.parseInt(numValue)
    const maxDays = getMaxDaysInMonth(selectedMonth)
    if (num >= 1 && num <= maxDays) {
      setDayInput(numValue)
    } else if (num > maxDays) {
      setDayInput(maxDays.toString())
    }
  }

  const tabs = [
    { id: "browse" as const, label: t.hero.browseAll, icon: LayoutGrid },
    { id: "search" as const, label: t.hero.searchByDate, icon: Calendar },
  ]

  return (
    <section className="relative pt-48 pb-40 md:pb-72 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none md:hidden">
        <div className="absolute top-20 left-4 w-40 h-40 bg-gradient-to-br from-apple-yellow/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-32 right-4 w-36 h-36 bg-gradient-to-br from-apple-blue/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-48 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-apple-green/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-foreground leading-[1.05] animate-fade-up text-balance">
          Find Party & Event Spaces in Georgia
        </h1>

        <p className="mt-12 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-up animation-delay-100 text-balance leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="mt-20 animate-fade-up animation-delay-200">
          <div className="flex justify-center mb-4">
            <div className="relative inline-flex items-center gap-1 p-1.5 rounded-2xl bg-secondary/80 backdrop-blur-sm border border-border/30 shadow-sm overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-2 w-20 h-20 bg-gradient-to-br from-apple-yellow/30 to-transparent rounded-full blur-2xl" />
                <div className="absolute top-0 right-2 w-18 h-18 bg-gradient-to-br from-apple-blue/20 to-transparent rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-apple-green/20 to-transparent rounded-full blur-2xl" />
              </div>

              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSearchMode(tab.id)}
                  className={`relative px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors duration-200 cursor-pointer ${
                    searchMode === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {searchMode === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-background rounded-xl shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div
            className="glass rounded-[24px] p-5 md:p-6 max-w-[1400px] mx-auto 
              shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2),0_12px_25px_-10px_rgba(0,0,0,0.1),inset_0_2px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.05)]
              dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_12px_25px_-15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]
              md:transform md:perspective-[1200px] md:hover:rotate-x-2 md:hover:translate-y-[-6px]
              md:hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.25),0_20px_35px_-15px_rgba(0,0,0,0.15),inset_0_2px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.05)]
              dark:md:hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.6),0_20px_35px_-15px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
              transition-all duration-500 ease-out
              border border-white/40 dark:border-white/10
              before:absolute before:inset-0 before:rounded-[24px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none dark:before:from-white/5
              relative overflow-visible"
          >
            <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none">
              <div className="absolute top-4 left-8 w-28 md:w-40 h-28 md:h-40 bg-gradient-to-br from-apple-yellow/35 md:from-apple-yellow/40 to-transparent rounded-full blur-3xl" />
              <div className="absolute top-2 right-8 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-br from-apple-blue/25 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-22 md:w-28 h-22 md:h-28 bg-gradient-to-br from-apple-green/22 to-transparent rounded-full blur-3xl" />
            </div>

            <AnimatePresence mode="wait">
              {searchMode === "browse" && (
                <motion.div
                  key="browse"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col xl:flex-row items-stretch gap-4 relative z-10"
                >
                  {/* City Dropdown */}
                  <div className="flex-1 min-w-[180px] w-full xl:w-auto relative" ref={cityRef}>
                    <button
                      onClick={() => {
                        closeAllDropdowns()
                        setCityOpen(!cityOpen)
                      }}
                      className="w-full h-full flex items-center gap-3 px-5 py-4 rounded-xl hover:bg-apple-yellow/10 transition-all duration-300 cursor-pointer group"
                    >
                      <MapPin className="w-5 h-5 text-muted-foreground group-hover:text-apple-yellow transition-colors duration-300" />
                      <div className="text-left flex-1">
                        <p className="text-xs text-muted-foreground font-semibold">{t.hero.location}</p>
                        <p className="font-semibold text-foreground">
                          {city
                            ? t.cities[cities.find((c) => c.value === city)?.labelKey || "tbilisi"]
                            : t.hero.selectCity}
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${cityOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {cityOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 apple-dropdown rounded-2xl p-2 z-[100] animate-dropdown">
                        {cities.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setCity(option.value)
                              setCityOpen(false)
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                              city === option.value
                                ? "bg-apple-yellow/20 text-foreground"
                                : "hover:bg-apple-yellow/10 text-foreground"
                            }`}
                          >
                            <span className="font-medium">{t.cities[option.labelKey]}</span>
                            {city === option.value && <Check className="w-4 h-4 text-apple-yellow" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="hidden xl:block w-px h-auto bg-border/30 self-stretch my-2" />

                  {/* Guest Count Dropdown */}
                  <div className="flex-1 min-w-[180px] w-full xl:w-auto relative" ref={guestsRef}>
                    <button
                      onClick={() => {
                        closeAllDropdowns()
                        setGuestsOpen(!guestsOpen)
                      }}
                      className="w-full h-full flex items-center gap-3 px-5 py-4 rounded-xl hover:bg-apple-green/10 transition-all duration-300 cursor-pointer group"
                    >
                      <Users className="w-5 h-5 text-muted-foreground group-hover:text-apple-green transition-colors duration-300" />
                      <div className="text-left flex-1">
                        <p className="text-xs text-muted-foreground font-semibold">{t.hero.guests}</p>
                        <p className="font-semibold text-foreground">
                          {guests
                            ? t.guestOptions[guestOptions.find((g) => g.value === guests)?.labelKey || "1-10"]
                            : t.hero.howMany}
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${guestsOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {guestsOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 apple-dropdown rounded-2xl p-2 z-[100] animate-dropdown">
                        {guestOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setGuests(option.value)
                              setGuestsOpen(false)
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                              guests === option.value
                                ? "bg-apple-green/20 text-foreground"
                                : "hover:bg-apple-green/10 text-foreground"
                            }`}
                          >
                            <span className="font-medium">{t.guestOptions[option.labelKey]}</span>
                            {guests === option.value && <Check className="w-4 h-4 text-apple-green" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button onClick={handleBrowseClick} className="w-full xl:w-auto bg-foreground text-background px-10 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 shadow-lg cursor-pointer bubblegum-animate flex-shrink-0 min-w-[150px]">
                    <LayoutGrid className="w-5 h-5" />
                    <span>{t.hero.browseSpaces}</span>
                  </button>
                </motion.div>
              )}

              {searchMode === "search" && (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col xl:flex-row items-stretch gap-3 xl:gap-4 relative z-10"
                >
                  <div className="min-w-[140px] w-full xl:w-auto xl:flex-shrink-0 relative" ref={cityRef}>
                    <button
                      onClick={() => {
                        closeAllDropdowns()
                        setCityOpen(!cityOpen)
                      }}
                      className="w-full h-full text-left bg-secondary/60 hover:bg-secondary/80 dark:bg-muted/40 dark:hover:bg-muted/60 rounded-xl px-3 py-2.5 transition-all duration-300 flex items-center justify-between gap-2 border border-border/20 hover:border-[#5AC8F5]/40 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">
                          {t.hero.location}
                        </p>
                        <p className="font-semibold text-foreground text-sm truncate">
                          {city
                            ? t.cities[cities.find((c) => c.value === city)?.labelKey || "tbilisi"]
                            : t.hero.selectCity}
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${cityOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {cityOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 apple-dropdown rounded-2xl p-2 z-[100] animate-dropdown">
                        {cities.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setCity(option.value)
                              setCityOpen(false)
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-sm cursor-pointer ${
                              city === option.value
                                ? "bg-apple-yellow/20 text-foreground"
                                : "hover:bg-apple-yellow/10 text-foreground"
                            }`}
                          >
                            <span className="font-medium">{t.cities[option.labelKey]}</span>
                            {city === option.value && <Check className="w-4 h-4 text-apple-yellow" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="hidden xl:block w-px h-auto bg-border/30 self-stretch my-2" />

                  {/* Date section */}
                  <div className="flex-1 w-full xl:w-auto">
                    <div className="flex items-center gap-2 xl:gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0 hidden xl:block" />

                      {/* Month dropdown */}
                      <div className="relative flex-1 min-w-[120px]" ref={monthRef}>
                        <button
                          onClick={() => {
                            closeAllDropdowns()
                            setMonthOpen(!monthOpen)
                          }}
                          className="w-full text-left bg-secondary/60 hover:bg-secondary/80 dark:bg-muted/40 dark:hover:bg-muted/60 rounded-xl px-3 py-2.5 transition-all duration-300 flex items-center justify-between gap-2 border border-border/20 hover:border-[#5AC8F5]/40 cursor-pointer shadow-sm hover:shadow-md"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">
                              {t.hero.month}
                            </p>
                            <p className="font-semibold text-foreground text-sm truncate">
                              {selectedMonth !== null ? t.months[monthKeys[selectedMonth]] : t.hero.selectMonth}
                            </p>
                          </div>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${monthOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {monthOpen && (
                          <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl p-2 z-[100] animate-dropdown w-48 max-h-72 overflow-y-auto border border-border shadow-[0_20px_60px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.1)]">
                            {monthKeys.map((key, index) => (
                              <button
                                key={key}
                                onClick={() => {
                                  setSelectedMonth(index)
                                  setMonthOpen(false)
                                  const maxDays = getMaxDaysInMonth(index)
                                  if (dayInput && Number.parseInt(dayInput) > maxDays) {
                                    setDayInput(maxDays.toString())
                                  }
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 text-sm cursor-pointer ${
                                  selectedMonth === index
                                    ? "bg-[#5AC8F5]/20 text-foreground"
                                    : "hover:bg-[#5AC8F5]/10 text-foreground"
                                }`}
                              >
                                <span className="font-medium">{t.months[key]}</span>
                                {selectedMonth === index && <Check className="w-4 h-4 text-[#5AC8F5]" />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Day input */}
                      <div className="w-20 xl:w-20 flex-shrink-0">
                        <div className="bg-secondary/60 dark:bg-muted/40 rounded-xl px-3 py-2.5 border border-border/20 hover:border-[#5AC8F5]/40 transition-all shadow-sm hover:shadow-md">
                          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">
                            {t.hero.day}
                          </p>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="1-31"
                            value={dayInput}
                            onChange={(e) => handleDayChange(e.target.value)}
                            className="w-full bg-transparent font-semibold text-foreground text-sm focus:outline-none placeholder:text-muted-foreground/50"
                          />
                        </div>
                      </div>

                      {/* Year */}
                      <div className="w-16 xl:w-16 flex-shrink-0">
                        <div className="bg-secondary/60 dark:bg-muted/40 rounded-xl px-3 py-2.5 border border-border/20 transition-all">
                          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">
                            {t.hero.year}
                          </p>
                          <p className="font-semibold text-foreground text-sm">{currentYear}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden xl:block w-px h-auto bg-border/30 self-stretch my-2" />

                  {/* Guest Count Dropdown */}
                  <div className="min-w-[140px] w-full xl:w-auto xl:flex-shrink-0 relative" ref={guestsRef}>
                    <button
                      onClick={() => {
                        closeAllDropdowns()
                        setGuestsOpen(!guestsOpen)
                      }}
                      className="w-full h-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-secondary/60 hover:bg-secondary/80 dark:bg-muted/40 dark:hover:bg-muted/60 transition-all duration-300 cursor-pointer group border border-border/20 hover:border-apple-green/40 shadow-sm hover:shadow-md"
                    >
                      <Users className="w-4 h-4 text-muted-foreground group-hover:text-apple-green transition-colors duration-300 flex-shrink-0" />
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">
                          {t.hero.guests}
                        </p>
                        <p className="font-semibold text-foreground text-sm truncate">
                          {guests
                            ? t.guestOptions[guestOptions.find((g) => g.value === guests)?.labelKey || "1-10"]
                            : t.hero.howMany}
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${guestsOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {guestsOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 apple-dropdown rounded-2xl p-2 z-[100] animate-dropdown">
                        {guestOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setGuests(option.value)
                              setGuestsOpen(false)
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                              guests === option.value
                                ? "bg-apple-green/20 text-foreground"
                                : "hover:bg-apple-green/10 text-foreground"
                            }`}
                          >
                            <span className="font-medium">{t.guestOptions[option.labelKey]}</span>
                            {guests === option.value && <Check className="w-4 h-4 text-apple-green" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button className="w-full xl:w-auto bg-foreground text-background px-6 xl:px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 shadow-lg cursor-pointer bubblegum-animate flex-shrink-0">
                    <Search className="w-4 h-4" />
                    <span className="text-sm">{t.hero.searchSpaces}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
