"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, BookOpen, Church, Home } from "lucide-react"
import Link from "next/link"

export default function PageNotFound() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }


  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 to-white p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div

          animate="float"
          className="absolute -top-20 left-1/4 h-40 w-40 rounded-full bg-amber-100 opacity-30 blur-3xl"
        />
        <motion.div

          animate="floatDelayed"
          className="absolute right-1/4 top-1/3 h-60 w-60 rounded-full bg-amber-200 opacity-20 blur-3xl"
        />
        <motion.div

          animate="floatSlow"
          className="absolute bottom-1/4 left-1/3 h-40 w-40 rounded-full bg-amber-100 opacity-30 blur-3xl"
        />
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl"
        >
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="relative">
                {/* Animated gradient bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-2 w-full bg-gradient-to-r from-amber-400 to-amber-600 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </motion.div>

                <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center justify-center space-y-4 md:items-start"
                  >
                    {/* 404 Number */}
                    <motion.div variants={itemVariants} className="relative">
                      <div className="text-[120px] font-extrabold leading-none tracking-tighter text-amber-600 md:text-[150px]">
                        404
                      </div>
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                        className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-amber-100 md:-right-6 md:-top-6 md:h-20 md:w-20"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "loop",
                          delay: 1
                        }}
                        className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-amber-100 md:-left-6 md:-bottom-6 md:h-20 md:w-20"
                      />
                    </motion.div>

                    {/* Church icon */}
                    <motion.div
                      variants={itemVariants}
                      transition={{ delay: 0.4 }}
                      className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-100"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0],
                          y: [0, -5, 0]
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <Church className="h-12 w-12 text-amber-600" />
                      </motion.div>
                    </motion.div>

                    {/* Light rays */}
                    <motion.div
                      variants={itemVariants}
                      transition={{ delay: 0.5 }}
                      className="absolute left-1/2 top-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 opacity-10"
                    >
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="absolute left-1/2 top-0 h-20 w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber-500 to-transparent"
                          style={{ transform: `rotate(${i * 30}deg)` }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center justify-center space-y-4 text-center md:items-start md:text-left"
                  >
                    <motion.h1
                      variants={itemVariants}
                      className="text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl md:text-5xl"
                    >
                      Page Not Found
                    </motion.h1>

                    <motion.div
                      variants={itemVariants}
                      className="flex items-center justify-center rounded-full bg-amber-100 px-4 py-2 text-amber-800 md:justify-start"
                    >
                      <motion.div
                        animate={{
                          y: [0, -3, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <BookOpen className="mr-2 h-5 w-5" />
                      </motion.div>
                      <span className="text-sm font-medium">We couldn&apos;t find this page</span>
                    </motion.div>

                    <motion.p
                      variants={itemVariants}
                      className="text-slate-600 dark:text-white"
                    >
                      The page you&apos;re looking for doesn&apos;t exist or has been moved to another location. Let us guide you back
                      to the right path.
                    </motion.p>

                    <motion.div variants={itemVariants}>
                      <Separator className="my-2 bg-amber-200" />
                    </motion.div>

                    <motion.blockquote
                      variants={itemVariants}
                      className="border-l-2 border-amber-300 pl-4 italic text-slate-700 dark:text-white"
                    >
                      &quot;I am the way, the truth, and the life.&quot; — John 14:6
                    </motion.blockquote>

                    <motion.div
                      variants={itemVariants}
                      className="flex flex-col gap-2 pt-2 sm:flex-row"
                    >
                      <Button
                        asChild
                        className="group gap-2 bg-amber-600 hover:bg-amber-700 hover:scale-105 transition-all duration-300"
                      >
                        <Link href="/">
                          <motion.div
                            animate={{
                              x: [0, 4, 0]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          >
                            <Home className="h-4 w-4" />
                          </motion.div>
                          Return Home
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="group border-amber-600 text-amber-600 hover:bg-amber-50 hover:text-amber-700 hover:scale-105 transition-all duration-300"
                      >
                        <Link href="/contact">
                          <motion.div
                            animate={{
                              x: [0, -4, 0]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "reverse",
                              delay: 0.5
                            }}
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                          </motion.div>
                          Contact Us
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}