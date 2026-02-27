"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

interface AboutPriestProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default function AboutPriest({
  name,
  role,
  bio,
  image,
}: AboutPriestProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-6 font-bold">
            Priest in Charge
          </h2>
          <p className="text-muted-foreground">
            Meet the priest leading our spiritual community with dedication and
            faith.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="order-2 md:order-1"
          >
            <Card className="border border-border/40 shadow-lg rounded-2xl overflow-hidden h-full flex flex-col p-8">
              <CardContent className="p-0">
                <h3 className="text-3xl md:text-4xl font-semibold mb-3 text-foreground">
                  {name}
                </h3>
                <p className="text-primary/80 mb-6 font-medium text-lg">
                  {role}
                </p>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {bio}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="order-1 md:order-2 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full max-w-md rounded-3xl overflow-hidden shadow-lg"
            >
              <Image
                src={image}
                alt={name}
                className="object-cover w-full h-64 md:h-[520px] transform-gpu"
                width={900}
                height={900}
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
