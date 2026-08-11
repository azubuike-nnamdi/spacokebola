'use client';

import { Button } from '@/components/ui/button';
import { ABOUT_URL, EVENTS_URL } from '@/config/routes';
import { ArrowDownIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const Hero: React.FC = () => {
  const scrollToContent = () => {
    const element = document.getElementById('welcome-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[92vh] flex items-end md:items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80')] bg-cover bg-center"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-ink via-ink/75 to-ink/35"
        aria-hidden="true"
      />

      <div className="container relative z-10 pb-20 pt-32 md:py-0 max-w-4xl animate-fade-in">
        <p className="font-montserrat text-xs md:text-sm uppercase tracking-[0.28em] text-primary mb-5">
          Oke Bola Archdeaconry
        </p>
        <h1 className="text-white mb-5 leading-[1.05] text-4xl md:text-6xl lg:text-7xl font-semibold max-w-3xl">
          Welcome home to faith, hope, and community
        </h1>
        <p className="text-white/80 text-base md:text-lg mb-9 max-w-xl">
          The Action Place of the Holy Spirit — a welcoming Anglican family in Oke Bola, Ibadan.
        </p>
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <Button asChild size="lg">
            <Link href={EVENTS_URL}>Join Us Sunday</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 text-white hover:border-primary hover:text-primary bg-transparent"
          >
            <Link href={ABOUT_URL}>About Us</Link>
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-primary flex flex-col items-center transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] mb-2 font-montserrat">
          Scroll
        </span>
        <ArrowDownIcon size={18} />
      </button>
    </section>
  );
};
