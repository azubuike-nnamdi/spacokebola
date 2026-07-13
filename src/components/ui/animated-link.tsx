import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AnimatedLinkProps } from '@/lib/type-declaration';


export const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  children,
  href,
  isActive = false,
  className
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'relative group inline-block py-1',
        isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary transition-colors',
        className
      )}
    >
      {children}
      <span
        className={cn(
          'absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-bottom-right transition-transform duration-300 ease-out',
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left'
        )}
      />
    </Link>
  );
};