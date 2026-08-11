import type { Metadata } from 'next'
import localFont from 'next/font/local'
import React from 'react'

import { Footer } from '@/components/site/common/footer'
import { Navbar } from '@/components/site/common/navbar'
import { getServerSideURL } from '@/utilities/getURL'

import './globals.css'

const montserrat = localFont({
  variable: '--montserrat',
  src: [
    { path: './fonts/Montserrat-ExtraLight.ttf', weight: '100', style: 'normal' },
    { path: './fonts/Montserrat-Light.ttf', weight: '300' },
    { path: './fonts/Montserrat-Regular.ttf', weight: '400' },
    { path: './fonts/Montserrat-Medium.ttf', weight: '500' },
    { path: './fonts/Montserrat-Bold.ttf', weight: '700' },
    { path: './fonts/Montserrat-ExtraBold.ttf', weight: '900' },
  ],
})

const openSans = localFont({
  variable: '--open-sans',
  src: [
    { path: './fonts/OpenSans-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/OpenSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/OpenSans-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/OpenSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/OpenSans-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/OpenSans-ExtraBold.ttf', weight: '900', style: 'normal' },
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: { default: 'Oke Bola Archdeaconry', template: '%s - Oke Bola Archdeaconry' },
  description:
    "The Action Place of the Holy Spirit — St. Paul's Anglican Church, Oke Bola Archdeaconry, Ibadan.",
  icons: {
    icon: '/assets/img/spac-logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${montserrat.variable} ${openSans.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
