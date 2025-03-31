"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, BookOpen, Church, Home } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 to-white p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 h-40 w-40 animate-float rounded-full bg-amber-100 opacity-30 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-60 w-60 animate-float-delayed rounded-full bg-amber-200 opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 h-40 w-40 animate-float-slow rounded-full bg-amber-100 opacity-30 blur-3xl" />
      </div>

      {/* Main card with entrance animation */}
      <Card
        className={`w-full max-w-3xl overflow-hidden border-none shadow-lg transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
      >
        <CardContent className="p-0">
          <div className="relative">
            {/* Animated gradient bar */}
            <div className="h-2 w-full bg-gradient-to-r from-amber-400 to-amber-600 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer" />
            <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
              <div className="flex flex-col items-center justify-center space-y-4 md:items-start">
                {/* Animated 404 with staggered entrance */}
                <div className="relative">
                  <div
                    className={`text-[120px] font-extrabold leading-none tracking-tighter text-amber-600 md:text-[150px] transition-all duration-1000 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                      }`}
                  >
                    404
                  </div>
                  {/* Enhanced pulse animations */}
                  <div className="absolute -right-4 -top-4 h-16 w-16 animate-pulse rounded-full bg-amber-100 md:-right-6 md:-top-6 md:h-20 md:w-20" />
                  <div className="absolute -left-4 -bottom-4 h-16 w-16 animate-pulse-delayed rounded-full bg-amber-100 md:-left-6 md:-bottom-6 md:h-20 md:w-20" />
                </div>

                {/* Animated church icon */}
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 transition-all duration-1000 delay-500 ${mounted ? "translate-y-0 opacity-100 rotate-0" : "translate-y-10 opacity-0 rotate-12"
                    }`}
                >
                  <Church className="h-12 w-12 text-amber-600 animate-gentle-swing" />
                </div>

                {/* Animated light rays */}
                <div className="absolute left-1/2 top-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-slow-spin opacity-10">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-0 h-20 w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber-500 to-transparent"
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 text-center md:items-start md:text-left">
                {/* Staggered entrance animations for text elements */}
                <h1
                  className={`text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl md:text-5xl transition-all duration-700 delay-400 ${mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                    }`}
                >
                  Page Not Found
                </h1>

                <div
                  className={`flex items-center justify-center rounded-full bg-amber-100 px-4 py-2 text-amber-800 md:justify-start transition-all duration-700 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                    }`}
                >
                  <BookOpen className="mr-2 h-5 w-5 animate-gentle-bounce" />
                  <span className="text-sm font-medium">We couldn&apos;t find this page</span>
                </div>

                <p
                  className={`text-slate-600 dark:text-white transition-all duration-700 delay-600 ${mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                    }`}
                >
                  The page you&apos;re looking for doesn&apos;t exist or has been moved to another location. Let us guide you back
                  to the right path.
                </p>

                <Separator
                  className={`my-2 bg-amber-200 transition-all duration-700 delay-700 ${mounted ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                    }`}
                />

                <blockquote
                  className={`border-l-2 border-amber-300 pl-4 italic text-slate-700 dark:text-white transition-all duration-700 delay-800 ${mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                    }`}
                >
                  &quot;I am the way, the truth, and the life.&quot; — John 14:6
                </blockquote>

                <div
                  className={`flex flex-col gap-2 pt-2 sm:flex-row transition-all duration-700 delay-900 ${mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                    }`}
                >
                  <Button
                    asChild
                    className="group gap-2 bg-amber-600 hover:bg-amber-700 hover:scale-105 transition-all duration-300"
                  >
                    <Link href="/">
                      <Home className="h-4 w-4 group-hover:animate-bounce" />
                      Return Home
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="group border-amber-600 text-amber-600 hover:bg-amber-50 hover:text-amber-700 hover:scale-105 transition-all duration-300"
                  >
                    <Link href="/contact">
                      <ArrowLeft className="mr-2 h-4 w-4 group-hover:animate-bounce-horizontal" />
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

