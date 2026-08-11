'use client'

import { AnimatedLink } from '@/components/ui/animated-link'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { CONTACT_URL, EVENTS_URL } from '@/config/routes'
import { links } from '@/data'
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const pathname = usePathname()
  const [menuPath, setMenuPath] = useState(pathname)

  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => setIsMenuOpen((open) => !open)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-none border-border/80 py-3'
          : 'bg-background/90 backdrop-blur-sm border-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/assets/img/spac-logo.png"
            alt="Oke Bola Archdeaconry"
            width={48}
            height={48}
          />
          {/* <span className="hidden lg:block font-montserrat text-sm font-semibold tracking-wide text-foreground">
            Oke Bola Archdeaconry
          </span> */}
        </Link>

        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {links.map((link) =>
            link.children ? (
              <NavigationMenu key={link.path}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent font-montserrat text-sm tracking-wide">
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-64 gap-1 p-3">
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
              <AnimatedLink
                key={link.path}
                href={link.path}
                isActive={pathname === link.path}
                className="font-montserrat text-sm tracking-wide px-2"
              >
                {link.label}
              </AnimatedLink>
            ),
          )}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" className="uppercase tracking-[0.14em] text-xs h-9 px-4">
            <Link href={EVENTS_URL}>Join Us</Link>
          </Button>
        </div>

        <button
          onClick={toggleMenu}
          className="p-2 rounded-md md:hidden focus:outline-none relative z-50 text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-ink/40 backdrop-blur-sm" onClick={closeMenu} />
      )}

      <div
        className={`fixed top-0 left-0 w-full h-[90vh] z-40 bg-background
        flex flex-col pt-24 px-6 pb-8
        transition-transform duration-300 ease-in-out transform md:hidden
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col space-y-6 w-full mb-3">
          {links.map((link) => (
            <React.Fragment key={link.path}>
              {link.children ? (
                <div className="space-y-2">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    className="flex justify-between items-center w-full font-montserrat font-medium text-lg text-foreground"
                  >
                    {link.label}
                    <span className="text-sm text-primary">
                      {openDropdown === link.label ? <ChevronUp /> : <ChevronDown />}
                    </span>
                  </button>

                  <hr className="border-border" />

                  {openDropdown === link.label && (
                    <div className="pl-4 mt-2 flex flex-col space-y-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className={`text-lg py-1 transition-colors ${
                            pathname === child.path
                              ? 'font-medium text-primary'
                              : 'text-foreground hover:text-primary'
                          }`}
                          onClick={() => {
                            closeMenu()
                            setOpenDropdown(null)
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.path}
                  className={`font-montserrat text-lg py-2 border-b border-border transition-colors ${
                    pathname === link.path
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

        <div className="mt-auto pt-4 space-y-3">
          <Button asChild size="lg" className="w-full">
            <Link href={EVENTS_URL}>Join Us Sunday</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full">
            <Link href={CONTACT_URL}>Contact</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
