'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ModeToggle } from '@/components/ui/toogle-mode'
import { Bell, Search, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import CustomBreadcrumb from './custom-breadcrumb'

export function Header() {
  const [isLargeScreen, setIsLargeScreen] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener('resize', checkScreenSize)

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <header className="bg-white dark:bg-black rounded-xl border-gray-200 dark:border-gray-800 flex h-14 items-center gap-4 px-6 lg:h-[60px]">
      <SidebarTrigger />
      <div className="flex flex-1 items-center gap-4">
        <CustomBreadcrumb />

        <div className="ml-auto flex items-center gap-3">
          {isLargeScreen && (
            <div className="relative">
              <Search className="text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                type="search"
                placeholder="Search"
                className="bg-gray-100 dark:bg-gray-900 border-0 w-[240px] pl-10 rounded-full text-sm"
              />
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Notifications</span>
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Settings</span>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
