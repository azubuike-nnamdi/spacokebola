'use client';

import { AnimatedLink } from '@/components/ui/animated-link';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from '@/components/ui/toogle-mode';
import { links } from '@/data';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md w-full transition-all duration-300 ${isScrolled ? 'shadow-sm py-3' : 'py-5'
        }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Image src="/assets/img/spac-logo.png" alt="SPAC OKE BOLA" width={50} height={50} />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            link.children ? (
              <NavigationMenu key={link.path}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        {link.children.map((child) => (
                          <li key={child.path}>
                            <NavigationMenuLink asChild>
                              <AnimatedLink href={child.path} isActive={pathname === child.path}>
                                {child.label}
                              </AnimatedLink>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <AnimatedLink key={link.path} href={link.path} isActive={pathname === link.path}>
                {link.label}
              </AnimatedLink>
            )
          ))}
          <ModeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu - Fixed background */}
      <div
        className={`fixed inset-0 z-40 bg-background bg-opacity-100 flex flex-col pt-24 px-6 pb-8 transition-transform duration-300 ease-in-out transform md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <nav className="flex flex-col space-y-6">
          {links.map((link) => (
            <React.Fragment key={link.path}>
              {link.children ? (
                <div className="space-y-2">
                  <div className="font-medium text-lg text-foreground">{link.label}</div>
                  <div className="pl-4 space-y-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={`text-lg py-2 transition-colors ${pathname === child.path
                          ? 'font-medium text-primary'
                          : 'text-foreground hover:text-primary'
                          }`}
                        onClick={closeMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={link.path}
                  className={`text-lg py-2 border-b border-border transition-colors ${pathname === link.path
                    ? 'font-medium text-primary'
                    : 'text-foreground hover:text-primary'
                    }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
        <ModeToggle />

        <div className="mt-auto pt-8">
          <Button size="lg" className="w-full">
            Join Us Sunday
          </Button>
        </div>
      </div>
    </header>
  );
};