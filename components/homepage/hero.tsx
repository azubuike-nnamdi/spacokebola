'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToContent = () => {
    const element = document.getElementById('welcome-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in">
        <h1 className="text-white mb-6 leading-tight text-4xl font-bold">
          Welcome to SPAC Oke Bola
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          A community of faith, hope, and love where everyone is welcome
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="min-w-[160px] rounded-full bg-white text-primary hover:bg-white/90 hover:text-primary/90">
            Join Us Sunday
          </Button>
          <Button size="lg" variant="outline" className="min-w-[160px] rounded-full text-white border-white hover:bg-white/10 bg-transparent">
            Watch Online
          </Button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center animate-pulse cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-sm mb-2">Scroll Down</span>
        <ArrowDownIcon size={20} />
      </button>
    </section>
  );
};