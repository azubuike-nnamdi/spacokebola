'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <TransitionGroup>
      <CSSTransition
        key={pathname}
        timeout={400}
        classNames="page-transition"
      >
        <div className="min-h-screen flex flex-col pt-16 md:pt-20">
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};